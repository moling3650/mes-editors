<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">BOM</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBom">添加BOM</el-button>
    </div>
    <el-table :data="bomList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickBom">
      <el-table-column prop="bomCode" label="BOM"/>
      <el-table-column prop="versionCode" label="版本" width="50"/>
      <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="$emit('skip', 'Formula', scope.row)" type="text" icon="el-icon-tickets" size="mini"/>
            <el-button @click.stop="editBom(scope.row)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteBom(scope.row)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getBomForm from '@/form/bom'

export default {
  name: 'BomCard',
  props: {
    productCode: {
      type: String,
      required: true
    },
    productOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.productCode
    }
  },
  data () {
    return {
      bomList: []
    }
  },
  watch: {
    productCode (value, oldValue) {
      this.bomList = []
      if (value) {
        this.getBomList(value)
      }
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    getBomList (productCode) {
      Api.get('Boms', { productCode }).then(boms => {
        this.bomList = boms
      })
    },

    addBom () {
      if (!this.productCode) {
        return void this.$message.info('请先选择产品')
      }
      getBomForm({productCode: this.productCode}, 'add', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.createTime = new Date()
          Api.post('Boms', formData).then(bom => {
            this.bomList.push(bom)
            this.$emit('change', bom)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editBom (row) {
      getBomForm(row, 'edit', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`Boms/${formData.bomId}`, formData).then(_ => {
            const index = this.bomList.findIndex(b => b.bomId === formData.bomId)
            ~index && this.bomList.splice(index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteBom (row) {
      this.$confirm('此操作将永久删除该BOM, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`Boms/${row.bomId}`).then(_ => {
          const index = this.bomList.findIndex(b => b.bomId === row.bomId)
          ~index && this.bomList.splice(index, 1)
          this.$emit('update:bomDetail', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickBom (bom) {
      this.$emit('change', bom)
    }
  }
}
</script>

<style scoped>
</style>
