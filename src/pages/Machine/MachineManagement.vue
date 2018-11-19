<template>
  <div id="MachineEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="设备管理" model="Machine" height="500px" @change="handleChange" ref="tree"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500px" @deleted="removeItem" @updated="updateItem" @skip="handleSkip"/>
      </el-col>
      <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500px" type="Machine"/>
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
    },

    handleSkip (name, machine) {
      const labels = {
        MachineAnalogPoint: '模拟量',
        MachineStandardPoint: '数据点'
      }
      const tab = {
        name,
        label: labels[name],
        machineCode: machine.machineCode
      }
      this.$emit('addTab', tab)
    }
  }
}
</script>

<style scoped>
</style>
