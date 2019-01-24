<template>
  <div id="ProcessFlowDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="7">
        <ProcessFlowCard height="500" @change="handleProcessFlowChange"/>
      </el-col>

      <el-col :span="17">
        <ExTable :model="ProcessFlowDetails" :immediate="false" needDefault :defaultForm="flowCode" ref="wgc">
          <template slot-scope="{ rowData }">
            <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('ProcessStepSkip', rowData)" :disabled="!rowData">后工序步骤管理</el-button>
            <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('ProcessControlItemDetailSkip', rowData)" :disabled="!rowData">管控细则</el-button>
          </template>
        </ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessFlowCard from '@/components/Cards/product/ProcessFlowCard'
import ProcessFlowDetails from '@/models/Process/ProcessFlowDetails'

export default {
  name: 'ProcessFlowDetailEditor',
  components: {
    ProcessFlowCard
  },
  data () {
    return {
      flowCode: null,
      ProcessFlowDetails
    }
  },
  computed: {
  },
  methods: {
    handleProcessFlowChange (data) {
      this.flowCode = { flowCode: data.flowCode }
      this.$refs.wgc.search(this.flowCode)
    },
    handleSkip (name, item) {
      const labels = {
        ProcessStepSkip: '后工序步骤',
        ProcessControlItemDetailSkip: '管控细则'
      }
      const tab = {
        name,
        label: labels[name],
        pid: item.pid
      }
      this.$emit('addTab', tab)
    }
  }
}
</script>

<style scoped>
#ProcessFlowDetailEditor {
  margin: 5px;
}
</style>
