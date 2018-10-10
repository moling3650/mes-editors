<template>
  <div id="MachineTypeEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <ExSelectButtonGroup model="MachineType" name="设备类型" value="type_id" label="type_name" @change="handleMachineTypeChange"/>
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
import MachineKindCard from '@/components/Cards/MachineKindCard'
import MachinePropertyCard from '@/components/Cards/MachinePropertyCard'

export default {
  name: 'MachineTypeEditor',
  components: {
    MachineKindCard,
    MachinePropertyCard
  },
  data () {
    return {
      typeId: '',
      kindId: '',
      machineProperty: {}
    }
  },
  methods: {
    handleMachineTypeChange (machineType) {
      this.typeId = machineType.type_id
      this.kindId = ''
    },

    handleMachineKindChange (machineKind) {
      this.kindId = machineKind.kind_id
    }
  }
}
</script>
