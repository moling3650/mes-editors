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

      <el-col :span="10">
        <BomDetailTreeCard :bomCode="bomCode" :version="versionCode" :bomDetail.sync="bomDetail"/>
      </el-col>

      <el-col :span="6">
        <BomDetailCard :bomDetail="bomDetail"/>
        <SubstituteCard :bomDetail="bomDetail"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import request from '@/utils/request'
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
      bomDetail: {}
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
      this.bomDetail = {}
    },

    handleBomChange (bom) {
      this.bomCode = bom.bom_code
      this.versionCode = bom.version_code
      this.bomDetail = {}
    }

  },
  mounted () {
    request({
      method: 'get',
      url: 'Products/CascaderOptions'
    }).then(options => {
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
