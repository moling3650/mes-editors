<template>
  <el-card class="h350">
    <div slot="header" class="clearfix">
      <span class="card-header--text">物料明细</span>
    </div>
    <dl v-show="bomDetail.mat_code">
      <dt>BOM编号：</dt>
      <dd>{{bomDetail.bom_code}}</dd>
      <dt>物料编号：</dt>
      <dd>{{bomDetail.mat_code}}</dd>
      <dt>物料名称：</dt>
      <dd>{{bomDetail.mat_name}}</dd>
      <dt>物料类型：</dt>
      <dd>{{bomDetail.mat_type === 1 ? '原材料' : '半成品'}}</dd>
      <dt>消耗基数：</dt>
      <dd>{{bomDetail.base_qty}} {{bomDetail.unit}}</dd>
      <dt>消耗数量：</dt>
      <dd>{{bomDetail.qty}} {{bomDetail.unit}}</dd>
      <dt>损耗率：</dt>
      <dd>{{bomDetail.wastage || 0}} %</dd>
      <dt>是否管控：</dt>
      <dd>{{bomDetail.be_ctrl === 1 ? '是' : '否'}}</dd>
      <dt>能否超越：</dt>
      <dd>{{bomDetail.enable_beyond === 1 ? '是' : '否'}}</dd>
      <dt>可否替代：</dt>
      <dd>{{bomDetail.enable_Substitute === 1 ? '是' : '否'}}</dd>
    </dl>
  </el-card>
</template>

<script>
export default {
  name: 'BomDetailCard',
  props: {
    bomDetail: {
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
}
dt {
  font-weight: normal;
}
dd {
  margin-left: 100px;
  margin-top: -25px;
}
dt {
  line-height: 2;
}
</style>
