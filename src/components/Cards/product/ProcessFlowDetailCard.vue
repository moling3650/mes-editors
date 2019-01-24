<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工艺流程管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addProcessFlowDetail">添加步骤</el-button>
    </div>
    <div class="fl-r" style="margin: 10px 5px;float: left;">
      <el-button :disabled="workDisabled" size="mini" round @click="$emit('skip', 'ProcessStep', item)">后工序步骤管理</el-button>
      <el-button :disabled="workDisabled" size="mini" round @click="$emit('skip', 'ProcessControlItemDetail', item)">管控细则</el-button>
    </div>
    <el-table :data="processFlowDetailList" @row-click="selelctRow" highlight-current-row stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column show-overflow-tooltip prop="flowCode" label="工艺代码" width="150"/>
      <el-table-column prop="processFromGroup" label="当前工序组" :formatter="formatter"/>
      <el-table-column prop="processFrom" label="当前工序" :formatter="formatter"/>
      <el-table-column prop="processResult" label="结果"/>
      <el-table-column prop="processNextGroup" label="下一工序组" :formatter="formatter"/>
      <el-table-column prop="processNext" label="下一工序" :formatter="formatter"/>
      <el-table-column prop="disposalCode" label="处置代码"/>
      <el-table-column prop="processMinTime" label="标准工时(分)" width="150"/>
      <el-table-column prop="strict" label="控制类型" :formatter="toStrictType"/>
      <el-table-column prop="standardTime" label="标准工时"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editProcessFlowDetail(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteProcessFlowDetail(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import axios from 'axios'
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import getOkForm from '@/form/ProcessFlowDetailOk'
import getNGForm from '@/form/ProcessFlowDetailNG'

export default {
  name: 'ProcessFlowDetailCard',
  props: {
    flowCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.flowCode
    },
    workDisabled () {
      return this.pId === 0
    },
    item () {
      return {
        pId: this.pId,
        processFrom: this.processFrom,
        flowCode: this.flowCode
      }
    }
  },
  data () {
    return {
      processFlowDetailList: [],
      formatterMap: {},
      workGroupOptions: [],
      processListOptions: [],
      controlId: 0,
      pId: 0,
      processFrom: '',
      processGroupOptions: [],
      processList: [],
      disposalOptions: [],
      processResult: '',
      processOptions: []
    }
  },
  watch: {
    'flowCode' (value, oldValue) {
      this.processFlowDetailList = []
      if (value) {
        this.fetchOptions(value).then(_ => this.fetchProcessFlowDetail(value))
      }
    }
  },
  methods: {
    _processFromGroupChanged (value, item, formItems) {
      const processList = this.processList.filter(p => p.groupCode === value)
      formItems[2].options = toOptions(processList, 'processCode', 'processName')
    },

    _processNextGroupChanged (value, item, formItems) {
      const processList = this.processList.filter(p => p.groupCode === value)
      formItems[4].options = toOptions(processList, 'processCode', 'processName')
    },

    toStrictType (row, column, cellValue, index) {
      return ['宽松', '严格'][cellValue] || '未知'
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return axios.all([Api.get('WorkGroups'), Api.get('ProcessLists')])
        .then(([workGroups, processLists]) => {
          this.workGroupOptions = toOptions(workGroups, 'groupCode', 'groupName')
          this.formatterMap.processFromGroup = toMap(workGroups, 'groupCode', 'groupName')
          this.formatterMap.processNextGroup = toMap(workGroups, 'groupCode', 'groupName')
          this.processListOptions = toOptions(processLists, 'processCode', 'processName')
          this.processListOptions.push({ value: 'END' })
          this.formatterMap.processFrom = toMap(processLists, 'processCode', 'processName')
          this.formatterMap.processNext = toMap(processLists, 'processCode', 'processName')
          this.formatterMap.processNext['END'] = 'END'
        })
    },

    // 工艺流程明细列表
    fetchProcessFlowDetail (flowCode) {
      Api.get(`ProcessFlowDetails`, { flowCode }).then(data => {
        this.processFlowDetailList = data
      })
    },
    // 待完善传入controlId、pId
    editControlItemDetail () {
      this.$router.push({ path: '/editors/processControlItemDetail', query: { pId: this.pId, processFrom: this.processFrom } })
    },

    editProcessStep () {
      this.$router.push({ path: '/editors/processStep', query: { pId: this.pId, processFrom: this.processFrom, flowCode: this.flowCode } })
    },

    addProcessFlowDetail () {
      this.$confirm('选择步骤类型', '提示', {
        confirmButtonText: 'OK',
        cancelButtonText: 'NG',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(_ => 'OK')
        .catch(action => action === 'cancel' ? 'NG' : Promise.reject(new Error('cancel')))
        .then(value => {
          if (value === 'OK') {
            getOkForm({flowCode: this.flowCode}, 'add', this.processGroupOptions)
              .then(form => this.$showForm(form).$on('submit', (formData, close) => {
                formData.flowCode = this.flowCode
                Api.post('ProcessFlowDetails', formData).then(flowDetail => {
                  this.processFlowDetailList.push(flowDetail)
                  this.$emit('change', flowDetail)
                  this.$message.success('添加成功')
                  close()
                })
              }).$on('update:processFromGroup', this._processFromGroupChanged)
                .$on('update:processNextGroup', this._processNextGroupChanged))
          } else {
            getNGForm({flowCode: this.flowCode}, 'add', this.processGroupOptions, this.disposalOptions)
              .then(form => this.$showForm(form).$on('submit', (formData, close) => {
                formData.flowCode = this.flowCode
                Api.post('ProcessFlowDetails', formData).then(flowDetail => {
                  this.processFlowDetailList.push(flowDetail)
                  this.$emit('change', flowDetail)
                  this.$message.success('添加成功')
                  close()
                })
              }).$on('update:processFromGroup', this._processFromGroupChanged))
          }
        })
    },

    editProcessFlowDetail (scope) {
      if (scope.row.processResult === 'OK') {
        getOkForm(scope.row, 'edit', this.processGroupOptions, this.processOptions)
          .then(form => this.$showForm(form).$on('submit', (formData, close) => {
            Api.put(`ProcessFlowDetails/${formData.pid}`, formData).then(_ => {
              this.processFlowDetailList.splice(scope.$index, 1, formData)
              this.$emit('change', formData)
              this.$message.success('修改成功')
              close()
            })
          }).$on('update:processFromGroup', this._processFromGroupChanged)
            .$on('update:processNextGroup', this._processNextGroupChanged))
      } else {
        getNGForm(scope.row, 'edit', this.processGroupOptions, this.disposalOptions, this.processOptions)
          .then(form => this.$showForm(form).$on('submit', (formData, close) => {
            Api.put(`ProcessFlowDetails/${formData.pid}`, formData).then(_ => {
              this.processFlowDetailList.splice(scope.$index, 1, formData)
              this.$emit('change', formData)
              this.$message.success('修改成功')
              close()
            })
          }).$on('update:processFromGroup', this._processFromGroupChanged))
      }
    },

    deleteProcessFlowDetail (scope) {
      this.$confirm('此操作将永久删除该工艺步骤, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        console.log(scope)
        Api.delete(`ProcessFlowDetails/${scope.row.pid}`).then(_ => {
          this.processFlowDetailList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    selelctRow (row) {
      this.pId = row.pid
      this.processFrom = row.processFrom
    }
  },

  created () {
    Api.get(`WorkGroups`).then(data => {
      this.processGroupOptions = toOptions(data, 'groupCode', 'groupName')
    })
    Api.get(`ProcessLists`).then(data => {
      this.processList = data
      this.processOptions = toOptions(data, 'processCode', 'processName')
    })
    Api.get(`DisposalProcesses`).then(data => {
      this.disposalOptions = toOptions(data, 'disposalCode', 'disposalName')
    })
  }
}
</script>

<style scoped>
</style>
