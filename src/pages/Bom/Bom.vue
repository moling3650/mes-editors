<template>
  <div id="Bom">

    <el-row :gutter="10" class="row">
      <el-col :span="8">
        <el-cascader :options="cascaderOptions" placeholder="请选择产品" filterable @change="handleProductChange" class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="8">
        <BomCard :productCode="productCode" :productOptions="productOptions" @change="handleBomChange" @skip="handleSkip"/>
      </el-col>

      <el-col :span="10">
        <BomDetailTreeCard :bomCode="bomCode" :products="products" :materials="materials" :bomDetail.sync="bomDetail"/>
      </el-col>

      <el-col :span="6">
        <BomDetailCard :bomDetail="bomDetail" :products="products" :materials="materials"/>
        <SubstituteCard :bomDetail="bomDetail" :products="products" :materials="materials"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'
import BomCard from '@/components/Cards/BomCard'
import BomDetailTreeCard from '@/components/Cards/BomDetailTreeCard'
import BomDetailCard from '@/components/Cards/BomDetailCard'
import SubstituteCard from '@/components/Cards/SubstituteCard'

export default {
  name: 'Bom',

  components: {
    BomCard,
    BomDetailTreeCard,
    BomDetailCard,
    SubstituteCard
  },

  data () {
    return {
      cascaderOptions: [],
      products: [],
      materials: [],
      productCode: '',
      bomCode: '',
      bomDetail: {}
    }
  },

  computed: {
    productOptions () {
      return toOptions(this.products, 'productCode', 'productName')
    }
  },

  methods: {

    handleProductChange ([typeCode, productCode]) {
      this.productCode = productCode || ''
      this.bomCode = ''
      this.bomDetail = {}
    },

    handleBomChange (bom) {
      this.bomCode = bom.bomCode
      this.bomDetail = {}
    },

    handleSkip (name, bom) {
      const tab = {
        name,
        label: '配方管理',
        bomCode: bom.bomCode
      }
      this.$emit('addTab', tab)
    }

  },
  created () {
    Api.get('Products/CascaderOptions').then(options => {
      this.cascaderOptions = options
    })
    Api.get('Products').then(products => {
      this.products = products
    })
    Api.get('Materials').then(materials => {
      this.materials = materials
    })
  }
}
</script>

<style scoped>
</style>
