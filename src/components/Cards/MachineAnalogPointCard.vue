<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备({{machineCode}})过程点位维护</span>
      <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addAnalogPoint">添加过程点位</el-button>
    </div>
    <el-table :data="AnalogPointList" stripe header-cell-class-name="thcell" highlight-current-row  size="mini" class="w100p">
      <el-table-column prop="machineCode" label="设备编号"/>
      <el-table-column prop="businessCode" label="业务编号"/>
      <el-table-column prop="businessName" label="业务名称"/>
      <el-table-column prop="pointId" label="数据点" :formatter="formatter"/>
      <el-table-column prop="runAt" label="运行在" :formatter="formatter"/>
      <el-table-column prop="controlId" label="管控项" :formatter="formatter"/>
      <el-table-column prop="driveCode" label="驱动名称" :formatter="formatter"/>
      <el-table-column prop="parameter" label="参数"/>
      <el-table-column prop="triggerType" label="触发类型" :formatter="formatter"/>
      <el-table-column prop="triggerCondition" label="触发条件">
        <template slot-scope="scope">
          {{scope.row.triggerCondition}} {{['秒', '次'][scope.row.triggerType]}}
        </template>
      </el-table-column>
      <el-table-column prop="toMonitor" label="是否监视" :formatter="formatter"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editAnalogPoint(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteAnalogPoint(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from 'axios'
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'
import getMachineAnalogPointForm from '@/form/MachineAnalogPoint'
const business = ['过程参数']
export default {
  name: 'MachineAnalogPointCard',
  props: {
    machineCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formatterMap: {},
      AnalogPointList: [],
      dataPointOptions: [],
      controlOptions: [],
      driveOptions: [],
      businessOptions: business.map((label, index) => ({value: `0${index + 1}`, label}))
    }
  },
  watch: {
    machineCode (value) {
      this.fetchOptions(value).then(_ => this.fetchPoints(value))
    }
  },
  methods: {
    _triggerTypeChanged (value, item, formItems) {
      formItems[8].unit = ['秒', '次'][value]
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions (machineCode) {
      return axios.all([Api.get('MachineDataPoints', { machineCode }), Api.get('ProcessControlItems', { machineCode }), Api.get('Drives', { driveClass: 3 })])
        .then(([points, controls, drives]) => {
          this.dataPointOptions = toOptions(points, 'pointId', 'dataPointName')
          this.formatterMap.pointId = toMap(points, 'pointId', 'dataPointName')
          this.controlOptions = toOptions(controls, 'id', 'controlName')
          this.formatterMap.controlId = toMap(controls, 'id', 'controlName')
          this.driveOptions = toOptions(drives, 'driveCode', 'driveName')
          this.formatterMap.driveCode = toMap(drives, 'driveCode', 'driveName')
        })
    },

    // 数据点列表
    fetchPoints (machineCode) {
      Api.get(`MachineAnalogPoints`, { machineCode }).then(data => {
        this.AnalogPointList = data
      })
    },

    addAnalogPoint () {
      getMachineAnalogPointForm({machineCode: this.machineCode}, 'add', this.businessOptions, this.dataPointOptions, this.controlOptions, this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.businessName = business[parseInt(formData.businessCode) - 1]
          formData.machineCode = this.machineCode
          Api.post('MachineAnalogPoints', formData).then(analogPoint => {
            this.AnalogPointList.push(analogPoint)
            this.$emit('change', analogPoint)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:triggerType', this._triggerTypeChanged))
    },

    editAnalogPoint (scope) {
      getMachineAnalogPointForm(scope.row, 'edit', this.businessOptions, this.dataPointOptions, this.controlOptions, this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MachineAnalogPoints/${formData.id}`, formData).then(_ => {
            this.AnalogPointList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:triggerType', this._triggerTypeChanged))
    },

    deleteAnalogPoint (scope) {
      this.$confirm('此操作将永久删除该数据点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`MachineAnalogPoints/${scope.row.id}`).then(_ => {
          this.AnalogPointList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },

  mounted () {
    getMachineAnalogPointForm(null, 'add', [], [], [], []).then(form => {
      this.formatterMap.toMonitor = toMap(form.formItems[9].options, 'value', 'label')
      this.formatterMap.triggerType = toMap(form.formItems[7].options, 'value', 'label')
    })
  },

  created () {
    this.fetchOptions(this.machineCode).then(_ => this.fetchPoints(this.machineCode))
    getMachineAnalogPointForm(null, 'add', [], [], [], []).then(form => {
      this.formatterMap.runAt = toMap(form.formItems[2].options, 'value', 'label')
    })
  }
}
</script>

<style scoped>
</style>
