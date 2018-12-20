<template>
  <div id="WorkGroupEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">工序组管理</span>
          </div>
          <ExTable :model="workGroups"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import workGroups from '@/models/System/WorkGroups'

export default {
  name: 'WorkGroupEditor',
  data () {
    return {
      workGroups: workGroups
    }
  }
}
</script>

<style scoped>
#WorkGroupEditor {
  margin: 5px;
}
</style>
