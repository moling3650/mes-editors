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
            <el-button type="primary" @click="splitSFC">拆分批次</el-button>
            <el-button type="primary" @click="submit">提交登记</el-button>
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
                v-for="item in processOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品">
            <el-input v-model="productName" :disabled="true" style="width: 150px;"></el-input>
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
          <ExTable :model="ngCodeModel" :immediate="false" ref="ng"></ExTable>
        </el-card>
      </el-col>
    </el-row>

<!--     <el-dialog title="批次拆分" :visible.sync="splitSFCForm">
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
    </el-dialog> -->

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
      processOpts: [],
      productName: '',
      ngNumber: '',
      repairNumber: '',
      newSFC: '',
      splitNumber: '',
      ngList: []
    }
  },

  methods: {
    searchSFC (sfc) {
      // SFC  取 orderNo, qty，productCode, productType,productName,failTimes
      Api.get('SfcStates/detail', { sfc }).then(data => {
        this.workOrder = data.orderNo
        this.ngNumber = data.qty
        this.productName = data.productName
        // this.productType = data.productType
        this.repairNumber = data.failTimes
        // orderNo 取 工序列表
        Api.get('ProcessLists', { orderNo: this.workOrder }).then(data => {
          this.processOpts = toOptions(data, 'processCode', 'processName')
        })
        Api.get('NgCodes', { productType: data.productType }).then(data => {
          this.ngList = data.sort((a, b) => a.index - b.index)
        })
      })

      // api/NgCodes?productType=xxx
      // productType 获取不良现象
    },
    splitSFC (sfc) {
      this.$showForm({
        // 表单标题
        title: '批次拆分',
        // 表单元素
        formItems: [
          {value: 'sfc', label: '新批次号', span: 22, component: 'el-input'},
          {value: 'qty', label: '数量', span: 22, component: 'el-input'}
        ],
        // 表单内容
        formData: {
          sfc: '',
          qty: ''
        },
        // 表单校验细则
        rules: {
          sfc: [{ required: true, message: '请输入批次', trigger: 'blur' }]
        }
      }).$on('submit', (formData, close) => {
        console.log(formData)
        close()
      })
    },
    submit () {

    },

    ngProcessChange (value) {

    },

    btnSplit () {

    },
    add () {
      this.$refs.ng.pushData({
        ngCode: 'AA',
        ngName: 'AA',
        execProc: 1,
        qty: 1.52
      }, {
        ngCode: 'BB',
        ngName: 'AA',
        execProc: 1,
        qty: 1.52
      })
    },
    edit () {
      const selection = this.$refs.ng.getSelection()
      console.log(selection)
    },
    del () {
      const selection = this.$refs.ng.getSelection()
      const delIndexs = selection.map(s => this.$refs.ng.rawData.findIndex(d => d.ngCode === s.ngCode)).sort((a, b) => b - a)

      this.$nextTick(() => {
        delIndexs.forEach(index => {
          this.$refs.ng.rawData.splice(index, 1)
        })
        this.$refs.ng.selection = []
      })
    }
  },
  mounted () {
    this.$refs.ng.add = this.add
    this.$refs.ng.edit = this.edit
    this.$refs.ng.del = this.del
  }
}
</script>

<style scoped>
#RegistrationEditor {
  margin: 5px;
}
</style>
