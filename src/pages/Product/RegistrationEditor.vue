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

    <el-dialog title="登记" :visible.sync="addRegForm">
      <el-form>
        <el-form-item label="现象代码">
          <el-select v-model="regNgCodes" placeholder="请选择" multiple collapse-tags>
            <el-option
              v-for="item in regNgCodeOpts"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="ng in regNgCodes" :label="ng.label" :key="ng.value">
          <el-input v-model="ng.qty"></el-input>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="info">取消</el-button>
        <el-button type="success" @click="btnRegistration">确定</el-button>
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
      addRegForm: false,
      splitSFCForm: false,
      ngCodeModel: ngCodeModel,
      sfc: '0414-1VZ17D10SB-09-05-ZJFQ',
      workOrder: '',
      value: '',
      processOpts: [],
      productName: '',
      ngNumber: '',
      repairNumber: '',
      ngList: [],
      regNgCodes: [],
      regNgCodeOpts: [],
      qtys: []
    }
  },

  methods: {
    searchSFC (sfc) {
      if (!this.sfc) {
        return void this.$message.info('请输入批次号!')
      }
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
          this.regNgCodeOpts = this.ngList.map(ng => {
            return {
              value: ng.ngCode,
              label: ng.ngName,
              typeCode: ng.typeCode,
              execProc: ng.execProc
            }
          })
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
          sfc: [{ required: true, message: '请输入新批次号', trigger: 'blur' }],
          qty: [{ required: true, message: '请输入数量', trigger: 'blur' }]
        }
      }).$on('submit', (formData, close) => {
        this.$message.success('批次拆分成功')
        close()
      })
    },
    submit () {

    },

    ngProcessChange (value) {

    },

    btnRegistration () {
      this.$refs.ng.pushData(...JSON.parse(JSON.stringify(this.regNgCodes)))
      this.regNgCodes = []
      this.addRegForm = false
    },
    add () {
      this.addRegForm = true
    },
    edit () {
      // const selection = this.$refs.ng.getSelection()
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
