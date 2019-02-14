<template>
  <div id="MachineDataPoint">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <MachineDataPointCard :machineCode="machineCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MachineDataPointCard from '@/components/Cards/MachineDataPointCard'

export default {
  name: 'MachineDataPoint',
  components: {
    MachineDataPointCard
  },
  props: {
    machineCode: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
#MachineDataPoint {
  margin: 5px;
}
</style>
