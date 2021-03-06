<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备({{machineCode}})标准点位维护</span>
      <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addStandardPoint">添加标准点位</el-button>
    </div>
    <el-table :data="PointList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="machineCode" label="设备编号"/>
      <el-table-column prop="businessCode" label="业务编号"/>
      <el-table-column prop="businessName" label="业务名称"/>
      <el-table-column prop="pointId" label="数据点" :formatter="formatter"/>
      <el-table-column prop="taskDriveCode" label="驱动" :formatter="formatter"/>
      <el-table-column prop="runAt" label="运行在" :formatter="formatter"/>
      <el-table-column prop="triggerType" label="触发类型" :formatter="formatter"/>
      <el-table-column prop="triggerCondition" label="触发条件">
        <template slot-scope="scope">
          {{scope.row.triggerCondition}} {{['秒', '次'][scope.row.triggerType]}}
        </template>
      </el-table-column>
      <el-table-column prop="parameter" label="属性"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editStandardPoint(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteStandardPoint(scope)" type="text" icon="el-icon-delete" size="mini"/>
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
import getMachineStandardPointForm from '@/form/MachineStandardPoint'
const business = ['完成数', '不良数', '状态', '状态代码']
export default {
  name: 'MachineStandardPointsCard',
  props: {
    machineCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formatterMap: {},
      PointList: [],
      dataPointOptions: [],
      driveOptions: [],
      machineOptions: '',
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
      formItems[6].unit = ['秒', '次'][value]
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions (machineCode) {
      return axios.all([Api.get('MachineDataPoints', { machineCode }), Api.get('Drives', { driveClass: 3 })])
        .then(([points, drives]) => {
          this.dataPointOptions = toOptions(points, 'pointId', 'dataPointName')
          this.formatterMap.pointId = toMap(points, 'pointId', 'dataPointName')
          this.driveOptions = toOptions(drives, 'driveCode', 'driveName')
          this.formatterMap.taskDriveCode = toMap(drives, 'driveCode', 'driveName')
        })
    },

    // 数据点列表
    fetchPoints (machineCode) {
      Api.get(`MachineStandardPoints`, { machineCode }).then(data => {
        this.PointList = data
      })
    },

    addStandardPoint () {
      getMachineStandardPointForm({machineCode: this.machineCode}, 'add', this.businessOptions, this.dataPointOptions, this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.businessName = business[parseInt(formData.businessCode) - 1]
          formData.machineCode = this.machineCode
          Api.post('MachineStandardPoints', formData).then(standardPoint => {
            this.PointList.push(standardPoint)
            this.$emit('change', standardPoint)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:triggerType', this._triggerTypeChanged))
    },

    editStandardPoint (scope) {
      getMachineStandardPointForm(scope.row, 'edit', this.businessOptions, this.dataPointOptions, this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MachineStandardPoints/${formData.id}`, formData).then(_ => {
            this.PointList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:triggerType', this._triggerTypeChanged))
    },

    deleteStandardPoint (scope) {
      this.$confirm('此操作将永久删除该数据点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`MachineStandardPoints/${scope.row.id}`).then(_ => {
          this.PointList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  created () {
    this.fetchOptions(this.machineCode).then(_ => this.fetchPoints(this.machineCode))
    getMachineStandardPointForm().then(form => {
      this.formatterMap.runAt = toMap(form.formItems[2].options, 'value', 'label')
      this.formatterMap.triggerType = toMap(form.formItems[5].options, 'value', 'label')
    })
  }
}
</script>

<style scoped>
</style>
