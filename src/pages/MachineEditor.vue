<template>
  <div id="MachineEditor">

    <el-row class="row" :gutter="20">
      <el-col :span="8">
        <MachineTypeCard @change="handleMachineTypeChange"></MachineTypeCard>
      </el-col>
      <el-col :span="8">
        <MachineKindCard :typeId="typeId" @change="handleMachineKindChange"></MachineKindCard>
      </el-col>
      <el-col :span="8">
        <MachinePropertyCard :kindId="kindId"></MachinePropertyCard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MachineTypeCard from '@/components/Cards/MachineTypeCard'
import MachineKindCard from '@/components/Cards/MachineKindCard'
import MachinePropertyCard from '@/components/Cards/MachinePropertyCard'

export default {
  name: 'MachineEditor',
  components: {
    MachineTypeCard,
    MachineKindCard,
    MachinePropertyCard
  },
  data () {
    return {
      typeId: '',
      kindId: ''
    }
  },
  methods: {
    handleMachineTypeChange (machineType) {
      this.typeId = machineType.type_id
    },

    handleMachineKindChange (machineKind) {
      this.kindId = machineKind.kind_id
    }
  }
}
</script>

<style lang="css" scoped>
</style>
