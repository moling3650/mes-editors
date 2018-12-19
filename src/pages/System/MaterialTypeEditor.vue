<template>
  <div id="MaterialTypeEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">物料类型管理</span>
          </div>
          <ExTable :model="materialTypes"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import materialTypes from '@/models/System/MaterialTypes'

export default {
  name: 'MaterialTypeEditor',
  data () {
    return {
      materialTypes: materialTypes
    }
  }
}
</script>

<style scoped>
#MaterialTypeEditor {
  margin: 5px;
}
</style>
