<template>
  <div id="ProcessGroup">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="工序组管理" name="ProcessGroupDetail">
        <ProcessGroupDetail @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :pId="tab.pId" :processFrom="tab.processFrom"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProcessGroupDetail from '@/pages/Process/ProcessGroupDetailEditor'
// import ProcessGroupClass from '@/pages/Process/ProcessGroupClassEditor'

export default {
  name: 'ProcessGroup',
  components: {
    ProcessGroupDetail
    // ProcessGroupClass
  },
  data () {
    return {
      activeTab: 'ProcessGroupDetail',
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
      this.activeTab = 'ProcessGroupDetail'
    }
  }
}
</script>

<style scoped>
</style>
