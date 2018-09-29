<template>
  <div id="WorkToolModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-cascader :options="kinds" placeholder="请选择类型" @change="handleKindChange"  class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <WorkToolModelCard :kindId="id" :kindOptions="kindOptions" @change="handleWorkToolModelChange" />
      </el-col>

      <el-col :span="10">
        <WorkToolCard :modelCode="modelCode" @change="handleWorkToolChange" />
      </el-col>

      <el-col :span="8">
        <WorkToolPropertyDetailCard :workToolCode="workToolCode" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import WorkToolModelCard from '@/components/Cards/WorkToolModelCard'
import WorkToolCard from '@/components/Cards/WorkToolCard'
import WorkToolPropertyDetailCard from '@/components/Cards/WorkToolPropertyDetailCard'

export default {
  name: 'WorkToolModelEditor',
  components: {
    WorkToolModelCard,
    WorkToolCard,
    WorkToolPropertyDetailCard
  },
  data () {
    return {
      kinds: [],
      id: '',
      modelCode: '',
      workToolCode: ''
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
      this.workToolCode = ''
    },

    handleWorkToolModelChange (workToolModel) {
      this.workToolCode = ''
      this.modelCode = workToolModel.model_code
    },

    handleWorkToolChange (workTool) {
      this.workToolCode = workTool.workTool_code
    }

  },
  mounted () {
    apis.fetchWorkToolTypeKindOptions().then(options => {
      this.kinds = options
    })
  }
}
</script>

<style scoped>
#WorkToolModelEditor {
  margin: 5px;
}
</style>
