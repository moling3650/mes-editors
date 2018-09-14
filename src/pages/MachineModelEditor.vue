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
        <MachineCard :modelCode="modelCode" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import MachineModelCard from '@/components/Cards/MachineModelCard'
import MachineCard from '@/components/Cards/MachineCard'

export default {
  name: 'MachineModelEditor',
  components: {
    MachineModelCard,
    MachineCard
  },
  data () {
    return {
      kinds: [],
      id: '',
      modelCode: ''
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
    },

    handleMachineModelChange (machineModel) {
      this.modelCode = machineModel.model_code
    },

    handleMachineChange () {

    }

  },
  mounted () {
    apis.fetchMchineTypeKindOptions().then(options => {
      this.kinds = options
    })
  }
}
</script>

<style scoped>
#MachineModelEditor {
  margin: 5px;
}
</style>
