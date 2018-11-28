<template>
  <el-card class="h450">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工单明细</span>
    </div>
    <dl v-show="orderDetail.orderNo">
      <dt><span class="title">成品名称：</span></dt>
      <dd><span class="orderFont">{{formatter('productCode', orderDetail.productCode)}}</span></dd>
      <dt><span class="title">工艺流程：</span></dt>
      <dd><span class="orderFont">{{formatter('flowCode', orderDetail.flowCode)}}</span></dd>
      <dt><span class="title">工单数量：</span></dt>
      <dd><span class="orderFont">{{orderDetail.qty}}</span></dd>
      <dt><span class="title">完成数量：</span></dt>
      <dd><span class="orderFont">{{orderDetail.cpltQty}}</span></dd>
      <dt><span class="title">紧急程度：</span></dt>
      <dd><span class="orderFont">{{orderDetail.urgency}}</span></dd>
      <dt><span class="title">工单状态：</span></dt>
      <dd><span class="orderFont">{{formatter('state', orderDetail.state)}}</span></dd>
      <dt><span class="title">订单编号：</span></dt>
      <dd><span class="orderFont">{{orderDetail.co}}</span></dd>
      <dt><span class="title">录入时间：</span></dt>
      <dd><span class="orderFont">{{orderDetail.inputTime}}</span></dd>
      <dt><span class="title">计划时间：</span></dt>
      <dd><span class="orderFont">{{orderDetail.plannedTime}}</span></dd>
      <dt><span class="title">客户名称：</span></dt>
      <dd><span class="orderFont">{{orderDetail.customer}}</span></dd>
      <dt><span class="title">工单类型：</span></dt>
      <dd><span class="orderFont">{{orderDetail.property === 1 ? '正常' : '返工'}}</span></dd>
      <dt><span class="title">录入人员：</span></dt>
      <dd><span class="orderFont">{{formatter('empCode', orderDetail.empCode)}}</span></dd>
      <dt><span class="title">制造车间：</span></dt>
      <dd><span class="orderFont">{{formatter('wsCode', orderDetail.workshopCode)}}</span></dd>
      <dt><span class="title">备注信息：</span></dt>
      <dd><span class="orderFont">{{orderDetail.remarks}}</span></dd>
    </dl>
  </el-card>
</template>

<script>
export default {
  name: 'OrderDetailCard',
  props: {
    orderDetail: {
      type: Object,
      default () {
        return {}
      }
    },
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    formatter (property, code) {
      return this.formatterMap && this.formatterMap[property] && this.formatterMap[property][code]
    }
  }
}
</script>

<style scoped>
dl {
  margin-top: 0;
  padding: 9px 15px;
}
dt, dd {
  color: #000;
  font-size: 14px;
  min-height: 18px;
}
dt {
  font-weight: normal;
}
dd {
  margin-left: 80px;
  margin-top: -24px;
}
dt {
  line-height: 2;
}
.title {
  font-weight: bold;
}
.orderFont {
  font-family: PingFang SC;
  font-weight: unset;
  color: cadetblue;
}
</style>
