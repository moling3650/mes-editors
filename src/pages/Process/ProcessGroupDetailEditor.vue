<template>
  <div id="ProcessGroupDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessGroupDetailCard :flowCode="flowCode" @skip="handleSkip"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessGroupDetailCard from '@/components/Cards/process/ProcessGroupDetailCard'

export default {
  name: 'ProcessGroupDetailEditor',
  components: {
    ProcessGroupDetailCard
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
        GroupClass: '班次'
      }
      const tab = {
        name,
        label: labels[name],
        pId: item.pId,
        GroupClass: item.processFrom
      }
      this.$emit('addTab', tab)
    }
  }
}
</script>

<style scoped>
#ProcessGroupDetailEditor {
  margin: 5px;
}
</style>
