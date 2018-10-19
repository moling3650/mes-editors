<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="批次">
          <el-input v-model="sfc" placeholder="批次编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectSFC(sfc)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true">
      <el-row>
        <el-form-item prop="splitSFCCheck">
          <el-checkbox v-model="form.splitSFCCheck" @change="splitChange">使用批次拆分</el-checkbox>
        </el-form-item>
        <el-form-item prop="newSfc" v-show="form.splitSFCCheck" label="新批次号">
          <el-input v-model="form.newSfc" placeholder="批次编号"></el-input>
        </el-form-item>
        <el-form-item prop="newSfcNumber" v-show="form.splitSFCCheck" label="数量">
          <ex-input-number v-model="form.newSfcNumber" placeholder="数量"></ex-input-number>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="order_no" label="工单">
          <el-input v-model="form.order_no" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="process_code" label="不良工序">
          <ex-select :options="opts" v-model="form.process_code"></ex-select>
        </el-form-item>
        <el-form-item prop="type_name" label="产品类型">
          <el-input v-model="form.type_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="qty" label="工单数量">
          <el-input v-model="form.qty" :disabled="true" style="width: 60px;"></el-input>
        </el-form-item>
        <el-form-item prop="cnt" label="已维修次数">
          <el-input v-model="form.cnt" :disabled="true" style="width: 60px;"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="description" label="说明">
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row>
      <el-form :inline="true">
        <el-form-item label="类型名称">
          <ex-select :options="ngTypeList" v-model="filteredType"></ex-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filteredList()">筛选</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="success" icon="el-icon-success" :disabled="!sfc" circle @click="registerSubmit">确认</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="info" icon="el-icon-warning" circle>报废</el-button>
        </el-form-item>
      </el-form>
      <el-card style=" width: 700px; float: left;">
        <div slot="header" class="clearfix">
        <span class="card-header--text">不良现象列表</span>
        </div>
        <el-table :data="dataList" stripe header-cell-class-name="thcell" style=" width: 700px; float: left;" size="mini" class="w100p" highlight-current-row>
          <el-table-column prop="ng_code" label="现象代码"/>
          <el-table-column prop="ng_name" label="现象描述"/>
          <el-table-column prop="type_name" label="类型名称"/>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="editRegister(scope.row)"  type="danger" icon="el-icon-edit" circle size="mini">登记</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="h300" style=" width: 500px; float: right;">
        <div slot="header" class="clearfix">
          <span class="card-header--text">已登记列表</span>
        </div>
        <el-table :data="registerdList" stripe header-cell-class-name="thcell" style=" width: 500px; float: right;" size="mini" class="w100p" highlight-current-row>
          <el-table-column prop="ng_code" label="现象代码"/>
          <el-table-column prop="ng_name" label="现象描述"/>
          <el-table-column prop="number" label="登记数量" align="center">
            <template slot-scope="scope">
              <p style="color: blue;font-weight: 500;">{{ scope.row.number }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="removeRegisterd(scope.row)" type="danger" icon="el-icon-delete" circle size="mini">移除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
// import guid from 'guid'
import apis from '@/apis'
import getNGCodeRegisterForm from '@/form/repair/NGCodeRegister'

export default {
  name: 'RepairRegisterCard',
  computed: {

  },
  data () {
    const checkSplitSFC = (rule, value, callback) => {
      if (!this.form.splitSFCCheck) {
        return callback()
      }
      if (!value) {
        return callback(new Error('拆分批次不能为空'))
      }
    }

    const checkSplitNumber = (rule, value, callback) => {

    }
    return {
      sfc: '0411-1VZ17D10SB-00FJJL',
      form: {
        process_code: '',
        splitSFCCheck: false,
        newSfc: '',
        newSfcNumber: 0,
        type_name: ''
      },
      filteredType: '',
      opts: [],
      ngCodeList: [],
      dataList: [],
      ngTypeList: [],
      registerdList: [],
      rules: {
        order_no: [{ required: true, message: '工单不能为空' }],
        process_code: [{ required: true, message: '不良工序不能为空' }],
        newSfc: [{ validator: checkSplitSFC }],
        newSfcNumber: [{ validator: checkSplitNumber }]
      }
    }
  },
  watch: {
    'form.typecode' (value) {
      if (value) {
        this.getNGCodeList(value)
      }
    }
  },
  methods: {
    filteredList () {
      if (!this.filteredType) {
        this.dataList = this.ngCodeList
      } else {
        this.dataList = this.ngCodeList.filter(item => item.type_name === this.filteredType)
      }
    },
    getNGCodeList (typecode) {
      apis.fetchNGCodeByTypeCode(typecode).then(data => {
        this.ngCodeList = data
        this.dataList = data
      })
    },

    selectSFC (sfc) {
      apis.fetchDataBySFC(sfc).then(data => {
        if (!data.length) {
          return
        }
        this.form = Object.assign({...this.form}, { sfc }, data[0])
        this.opts = data.map(item => {
          return {
            value: item.process_code,
            label: item.process_name
          }
        })
      })
    },

    editRegister (row) {
      getNGCodeRegisterForm(row)
        .then(form => this.$showForm(form).$on('submit', (data, close) => {
          const index = this.registerdList.findIndex(d => d.ng_code === data.ng_code)
          if (~index) {
            this.registerdList[index].number += data.number
          } else {
            this.registerdList.push(data)
          }
          close()
        }))
    },

    removeRegisterd (row) {
      this.$confirm('此操作将移除登记项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        const index = this.registerdList.findIndex(d => d.ng_code === row.ng_code)
        ~index && this.registerdList.splice(index, 1)
        this.$message.success('移除成功!')
      }).catch(_ => {
        this.$message.info('已取消移除')
      })
    },

    splitChange (value) {
      this.$set(this.rules.newSfc[0], 'required', value)
      this.$set(this.rules.newSfcNumber[0], 'required', value)
    },

    registerSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // if(this.splitSFCCheck)
      // {
      //   console.log(this.newSfc)
      //   if (!this.newSfc) {
      //     return void this.$message.info('请输入新批次号')
      //   }
      //   if (!this.newSfcNumber) {
      //     return void this.$message.info('请输入拆分数量')
      //   }
      //   if (this.newSfcNumber <= '0') {
      //     return void this.$message.info('数量不能小于或等于0')
      //   }
      //   const registerAll = this.registerdList.reduce((total, item) => total + item.number, 0)
      //   console.log(registerAll)
      // }
    }
  },

  mounted () {
    // const id = guid.raw()
    // console.log(id)
    apis.fetcgNGType().then(data => {
      this.ngTypeList = [
        {
          value: '',
          label: '全部'
        },
        ...data.map(item => {
          return {
            value: item.type_name
          }
        })
      ]
    })
  }
}
</script>
