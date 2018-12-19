<template>
  <div id="EmployeesEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">员工管理</span>
          </div>
          <ExTable :model="employees"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import employees from '@/models/System/Employees'

export default {
  name: 'EmployeesEditor',
  data () {
    return {
      employees: employees
    }
  }
}
</script>

<style scoped>
#EmployeesEditor {
  margin: 5px;
}
</style>
