<template>
  <div id="MouldEditor">
    <el-row :gutter="20">
      <el-col :span="12">
        <ExTreeCard title="模具管理" model="Mould" height="500"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MouldEditor',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
