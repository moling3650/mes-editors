<template>
  <div id="MachineStandardPoint">

    <el-row :gutter="20" class="row">
      <el-col :span="22">
        <MachineStandardPointsCard :machineCode="machineCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MachineStandardPointsCard from '@/components/Cards/MachineStandardPointsCard'

export default {
  name: 'MachineStandardPoint',
  components: {
    MachineStandardPointsCard
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
#MachineStandardPoint {
  margin: 5px;
}
</style>
