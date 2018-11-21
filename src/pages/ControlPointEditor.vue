<template>
  <div id="ControlPointEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <ex-select :options="flowOptions" v-model="flowCode" placeholder="请选择工艺" @change="handleFlowChange"></ex-select>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <ProcessFlowCard :flowCode="flowCode" :processCode.sync="processCode"></ProcessFlowCard>
      </el-col>
      <el-col :span="10">
        <ControlPointCard :processCode="processCode"></ControlPointCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import ProcessFlowCard from '@/components/Cards/ProcessFlowCard'
import ControlPointCard from '@/components/Cards/ControlPointCard'

export default {
  name: 'ControlPointEditor',
  components: {
    ProcessFlowCard,
    ControlPointCard
  },
  data () {
    return {
      flows: [],
      flowCode: '',
      processCode: ''
    }
  },
  computed: {
    flowOptions () {
      return this.flows.map(f => {
        return {
          value: f.flowCode,
          label: `${f.flowName} (${f.versionCode})`
        }
      })
    }
  },
  methods: {
    handleFlowChange (flowCode) {
      this.processCode = ''
    }
  },
  mounted () {
    Api.get('ProcessFlows').then(data => {
      this.flows = data
    })
  }
}
</script>

<style scoped>
#ControlPointEditor {
  margin: 5px;
}
</style>
