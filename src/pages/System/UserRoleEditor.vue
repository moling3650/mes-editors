<template>
  <div id="UserRole">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="角色分配管理" name="UserRoleDetail">
        <UserRoleDetail/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserRoleDetail from '@/pages/System/UserRoleDetailEditor'

export default {
  name: 'UserRole',
  components: {
    UserRoleDetail
  },
  data () {
    return {
      activeName: 'UserRoleDetail'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#UserRole {
  margin-top: 15px;
}
</style>
