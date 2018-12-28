<template>
  <div id="Process">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="工序管理" name="ProcessDetail">
        <ProcessDetail @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :processCode="tab.processCode"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProcessDetail from '@/pages/Process/ProcessDetailEditor'
import ProcessStation from '@/pages/Process/ProcessStationEditor'
import ProcessControlItem from '@/pages/Process/ProcessControlItemEditor'

export default {
  name: 'Process',
  components: {
    ProcessDetail,
    ProcessStation,
    ProcessControlItem
  },
  data () {
    return {
      activeTab: 'ProcessDetail',
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
      this.activeTab = 'ProcessDetail'
    }
  }
}
</script>

<style scoped>
#Process {
  margin-top: 15px;
}
</style>
