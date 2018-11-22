<template>
  <div id="MachineEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="设备管理" model="Machine" height="500px" :optionMap="optionMap" @change="handleChange" ref="tree"/>
      </el-col>
      <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500px" :optionMap="optionMap" @deleted="removeItem" @updated="updateItem" @skip="handleSkip"/>
      </el-col>
      <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500px" type="Machine"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'

export default {
  name: 'MachineEditor',
  data () {
    return {
      model: '',
      item: {},
      optionMap: {}
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
        MachineDataPoint: '数据点',
        MachineAnalogPoint: '过程点位',
        MachineStandardPoint: '标准点位'
      }
      const tab = {
        name,
        label: labels[name],
        machineCode: machine.machineCode
      }
      this.$emit('addTab', tab)
    }
  },
  created () {
    Api.get('WorkShops').then(data => {
      this.optionMap.workShops = toOptions(data, 'wsCode', 'wsName')
    })
    Api.get('Departments').then(data => {
      this.optionMap.departments = toOptions(data, 'departCode', 'departName')
    })
  }
}
</script>

<style scoped>
</style>
