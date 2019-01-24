<template>
  <div id="ProcessFlow">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="工艺步骤管理" name="ProcessFlowDetail">
        <ProcessFlowDetail @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :pid="tab.pid"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProcessFlowDetail from '@/pages/Process/ProcessFlowDetailEditor'
import ProcessStepSkip from '@/pages/Process/ProcessStepSkipEditor'
import ProcessControlItemDetailSkip from '@/pages/Process/ProcessControlItemDetailSkipEditor'

export default {
  name: 'ProcessFlow',
  components: {
    ProcessFlowDetail,
    ProcessStepSkip,
    ProcessControlItemDetailSkip
  },
  data () {
    return {
      activeTab: 'ProcessFlowDetail',
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
      this.activeTab = 'ProcessFlowDetail'
    }
  }
}
</script>

<style scoped>
#ProcessFlow {
  margin-top: 15px;
}
</style>
