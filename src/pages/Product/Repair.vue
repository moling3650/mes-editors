<template>
  <div id="Repair">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="维修管理" name="RepairDetail">
        <RepairDetail @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :sfc="tab.sfc" :orderNo="tab.orderNo"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RepairDetail from '@/pages/Product/RepairEditor'
import BeginRepairSkip from '@/pages/Product/BeginRepairSkipEditor'

export default {
  name: 'Repair',
  components: {
    RepairDetail,
    BeginRepairSkip
  },
  data () {
    return {
      activeTab: 'RepairDetail',
      tabs: []
    }
  },
  methods: {
    addTab (tab) {
      const index = this.tabs.findIndex(t => t.name === tab.name)
      if (~index) {
        this.tabs.splice(index, 1, tab)
      } else {
        this.tabs.push(tab)
      }
      this.activeTab = tab.name
    },

    removeTab (name) {
      const index = this.tabs.findIndex(t => t.name === name)
      if (~index) {
        this.tabs.splice(index, 1)
      }
      this.activeTab = 'RepairDetail'
    }
  }
}
</script>

<style scoped>
#Repair {
  margin-top: 15px;
  margin-left: 5px;
}
</style>
