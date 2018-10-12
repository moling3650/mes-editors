<template>
  <div id="MouldEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="模具管理" model="Mould" height="500" @change="handleChange"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MouldEditor',
  data () {
    return {
      model: '',
      item: {}
    }
  },
  methods: {
    handleChange (model, data) {
      this.model = model
      this.item = data
    }
  }
}
</script>

<style scoped>
</style>
