<template>
  <div id="ModuleEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">模块管理</span>
          </div>
          <ExTable :model="modules"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import modules from '@/models/System/Modules'

export default {
  name: 'ModuleEditor',
  data () {
    return {
      modules: modules
    }
  }
}
</script>

<style scoped>
#ModuleEditor {
  margin: 5px;
}
</style>
