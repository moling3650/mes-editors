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
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">维修管理</span>
          </div>
          <ExTable :model="failLogs" ref="table" :immediate="false" :defaultForm="defaultForm">
            <template slot-scope="{ rowData }">
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('BeginRepairSkip', rowData)" :disabled="!rowData">开始维修</el-button>
            </template>
          </ExTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import failLogs from '@/models/System/FailLogs'

export default {
  name: 'RepairEditor',
  data () {
    return {
      defaultForm: {},
      failLogs: failLogs,
      sfc: '1019-1VP17J18SA-06-10-FJZP-TFJL-S-ZP-1',
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

    handleSkip (name, item) {
      const labels = {
        BeginRepairSkip: '维修'
      }
      const tab = {
        name,
        label: labels[name],
        sfc: item.sfc,
        orderNo: item.orderNo
      }
      this.$emit('addTab', tab)
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
