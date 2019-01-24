<template>
  <div id="ProcessStationSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="18">
        <ExTable :model="processStation" ref="table" @row-click="stationChange" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
      <el-col :span="6" class="stationMachine">
        <StationMachineBindCard :stationCode="stationCode"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import processStation from '@/models/Process/ProcessStations'
import StationMachineBindCard from '@/components/Cards/process/StationMachineBindCard'

export default {
  name: 'ProcessStationSkipEditor',
  components: {
    StationMachineBindCard
  },
  props: {
    processCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ProductTypeList: [],
      defaultForm: {},
      processStation: processStation,
      stationCode: ''
    }
  },
  watch: {
    processCode: {
      handler (value, oldValue) {
        this.defaultForm.processCode = value
        this.$refs.table.search({ processCode: value })
      }
    }
  },
  mounted () {
    this.defaultForm.processCode = this.processCode
    this.$refs.table.search({ processCode: this.processCode })
  },

  methods: {
    stationChange (rowData) {
      console.log(rowData)
      this.stationCode = rowData.stationCode
    }
  }
}
</script>

<style scoped>
#ProcessStationSkipEditor {
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
