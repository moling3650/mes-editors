<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工位管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addStation">添加工位</el-button>
    </div>
    <el-table :data="ProcessStationList" stripe header-cell-class-name="thcell" @row-click="handleClickStation" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="stationCode" label="工位编号"/>
      <el-table-column prop="stationName" label="工位名称"/>
      <el-table-column prop="processCode" label="所属工序" :formatter="formatter"/>
      <el-table-column prop="lineId" label="线别名称" :formatter="formatter"/>
      <el-table-column prop="ipAddress" label="IP地址"/>
      <el-table-column prop="macAddress" label="MAC地址"/>
      <el-table-column prop="isFormal" label="是否正式工位" :formatter="formatter"/>
      <el-table-column prop="discription" label="备注信息"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editStation(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteStation(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'
import axios from 'axios'
import getProcessStationForm from '@/form/ProcessStation'
export default {
  name: 'ProcessStationCard',
  props: {
    processCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.processCode
    }
  },
  data () {
    return {
      formatterMap: {},
      ProcessStationList: [],
      lineOptions: [],
      processOptions: []
    }
  },
  watch: {
    processCode: {
      handler (value, oldValue) {
        this.ProcessStationList = []
        if (value) {
          this.fetchOptions().then(_ => this.fetchPoints(value))
        }
      },
      immediate: true
    }
  },
  methods: {
    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return axios.all([Api.get('Lines'), Api.get('ProcessLists')])
        .then(([lines, processs]) => {
          this.lineOptions = toOptions(lines, 'lineId', 'lineName')
          this.formatterMap.lineId = toMap(lines, 'lineId', 'lineName')
          this.processOptions = toOptions(processs, 'processCode', 'processName')
          this.formatterMap.processCode = toMap(processs, 'processCode', 'processName')
        })
    },

    // 步骤列表
    fetchPoints (processCode) {
      Api.get(`StationLists`, { processCode }).then(data => {
        this.ProcessStationList = data
      })
    },

    addStation () {
      getProcessStationForm({processCode: this.processCode}, 'add', this.lineOptions, this.processOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('StationLists', formData).then(itemDetail => {
            this.ProcessStationList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editStation (scope) {
      getProcessStationForm(scope.row, 'edit', this.lineOptions, this.processOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`StationLists/${formData.stationid}`, formData).then(_ => {
            this.ProcessStationList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteStation (scope) {
      this.$confirm('此操作将永久删除该工位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`StationLists/${scope.row.stationid}`).then(_ => {
          this.ProcessStationList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickStation (rowIndex, rowData, column) {
      this.$emit('change', rowIndex)
    }
  },
  mounted () {
    getProcessStationForm().then(form => {
      this.formatterMap.isFormal = toMap(form.formItems[6].options, 'value', 'label')
    })
  },

  created () {
  }
}
</script>

<style scoped>
</style>
