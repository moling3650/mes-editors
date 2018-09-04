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
    </el-row>
  </div>
</template>

<script>
import apis from '@/apis'
import ProcessFlowCard from '@/components/Cards/ProcessFlowCard'

export default {
  name: 'ControlPointEditor',
  components: {
    ProcessFlowCard
  },
  data () {
    return {
      flowList: [],
      flowCode: '',
      processCode: ''
    }
  },
  computed: {
    flowOptions () {
      return this.flowList.map(f => {
        return {
          value: f.flow_code,
          label: `${f.flow_name} (${f.version_code})`
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
    apis.fetchProcessFlowList().then(data => {
      this.flowList = data
    })
  }
}
</script>

<style scoped>
#ControlPointEditor {
  margin: 5px;
}
</style>
