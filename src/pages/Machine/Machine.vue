<template>
  <div id="Machine">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="设备管理" name="MachineManagement">
        <MachineManagement @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :machineCode="tab.machineCode"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MachineManagement from '@/pages/Machine/MachineManagement'
import MachineAnalogPoint from '@/pages/Machine/MachineAnalogPoint'
import MachineStandardPoint from '@/pages/Machine/MachineStandardPoint'

export default {
  name: 'Machine',
  components: {
    MachineManagement,
    MachineAnalogPoint,
    MachineStandardPoint
  },
  data () {
    return {
      activeTab: 'MachineManagement',
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
      this.activeTab = 'MachineManagement'
    }
  }
}
</script>

<style scoped>
</style>
