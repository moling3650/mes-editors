<template>
  <div id="ProcessFlowDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="7">
        <ProcessFlowCard @change="handleProcessFlowChange"/>
      </el-col>

      <el-col :span="17">
        <ProcessFlowDetailCard :flowCode="flowCode"/>
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
      console.log(data)
      this.flowCode = data.flowCode
    }
  }
}
</script>

<style scoped>
#ProcessFlowDetailEditor {
  margin: 5px;
}
</style>
