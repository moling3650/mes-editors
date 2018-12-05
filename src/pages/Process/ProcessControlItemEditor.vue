<template>
  <div id="ProcessControlItemEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessControlItemCard :processCode="processCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessControlItemCard from '@/components/Cards/process/ProcessControlItemCard'

export default {
  name: 'ProcessControlItemEditor',
  components: {
    ProcessControlItemCard
  },
  props: {
    processCode: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#ProcessControlItemEditor {
  margin: 5px;
}
</style>
