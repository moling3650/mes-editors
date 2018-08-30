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
          <el-table :data="formulaList" stripe size="mini" header-cell-class-name="thcell" class="w100p" highlight-current-row @row-click="getFormulaDetail">
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
        <el-card class="h600 ova">
          <div slot="header" class="clearfix">
            <span class="card-header">{{ formulaCode ? `配方(${formulaCode})的明细` : '请先选择配方' }}</span>
            <el-button :disabled="!formulaCode" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormulaDetail">添加配方项</el-button>
          </div>
          <el-table :data="formulaDetailList" stripe size="mini" header-cell-class-name="thcell" class="w100p">
            <el-table-column prop="formula_item" label="配方项"/>
            <el-table-column prop="material_code" label="物料"/>
            <el-table-column prop="feed_idx" label="加料顺序"/>
            <el-table-column prop="feed_qty" label="加料数量"/>
            <el-table-column fixed="right" label="操作" width="84" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button @click.stop="editFormulaDetail(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                  <el-button @click.stop="deleteFormulaDetail(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import apis from '@/apis'
import getFormulaForm from '@/form/formula'
import getFormulaDetailForm from '@/form/formulaDetail'

export default {
  name: 'FormulaEditor',
  data () {
    return {
      products: [],
      product: [],
      bomList: [],
      bomCode: '',
      formulaCode: '',
      formulaList: [],
      formulaDetailList: [],
      bomMaterials: []
    }
  },
  methods: {
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
    // 操作配方明细表
    addFormulaDetail () {
      getFormulaDetailForm({formula_code: this.formulaCode}, 'add', this.bomMaterials)
        .then(form => this.$showForm(form).$on('submit', (formulaDetail, close) => {
          formulaDetail.create_date = new Date()
          apis.addFormulaDetail(formulaDetail).then(formulaDetail => {
            this.formulaDetailList.push(formulaDetail)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },
    editFormulaDetail (formulaDetail) {
      getFormulaDetailForm(formulaDetail, 'edit', this.bomMaterials)
        .then(form => this.$showForm(form).$on('submit', (formulaDetail, close) => {
          apis.updateFormulaDetail(formulaDetail).then(formulaDetail => {
            const index = this.formulaDetailList.findIndex(f => f.ID === formulaDetail.ID)
            ~index && this.formulaDetailList.splice(index, 1, formulaDetail)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },
    deleteFormulaDetail (formulaDetail) {
      this.$confirm('此操作将永久删除该配方明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => apis.deleteFormulaDetail(formulaDetail))
        .then(_ => {
          const index = this.formulaDetailList.findIndex(f => f.ID === formulaDetail.ID)
          ~index && this.formulaDetailList.splice(index, 1)
          this.$message.success('删除成功!')
        })
        .catch(_ => {
          this.$message.info('已取消删除')
        })
    },

    getFormulaDetail (formula) {
      if (this.formulaCode === formula.formula_code) {
        return
      }
      this.formulaCode = formula.formula_code
      apis.fetchDetailByFormula(formula).then(data => {
        this.formulaDetailList = data
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
      apis.fetchBom(productCode).then(data => {
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
