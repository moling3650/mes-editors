<template>
  <div id="WorkToolEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="工装管理" model="WorkTool" height="500px" @change="handleChange" ref="tree"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500px" @deleted="removeItem" @updated="updateItem"/>
      </el-col>
      <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500px" type="WorkTool"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WorkToolEditor',
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
    },

    updateItem (item) {
      this.item = item
      this.$refs.tree.updateCurrentNode(item)
    },

    removeItem () {
      this.model = ''
      this.item = {}
      this.$refs.tree.removeCurrentNode()
    }
  }
}
</script>

<style scoped>
</style>
