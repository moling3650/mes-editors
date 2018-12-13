<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="查询条件">
          <el-input v-model="mainOrder" placeholder="请输入主工单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="datePicker" type="daterange" align="right" unlink-panels range-separator="至"           start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectWorkOrder(mainOrder, datePicker)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span class="card-header--text">生产计划管理</span>
          <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addWorkOrder">添加工单</el-button>
        </div>
        <el-table :data="WorkOrderList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item class="titleTabel" label="成品名称：">
                  <span style="font-weight: normal;color: darkcyan;">{{formatter('productCode', scope.row.productCode)}}</span>
                </el-form-item>
                <el-form-item class="titleTabel" label="工艺流程：">
                  <span style="font-weight: normal;color: darkcyan;">{{formatter('flowCode', scope.row.flowCode)}}</span>
                </el-form-item>
                <el-form-item class="titleTabel" label="订单编号：">
                  <span style="font-weight: normal;color: darkcyan;">{{ scope.row.co }}</span>
                </el-form-item>
                <el-form-item class="titleTabel" label="工单状态：">
                  <span style="font-weight: normal;color: darkcyan;">{{formatter('state', scope.row.state)}}</span>
                </el-form-item>
                <el-form-item class="titleTabel" label="录入时间：">
                  <span style="font-weight: normal;color: darkcyan;">{{ scope.row.inputTime }}</span>
                </el-form-item>
                <el-form-item class="titleTabel" label="计划时间：">
                  <span style="font-weight: normal;color: darkcyan;">{{ scope.row.plannedTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="主工单号"/>
          <el-table-column prop="productCode" label="产品名称" :formatter="formatterTable"/>
          <el-table-column prop="qty" label="计划数量"/>
          <el-table-column prop="cpltQty" label="已完成数量"/>
          <el-table-column prop="plannedTime" label="计划完成时间"/>
          <el-table-column label="生产进度" width="200" align="center">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="(scope.row.cpltQty/scope.row.qty) * 100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="editWorkOrder(scope)" type="text" icon="el-icon-edit" size="mini"/>
                <el-button @click.stop="deleteWorkOrder(scope)" type="text" icon="el-icon-delete" size="mini"/>
                <el-button @click="$emit('skip', 'OrderDetail', scope.row)" type="text" icon="el-icon-search" size="mini"/>
                <el-button @click="$emit('skip', 'OrderDivide', scope.row)" type="text" icon="el-icon-sort" size="mini"/>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import toOptions from '@/utils/toOptions'
import Api from '@/utils/Api'
import getMainOrderForm from '@/form/workOrder/mainOrder'
import getCheckFlowForm from '@/form/workOrder/checkFlow'

export default {
  name: 'MainOrderCard',
  props: {
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    productOptions () {
      if (this.formatterMap.productCode) {
        return Object.entries(this.formatterMap.productCode).map(([value, label]) => ({value, label}))
      }
      return []
    }
  },
  data () {
    return {
      WorkOrderList: [],
      flowList: [],
      mainOrder: 'YP20181127',
      checkFlowOptions: [],
      datePicker: ''
    }
  },
  watch: {
  },
  methods: {
    selectWorkOrder (orderNo, datePicker) {
      // 接口待完善，匹配时间参数
      Api.get(`WorkOrders/MainOrders`, { orderNo }).then(data => {
        this.WorkOrderList = data
      })
    },

    formatter (property, code) {
      return this.formatterMap && this.formatterMap[property] && this.formatterMap[property][code]
    },

    formatterTable (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    addWorkOrder () {
      getMainOrderForm(null, 'add', this.productOptions, [], [])
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.inputTime = new Date()
          formData.mainOrder = formData.orderNo
          Api.post('WorkOrders', formData).then(workOrder => {
            this.WorkOrderList.push(workOrder)
            this.$emit('change', workOrder)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:productCode', (newPorductCode, item, formItems) => {
          const flowList = this.flowList.filter(p => p.productCode === newPorductCode)
          formItems[4].options = toOptions(flowList, 'flowCode', 'flowName')
        }).$on('update:flowCode', (newFlowCode, item, formItems) => {
          Api.get('Formulas', {flowCode: newFlowCode}).then(data => {
            formItems[5].options = toOptions(data, 'formulaCode', 'formulaName')
          })
        }))
    },

    //
    orderDivide (scope) {
      getCheckFlowForm({productCode: scope.row.productCode}, this.productOptions, this.checkFlowOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {

        }))
    },

    editWorkOrder (scope) {
      getMainOrderForm(scope.row, 'edit', this.productOptions, [], [])
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`WorkOrders/${formData.id}`, formData).then(_ => {
            this.WorkOrderList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:productCode', (newPorductCode, item, formItems) => {
          const flowList = this.flowList.filter(p => p.productCode === newPorductCode)
          formItems[4].options = toOptions(flowList, 'flowCode', 'flowName')
        }).$on('update:flowCode', (newFlowCode, item, formItems) => {
          Api.get('Formulas', {flowCode: newFlowCode}).then(data => {
            formItems[5].options = toOptions(data, 'formulaCode', 'formulaName')
          })
        }))
    },

    deleteWorkOrder (scope) {
      this.$confirm('此操作将永久删除该工单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`WorkOrders/${scope.row.id}`).then(_ => {
          this.WorkOrderList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },

  created () {
    Api.get(`ProcessFlows`).then(data => {
      this.flowList = data
    })
  }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
  }
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
.titleTabel {
  font-weight: bold;
}
</style>
