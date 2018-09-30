<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工装管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addWorkTool" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editWorkTool(selectWorkTool)" :disabled="workToolDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteWorkTool(selectWorkTool)" :disabled="workToolDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="workToolList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickWorkTool">
      <el-table-column label="工装编号">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.workTool_code }}</span>
      </template>
      </el-table-column>
      <el-table-column prop="workTool_name" label="工装名称">
        <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>编号: {{ scope.row.workTool_code }}</p>
          <p>名称: {{ scope.row.workTool_name }}</p>
          <p>库房: {{ scope.row.storage_room }}</p>
          <p>存放位置: {{ scope.row.store_place }}</p>
          <p>使用位置: {{ scope.row.use_place }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.workTool_name }}</el-tag>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" :formatter="toState" width="60">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getWorkToolForm from '@/form/workTool'

export default{
  name: 'WorkToolCard',
  props: {
    modelCode: {
      type: String,
      required: true
    }

  },

  computed: {
    disabled () {
      return !this.modelCode
    },

    workToolDisabled () {
      return !this.selectWorkTool.id
    }
  },
  watch: {
    modelCode (value, oldValue) {
      this.workToolList = []
      this.selectWorkTool = {}
      if (value) {
        this.getWorkToolList(value)
      }
    }
  },
  data () {
    return {
      workToolList: [],
      selectWorkTool: {}
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    handleClickWorkTool (workTool) {
      this.selectWorkTool = workTool
      this.$emit('change', workTool)
    },

    getWorkToolList (modelCode) {
      apis.getWorkToolListByModel({ model_code: modelCode }).then(data => {
        this.workToolList = data
      })
    },

    addWorkTool () {
      getWorkToolForm({model_code: this.modelCode}, 'add')
        .then(form => this.$showForm(form).$on('submit', (workTool, close) => {
          apis.addWorkTool(workTool).then(workTool => {
            this.workToolList.push(workTool)
            this.$emit('change', workTool)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editWorkTool (workTool) {
      getWorkToolForm(workTool, 'edit')
        .then(form => this.$showForm(form).$on('submit', (workTool, close) => {
          apis.updateWorkTool(workTool).then(workTool => {
            const index = this.workTool.findIndex(b => b.id === workTool.id)
            ~index && this.workToolList.splice(index, 1, workTool)
            this.$emit('change', workTool)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteWorkTool (workTool) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteWorkTool(workTool).then(_ => {
          const index = this.workToolList.findIndex(b => b.id === workTool.id)
          ~index && this.workToolList.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }

  }
}
</script>
