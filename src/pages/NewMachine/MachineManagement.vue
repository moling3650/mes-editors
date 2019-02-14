<template>
  <div id="MachineEditor">
    <el-row :gutter="20">
      <el-col :span="8">
        <ExTreeCard title="设备管理" model="Machine" height="500px" :optionMap="optionMap" @change="handleChange" ref="tree"/>
      </el-col>

      <el-col :span="16">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="设备明细" name="second">
              <el-select v-model="value" placeholder="请选择" @change="modelChange" style="margin-bottom: 5px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <ExTable :model="machines" ref="table" :immediate="false" :defaultForm="defaultForm">
                <template slot-scope="{ rowData }">
                  <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('MachineDataPoint', rowData)" :disabled="!rowData">数据点</el-button>
                  <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('MachineAnalogPoint', rowData)" :disabled="!rowData">过程点位</el-button>
                  <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('MachineStandardPoint', rowData)" :disabled="!rowData">标准点位</el-button>
                  <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('MachineProp', rowData)" :disabled="!rowData">属性明细</el-button>
                </template>
              </ExTable>
            </el-tab-pane>
            <el-tab-pane label="类别属性" name="first">
              <ExTable :model="machineKinds" ref="kind" :immediate="false" :defaultForm="defaultForm"></ExTable>
              <ExTable :model="machineKindProperties" ref="prop" :immediate="false" :defaultForm="defaultForm"></ExTable>
            </el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- <el-col :span="8">
        <ExItemCard :model="model" :item="item" height="500px" :optionMap="optionMap" @deleted="removeItem" @updated="updateItem" @skip="handleSkip"/>
      </el-col> -->
      <!-- <el-col :span="8">
        <ExPropsCard :model="model" :item="item" height="500px" type="Machine"/>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'
import machines from '@/models/Machine/Machines'
import machineKinds from '@/models/Machine/MachineKinds'
import machineKindProperties from '@/models/Machine/MachineKindProperties'

export default {
  name: 'MachineEditor',
  data () {
    return {
      model: '',
      item: {},
      optionMap: {},
      defaultForm: {},
      machines: machines,
      machineKinds: machineKinds,
      machineKindProperties: machineKindProperties,
      activeName: 'second',
      options: [],
      value: '',
      kindId: 0
    }
  },
  methods: {
    _fetchData () {
      if (this.activeName === 'first' && this.kindId) {
        this.defaultForm.kindId = this.kindId
        this.$refs.kind.search({ kindId: this.kindId })
        this.$refs.prop.search({ kindId: this.kindId })
      }
    },

    handleClick (tab, event) {
      this._fetchData()
    },

    modelChange (value) {
      if (value === '全部') {
        this.$refs.table.search({ kindId: this.kindId })
      } else {
        this.defaultForm.modelCode = value
        this.$refs.table.search({ modelCode: value })
      }
    },

    handleChange (model, data) {
      this.model = model
      this.item = data
      this.kindId = data.kindId
      Api.get('MachineModels', { kindId: this.kindId }).then(modelData => {
        this.options = [
          { value: '全部', label: '全部' },
          ...toOptions(modelData, 'modelCode')
        ]
      })
      if (this.model === 'MachineKinds') {
        this._fetchData()
      }
    },

    // updateItem (item) {
    //   this.item = item
    //   this.$refs.tree.updateCurrentNode(item)
    // },

    // removeItem () {
    //   this.model = ''
    //   this.item = {}
    //   this.$refs.tree.removeCurrentNode()
    // },

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
