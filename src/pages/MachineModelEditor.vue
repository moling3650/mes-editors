<template>
  <div id="MachineModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader :options="kinds" placeholder="请选择类型" @change="handleKindChange"  class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MachineModelCard :kindId="id" :kindOptions="kindOptions" @change="handleMachineModelChange" />
      </el-col>

      <el-col :span="8">
        <MachineCard :modelCode="modelCode" @change="handleMachineChange" :DepartmentOptions="departments" :WSCodeOptions="wscodes" />
      </el-col>

      <el-col :span="8">
        <ExPropsCard model="Machine" :code="machineCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import MachineModelCard from '@/components/Cards/MachineModelCard'
import MachineCard from '@/components/Cards/MachineCard'
import MachinePropertyDetailCard from '@/components/Cards/MachinePropertyDetailCard'

export default {
  name: 'MachineModelEditor',
  components: {
    MachineModelCard,
    MachineCard,
    MachinePropertyDetailCard
  },
  data () {
    return {
      kinds: [],
      id: '',
      modelCode: '',
      machineCode: '',
      departments: [],
      wscodes: []
    }
  },
  computed: {
    kindOptions () {
      const options = []
      this.kinds.forEach(item => options.push(...item.children))
      return options
    }
  },
  methods: {
    handleKindChange ([typeId, kindId]) {
      this.id = kindId
      this.modelCode = ''
      this.machineCode = ''
    },

    handleMachineModelChange (machineModel) {
      this.machineCode = ''
      this.modelCode = machineModel.model_code
    },

    handleMachineChange (machine) {
      this.machineCode = machine.machine_code
    }

  },
  mounted () {
    apis.fetchMachineTypeKindOptions().then(options => {
      this.kinds = options
    })

    apis.fetchDepartmentOptions().then(options => {
      this.departments = options
    })

    apis.fetchWSCodeOptions().then(options => {
      this.wscodes = options
    })
  }
}
</script>

<style scoped>
#MachineModelEditor {
  margin: 5px;
}
</style>
