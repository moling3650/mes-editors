<template>
  <div id="ProductEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <ProductTypeTreeCard @change="handleDriveTypeChange"/>
      </el-col>

      <el-col :span="18">
        <ExTable :model="products" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProductTypeTreeCard from '@/components/Cards/ProductTypeTreeCard'
import products from '@/models/Product/Products'

export default {
  name: 'ProductEditor',
  components: {
    ProductTypeTreeCard
  },
  data () {
    return {
      defaultForm: {},
      products: products
    }
  },
  computed: {
  },
  methods: {
    handleDriveTypeChange (data) {
      this.defaultForm.typeCode = data.typeCode
      this.$refs.table.search({ productType: data.typeCode })
    }
  }
}
</script>

<style scoped>
#ProductEditor {
  margin: 5px;
}
</style>
