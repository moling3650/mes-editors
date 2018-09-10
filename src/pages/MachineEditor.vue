<template>
  <div id="MachineEditor">

    <el-row class="row" :gutter="20">
      <el-col :span="8">
        <MachineTypeCard @change="handleMachineTypeChange"></MachineTypeCard>
      </el-col>
      <el-col :span="8">
        <MachineKindCard :typeId="typeId"></MachineKindCard>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

  </div>
</template>

<script>
import MachineTypeCard from '@/components/Cards/MachineTypeCard'
import MachineKindCard from '@/components/Cards/MachineKindCard'

export default {
  name: 'MachineEditor',
  components: {
    MachineTypeCard,
    MachineKindCard
  },
  data () {
    return {
      typeId: ''
    }
  },
  methods: {
    handleMachineTypeChange (machineType) {
      this.typeId = machineType.type_id
    }
  }
}
</script>

<style lang="css" scoped>
</style>
