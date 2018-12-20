<template>
  <div id="RoleEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">车间管理</span>
          </div>
          <ExTable :model="workshops"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import workshops from '@/models/System/Workshops'

export default {
  name: 'RoleEditor',
  data () {
    return {
      workshops: workshops
    }
  }
}
</script>

<style scoped>
#RoleEditor {
  margin: 5px;
}
</style>
