<template>
  <div id="MouldEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="模具管理" model="Mould" height="500" @change="handleChange"/>
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
  },
  methods: {
    handleChange (model, data) {
      console.log(model, data)
    }
  }
}
</script>

<style scoped>
</style>
