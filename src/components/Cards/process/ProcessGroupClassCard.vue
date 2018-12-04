<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">班次维护</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addGroupClass">添加班次</el-button>
    </div>
    <el-table :data="GroupClassList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="classCode" label="班次编号"/>
      <el-table-column prop="className" label="班次名称"/>
      <el-table-column prop="groupCode" label="所属工序组" :formatter="formatter"/>
      <el-table-column prop="dayStart" label="起始日期" :formatter="formatter"/>
      <el-table-column prop="timeStart" label="起始时间"/>
      <el-table-column prop="dayEnd" label="结束日期" :formatter="formatter"/>
      <el-table-column prop="timeEnd" label="结束时间"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editGroupClassStep(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteGroupClassStep(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
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
import getGroupClassForm from '@/form/ProcessGroupClass'
export default {
  name: 'ProcessGroupClassCard',
  props: {
    groupCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.groupCode
    }
  },
  data () {
    return {
      formatterMap: {},
      GroupClassList: [],
      groupOptions: []
    }
  },
  watch: {
    groupCode: {
      handler (value, oldValue) {
        this.GroupClassList = []
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
      return Api.get('WorkGroups').then(workGroups => {
        this.groupOptions = toOptions(workGroups, 'groupCode', 'groupName')
        this.formatterMap.groupCode = toMap(workGroups, 'groupCode', 'groupName')
      })
    },

    // 步骤列表
    fetchPoints (groupCode) {
      Api.get(`WorkGroupClasses`, { groupCode }).then(data => {
        this.GroupClassList = data
      })
    },

    addGroupClass () {
      getGroupClassForm({groupCode: this.groupCode}, 'add', this.groupOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('WorkGroupClasses', formData).then(itemDetail => {
            this.GroupClassList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editGroupClassStep (scope) {
      getGroupClassForm(scope.row, 'edit', this.groupOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`WorkGroupClasses/${formData.cid}`, formData).then(_ => {
            this.GroupClassList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:typeId', this._typeIdChanged))
    },

    deleteGroupClassStep (scope) {
      this.$confirm('此操作将永久删除该班次, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`WorkGroupClasses/${scope.row.cid}`).then(_ => {
          this.GroupClassList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    getGroupClassForm().then(form => {
      this.formatterMap.dayStart = toMap(form.formItems[3].options, 'value', 'label')
      this.formatterMap.dayEnd = toMap(form.formItems[5].options, 'value', 'label')
    })
  },

  created () {
  }
}
</script>

<style scoped>
</style>
