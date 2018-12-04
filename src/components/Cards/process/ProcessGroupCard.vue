<template>
  <el-card>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item v-for="item in ProcessGroupList" click="selectGroup(item)" :key="item.id" :index="item.groupCode">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ item.groupName }}</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
export default {
  name: 'ProcessGroupCard',
  props: {
  },
  computed: {
  },
  data () {
    return {
      ProcessGroupList: []
    }
  },
  methods: {
    selectGroup (item) {
      console.log(item)
    }
  },
  created () {
    Api.get(`WorkGroups`).then(data => {
      this.ProcessGroupList = data
    })
  }
}
</script>

<style scoped>
</style>
