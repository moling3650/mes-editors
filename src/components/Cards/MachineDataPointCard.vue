<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备({{machineCode}})数据点维护</span>
      <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addDataPoint">添加数据点</el-button>
    </div>
    <el-table :data="DataPointList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="dataPointName" label="数据点名称"/>
      <el-table-column prop="machineCode" label="设备编号"/>
      <el-table-column prop="dcType" label="运行方式" :formatter="formatter"/>
      <el-table-column prop="pointType" label="采集类型" :formatter="formatter"/>
      <el-table-column prop="driveCode" label="驱动编号"/>
      <el-table-column prop="parameter" label="参数设置"/>
      <el-table-column prop="rate" label="频率设置"/>
      <el-table-column prop="description" label="备注"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editDataPoint(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteDataPoint(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
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
import getMachineDataPointForm from '@/form/MachineDataPoint'
export default {
  name: 'MachineDataPointCard',
  props: {
    machineCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formatterMap: {},
      DataPointList: [],
      pointTypeOptions: [],
      driveMap: [],
      controlOptions: []
    }
  },
  watch: {
    machineCode: {
      handler (value) {
        this.fetchOptions(value).then(_ => this.fetchPoints(value))
      },
      immediate: true
    }
  },
  methods: {
    _driveTypeChanged (newType, item, formItems, rules, form) {
      formItems[3].options = this.driveMap[newType]
      form.driveCode = ''
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions (machineCode) {
      return axios.all([Api.get('PointTypes'), Api.get('ProcessControlItems', { machineCode })])
        .then(([pointTypes, controls]) => {
          this.pointTypeOptions = toOptions(pointTypes, 'typeId', 'typeName')
          this.formatterMap.pointType = toMap(pointTypes, 'typeId', 'typeName')
          this.controlOptions = toOptions(controls, 'id', 'controlName')
          this.formatterMap.controlId = toMap(controls, 'id', 'controlName')
        })
    },

    // 数据点列表
    fetchPoints (machineCode) {
      Api.get(`MachineDataPoints`, { machineCode }).then(data => {
        this.DataPointList = data
      })
    },

    addDataPoint () {
      getMachineDataPointForm({machineCode: this.machineCode}, 'add', this.pointTypeOptions, [])
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('MachineDataPoints', formData).then(dataPoint => {
            this.DataPointList.push(dataPoint)
            this.$emit('change', dataPoint)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:driveType', this._driveTypeChanged))
    },

    editDataPoint (scope) {
      getMachineDataPointForm(scope.row, 'edit', this.pointTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MachineDataPoints/${formData.pointId}`, formData).then(_ => {
            this.DataPointList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:driveType', this._driveTypeChanged))
    },

    deleteDataPoint (scope) {
      this.$confirm('此操作将永久删除该数据点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`MachineDataPoints/${scope.row.pointId}`).then(_ => {
          this.DataPointList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },

  mounted () {
    getMachineDataPointForm().then(form => {
      this.formatterMap.dcType = toMap(form.formItems[6].options, 'value', 'label')
    })
  },

  created () {
    Api.get(`Drives/GroupByClass`).then(data => {
      const driveMap = {}
      data.forEach(item => {
        driveMap[item.driveClass] = toOptions(item.drives, 'driveCode', 'driveName')
      })
      this.driveMap = driveMap
    })
  }
}
</script>

<style scoped>
</style>
