<template>
  <div id="BomEditor">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane label="物料清单管理" name="Bom">
        <Bom @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :bomCode="tab.bomCode"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Bom from '@/pages/Bom/Bom'
import Formula from '@/pages/Bom/Formula'

export default {
  name: 'BomEditor',
  components: {
    Bom,
    Formula
  },
  data () {
    return {
      activeTab: 'Bom',
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
      this.activeTab = 'Bom'
    }
  }
}
</script>

<style scoped>
#BomEditor {
  margin-top: 15px;
  margin-left: 5px;
}
</style>
