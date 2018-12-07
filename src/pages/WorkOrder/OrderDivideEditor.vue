<template>
  <div id="OrderDivideTreeCard">
    <el-row :gutter="10" class="row">
      <el-col :span="20">
        <OrderDivideTreeCard :workOrder="workOrder" :formatterMap="formatterMap"/>
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
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
