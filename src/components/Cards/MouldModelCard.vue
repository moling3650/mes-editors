<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">模具型号列表</span>
      <el-button type="primary" :disabled="modelDisabeld" icon="el-icon-edit" size="mini" @click="editMouldModel(selectMouldModel)"></el-button>
        <el-button type="danger" :disabled="modelDisabeld" icon="el-icon-delete" size="mini" @click="deleteMouldModel(selectMouldModel)"></el-button>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMouldModel">添加型号</el-button>
    </div>
    <el-table :data="mouldModelList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMouldModel">
      <el-table-column prop="model_code" label="型号编号"/>
      <el-table-column prop="manufacturer" label="制造商"/>
      <el-table-column prop="made_in" label="产地"/>
      <el-table-column prop="description" label="说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldModelForm from '@/form/mouldModel'

export default {
  name: 'MouldModelCard',
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
      return !this.selectMouldModel.id
    }
  },
  data () {
    return {
      mouldModelList: [],
      selectMouldModel: {}
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.mouldModelList = []
      this.selectMouldModel = {}
      if (value) {
        this.getMouldModelList(value)
      }
    }
  },
  methods: {

    getMouldModelList (kindId) {
      apis.fetchMouldModelListByKind({ kind_id: kindId }).then(data => {
        this.mouldModelList = data
      })
    },

    addMouldModel () {
      if (!this.kindId) {
        return void this.$message.info('请先选择类别')
      }
      getMouldModelForm({kind_id: this.kindId}, 'add', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (mouldModel, close) => {
          mouldModel.kind_id = this.kindId
          apis.addMouldModel(mouldModel).then(mouldModel => {
            this.mouldModelList.push(mouldModel)
            this.$emit('change', mouldModel)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMouldModel (row) {
      getMouldModelForm(row, 'edit', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (mouldModel, close) => {
          apis.updateMouldModel(mouldModel).then(mouldModel => {
            const index = this.mouldModelList.findIndex(b => b.id === mouldModel.id)
            ~index && this.mouldModelList.splice(index, 1, mouldModel)
            this.$emit('change', mouldModel)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMouldModel (mouldModel) {
      this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMouldModel(mouldModel).then(_ => {
          const index = this.mouldModelList.findIndex(b => b.id === mouldModel.id)
          ~index && this.mouldModelList.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickMouldModel (mouldModel) {
      this.selectMouldModel = mouldModel
      this.$emit('change', mouldModel)
    }
  }
}
</script>

<style scoped>
</style>
