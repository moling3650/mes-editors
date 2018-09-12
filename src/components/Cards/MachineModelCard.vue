<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备型号列表</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMachineModel">添加型号</el-button>
    </div>
    <el-table :data="bomList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickBom">
      <el-table-column prop="bom_code" label="BOM"/>
      <el-table-column prop="version_code" label="版本" width="50"/>
      <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editBom(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteBom(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getBomForm from '@/form/bom'

export default {
  name: 'MachineModelCard',
  props: {
    kindId: {
      type: [Number, String],
      required: true
    },
    productOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.kindId
    }
  },
  data () {
    return {
      machineModelList: []
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.machineModelList = []
      if (value) {
        this.getMachineModelList(value)
      }
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    getMachineModelList (kindId) {
      apis.fetchMachineModelListByKind({ kind_id: kindId }).then(data => {
        this.machineModelList = data
      })
    },

    addMachineModel () {
      if (!this.kindId) {
        return void this.$message.info('请先选择类别')
      }
      getMachineModelForm({kind_id: this.kindId}, 'add', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (bom, close) => {
          bom.create_time = new Date()
          apis.addBom(bom).then(bom => {
            this.bomList.push(bom)
            this.$emit('change', bom)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editBom (row) {
      getBomForm(row, 'edit', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (bom, close) => {
          apis.updateBom(bom).then(bom => {
            const index = this.bomList.findIndex(b => b.bom_id === bom.bom_id)
            ~index && this.bomList.splice(index, 1, bom)
            this.$emit('change', bom)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteBom (bom) {
      this.$confirm('此操作将永久删除该BOM, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteBom(bom).then(_ => {
          const index = this.bomList.findIndex(b => b.bom_id === bom.bom_id)
          ~index && this.bomList.splice(index, 1)
          this.$emit('change', {})
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
