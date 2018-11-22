<template>
  <div id="WorkOrder">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="工单管理" name="MainOrderManagement">
        <MainOrderManagement @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :machineCode="tab.machineCode"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MainOrderManagement from '@/pages/WorkOrder/MainOrderManagement'
import MachineAnalogPoint from '@/pages/Machine/MachineAnalogPoint'
import MachineStandardPoint from '@/pages/Machine/MachineStandardPoint'
import MachineDataPoint from '@/pages/Machine/MachineDataPoint'

export default {
  name: 'WorkOrder',
  components: {
    MainOrderManagement,
    MachineAnalogPoint,
    MachineStandardPoint,
    MachineDataPoint
  },
  data () {
    return {
      activeTab: 'MainOrderManagement',
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
      this.activeTab = 'MainOrderManagement'
    }
  }
}
</script>

<style scoped>
</style>
