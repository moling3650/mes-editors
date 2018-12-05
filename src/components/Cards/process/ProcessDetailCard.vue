<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addProcess">添加工序</el-button>
    </div>
    <div class="fl-r" style="margin: 10px 5px;float: left;">
      <el-button :disabled="disabled" size="mini" round @click="$emit('skip', 'ProcessStation', item)">工位管理</el-button>
      <el-button :disabled="disabled" size="mini" round @click="$emit('skip', 'ProcessControlItem', item)">工位管控项</el-button>
    </div>
    <el-table :data="ProcessList" stripe header-cell-class-name="thcell" @row-click="selelctRow" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="idx" label="排序"/>
      <el-table-column prop="processCode" label="工序编号"/>
      <el-table-column prop="processName" label="工序名称"/>
      <el-table-column prop="groupCode" label="工序组编号"/>
      <el-table-column prop="typeId" label="类型名称" :formatter="formatter"/>
      <el-table-column prop="sectionName" label="工段名称"/>
      <el-table-column prop="routeType" label="工段类型"/>
      <el-table-column prop="allowPack" label="允许打包" :formatter="formatter"/>
      <el-table-column prop="taskMode" label="任务方式" :formatter="formatter"/>
      <el-table-column prop="productionMode" label="生产方式" :formatter="formatter"/>
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
import getProcessForm from '@/form/Process'
export default {
  name: 'ProcessDetailCard',
  props: {
    groupCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.processCode
    },

    item () {
      return {
        processCode: this.processCode
      }
    }
  },
  data () {
    return {
      formatterMap: {},
      ProcessList: [],
      groupOptions: [],
      processTypeOptions: [],
      processCode: ''
    }
  },
  watch: {
    groupCode: {
      handler (value, oldValue) {
        this.ProcessList = []
        if (value) {
          this.fetchOptions().then(_ => this.fetchPoints(value))
        }
      },
      immediate: true
    }
  },
  methods: {
    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return Api.get('ProcessTypes').then(processTypes => {
        this.processTypeOptions = toOptions(processTypes, 'typeId', 'typeName')
        this.formatterMap.typeId = toMap(processTypes, 'typeId', 'typeName')
      })
    },

    // 工序列表
    fetchPoints (groupCode) {
      Api.get(`ProcessLists`, { groupCode }).then(data => {
        this.ProcessList = data
      })
    },

    addProcess () {
      getProcessForm({groupCode: this.groupCode}, 'add', this.groupOptions, this.processTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('ProcessLists', formData).then(itemDetail => {
            this.ProcessList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editProcessStep (scope) {
      getProcessForm(scope.row, 'edit', this.groupOptions, this.processTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`ProcessLists/${formData.processid}`, formData).then(_ => {
            this.ProcessList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteProcessStep (scope) {
      this.$confirm('此操作将永久删除该工序, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`ProcessLists/${scope.row.processid}`).then(_ => {
          this.ProcessList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    selelctRow (row) {
      this.processCode = row.processCode
    }
  },
  mounted () {
    getProcessForm().then(form => {
      this.formatterMap.allowPack = toMap(form.formItems[6].options, 'value', 'label')
      this.formatterMap.taskMode = toMap(form.formItems[8].options, 'value', 'label')
      this.formatterMap.productionMode = toMap(form.formItems[9].options, 'value', 'label')
    })
  },

  created () {
    // Api.get(`ProcessTypes`).then(data => {
    //   this.processTypeOptions = data
    // })
  }
}
</script>

<style scoped>
</style>
