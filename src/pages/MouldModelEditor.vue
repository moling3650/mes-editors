<template>
  <div id="MouldModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="10">
        <el-cascader :options="kinds" placeholder="请选择类型" @change="handleKindChange"  class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="10">
        <MouldModelCard :kindId="id" :kindOptions="kindOptions" @change="handleMouldModelChange" />
      </el-col>

      <el-col :span="7">
        <MouldCard :modelCode="modelCode" @change="handleMouldChange" />
      </el-col>

      <el-col :span="7">
        <ExPropsCard model="Mould" :code="mouldCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import MouldModelCard from '@/components/Cards/MouldModelCard'
import MouldCard from '@/components/Cards/MouldCard'

export default {
  name: 'MouldModelEditor',
  components: {
    MouldModelCard,
    MouldCard
  },
  data () {
    return {
      kinds: [],
      id: '',
      modelCode: '',
      mouldCode: ''
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
      this.mouldCode = ''
    },

    handleMouldModelChange (mouldModel) {
      this.mouldCode = ''
      this.modelCode = mouldModel.model_code || ''
    },

    handleMouldChange (mould) {
      this.mouldCode = mould.mould_code || ''
    }

  },
  mounted () {
    apis.fetchMouldTypeKindOptions().then(options => {
      this.kinds = options
    })
  }
}
</script>

<style scoped>
#MouldModelEditor {
  margin: 5px;
}
</style>
