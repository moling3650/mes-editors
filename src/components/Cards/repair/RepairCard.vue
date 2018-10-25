<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="批次">
          <el-input v-model="sfc" placeholder="批次编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectSFC(sfc)">查询</el-button>
          <el-button type="primary">开始维修</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span class="card-header--text">维修登记列表</span>
        </div>
        <el-table :data="repairDataList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row>
          <el-table-column prop="sfc" label="批次号"/>
          <el-table-column prop="order_no" label="工单编号"/>
          <el-table-column prop="from_process" label="来源工序代码"/>
          <el-table-column prop="from_process_name" label="来源工序名称"/>
          <el-table-column prop="qty" label="数量"/>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="doRepair(scope.row)"  type="primary" icon="el-icon-edit" circle size="mini">开始维修</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-form :model="form" ref="ruleForm" :inline="true" v-show="form.sfc">
      <el-row style="margin-top: 10px">
        <el-form-item label="批次号">
          <el-input v-model="form.sfc" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.qty" :disabled="true" style="width: 60px;"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="form.from_process" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="责任工序">
          <el-input v-model="form.from_process_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-input v-model="form.product_type_name" :disabled="true" style="width: 60px;"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-card>
          <div slot="header" class="clearfix">
            <span class="card-header--text">待维修列表</span>
          </div>
          <el-table :data="ngCodeDataList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row>
            <el-table-column prop="ng_code" label="现象代码"/>
            <el-table-column prop="ng_name" label="现象描述"/>
            <el-table-column prop="qty" label="数量"/>
            <el-table-column prop="reason_code" label="原因" :formatter="toName"/>
            <el-table-column prop="reasontype_code" label="原因类型" :formatter="toName"/>
            <el-table-column fixed="right" label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button @click.stop="editRepair(scope.row, scope.$index)"  type="primary" icon="el-icon-edit" circle size="mini">编辑</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-form-item label=级别>
          <ex-select :options="productGradeList" v-model="form.productGrade"></ex-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">降级</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">报废</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">取消</el-button>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="记录">
          <el-input
            style="width: 800px;"
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-form-item label=返回工序>
          <ex-select :options="returnProcessList" v-model="form.returnProcess"></ex-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import apis from '@/apis'
import getNGCodeReasonForm from '@/form/repair/NGCodeReason'

export default {
  name: 'RepairCard',
  props: {

  },

  data () {
    return {
      sfc: '0411-1VZ17D10SB-00FJJL',
      repairDataList: [],
      form: {
        sfc: '',
        order_no: '',
        from_process: '',
        from_process_name: '',
        qty: 0,
        fid: '',
        product_type_name: '',
        typecode: 'ZP01',
        productGrade: '',
        description: '',
        returnProcess: ''
      },
      ngCodeDataList: [],
      reasonOptions: [],
      reasonTypeOptions: [],
      productGradeList: [],
      returnProcessList: []
    }
  },
  watch: {
  },

  methods: {
    toName (row, col, cell) {
      const opts = col.property === 'reason_code' ? this.reasonOptions : this.reasonTypeOptions
      const item = opts.find(item => item.value === cell)
      return item && item.label
    },

    selectSFC (sfc) {
      apis.fetchRepairBySFC(sfc).then(data => {
        console.log(data)
        if (!data.length) {
          console.log('没有数据')
        } else {
          this.repairDataList = data
        }
      })
    },

    doRepair (row) {
      this.form.sfc = row.sfc
      this.form.qty = row.qty
      this.form.from_process = row.from_process
      this.form.from_process_name = row.from_process_name
      this.form.product_type_name = '制片'
      this.form.fid = row.fid
      this.form.typecode = 'ZP01'
      this.form.order_no = row.order_no
      apis.fetchNgCodeListByFidAndTypeCode(this.form.fid, this.form.typecode).then(data => {
        this.ngCodeDataList = data
      })
      apis.fetchNGReasonByTypeCode(this.form.typecode).then(data => {
        this.reasonOptions = data
      })
      apis.fetchNGReasonType().then(data => {
        this.reasonTypeOptions = data
      })
      apis.fetchProductGradeByTypeCode(this.form.typecode).then(data => {
        this.productGradeList = data
      })
      apis.fetchReturnProcessByOrderNo(this.form.order_no).then(data => {
        this.returnProcessList = [
          {
            value: '',
            label: 'END'
          },
          ...data.map(item => {
            return {
              value: item.process_name
            }
          })
        ]
      })
    },

    editRepair (row, index) {
      row.reason_code = row.reason_code || ''
      row.reasontype_code = row.reasontype_code || ''
      getNGCodeReasonForm(row, this.reasonOptions, this.reasonTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (reason, close) => {
          this.$set(this.ngCodeDataList, index, reason)
          close()
        }))
    }
  },

  mounted () {
  }
}
</script>
