<template>
  <div id="ProcessStationEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="18">
        <ProcessStationCard :processCode="processCode" @change="handleStationChange"/>
      </el-col>

      <el-col :span="6">
        <StationMachineBindCard :stationCode="stationCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessStationCard from '@/components/Cards/process/ProcessStationCard'
import StationMachineBindCard from '@/components/Cards/process/StationMachineBindCard'

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
      stationCode: ''
    }
  },

  methods: {
    handleStationChange (processStation) {
      this.stationCode = processStation.stationCode
    }
  }
}
</script>

<style scoped>
#ProcessStationEditor {
  margin: 5px;
}
</style>
