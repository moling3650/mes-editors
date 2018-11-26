<template>
  <div id="OrderDetailEditor">
    <el-row :gutter="10" class="row">
      <el-col :span="14">
        <OrderDetailTreeCard :mainOrder="mainOrder"/>
      </el-col>

      <el-col :span="6">
        <OrderDetailCard/>
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
    mainOrder: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      products: []
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
