<template>
  <div id="RolePowerDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5" class="col">
        <el-menu background-color="#ffffff" text-color="black" active-text-color="#015ea2">
          <el-menu-item v-for="item in RoleList" @click="handleRoleChange(item)" :key="item.roleId" :index="item.roleName">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.roleName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="18">
        <powerTreeCard :roleId ="roleId"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import powerTreeCard from '@/components/Cards/PowerTreeCard'

export default {
  name: 'RolePowerDetailEditor',
  components: {
    powerTreeCard
  },
  data () {
    return {
      RoleList: [],
      roleId: ''
    }
  },
  computed: {
  },
  methods: {
    handleRoleChange (data) {
      this.roleId = data.roleId
    }
  },
  created () {
    Api.get(`Roles`).then(data => {
      this.RoleList = data
    })
  }
}
</script>

<style scoped>
#ProcessDetailEditor {
  margin: 5px;
}

.col {
  height: 500px;
  overflow-y: auto;
}
</style>
