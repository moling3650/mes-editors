<template>
  <div id="ProcessTypeEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">工序类型管理</span>
          </div>
          <ExTable :model="processTypes"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import processTypes from '@/models/System/ProcessTypes'

export default {
  name: 'ProcessTypeEditor',
  data () {
    return {
      processTypes: processTypes
    }
  }
}
</script>

<style scoped>
#ProcessTypeEditor {
  margin: 5px;
}
</style>
