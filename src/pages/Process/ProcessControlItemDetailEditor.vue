<template>
  <div id="ProcessControlItemDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="22">
        <ProcessControlItemDetailCard :pId="pId" :processFrom="processFrom"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessControlItemDetailCard from '@/components/Cards/ProcessControlItemDetailCard'

export default {
  name: 'ProcessControlItemDetailEditor',
  components: {
    ProcessControlItemDetailCard
  },
  props: {
    pId: {
      type: Number,
      required: true
    },
    processFrom: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#ProcessControlItemDetailEditor {
  margin: 5px;
}
</style>
