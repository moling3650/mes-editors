<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">后工序步骤管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addProcessStep">添加步骤</el-button>
    </div>
    <el-table :data="ProcessStepList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="idx" label="排序"/>
      <el-table-column prop="processCode" label="工序编号"/>
      <el-table-column prop="stepCode" label="步骤编号"/>
      <el-table-column prop="stepName" label="步骤名称"/>
      <el-table-column prop="stepType" label="步骤类型"/>
      <el-table-column prop="flowCode" label="工艺编号" width="200"/>
      <el-table-column prop="consumeType" label="消耗类型"/>
      <el-table-column prop="isRecord" label="是否记录" :formatter="formatter"/>
      <el-table-column prop="consumePercent" label="耗料比例"/>
      <el-table-column prop="ctrlType" label="控制类型" :formatter="formatter"/>
      <el-table-column prop="typeId" label="驱动类型" :formatter="formatter"/>
      <el-table-column prop="driveCode" label="驱动编号" :formatter="formatter" width="100"/>
      <el-table-column prop="parameter" label="参数"/>
      <el-table-column prop="matCode" label="物料编号" :formatter="formatter"/>
      <el-table-column prop="timeOut" label="响应时间"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column prop="format" label="格式"/>
      <el-table-column prop="allowReuse" label="重复利用" :formatter="formatter"/>
      <el-table-column prop="autorun" label="自动启动" :formatter="formatter"/>
      <el-table-column prop="autoRestart" label="自动重启" :formatter="formatter"/>
      <el-table-column prop="triger" label="触发事件"/>
      <el-table-column prop="parameter2" label="触发参数"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editProcessStep(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteProcessStep(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'
import axios from 'axios'
import getProcessStepForm from '@/form/processStep'
export default {
  name: 'ProcessStepCard',
  props: {
    pId: {
      type: Number,
      required: true
    },
    processFrom: {
      type: String,
      required: true
    },
    flowCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.processFrom
    }
  },
  data () {
    return {
      formatterMap: {},
      ProcessStepList: [],
      controlOptions: [],
      driveTypeOptions: [],
      controlId: 0,
      driveOptions: [],
      driveList: [],
      matOptions: []
    }
  },
  watch: {
    pId: {
      handler (value, oldValue) {
        this.ProcessStepList = []
        if (value) {
          this.fetchOptions().then(_ => this.fetchPoints(value))
        }
      },
      immediate: true
    },

    processFrom: {
      handler (value, oldValue) {
        if (value) {
          Api.get(`ProcessControlItems`, { processCode: value }).then(data => {
            if (data.length) {
              this.controlId = data[0].processCode
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    _typeIdChanged (value, item, formItems) {
      const driveList = this.driveList.filter(p => p.typeId === value)
      formItems[6].options = toOptions(driveList, 'driveCode', 'driveName')
      formItems[10].disabled = (value !== 2)
      formItems[12].disabled = (value !== 2)
    },

    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return axios.all([Api.get('DriveTypes'), Api.get('Drives'), Api.get('Materials/Options', {flowCode: this.flowCode})])
        .then(([driveTypes, drives, materials]) => {
          this.driveTypeOptions = toOptions(driveTypes, 'typeId', 'typeName')
          this.formatterMap.typeId = toMap(driveTypes, 'typeId', 'typeName')
          this.driveOptions = toOptions(drives, 'driveCode', 'driveName')
          this.formatterMap.driveCode = toMap(drives, 'driveCode', 'driveName')
          this.matOptions = toOptions(materials, 'code', 'name')
          this.formatterMap.matCode = toMap(materials, 'code', 'name')
        })
    },

    // 步骤列表
    fetchPoints (pId) {
      console.log(pId)
      Api.get(`ProcessSteps`, { pId }).then(data => {
        this.ProcessStepList = data
      })
    },

    addProcessStep () {
      getProcessStepForm({processCode: this.processFrom}, 'add', this.driveTypeOptions, [], this.matOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.pid = this.pId
          formData.processCode = this.processFrom
          formData.flowCode = this.flowCode
          Api.post('ProcessSteps', formData).then(itemDetail => {
            this.ProcessStepList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:typeId', this._typeIdChanged))
    },

    editProcessStep (scope) {
      getProcessStepForm(scope.row, 'edit', this.driveTypeOptions, this.driveOptions, this.matOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`ProcessSteps/${formData.stepId}`, formData).then(_ => {
            this.ProcessStepList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:typeId', this._typeIdChanged))
    },

    deleteProcessStep (scope) {
      this.$confirm('此操作将永久删除该步骤, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`ProcessSteps/${scope.row.stepId}`).then(_ => {
          this.ProcessStepList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    getProcessStepForm().then(form => {
      this.formatterMap.ctrlType = toMap(form.formItems[4].options, 'value', 'label')
      this.formatterMap.isRecord = toMap(form.formItems[9].options, 'value', 'label')
      this.formatterMap.allowReuse = toMap(form.formItems[9].options, 'value', 'label')
      this.formatterMap.autorun = toMap(form.formItems[9].options, 'value', 'label')
      this.formatterMap.autoRestart = toMap(form.formItems[9].options, 'value', 'label')
      this.formatterMap.consumeType = toMap(form.formItems[12].options, 'value', 'label')
    })
  },

  created () {
    Api.get(`Drives`).then(data => {
      this.driveList = data
    })
  }
}
</script>

<style scoped>
</style>
