<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备型号列表</span>
      <el-button-group class="fl-r  p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMachineModel" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMachineModel(selectMachine)" :disabled="modelDisabeld"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMachineModel(selectMachine)" :disabled="modelDisabeld"/>
      </el-button-group>
    </div>
    <el-table :data="machineModelList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachineModel">
      <el-table-column prop="model_code" label="型号编号"/>
      <el-table-column prop="manufacturer" label="制造商"/>
      <el-table-column prop="made_in" label="产地"/>
      <el-table-column prop="description" label="说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachineModelForm from '@/form/machine/machineModel'

export default {
  name: 'MachineModelCard',
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
      return !this.selectMachineModel.id
    }
  },
  data () {
    return {
      machineModelList: [],
      selectMachineModel: {}
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.machineModelList = []
      this.selectMachineModel = {}
      if (value) {
        this.getMachineModelList(value)
      }
    }
  },
  methods: {

    getMachineModelList (kindId) {
      apis.fetchMachineModelListByKind({ kind_id: kindId }).then(data => {
        this.machineModelList = data
      })
    },

    addMachineModel () {
      if (!this.kindId) {
        return void this.$message.info('请先选择类别')
      }
      getMachineModelForm({kind_id: this.kindId}, 'add', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (machineModel, close) => {
          machineModel.kind_id = this.kindId
          apis.addMachineModel(machineModel).then(machineModel => {
            this.machineModelList.push(machineModel)
            this.$emit('change', machineModel)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMachineModel (row) {
      getMachineModelForm(row, 'edit', this.kindOptions)
        .then(form => this.$showForm(form).$on('submit', (machineModel, close) => {
          apis.updateMachineModel(machineModel).then(machineModel => {
            const index = this.machineModelList.findIndex(b => b.id === machineModel.id)
            ~index && this.machineModelList.splice(index, 1, machineModel)
            this.$emit('change', machineModel)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMachineModel (machineModel) {
      this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachineModel(machineModel).then(_ => {
          const index = this.machineModelList.findIndex(b => b.id === machineModel.id)
          ~index && this.machineModelList.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickMachineModel (machineModel) {
      this.selectMachineModel = machineModel
      this.$emit('change', machineModel)
    }
  }
}
</script>

<style scoped>
</style>
