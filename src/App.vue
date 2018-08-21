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
.el-tree-node__content {
  border-bottom: 1px solid #333;
}
.el-table .cell {
  cursor: pointer;
}
</style>
