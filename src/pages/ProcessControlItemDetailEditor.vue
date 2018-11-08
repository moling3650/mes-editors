<template>
  <div id="ProcessControlItemDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="22">
        <ProcessControlItemDetailCard :pId="pId" :processFrom="processFrom"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessControlItemDetailCard from '@/components/Cards/ProcessControlItemDetailCard'

export default {
  name: 'ProcessControlItemDetailEditor',
  components: {
    ProcessControlItemDetailCard
  },
  data () {
    return {
      pId: 0,
      processFrom: ''
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    this.processFrom = this.$route.query.processFrom
    this.pId = this.$route.query.pId
  }
}
</script>

<style scoped>
#ProcessControlItemDetailEditor {
  margin: 5px;
}
</style>
