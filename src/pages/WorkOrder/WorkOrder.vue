<template>
  <div id="WorkOrder">
    <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" class="tabPanel">
      <el-tab-pane label="工单管理" name="MainOrderEditor">
        <MainOrderEditor :formatterMap="formatterMap" @addTab="addTab"/>
      </el-tab-pane>
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" :closable="true">
        <component :is="tab.name" :formatterMap="formatterMap" :mainOrder="tab.mainOrder"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import toMap from '@/utils/toMap'
import MainOrderEditor from '@/pages/WorkOrder/MainOrderEditor'
import OrderDetail from '@/pages/WorkOrder/OrderDetailEditor'
const state = ['停用', '初始', '在制', '结案']

export default {
  name: 'WorkOrder',
  components: {
    MainOrderEditor,
    OrderDetail
  },
  data () {
    return {
      activeTab: 'MainOrderEditor',
      tabs: [],
      formatterMap: {},
      stateOptions: state.map((label, index) => ({value: index - 1, label}))
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
  },

  created () {
    Api.get(`Products`).then(data => {
      this.formatterMap.productCode = toMap(data, 'productCode', 'productName')
    })
    Api.get(`ProcessFlows`).then(data => {
      this.formatterMap.flowCode = toMap(data, 'flowCode', 'flowName')
    })
    Api.get(`Formulas`).then(data => {
      this.formatterMap.formulaCode = toMap(data, 'formulaCode', 'formulaName')
    })
    Api.get(`WorkShops`).then(data => {
      this.formatterMap.wsCode = toMap(data, 'wsCode', 'wsName')
    })
    Api.get(`Employees`).then(data => {
      this.formatterMap.empCode = toMap(data, 'empCode', 'empName')
    })
    this.formatterMap.state = toMap(this.stateOptions, 'value', 'label')
  }
}
</script>

<style scoped>
  .tabPanel {
    height: 600px
  }
</style>
