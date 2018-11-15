<template>
  <div id="ProcessFlowDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="7">
        <ProcessFlowCard height="500" @change="handleProcessFlowChange"/>
      </el-col>

      <el-col :span="17">
        <ProcessFlowDetailCard :flowCode="flowCode" @skip="handleSkip"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessFlowCard from '@/components/Cards/product/ProcessFlowCard'
import ProcessFlowDetailCard from '@/components/Cards/product/ProcessFlowDetailCard'

export default {
  name: 'ProcessFlowDetailEditor',
  components: {
    ProcessFlowCard,
    ProcessFlowDetailCard
  },
  data () {
    return {
      flowCode: ''
    }
  },
  computed: {
  },
  methods: {
    handleProcessFlowChange (data) {
      this.flowCode = data.flowCode
    },
    handleSkip (name, item) {
      const labels = {
        ProcessStep: '后工序步骤',
        ProcessControlItemDetail: '管控细则'
      }
      const tab = {
        name,
        label: labels[name],
        pId: item.pId,
        processFrom: item.processFrom,
        flowCode: item.flowCode
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
