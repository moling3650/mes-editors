<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('products/getAllProducts')
    this.$store.dispatch('WorkShops/getAllWorkShops')
    this.$store.dispatch('WorkGroups/getAllWorkGroups')
    this.$store.dispatch('Drives/getAllDrives')
    this.$store.dispatch('DriveTypes/getAllDriveTypes')
    this.$store.dispatch('Materials/getAllMaterials')
    this.$store.dispatch('Departments/getAllDepartments')
    this.$store.dispatch('NgTypes/getAllNgTypes')
  }
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei","微软雅黑","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",Arial,sans-serif;
}
html, body, #app {
  margin: 0;
  width: 100%;
  height: 100%;
}
.w100p {
  width: 100%;
}
#app .el-input__inner {
  border: 1px solid #bfc0c1;
  border-radius: 0;
}
#app .el-card {
  border: 1px solid #8db3e3;
  border-radius: 0;
  box-sizing: border-box;
}
#app .el-card__header {
  padding: 9px 20px;
}
#app .el-card__body {
  padding: 0;
}
#app .h600 .el-card__body {
  height: 560px;
  overflow: auto;
}
#app .el-card__header {
  background-color: #d4e2f4;
  border-bottom: 1px solid #8db3e3;
}
/*#app .el-card__header:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 18.6px;
  left: 0;
  background-color: #d4e2f4;
}
#app .el-card__header:after {
  content: '';
  display: block;
  position: absolute;
  top: 18.6px;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1px solid #abc7ec;
  background: linear-gradient(#acc8ec, #caddf3);
}*/
#app .card-header--text {
  position: relative;
  z-index: 1;
  color: #04408c;
  font-size: 16px;
}
#app .el-card__header .el-button--text, #app .el-card__header .el-button {
  position: relative;
  z-index: 1;
  padding-top: 3px;
}
#app .el-button--text {
  padding: 0 2px;
}
#app .el-table .cell {
  cursor: pointer;
  line-height: 1.2;
}
.panel {
  height: 600px;
  border: 1px solid #333;
  border-radius: 5px;
  overflow-y: auto;
}
.row {
  margin: 15px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
#app .w200 {
  width: 200px;
}
.h600 {
  height: 600px;
}
.h450 {
  height: 450px;
}
.h350 {
  height: 350px;
}
.h300 {
  height: 300px;
}
.h250 {
  height: 250px;
}
.ova {
  overflow: auto;
}
.fl-r {
  float: right;
}
.p3-0 {
  padding: 3px 0%;
}
.fz10 {
  font-size: 10px;
}
#app .edit, #app .delete {
  padding: 3px 5px;
  border: 1px solid;
  border-radius: 5px;
  margin: 0 5px;
}
#app .edit {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
#app .edit:hover {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
#app .delete {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4
}
#app .delete:hover {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.thcell .cell {
  color: #04408c;
  font-size: 12px;
}
#app .thcell {
  background-color: #efefef;
}
#ExTable .v-table-title-cell {
  background: #ebf3fe;
  font-weight: bold;
  font-size: 14px;
}
</style>
