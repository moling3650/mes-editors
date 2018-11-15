<template>
  <div id="Bom">

    <el-row :gutter="10" class="row">
      <el-col :span="8">
        <el-cascader :options="products" placeholder="请选择产品" filterable @change="handleProductChange" class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="8">
        <BomCard :productCode="productCode" :productOptions="productOptions" @change="handleBomChange" @skip="handleSkip"/>
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
import Api from '@/utils/Api'
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
      this.bomCode = bom.bomCode
      this.versionCode = bom.versionCode
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
  mounted () {
    Api.get('Products/CascaderOptions').then(options => {
      this.products = options
    })
  }
}
</script>

<style scoped>
</style>
