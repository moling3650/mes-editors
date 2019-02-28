<template>
  <div id="RepairEditor">

    <el-row :gutter="20" class="row">
      <el-col>
        <el-form :inline="true">
          <el-form-item label="批次号">
            <el-input v-model="sfc" placeholder="请输入批次号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSFC(sfc)">查询</el-button>
            <el-button type="primary" @click="repairSFC(sfc)">开始维修</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">维修管理</span>
          </div>
          <ExTable :model="failLogs" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="维修" :visible.sync="repairForm">
    </el-dialog>
  </div>
</template>

<script>
import failLogs from '@/models/System/FailLogs'

export default {
  name: 'RepairEditor',
  data () {
    return {
      repairForm: false,
      defaultForm: {},
      failLogs: failLogs,
      sfc: '',
      workOrder: '',
      value: '',
      options: [],
      productType: '',
      ngNumber: '',
      repairNumber: '',
      ngCode: '',
      newSFC: '',
      splitNumber: ''
    }
  },

  methods: {
    searchSFC (sfc) {
      this.defaultForm.sfc = this.sfc
      this.$refs.table.search({ sfc: this.sfc })
    },
    repairSFC (sfc) {
      this.repairForm = true
    },

    ngProcessChange (value) {

    },

    btnSplit () {

    }
  }
}
</script>

<style scoped>
#RepairEditor {
  margin: 5px;
}
</style>
