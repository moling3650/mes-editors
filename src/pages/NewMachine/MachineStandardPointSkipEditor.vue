<template>
  <div id="MachineStandardPointSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ExTable :model="machineStandardPoints" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import machineStandardPoints from '@/models/Machine/MachineStandardPoints'

export default {
  name: 'MachineStandardPointSkipEditor',
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
      machineStandardPoints: machineStandardPoints
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
#MachineStandardPointSkipEditor {
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
