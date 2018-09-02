<template>
  <div id="BomEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader :options="products" placeholder="请选择产品" filterable @change="handleProductChange" class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <BomCard :productCode="productCode" :productOptions="productOptions" @change="handleBomChange"/>
      </el-col>

      <el-col :span="8">
        <BomDetailTreeCard :bomCode="bomCode" :version="versionCode" :bomDetail.sync="detail"/>
      </el-col>

      <el-col :span="8">
        <BomDetailCard :detail="detail"/>
        <SubstituteCard :detail="detail"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import BomCard from '@/components/Cards/BomCard'
import BomDetailTreeCard from '@/components/Cards/BomDetailTreeCard'
import BomDetailCard from '@/components/Cards/BomDetailCard'
import SubstituteCard from '@/components/Cards/SubstituteCard'

export default {
  name: 'BomEditor',
  components: {
    BomCard,
    BomDetailTreeCard,
    BomDetailCard,
    SubstituteCard
  },
  data () {
    return {
      products: [],
      productCode: '',
      bomCode: '',
      versionCode: '',
      detail: {}
    }
  },
  computed: {
    productOptions () {
      const options = []
      this.products.forEach(item => options.push(...item.children))
      return options
    }
  },
  methods: {

    handleProductChange ([typeCode, productCode]) {
      this.productCode = productCode || ''
      this.bomCode = ''
      this.versionCode = ''
      this.detail = {}
    },

    handleBomChange (bom) {
      this.bomCode = bom.bom_code
      this.versionCode = bom.version_code
      this.detail = {}
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
#BomEditor {
  margin: 5px;
}
</style>
