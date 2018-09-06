<template>
  <el-card class="h600 ova">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{ bomCode ? `BOM(${bomCode})的配方` : '请先选择BOM' }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormula">添加配方</el-button>
    </div>
    <el-table :data="formulaList" stripe size="mini" header-cell-class-name="thcell" class="w100p" highlight-current-row @row-click="handleClickFormula">
      <el-table-column prop="formula_code" label="配方编号"/>
      <el-table-column prop="formula_name" label="配方名称"/>
      <el-table-column prop="designator" label="标识符"/>
      <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
      <el-table-column fixed="right" label="操作" width="104" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="viewFormula(scope.row)" type="success" icon="el-icon-search" circle size="mini"></el-button>
            <el-button @click.stop="editFormula(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteFormula(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
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
      formulaList: []
    }
  },
  watch: {
    bomCode (value, oldValue) {
      this.formulaList = []
      if (value) {
        this.getFormulaList(value)
      }
    }
  },
  methods: {
    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    handleClickFormula (formula) {
      this.$emit('change', formula)
    },

    getFormulaList (bomCode) {
      apis.fetchFormulaListByBom({ bom_code: bomCode }).then(data => {
        this.formulaList = data
      })
    },

    // 操作配方表
    viewFormula (formula) {
      this.$emit('change', formula)
      getFormulaForm(formula, 'view').then(form => this.$showForm(form).$on('submit', (_, close) => close()))
    },
    addFormula () {
      getFormulaForm({ bom_code: this.bomCode }).then(form => this.$showForm(form).$on('submit', (formula, close) => {
        formula.create_date = new Date()
        apis.addFormula(formula).then(formula => {
          this.formulaList.push(formula)
          this.$emit('change', formula)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },
    editFormula (formula) {
      getFormulaForm(formula, 'edit').then(form => this.$showForm(form).$on('submit', (formula, close) => {
        apis.updateFormula(formula).then(formula => {
          const index = this.formulaList.findIndex(f => f.ID === formula.ID)
          ~index && this.formulaList.splice(index, 1, formula)
          this.$emit('change', formula)
          this.$message.success('修改成功!')
          close()
        })
      }))
    },
    deleteFormula (formula) {
      this.$confirm('此操作将永久删除该配方, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => apis.deleteFormula(formula))
        .then(_ => {
          const index = this.formulaList.findIndex(f => f.ID === formula.ID)
          ~index && this.formulaList.splice(index, 1)
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
