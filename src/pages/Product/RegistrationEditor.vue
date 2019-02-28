<template>
  <div id="RegistrationEditor">

    <el-row :gutter="20" class="row">
      <el-col>
        <el-form :inline="true">
          <el-form-item label="批次号">
            <el-input v-model="sfc" placeholder="请输入批次号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSFC(sfc)">查询</el-button>
            <el-button type="primary" @click="splitSFC(sfc)">拆分批次</el-button>
            <el-button type="primary" @click="submit()">提交登记</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col>
        <el-form :inline="true">
          <el-form-item label="工单号">
            <el-input v-model="workOrder" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="不良工序">
            <el-select v-model="value" placeholder="请选择" @change="ngProcessChange" style="margin-bottom: 5px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-input v-model="productType" :disabled="true" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="ngNumber" :disabled="true" style="width: 80px;"></el-input>
          </el-form-item>
          <el-form-item label="维修次数">
            <el-input v-model="repairNumber" :disabled="true" style="width: 80px;"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">登记管理</span>
          </div>
          <ExTable :model="ngCodeModel"></ExTable>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="批次拆分" :visible.sync="splitSFCForm">
      <el-form :inline="true">
        <el-form-item label="新批次号">
          <el-input v-model="newSFC"></el-input>
        </el-form-item>
        <el-form-item label="拆分数量">
          <el-input v-model="splitNumber"></el-input>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="info">取消</el-button>
        <el-button type="success" @click="btnSplit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ngCodeModel from '@/models/System/NgCodes'
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'

export default {
  name: 'RegistrationEditor',
  data () {
    return {
      splitSFCForm: false,
      ngCodeModel: ngCodeModel,
      sfc: '',
      workOrder: '',
      value: '',
      options: [],
      productType: '',
      ngNumber: '',
      repairNumber: '',
      newSFC: '',
      splitNumber: ''
    }
  },

  methods: {
    searchSFC (sfc) {
      // api/SfcStates/detail?sfc=xxx
      // SFC  取 orderNo, qty，productCode, productType,productName,failTimes
      Api.get('SfcStates/detail', { sfc }).then(data => {
        console.log(data)
        this.workOrder = data.orderNo
        this.ngNumber = data.qty
        this.productType = data.productType
        this.repairNumber = data.failTimes
      })
      // /api/ProcessLists?orderNo=xxx
      // orderNo 取 工序列表
      Api.get('ProcessLists', { orderNo: this.workOrder }).then(processData => {
        this.options = [
          ...toOptions(processData, 'processCode')
        ]
      })
      // api/NgCodes?productType=xxx
      // productType 获取不良现象
    },
    splitSFC (sfc) {
      this.splitSFCForm = true
    },
    submit () {

    },

    ngProcessChange (value) {

    },

    btnSplit () {

    }
  }
}
</script>

<style scoped>
#RegistrationEditor {
  margin: 5px;
}
</style>
