<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工装类别管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addWorkToolKind" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editWorkToolKind(selectWorkToolKind)" :disabled="kindDisabeld"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteWorkToolKind(selectWorkToolKind)" :disabled="kindDisabeld"/>
      </el-button-group>
    </div>
    <el-table :data="workToolKindList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickWorkToolKind">
      <el-table-column prop="kind_name" label="类别名称"/>
      <el-table-column prop="description" label="类别说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getWorkToolKindForm from '@/form/workToolKind'

export default{
  name: 'WorkToolKindCard',
  props: {
    typeId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    },
    kindDisabeld () {
      return !this.selectWorkToolKind.kind_id
    }
  },
  watch: {
    typeId (value, oldValue) {
      this.workToolKindList = []
      this.selectWorkToolKind = {}
      if (value) {
        this.getWorkToolKindList(value)
      }
    }
  },
  data () {
    return {
      workToolKindList: [],
      selectWorkToolKind: {}
    }
  },
  methods: {
    handleClickWorkToolKind (workToolKind) {
      this.selectWorkToolKind = workToolKind
      this.$emit('change', workToolKind)
    },

    getWorkToolKindList (typeId) {
      apis.fetchWorkToolKindListByType({ type_id: typeId }).then(data => {
        this.workToolKindList = data
      })
    },

    addWorkToolKind () {
      getWorkToolKindForm({type_id: this.typeId}, 'add', this.typeOptions)
        .then(form => this.$showForm(form).$on('submit', (workToolKind, close) => {
          apis.addWorkToolKind(workToolKind).then(workToolKind => {
            this.workToolKindList.push(workToolKind)
            this.$emit('change', workToolKind)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editWorkToolKind (workToolKind) {
      getWorkToolKindForm(workToolKind, 'edit')
        .then(form => this.$showForm(form).$on('submit', (workToolKind, close) => {
          apis.updateWorkToolKind(workToolKind).then(workToolKind => {
            const index = this.workToolKindList.findIndex(b => b.kind_id === workToolKind.kind_id)
            ~index && this.workToolKindList.splice(index, 1, workToolKind)
            this.$emit('change', workToolKind)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteWorkToolKind (workToolKind) {
      this.$confirm('此操作将永久删除该工装类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteWorkToolKind(workToolKind).then(_ => {
          const index = this.workToolKindList.findIndex(b => b.kind_id === workToolKind.kind_id)
          ~index && this.workToolKindList.splice(index, 1)
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
