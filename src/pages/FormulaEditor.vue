<template>
  <div id="FormulaEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-cascader v-model="product" :options="products" filterable @change="getBom" class="w100p"/>
      </el-col>
    </el-row>
    <!-- BOM -->
    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-card class="h600">
          <div slot="header" class="card-header clearfix">
            <span class="card-header">BOM</span>
          </div>
          <el-table :data="bomList" stripe size="mini" header-cell-class-name="thcell" class="w100p" highlight-current-row @row-click="getFormula">
            <el-table-column prop="bom_code" label="BOM"/>
            <el-table-column prop="version_code" label="版本" width="50"/>
            <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
          </el-table>
        </el-card>
      </el-col>
      <!-- Formula -->
      <el-col :span="8">
        <el-card class="h600 ova">
          <div slot="header" class="clearfix">
            <span class="card-header">{{ bomCode ? `BOM(${bomCode})的配方` : '请先选择BOM' }}</span>
            <el-button :disabled="!bomCode" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormula">添加配方</el-button>
          </div>
          <el-table :data="formulaList" stripe size="mini" header-cell-class-name="thcell" class="w100p" highlight-current-row @row-click="handleFormulaChange">
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
      </el-col>

      <el-col :span="11">
        <FormulaDetailCard :formulaCode="formulaCode" :bomMaterials="bomMaterials"></FormulaDetailCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import apis from '@/apis'
import getFormulaForm from '@/form/formula'
import FormulaDetailCard from '@/components/Cards/FormulaDetailCard'

export default {
  name: 'FormulaEditor',
  components: {
    FormulaDetailCard
  },
  data () {
    return {
      products: [],
      product: [],
      bomList: [],
      bomCode: '',
      formulaCode: '',
      formulaList: [],
      bomMaterials: []
    }
  },
  methods: {
    handleFormulaChange (row) {
      this.formulaCode = row.formula_code
    },
    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },
    // 操作配方表
    viewFormula (formula) {
      getFormulaForm(formula, 'view').then(form => this.$showForm(form).$on('submit', (_, close) => close()))
    },
    addFormula () {
      getFormulaForm({ bom_code: this.bomCode }).then(form => this.$showForm(form).$on('submit', (formula, close) => {
        formula.create_date = new Date()
        apis.addFormula(formula).then(formula => {
          this.formulaList.push(formula)
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
        .then(_ => this.formulaDetailList.length ? Promise.reject(new Error('请先删除配方明细')) : apis.deleteFormula(formula))
        .then(_ => {
          const index = this.formulaList.findIndex(f => f.ID === formula.ID)
          ~index && this.formulaList.splice(index, 1)
          this._claerFormula()
          this.$message.success('删除成功!')
        })
        .catch(err => {
          this.$message.info(err.message || '已取消删除')
        })
    },

    getFormula (bom) {
      if (this.bomCode === bom.bom_code) {
        return
      }
      this._claerFormula()
      this.bomCode = bom.bom_code
      apis.fetchFormulaByBom(bom).then(data => {
        this.formulaList = data
      })
      apis.fetchBomMaterialOptions(this.bomCode).then(options => {
        this.bomMaterials = options
      })
    },

    getBom ([typeCode, productCode]) {
      if (!productCode) {
        return
      }
      this._claerBom()
      apis.fetchBomListByProduct({ product_code: productCode }).then(data => {
        this.bomList = data
      })
    },

    _claerBom () {
      this.bomCode = ''
      this.formulaList = []
      this._claerFormula()
    },

    _claerFormula () {
      this.formulaCode = ''
      this.formulaDetailList = []
    }
  },
  mounted () {
    apis.fetchProductCascaderOptions().then(options => {
      this.products = options
    })
  }
}
</script>

<style scoped>
</style>
