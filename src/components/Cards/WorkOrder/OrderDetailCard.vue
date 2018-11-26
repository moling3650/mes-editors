<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工单明细</span>
    </div>
    <dl v-show="workOrder.orderNo">
      <dt>紧急程度：</dt>
      <dd>{{workOrder.urgency}}</dd>
      <dt>状态：</dt>
      <dd>{{workOrder.matCode}}</dd>
      <dt>订单编号：</dt>
      <dd>{{workOrder.co}}</dd>
      <dt>录入时间：</dt>
      <dd>{{workOrder.inputTime}}</dd>
      <dt>客户名称：</dt>
      <dd>{{workOrder.customer}}</dd>
      <dt>工单类型：</dt>
      <dd>{{workOrder.property === 1 ? '正常' : '返工'}}</dd>
      <dt>录入人员：</dt>
      <dd>{{workOrder.empCode}}</dd>
      <dt>制造车间：</dt>
      <dd>{{workOrder.workShopCode}}</dd>
      <dt>备注：</dt>
      <dd>{{workOrder.remarks}}</dd>
    </dl>
  </el-card>
</template>

<script>
export default {
  name: 'OrderDetailCard',
  props: {
    workOrder: {
      type: Object,
      default () {
        return {}
      }
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
</style>
