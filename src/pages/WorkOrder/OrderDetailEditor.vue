<template>
  <div id="OrderDetailEditor">
    <el-row :gutter="10" class="row">
      <el-col :span="18">
        <OrderDetailTreeCard :mainOrder="workOrder.mainOrder" :formatterMap="formatterMap" :orderDetail.sync="orderDetail"/>
      </el-col>

      <el-col :span="6">
        <OrderDetailCard :orderDetail="orderDetail" :formatterMap="formatterMap"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import OrderDetailTreeCard from '@/components/Cards/WorkOrder/OrderDetailTreeCard'
import OrderDetailCard from '@/components/Cards//WorkOrder/OrderDetailCard'

export default {
  name: 'OrderDetailEditor',
  components: {
    OrderDetailTreeCard,
    OrderDetailCard
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
  data () {
    return {
      products: [],
      orderDetail: {}
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    Api.get('Products/CascaderOptions').then(options => {
      this.products = options
    })
  }
}
</script>

<style scoped>
</style>
