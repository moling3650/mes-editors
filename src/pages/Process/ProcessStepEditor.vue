<template>
  <div id="ProcessStepEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessStepCard :pId="pId" :processFrom="processFrom" :flowCode="flowCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessStepCard from '@/components/Cards/product/ProcessStepCard'

export default {
  name: 'ProcessStepEditor',
  components: {
    ProcessStepCard
  },
  props: {
    pId: {
      type: Number,
      required: true
    },
    processFrom: {
      type: String,
      required: true
    },
    flowCode: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#ProcessStepEditor {
  margin: 5px;
}
</style>
