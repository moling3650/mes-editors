<template>
  <div id="ProcessStepSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ExTable :model="processSteps" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import processSteps from '@/models/Process/ProcessSteps'

export default {
  name: 'ProcessStepSkipEditor',
  components: {
  },
  props: {
    pid: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      defaultForm: {},
      processSteps: processSteps
    }
  },
  watch: {
    pid: {
      handler (value, oldValue) {
        this.defaultForm.pid = value
        this.$refs.table.search({ pid: value })
      }
    }
  },
  mounted () {
    this.defaultForm.pid = this.pid
    this.$refs.table.search({ pid: this.pid })
  }
}
</script>

<style scoped>
#ProcessStepSkipEditor {
  margin-top: 15px;
}

.col {
  height: 500px;
  overflow-y: auto;
}

.stationMachine {
  margin-top: 40px;
}
</style>
