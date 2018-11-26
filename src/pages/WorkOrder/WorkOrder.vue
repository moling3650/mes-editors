<template>
  <div id="WorkOrder">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" class="tabPanel">
      <el-tab-pane label="工单管理" name="MainOrderEditor">
        <MainOrderEditor @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :mainOrder="tab.mainOrder"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MainOrderEditor from '@/pages/WorkOrder/MainOrderEditor'
import OrderDetail from '@/pages/WorkOrder/OrderDetailEditor'

export default {
  name: 'WorkOrder',
  components: {
    MainOrderEditor,
    OrderDetail
  },
  data () {
    return {
      activeTab: 'MainOrderEditor',
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
      this.activeTab = 'MainOrderEditor'
    }
  }
}
</script>

<style scoped>
  .tabPanel { height: 650px; }
</style>
