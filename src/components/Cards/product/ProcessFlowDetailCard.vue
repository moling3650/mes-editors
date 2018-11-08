<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工艺流程管理</span>
      <span class="fl-r">
        <el-button :disabled="disabled" type="text" size="mini" icon="el-icon-edit" @click="editControlItemDetail">管控细则</el-button>
        <el-button :disabled="disabled" size="mini" icon="el-icon-plus" type="text" @click="addProcessFlowDetail">添加</el-button>
      </span>
    </div>
    <el-table :data="processFlowDetailList" @row-click="selelctRow" highlight-current-row stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="flowCode" label="工艺代码"/>
      <el-table-column prop="processFromGroup" label="当前工序组" :formatter="formatter"/>
      <el-table-column prop="processFrom" label="当前工序" :formatter="formatter"/>
      <el-table-column prop="processResult" label="结果"/>
      <el-table-column prop="processNextGroup" label="下一工序组" :formatter="formatter"/>
      <el-table-column prop="processNext" label="下一工序" :formatter="formatter"/>
      <el-table-column prop="disposalCode" label="处置代码"/>
      <el-table-column prop="processMinTime" label="当前工序用时(分)"/>
      <el-table-column prop="strict" label="控制类型" :formatter="toStrictType"/>
      <el-table-column prop="standardTime" label="标准工时"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editProcessFlowDetail(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteProcessFlowDetail(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
      processFrom: ''
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
          this.formatterMap.processFrom = toMap(processLists, 'processCode', 'processName')
          this.formatterMap.processNext = toMap(processLists, 'processCode', 'processName')
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

    addProcessFlowDetail () {
      this.$confirm('选择步骤类型', '提示', {
        confirmButtonText: 'OK',
        cancelButtonText: 'NG',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(_ => 0)
        .catch(action => action === 'cancel' ? 1 : Promise.reject(new Error('cancel')))
        .then(matType => {
        })
    },

    editProcessFlowDetail (drive) {
      // getDriveForm(drive, 'edit')
      //   .then(form => this.$showForm(form).$on('submit', (drive, close) => {
      //     request({
      //       method: 'put',
      //       url: `Drives/${drive.driveId}`,
      //       data: drive
      //     }).then(_ => {
      //       const index = this.processFlowDetailList.findIndex(b => b.driveId === drive.driveId)
      //       ~index && this.processFlowDetailList.splice(index, 1, drive)
      //       this.$emit('change', drive)
      //       this.$message.success('修改成功')
      //       close()
      //     })
      //   }))
    },

    deleteProcessFlowDetail (drive) {
      // this.$confirm('此操作将永久删除该驱动, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(_ => {
      //   request({
      //     method: 'delete',
      //     url: `Drives/${drive.driveId}`
      //   }).then(_ => {
      //     const index = this.processFlowDetailList.findIndex(s => s.driveId === drive.driveId)
      //     ~index && this.processFlowDetailList.splice(index, 1)
      //     this.$message.success('删除成功!')
      //   })
      // }).catch(_ => {
      //   this.$message.info('已取消删除')
      // })
    },

    selelctRow (row) {
      this.pId = row.pid
      this.processFrom = row.processFrom
    }
  }
}
</script>

<style scoped>
</style>
