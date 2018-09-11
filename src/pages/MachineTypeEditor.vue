<template>
  <div id="MachineTypeEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MachineTypeButtonGroup :typeId.sync="typeId"></MachineTypeButtonGroup>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import MachineTypeButtonGroup from '@/components/ButtonGroup/MachineTypeButtonGroup'

export default {
  name: 'MachineTypeEditor',
  components: {
    MachineTypeButtonGroup
  },
  data () {
    return {
      typeId: ''
    }
  }
}
</script>
