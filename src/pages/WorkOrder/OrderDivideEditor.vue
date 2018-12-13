<template>
  <div id="OrderDivideTreeCard">
    <el-row :gutter="10" class="row">
      <el-col :span="24">
        <OrderDivideTreeCard :workOrder="workOrder" :formatterMap="formatterMap" @skip="handleSkip"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import OrderDivideTreeCard from '@/components/Cards/WorkOrder/OrderDivideTreeCard'

export default {
  name: 'OrderDivideEditor',
  components: {
    OrderDivideTreeCard
  },
  props: {
    workOrder: {
      type: Object,
      required: true
    },
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleSkip (name, workOrder) {
      const labels = {
        OrderDetail: '工单明细',
        OrderDivide: '工单拆分'
      }
      const tab = {
        name,
        label: labels[name],
        workOrder
      }
      this.$emit('addTab', tab)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
