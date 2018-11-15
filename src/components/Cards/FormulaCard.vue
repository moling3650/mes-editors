<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{ bomCode ? `BOM(${bomCode})的配方` : '请先选择BOM' }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormula">添加配方</el-button>
    </div>
    <el-table :data="formulas" stripe size="mini" header-cell-class-name="thcell" class="w100p" highlight-current-row @row-click="handleClickFormula">
      <el-table-column prop="formulaCode" label="配方编号"/>
      <el-table-column prop="formulaName" label="配方名称"/>
      <el-table-column prop="designator" label="标识符"/>
      <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
      <el-table-column fixed="right" label="操作" width="104" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="viewFormula(scope)" type="text" icon="el-icon-search" size="mini"/>
            <el-button @click.stop="editFormula(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteFormula(scope)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getFormulaForm from '@/form/formula'

export default {
  name: 'FormulaCard',
  props: {
    bomCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.bomCode
    }
  },
  data () {
    return {
      formulas: []
    }
  },
  watch: {
    bomCode: {
      handler (value, oldValue) {
        this.formulas = []
        if (value) {
          this.getFormulas(value)
        }
      },
      immediate: true
    }
  },
  methods: {
    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    handleClickFormula (formula) {
      this.$emit('change', formula)
    },

    getFormulas (bomCode) {
      Api.get('Formulas', { bomCode }).then(data => {
        this.formulas = data
      })
    },

    // 操作配方表
    viewFormula (scope) {
      this.$emit('change', scope.row)
      getFormulaForm(scope.row, 'view').then(form => this.$showForm(form).$on('submit', (_, close) => close()))
    },
    addFormula () {
      getFormulaForm({ bomCode: this.bomCode }).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        formData.createDate = new Date()
        Api.post('Formulas', formData).then(formula => {
          this.formulas.push(formula)
          this.$emit('change', formula)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },
    editFormula (scope) {
      getFormulaForm(scope.row, 'edit').then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.put(`Formulas/${scope.row.id}`, formData).then(_ => {
          this.formulas.splice(scope.$index, 1, formData)
          this.$emit('change', formData)
          this.$message.success('修改成功!')
          close()
        })
      }))
    },
    deleteFormula (scope) {
      this.$confirm('此操作将永久删除该配方, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => Api.delete(`Formulas/${scope.row.id}`))
        .then(_ => {
          this.formulas.splice(scope.$index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
        .catch(err => {
          this.$message.info(err.message || '已取消删除')
        })
    }
  }
}
</script>

<style scoped>
</style>
