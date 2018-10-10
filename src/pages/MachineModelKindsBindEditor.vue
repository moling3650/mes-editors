<template>
  <div id="MachineModelKindsBindEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader :options="Machinekinds" placeholder="请选择类型" @change="handleKindChange"  class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MouldKindsBindCard :MachinekindId="id" :MouldKindOptions="mouldKinds" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import MouldKindsBindCard from '@/components/Cards/MouldKindsBindCard'

export default {
  name: 'MachineModelKindsBindEditor',
  components: {
    MouldKindsBindCard
  },
  data () {
    return {
      Machinekinds: [],
      id: '',
      mouldKinds: []
    }
  },
  computed: {

  },
  methods: {
    handleKindChange ([typeId, MachinekindId]) {
      this.id = MachinekindId
      this.modelCode = ''
      this.machineCode = ''
    }

  },
  mounted () {
    apis.fetchMachineTypeKindOptions().then(options => {
      this.Machinekinds = options
    })

    apis.fetchMouldKindsOptions().then(options => {
      this.mouldKinds = options
    })
  }
}
</script>

<style scoped>
#MachineModelKindsBindEditor {
  margin: 5px;
}
</style>
