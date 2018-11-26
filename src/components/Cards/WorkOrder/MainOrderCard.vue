<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="查询条件">
          <el-input v-model="mainOrder" placeholder="主工单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectWorkOrder(mainOrder)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span class="card-header--text">生产计划管理</span>
          <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="$emit('skip', 'OrderDetail', '1VS17C20SB')">工单明细</el-button>
          <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addWorkOrder">添加工单</el-button>
        </div>
        <el-table :data="WorkOrderList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
          <el-table-column prop="orderNo" label="主工单号"/>
          <el-table-column prop="productCode" label="产品名称" :formatter="formatter"/>
          <el-table-column prop="qty" label="计划数量"/>
          <el-table-column prop="cpltQty" label="已完成数量"/>
          <el-table-column prop="plannedTime" label="计划完成时间"/>
          <el-table-column label="生产进度" width="200" align="center">
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="(scope.row.cpltQty/scope.row.qty) * 100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="editWorkOrder(scope)" type="text" icon="el-icon-edit" size="mini"/>
                <el-button @click.stop="deleteWorkOrder(scope)" type="text" icon="el-icon-delete" size="mini"/>
                <el-button @click="$emit('skip', 'OrderDetail', scope.row.orderNo)" type="text" icon="el-icon-search" size="mini"/>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'
import getMainOrderForm from '@/form/workOrder/mainOrder'

export default {
  name: 'MainOrderCard',
  props: {
  },
  data () {
    return {
      formatterMap: {},
      WorkOrderList: [],
      productOptions: [],
      flowList: [],
      mainOrder: ''
    }
  },
  watch: {
  },
  methods: {

    selectWorkOrder (mainOrder) {
      this.fetchOptions(mainOrder).then(_ => this.fetchPoints(mainOrder))
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return axios.all([Api.get('Products')])
        .then(([products]) => {
          this.productOptions = toOptions(products, 'productCode', 'productName')
          this.formatterMap.productCode = toMap(products, 'productCode', 'productName')
        })
    },

    // 主工单列表
    fetchPoints (orderNo) {
      Api.get(`WorkOrders/MainOrders`, { orderNo }).then(data => {
        this.WorkOrderList = data
      })
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
</style>
