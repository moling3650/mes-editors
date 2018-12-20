<template>
  <div id="ProductModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">成品型号管理</span>
          </div>
          <ExTable :model="productModels"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import productModels from '@/models/System/ProductModels'

export default {
  name: 'ProductModelEditor',
  data () {
    return {
      productModels: productModels
    }
  }
}
</script>

<style scoped>
#ProductModelEditor {
  margin: 5px;
}
</style>
