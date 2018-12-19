<template>
  <div id="LineEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">线别管理</span>
          </div>
          <ExTable :model="lines"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import lines from '@/models/System/Lines'

export default {
  name: 'LineEditor',
  data () {
    return {
      lines: lines
    }
  }
}
</script>

<style scoped>
#LineEditor {
  margin: 5px;
}
</style>
