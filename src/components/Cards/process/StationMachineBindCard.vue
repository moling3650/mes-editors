<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">绑定设备</span>
    </div>
    <dl v-show="machineDetail.stationCode">
      <dt><span class="title">设备图片：<img src=""></span></dt>
      <dd><span class="detailFont">{{machineDetail.img}}</span></dd>
      <dt><span class="title">设备编号：</span></dt>
      <dd><span class="detailFont">{{machineDetail.machineCode}}</span></dd>
      <dt><span class="title">设备名称：</span></dt>
      <dd><span class="detailFont">{{machineDetail.machineName}}</span></dd>
      <dt><span class="title">供应商：</span></dt>
      <dd><span class="detailFont">{{machineDetail.manufacturer}}</span></dd>
      <dt><span class="title">模具型号：</span></dt>
      <dd><span class="detailFont">{{machineDetail.modelCode}}</span></dd>
    </dl>
    <div>
      <el-button v-show="machineShow" icon="el-icon-plus" class="fl-r p3-0" type="text">绑定设备</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'StationMachineBindCard',
  props: {
    machineDetail: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    machineShow () {
      return !this.machineDetail.stationCode
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
.detailFont {
  font-family: PingFang SC;
  font-weight: unset;
  color: cadetblue;
}
</style>
