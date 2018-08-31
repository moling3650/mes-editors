<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.w100p {
  width: 100%;
}
#app .el-tree-node__content {
  border-bottom: 1px solid #333;
}
#app .el-card__header, #app .el-card__body {
  padding: 9px 20px;
}
#app .el-card__header {
  background-color: #dceafc;
}
#app .el-button--text {
  padding: 0 2px;
}
.el-table .cell {
  cursor: pointer;
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
dt {
  font-weight: bold;
}
dd {
  margin-left: 100px;
  margin-top: -20px;
}
.h600 {
  height: 600px;
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
.card-header {
  font-size: 14px;
  font-weight: bold;
  color: #416da3;
}
.thcell .cell {
  color: #fff;
  background-color: #409eff;
}
</style>
