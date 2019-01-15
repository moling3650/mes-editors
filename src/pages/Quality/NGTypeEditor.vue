<template>
  <div id="NGTypeEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">不良类型管理</span>
          </div>
          <ExTable :model="ngType"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ngType from '@/models/Quality/NGTypes'

export default {
  name: 'NGTypeEditor',
  data () {
    return {
      ngType: ngType
    }
  }
}
</script>

<style scoped>
#NGTypeEditor {
  margin: 5px;
}
</style>
