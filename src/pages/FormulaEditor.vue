<template>
  <div id="FormulaEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-cascader v-model="product" :options="products" filterable @change="getBom" class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-card class="h600">
          <el-table :data="bomList" stripe class="w100p" highlight-current-row @row-click="getFormula">
            <el-table-column prop="bom_code" label="BOM" width=""/>
            <el-table-column prop="version_code" label="版本" width="50"/>
            <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'FormulaEditor',
  data () {
    return {
      products: [],
      product: [],
      bomList: []
    }
  },
  methods: {
    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    getFormula (row) {
      console.log(row)
    },

    getBom ([typeCode, productCode]) {
      if (!productCode) {
        return
      }
      apis.fetchBom(productCode).then(data => {
        this.bomList = data
      })
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
