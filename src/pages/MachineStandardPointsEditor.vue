<template>
  <div id="MachineStandardPointsEditor">

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
  name: 'MachineStandardPointsEditor',
  components: {
    MachineStandardPointsCard
  },
  data () {
    return {
      machineCode: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    this.machineCode = this.$route.query.machineCode
  }
}
</script>

<style scoped>
#MachineStandardPointsEditor {
  margin: 5px;
}
</style>
