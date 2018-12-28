<template>
  <div id="MouldEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="模具管理" model="Mould" height="500px" @change="handleChange" ref="tree"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500px" @deleted="removeItem" @updated="updateItem"/>
      </el-col>
      <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500px" type="Mould"/>
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
#MouldEditor {
  margin-top: 15px;
}
</style>
