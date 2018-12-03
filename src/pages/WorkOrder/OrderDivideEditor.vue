<template>
  <div id="OrderDivideTreeCard">
    <el-row :gutter="10" class="row">
      <el-col :span="20">
        <OrderDivideTreeCard :id="id" :formatterMap="formatterMap"/>
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
    id: {
      type: Number,
      required: true
    },
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
