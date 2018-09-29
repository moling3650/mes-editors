<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工装型号列表</span>
      <el-button type="primary" :disabled="modelDisabeld" icon="el-icon-edit" size="mini" @click="editWorkToolModel(selectWorkToolModel)"></el-button>
        <el-button type="danger" :disabled="modelDisabeld" icon="el-icon-delete" size="mini" @click="deleteWorkToolModel(selectWorkToolModel)"></el-button>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addWorkToolModel">添加型号</el-button>
    </div>
    <el-table :data="workToolModelList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickWorkToolModel">
      <el-table-column prop="model_code" label="型号编号" width="100"/>
      <el-table-column prop="manufacturer" label="制造商" width="80"/>
      <el-table-column prop="made_in" label="产地" width="50"/>
      <el-table-column prop="description" label="说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getWorkToolModelForm from '@/form/workToolModel'

export default {
  name: 'WorkToolModelCard',
  props: {
    kindId: {
      type: [Number, String],
      required: true
    },
    kindOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.kindId
    },
    modelDisabeld () {
      return !this.selectWorkToolModel.id
    }
  },
  data () {
    return {
      workToolModelList: [],
      selectWorkToolModel: {}
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.workToolModelList = []
      this.selectWorkToolModel = {}
      if (value) {
        this.getWorkToolModelList(value)
      }
    }
  },
  methods: {

    getWorkToolModelList (kindId) {
      apis.fetchWorkToolModelListByKind({ kind_id: kindId }).then(data => {
        this.workToolModelList = data
      })
    },

    addWorkToolModel () {
      if (!this.kindId) {
        return void this.$message.info('请先选择类别')
      }
      getWorkToolModelForm({kind_id: this.kindId}, 'add', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (workToolModel, close) => {
          workToolModel.kind_id = this.kindId
          apis.addWorkToolModel(workToolModel).then(workToolModel => {
            this.workToolModelList.push(workToolModel)
            this.$emit('change', workToolModel)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editWorkToolModel (row) {
      getWorkToolModelForm(row, 'edit', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (workToolModel, close) => {
          apis.updateWorkToolModel(workToolModel).then(workToolModel => {
            const index = this.workToolModelList.findIndex(b => b.id === workToolModel.id)
            ~index && this.workToolModelList.splice(index, 1, workToolModel)
            this.$emit('change', workToolModel)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteWorkToolModel (workToolModel) {
      this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteWorkToolModel(workToolModel).then(_ => {
          const index = this.workToolModelList.findIndex(b => b.id === workToolModel.id)
          ~index && this.workToolModelList.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickWorkToolModel (workToolModel) {
      this.selectWorkToolModel = workToolModel
      this.$emit('change', workToolModel)
    }
  }
}
</script>

<style scoped>
</style>
