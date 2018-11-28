<template>
  <div id="MainOrderEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <MainOrderCard @skip="handleSkip" :formatterMap="formatterMap"></MainOrderCard>
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
  props: {
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSkip (name, row) {
      const labels = {
        OrderDetail: '工单明细'
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
