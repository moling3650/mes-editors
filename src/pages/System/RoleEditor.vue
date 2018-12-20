<template>
  <div id="RoleEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">角色管理</span>
          </div>
          <ExTable :model="roles"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import roles from '@/models/System/Roles'

export default {
  name: 'RoleEditor',
  data () {
    return {
      roles: roles
    }
  }
}
</script>

<style scoped>
#RoleEditor {
  margin: 5px;
}
</style>
