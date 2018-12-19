<template>
  <div id="DepartmentEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">部门管理</span>
          </div>
          <ExTable :model="departments"></ExTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import departments from '@/models/System/Departments'

export default {
  name: 'DepartmentEditor',
  data () {
    return {
      departments: departments
    }
  }
}
</script>

<style scoped>
#DepartmentEditor {
  margin: 5px;
}
</style>
