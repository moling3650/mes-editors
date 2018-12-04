<template>
  <div id="ProcessGroupDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessGroupDetailCard @skip="handleSkip"/>
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
  methods: {
    handleSkip (name, item) {
      const labels = {
        ProcessGroupClass: '班次'
      }
      const tab = {
        name,
        label: labels[name],
        groupCode: item.groupCode
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
