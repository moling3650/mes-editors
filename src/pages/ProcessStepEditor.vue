<template>
  <div id="ProcessStepEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <ProcessStepCard :pId="pId" :processFrom="processFrom" :flowCode="flowCode"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessStepCard from '@/components/Cards/product/ProcessStepCard'

export default {
  name: 'ProcessStepEditor',
  components: {
    ProcessStepCard
  },
  data () {
    return {
      pId: 0,
      processFrom: '',
      flowCode: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    this.processFrom = this.$route.query.processFrom
    this.pId = parseInt(this.$route.query.pId)
    this.flowCode = this.$route.query.flowCode
  }
}
</script>

<style scoped>
#ProcessStepEditor {
  margin: 5px;
}
</style>
