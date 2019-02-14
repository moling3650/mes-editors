<template>
  <div id="MachineAnalogPoint">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <MachineAnalogPointCard :machineCode="machineCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MachineAnalogPointCard from '@/components/Cards/MachineAnalogPointCard'

export default {
  name: 'MachineAnalogPoint',
  components: {
    MachineAnalogPointCard
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
#MachineAnalogPoint {
  margin: 5px;
}
</style>
