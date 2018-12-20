<template>
  <div id="ProcessFlowEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">工艺流程管理</span>
          </div>
          <ExTable :model="processFlows"></ExTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import processFlows from '@/models/ProcessFlow/ProcessFlows'

export default {
  name: 'ProcessFlowEditor',
  data () {
    return {
      processFlows: processFlows
    }
  }
}
</script>

<style scoped>
#ProcessFlowEditor {
  margin: 5px;
}
</style>
