<template>
  <div id="RolePower">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="角色权限管理" name="RolePowerDetail">
        <RolePowerDetail/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RolePowerDetail from '@/pages/System/RolePowerDetailEditor'

export default {
  name: 'RolePower',
  components: {
    RolePowerDetail
  },
  data () {
    return {
      activeName: 'RolePowerDetail'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#RolePower {
  margin-top: 15px;
}
</style>
