<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">替代料</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addSubstitute">添加替代料</el-button>
    </div>
    <el-table :data="substitutes" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="substituteMatCode" label="替代料编号"/>
      <el-table-column prop="substituteMatCode" label="替代料名称" :formatter="formatter"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editSubstitute(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteSubstitute(scope)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toMap from '@/utils/toMap'
import toOptions from '@/utils/toOptions'
import getSubstituteForm from '@/form/substitute'

export default {
  name: 'SubstituteCard',
  props: {
    bomDetail: {
      type: Object,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.bomDetail.enableSubstitute
    },
    options () {
      return this.bomDetail.matType ? this.materialOpts : this.prodeuctOpts
    },
    codes () {
      const { bomCode, matCode } = this.bomDetail
      return { bomCode, matCode }
    }
  },
  data () {
    return {
      substitutes: [],
      names: [],
      prodeuctOpts: [],
      materialOpts: []
    }
  },
  watch: {
    'bomDetail.matCode' (value, oldValue) {
      this.substitutes = []
      if (this.bomDetail.enableSubstitute) {
        this.fetchSubstitutes()
      }
    }
  },
  methods: {
    formatter (row, col, cell) {
      return this.names[this.bomDetail.matType][cell]
    },
    // 操作替代料
    fetchSubstitutes () {
      Api.get('MatSubstitutes', this.codes).then(data => {
        this.substitutes = data
      })
    },

    addSubstitute () {
      getSubstituteForm(this.codes, 'add', this.options)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('MatSubstitutes', formData).then(substitute => {
            this.substitutes.push(substitute)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },

    editSubstitute (scope) {
      getSubstituteForm(scope.row, 'edit', this.options)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MatSubstitutes/${scope.row.id}`, formData).then(_ => {
            this.substitutes.splice(scope.$index, 1, formData)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },

    deleteSubstitute (scope) {
      this.$confirm('此操作将永久删除该替代料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`MatSubstitutes/${scope.row.id}`).then(_ => {
          this.substitutes.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  created () {
    Api.get('Products').then(products => {
      this.names[0] = toMap(products, 'productCode', 'productName')
      this.prodeuctOpts = toOptions(products, 'productCode', 'productName')
    })
    Api.get('Materials').then(materials => {
      this.names[1] = toMap(materials, 'matCode', 'matName')
      this.materialOpts = toOptions(materials, 'matCode', 'matName')
    })
  }
}
</script>

<style scoped>
</style>
