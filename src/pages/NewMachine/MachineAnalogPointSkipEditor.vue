<template>
  <div id="MachineAnalogPointSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ExTable :model="machineAnalogPoints" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import machineAnalogPoints from '@/models/Machine/MachineAnalogPoints'

export default {
  name: 'MachineAnalogPointSkipEditor',
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
      machineAnalogPoints: machineAnalogPoints
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
#MachineAnalogPointSkipEditor {
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
