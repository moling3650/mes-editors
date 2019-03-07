<template>
  <div id="BeginRepairSkipEditor">
    <el-row :gutter="20" class="row">
      <el-col>
        <el-form :inline="true">
          <el-form-item label="批次号">
            <el-input :value="sfc" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="ngNumber" :disabled="true" style="width: 80px;"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="fromProcess" :disabled="true" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="责任工序">
            <el-select v-model="value" placeholder="请选择" style="margin-bottom: 5px">
              <el-option
                v-for="item in processOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-input v-model="productType" :disabled="true" style="width: 80px;"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">不良列表</span>
          </div>
          <ExTable :model="failDetails" ref="table" :immediate="false" :defaultForm="defaultForm">
            <template slot-scope="{ rowData }">
              <el-button type="primary" size="mini" plain icon="el-icon-edit" class="downgrade" :disabled="!rowData">降级</el-button>
              <el-button type="primary" size="mini" plain icon="el-icon-edit" class="judge" :disabled="!rowData">判断</el-button>
              <el-button type="primary" size="mini" plain icon="el-icon-edit" class="scrap" :disabled="!rowData">报废</el-button>
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="btnRepairsSubmit(rowData)" :disabled="!rowData">提交</el-button>
            </template>
          </ExTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import failDetails from '@/models/System/FailDetails'
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'

export default {
  name: 'BeginRepairSkipEditor',
  props: {
    sfc: {
      type: String,
      required: true
    },
    orderNo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      defaultForm: {},
      failDetails: failDetails,
      productType: '',
      ngNumber: 0,
      fromProcess: '',
      processOpts: [],
      value: ''
    }
  },
  watch: {
    sfc: {
      handler (value, oldValue) {
        this.defaultForm.sfc = value
        this.$refs.table.search({ sfc: value })
      }
    }
  },
  methods: {
    btnRepairsSubmit (row) {

    }

  },

  mounted () {
    this.defaultForm.sfc = this.sfc
    this.$refs.table.search({ sfc: this.sfc })

    Api.get('SfcStates', { sfc: this.sfc }).then(data => {
      this.fromProcess = data[0].fromProcess
      this.ngNumber = data[0].qty
      Api.get('ProcessLists', { orderNo: this.orderNo }).then(data => {
        this.processOpts = toOptions(data, 'processCode', 'processName')
      })
      Api.get('SfcStates/detail', { sfc: this.sfc }).then(productTypeData => {
        this.productType = productTypeData.productType
      })
    })
  }
}
</script>

<style scoped>
#BeginRepairSkipEditor {
  margin-top: 15px;
}

.col {
  height: 500px;
  overflow-y: auto;
}

.downgrade {
  background-color: #c0f0fa;
  color: #030303;
}

.scrap {
  background-color: #ff9600;
  color: #030303;
}

.judge {
  background-color: #fcbdcc;
  color: #030303;
}
</style>
