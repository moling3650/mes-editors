<template>
  <div id="ProcessDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <ProcessGroupCard @change="handleProcessFlowChange"/>
      </el-col>

      <el-col :span="19">
        <ProcessDetailCard :groupCode="groupCode" @skip="handleSkip"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessGroupCard from '@/components/Cards/process/ProcessGroupCard'
import ProcessDetailCard from '@/components/Cards/process/ProcessDetailCard'

export default {
  name: 'ProcessDetailEditor',
  components: {
    ProcessGroupCard,
    ProcessDetailCard
  },
  data () {
    return {
      groupCode: ''
    }
  },
  computed: {
  },
  methods: {
    handleProcessFlowChange (data) {
      this.groupCode = data.groupCode
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
        groupCode: item.groupCode
      }
      this.$emit('addTab', tab)
    }
  }
}
</script>

<style scoped>
#ProcessDetailEditor {
  margin: 5px;
}
</style>
