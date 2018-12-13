<template>
  <div id="ProductEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <ProductTypeTreeCard @change="handleDriveTypeChange"/>
      </el-col>

      <el-col :span="18">
        <ProductDetailCard :pedigree="pedigree"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProductTypeTreeCard from '@/components/Cards/ProductTypeTreeCard'
import ProductDetailCard from '@/components/Cards/ProductDetailCard'

export default {
  name: 'ProductEditor',
  components: {
    ProductTypeTreeCard,
    ProductDetailCard
  },
  data () {
    return {
      pedigree: {}
    }
  },
  computed: {
  },
  methods: {
    handleDriveTypeChange (data) {
      this.pedigree = data
    }
  }
}
</script>

<style scoped>
#ProductEditor {
  margin: 5px;
}
</style>
