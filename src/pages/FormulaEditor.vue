<template>
  <div id="FormulaEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-cascader :options="products" placeholder="请选择产品" filterable @change="handleProductChange" class="w100p"/>
      </el-col>
    </el-row>
    <!-- BOM -->
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <BomCard :productCode="productCode" :productOptions="productOptions" @change="handleBomChange"/>
      </el-col>
      <!-- Formula -->
      <el-col :span="8">
        <FormulaCard :bomCode="bomCode" @change="handleFormulaChange"></FormulaCard>
      </el-col>
      <!-- FormulaDetail -->
      <el-col :span="10">
        <FormulaDetailCard :formulaCode="formulaCode" :bomMaterials="bomMaterials"></FormulaDetailCard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import BomCard from '@/components/Cards/BomCard'
import FormulaCard from '@/components/Cards/FormulaCard'
import FormulaDetailCard from '@/components/Cards/FormulaDetailCard'

export default {
  name: 'FormulaEditor',
  components: {
    BomCard,
    FormulaCard,
    FormulaDetailCard
  },
  computed: {
    productOptions () {
      const options = []
      this.products.forEach(item => options.push(...item.children))
      return options
    }
  },
  data () {
    return {
      products: [],
      bomMaterials: [],
      productCode: '',
      bomCode: '',
      formulaCode: ''
    }
  },
  watch: {
    bomCode (value, oldValue) {
      apis.fetchBomMaterialOptions(value).then(options => {
        this.bomMaterials = options
      })
    }
  },
  methods: {

    handleProductChange ([typeCode, productCode]) {
      this.productCode = productCode || ''
      this.bomCode = ''
      this.formulaCode = ''
    },

    handleBomChange (bom) {
      this.bomCode = bom.bom_code
      this.formulaCode = ''
    },

    handleFormulaChange (formula) {
      this.formulaCode = formula.formula_code
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
#FormulaEditor {
  margin: 5px;
}
</style>
