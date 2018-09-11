<template>
  <div id="MachineTypeEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MachineTypeButtonGroup :typeId.sync="typeId" @change="handleMachineTypeChange"></MachineTypeButtonGroup>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MachineKindCard :typeId="typeId" @change="handleMachineKindChange"></MachineKindCard>
      </el-col>

      <el-col :span="16">
        <MachinePropertyCard :kindId="kindId"></MachinePropertyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MachineTypeButtonGroup from '@/components/ButtonGroup/MachineTypeButtonGroup'
import MachineKindCard from '@/components/Cards/MachineKindCard'
import MachinePropertyCard from '@/components/Cards/MachinePropertyCard'

export default {
  name: 'MachineTypeEditor',
  components: {
    MachineTypeButtonGroup,
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
