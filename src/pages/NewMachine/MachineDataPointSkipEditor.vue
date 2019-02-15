<template>
  <div id="MachineDataPointSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ExTable :model="machineDataPoints" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import machineDataPoints from '@/models/Machine/MachineDataPoints'

export default {
  name: 'MachineDataPointSkipEditor',
  components: {
  },
  props: {
    machineCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      defaultForm: {},
      machineDataPoints: machineDataPoints
    }
  },
  watch: {
    machineCode: {
      handler (value, oldValue) {
        this.defaultForm.machineCode = value
        this.$refs.table.search({ machineCode: value })
      }
    }
  },
  mounted () {
    this.defaultForm.machineCode = this.machineCode
    this.$refs.table.search({ machineCode: this.machineCode })
  }
}
</script>

<style scoped>
#MachineDataPointSkipEditor {
  margin-top: 15px;
  margin-left: 5px;
}

.col {
  height: 500px;
  overflow-y: auto;
}

.stationMachine {
  margin-top: 40px;
}
</style>
