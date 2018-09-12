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
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import MachineModelCard from '@/components/Cards/MachineModelCard'

export default {
  name: 'MachineModelEditor',
  components: {
    MachineModelCard
  },
  data () {
    return {
      kinds: [],
      id: ''
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

    handleMachineModelChange () {

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
