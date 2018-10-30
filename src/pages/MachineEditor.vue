<template>
  <div id="MachineEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="设备管理" model="Machine" height="500" @change="handleChange" ref="tree"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500" @deleted="removeItem" @updated="updateItem"/>
      </el-col>
      <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500" type="Machine"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MachineEditor',
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
