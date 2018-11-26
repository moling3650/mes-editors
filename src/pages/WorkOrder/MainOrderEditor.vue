<template>
  <div id="MainOrderEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <MainOrderCard @skip="handleSkip"></MainOrderCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainOrderCard from '@/components/Cards/WorkOrder/MainOrderCard'

export default {
  name: 'MainOrderEditor',
  components: {
    MainOrderCard
  },
  data () {
    return {
    }
  },
  methods: {
    handleSkip (name, row) {
      const labels = {
        orderDetail: '工单明细'
      }
      const tab = {
        name,
        label: labels[name],
        mainOrder: row
      }
      this.$emit('addTab', tab)
    }
  }
}
</script>

<style scoped>
</style>
