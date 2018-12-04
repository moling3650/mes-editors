<template>
  <div id="ProcessGroupClassEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessGroupClassCard :groupCode="groupCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessGroupClassCard from '@/components/Cards/process/ProcessGroupClassCard'

export default {
  name: 'ProcessGroupClassEditor',
  components: {
    ProcessGroupClassCard
  },
  props: {
    groupCode: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#ProcessGroupClassEditor {
  margin: 5px;
}
</style>
