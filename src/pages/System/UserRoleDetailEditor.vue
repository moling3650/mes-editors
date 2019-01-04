<template>
  <div id="UserRoleDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-menu background-color="darkcyan" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item v-for="item in RoleList" @click="handleRoleChange(item)" :key="item.roleId" :index="item.roleName">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.roleName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="18">
        <el-transfer
          filterable
          filter-placeholder="请输入员工姓名"
          v-model="alreadyUser"
          :titles="titles"
          :data="allUser"
          :props="props"
          @change="empRoleChange">
        </el-transfer>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
export default {
  name: 'UserRoleDetailEditor',
  components: {
  },
  data () {
    return {
      titles: ['可分配员工', '已分配员工'],
      RoleList: [],
      roleId: 0,
      waitData: [],
      allUser: [],
      alreadyUser: [],
      props: {
        key: 'empCode',
        label: 'empName'
      }
    }
  },
  computed: {
  },
  methods: {
    handleRoleChange (data) {
      this.roleId = data.roleId
      Api.get('Employees', {roleId: this.roleId}).then(alreadyData => {
        this.allUser = this.waitData
        this.alreadyUser = alreadyData.map(d => d.empCode)
      })
    },

    empRoleChange (rightData, direction, roleList) {
      const empInRole = roleList.map(empCode => ({empCode, roleId: this.roleId}))
      if (direction === 'right') {
        Api.post('EmpInRoles', empInRole)
      } else if (direction === 'left') {
        Api.delete('EmpInRoles', empInRole)
      }
    }
  },
  created () {
    Api.get(`Roles`).then(data => {
      this.RoleList = data
    })
    Api.get('Employees').then(allData => {
      this.waitData = allData
    })
  }
}
</script>

<style scoped>
#ProcessDetailEditor {
  margin: 5px;
}
</style>
