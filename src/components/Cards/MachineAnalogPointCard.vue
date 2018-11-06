<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备模拟量维护</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addAnalogPoint">添加模拟量</el-button>
    </div>
    <el-table :data="AnalogPointList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="machineCode" label="设备编号"/>
      <el-table-column prop="businessCode" label="业务编号"/>
      <el-table-column prop="businessName" label="业务名称"/>
      <el-table-column prop="pointId" label="数据点" :formatter="formatter"/>
      <el-table-column prop="runAt" label="运行在" :formatter="formatter"/>
      <el-table-column prop="controlId" label="管控项" :formatter="formatter"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editAnalogPoint(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteAnalogPoint(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
  computed: {
    disabled () {
      return !this.machineCode
    }
  },
  data () {
    return {
      formatterMap: {},
      AnalogPointList: [],
      dataPointOptions: [],
      controlOptions: [],
      businessOptions: business.map((label, index) => ({value: `0${index + 1}`, label}))
    }
  },
  watch: {
    'machineCode' (value, oldValue) {
      this.AnalogPointList = []
      if (value) {
        this.fetchOptions(value).then(_ => this.fetchPoints(value))
      }
    }
  },
  methods: {
    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions (machineCode) {
      return axios.all([Api.get('MachineDataPoints', { machineCode }), Api.get('ProcessControlItems', { machineCode })])
        .then(([points, controls]) => {
          console.log(controls)
          this.dataPointOptions = toOptions(points, 'pointId', 'dataPointName')
          this.formatterMap.pointId = toMap(points, 'pointId', 'dataPointName')
          this.controlOptions = toOptions(controls, 'id', 'controlName')
          this.formatterMap.controlId = toMap(controls, 'id', 'controlName')
        })
    },

    // 数据点列表
    fetchPoints (machineCode) {
      Api.get(`MachineAnalogPoints`, { machineCode }).then(data => {
        this.AnalogPointList = data
      })
    },

    addAnalogPoint () {
      getMachineAnalogPointForm({machineCode: this.machineCode}, 'add', this.businessOptions, this.dataPointOptions, this.controlOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.businessName = business[parseInt(formData.businessCode) - 1]
          formData.machineCode = this.machineCode
          Api.post('MachineAnalogPoints', formData).then(analogPoint => {
            this.AnalogPointList.push(analogPoint)
            this.$emit('change', analogPoint)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editAnalogPoint (row) {
      getMachineAnalogPointForm(row, 'edit', this.businessOptions, this.dataPointOptions, this.controlOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MachineAnalogPoints/${formData.id}`, formData).then(_ => {
            const index = this.AnalogPointList.findIndex(b => b.id === formData.id)
            ~index && this.AnalogPointList.splice(index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteAnalogPoint (row) {
      this.$confirm('此操作将永久删除该数据点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`MachineAnalogPoints/${row.id}`).then(_ => {
          const index = this.AnalogPointList.findIndex(s => s.id === row.id)
          ~index && this.AnalogPointList.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    getMachineAnalogPointForm(null, 'add', [], [], []).then(form => {
      this.formatterMap.runAt = toMap(form.formItems[2].options, 'value', 'label')
    })
  }
}
</script>

<style scoped>
</style>
