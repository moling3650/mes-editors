<template>
  <div id="MachineAnalogPointEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="22">
        <MachineAnalogPointCard :machineCode="machineCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MachineAnalogPointCard from '@/components/Cards/MachineAnalogPointCard'

export default {
  name: 'MachineAnalogPointEditor',
  components: {
    MachineAnalogPointCard
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
#MachineAnalogPointEditor {
  margin: 5px;
}
</style>
