<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">生产计划管理</span>
      <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addWorkOrder">添加工单</el-button>
    </div>
    <el-table :data="WorkOrderList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
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
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from 'axios'
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'

export default {
  name: 'MainOrderCard',
  props: {
    orderNo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formatterMap: {},
      WorkOrderList: [],
      productOptions: [],
      driveOptions: [],
      machineOptions: ''
    }
  },
  watch: {
    orderNo (value) {
      this.fetchOptions(value).then(_ => this.fetchPoints(value))
    }
  },
  methods: {
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
      // getMachineStandardPointForm({machineCode: this.machineCode}, 'add', this.businessOptions, this.productOptions, this.driveOptions)
      //   .then(form => this.$showForm(form).$on('submit', (formData, close) => {
      //     formData.businessName = business[parseInt(formData.businessCode) - 1]
      //     formData.machineCode = this.machineCode
      //     Api.post('MachineStandardPoints', formData).then(standardPoint => {
      //       this.WorkOrderList.push(standardPoint)
      //       this.$emit('change', standardPoint)
      //       this.$message.success('添加成功')
      //       close()
      //     })
      //   }).$on('update:triggerType', (value, item, formItems) => {
      //     formItems[6].unit = ['秒', '次'][value]
      //   }))
    },

    editWorkOrder (scope) {
      // getMachineStandardPointForm(scope.row, 'edit', this.businessOptions, this.productOptions, this.driveOptions)
      //   .then(form => this.$showForm(form).$on('submit', (formData, close) => {
      //     Api.put(`MachineStandardPoints/${formData.id}`, formData).then(_ => {
      //       this.WorkOrderList.splice(scope.$index, 1, formData)
      //       this.$emit('change', formData)
      //       this.$message.success('修改成功')
      //       close()
      //     })
      //   }).$on('update:triggerType', (value, item, formItems) => {
      //     formItems[6].unit = ['秒', '次'][value]
      //   }))
    },

    deleteWorkOrder (scope) {
      // this.$confirm('此操作将永久删除该数据点, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(_ => {
      //   Api.delete(`MachineStandardPoints/${scope.row.id}`).then(_ => {
      //     this.WorkOrderList.splice(scope.$index, 1)
      //     this.$message.success('删除成功!')
      //   })
      // }).catch(_ => {
      //   this.$message.info('已取消删除')
      // })
    }
  },
  created () {
    // this.fetchOptions(this.machineCode).then(_ => this.fetchPoints(this.machineCode))
    // getMachineStandardPointForm().then(form => {
    //   this.formatterMap.runAt = toMap(form.formItems[2].options, 'value', 'label')
    //   this.formatterMap.triggerType = toMap(form.formItems[5].options, 'value', 'label')
    // })
  }
}
</script>

<style scoped>
</style>
