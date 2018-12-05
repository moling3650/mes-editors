<template>
  <div id="ProcessStationEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="18">
        <ProcessStationCard :processCode="processCode" @change="handleStationChange"/>
      </el-col>

      <el-col :span="6">
        <StationMachineBindCard :machineDetail="machineDetail"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessStationCard from '@/components/Cards/process/ProcessStationCard'
import StationMachineBindCard from '@/components/Cards/process/StationMachineBindCard'
import Api from '@/utils/Api'
export default {
  name: 'ProcessStationEditor',
  components: {
    ProcessStationCard,
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
      machineDetail: {},
      stationCode: ''
    }
  },

  methods: {
    handleStationChange (processStation) {
      this.stationCode = processStation.stationCode
      Api.get(`Machines`, { stationCode: this.stationCode }).then(data => {
        this.machineDetail = data[0] || {}
      })
    }
  }
}
</script>

<style scoped>
#ProcessStationEditor {
  margin: 5px;
}
</style>
