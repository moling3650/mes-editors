<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序组管理</span>
      <el-button class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addProcessGroup">添加工序组</el-button>
    </div>
    <div class="fl-r" style="margin: 10px 5px;float: left;">
      <el-button :disabled="classDisabled" size="mini" round @click="$emit('skip', 'ProcessGroupClass', item)">班次维护</el-button>
    </div>
    <el-table :data="processGroupList" @row-click="selelctRow" highlight-current-row stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="idx" label="排序" width="150"/>
      <el-table-column prop="groupCode" label="工序组编号"/>
      <el-table-column prop="groupName" label="工序组名称"/>
      <el-table-column prop="wsid" label="车间名称" :formatter="formatter"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editProcessGroup(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteProcessGroup(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import getGroupForm from '@/form/ProcessGroup'

export default {
  name: 'ProcessGroupDetailCard',
  props: {
  },
  computed: {
    classDisabled () {
      return this.groupCode === ''
    },
    item () {
      return {
        groupCode: this.groupCode
      }
    }
  },
  data () {
    return {
      processGroupList: [],
      formatterMap: {},
      workshopOptions: [],
      groupCode: ''
    }
  },

  methods: {
    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    addProcessGroup () {
      getGroupForm(null, 'add', this.workshopOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('WorkGroups', formData).then(itemDetail => {
            this.processGroupList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:typeId', this._typeIdChanged))
    },

    editProcessGroup (scope) {
      getGroupForm(scope.row, 'edit', this.workshopOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`WorkGroups/${formData.id}`, formData).then(_ => {
            this.processGroupList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:typeId', this._typeIdChanged))
    },

    deleteProcessGroup (scope) {
      this.$confirm('此操作将永久删除该工序组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`WorkGroups/${scope.row.id}`).then(_ => {
          this.processGroupList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    selelctRow (row) {
      this.groupCode = row.groupCode
    }
  },

  created () {
    Api.get('WorkShops')
      .then((workShops) => {
        this.workshopOptions = toOptions(workShops, 'wsid', 'wsName')
        this.formatterMap.wsid = toMap(workShops, 'wsid', 'wsName')
        Api.get(`WorkGroups`).then(data => {
          this.processGroupList = data
        })
      })
  }
}
</script>

<style scoped>
</style>
