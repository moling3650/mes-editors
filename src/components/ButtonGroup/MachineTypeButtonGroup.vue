<template>
  <div id="MachineTypeButtonGroup">
    <div class="select-wrap">
      <ex-select :options="machineTypeOptions" :value="typeId" clearable placeholder="请选择设备类型" @change="handleMachineTypeChange"/>
    </div>
    <el-button-group class="button-group">
      <el-button @click="addMachineType" type="primary" icon="el-icon-plus">设备类型</el-button>
      <el-button :disabled="disabled" @click="editMachineType" icon="el-icon-edit" type="primary"></el-button>
      <el-button :disabled="disabled" @click="deleteMachineType" icon="el-icon-delete" type="primary"></el-button>
    </el-button-group>
  </div>
</template>

<script>
import apis from '@/apis'
import getMachineTypeForm from '@/form/machineType'

export default {
  name: 'ReportButtonGroup',
  props: {
    typeId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      machineTypes: []
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    },
    machineTypeOptions () {
      return this.machineTypes.map(r => {
        return {
          value: r.type_id,
          label: r.type_name
        }
      })
    }
  },
  methods: {
    handleMachineTypeChange (typeId) {
      this.$emit('change', {type_id: typeId})
    },

    addMachineType () {
      getMachineTypeForm(null, 'add').then(form => this.$showForm(form).$on('submit', (machineType, close) => {
        apis.addMachineType(machineType).then(machineType => {
          this.machineTypes.push(machineType)
          this.$message.success('添加成功!')
          this.$emit('change', machineType)
          close()
        })
      }))
    },

    editMachineType () {
      const machineType = this.machineTypes.find(r => r.type_id === this.typeId)
      getMachineTypeForm(machineType, 'edit').then(form => this.$showForm(form).$on('submit', (machineType, close) => {
        apis.editMachineType(machineType).then(machineType => {
          const index = this.machineTypes.findIndex(r => r.type_id === machineType.type_id)
          ~index && this.machineTypes.splice(index, 1, machineType)
          this.$message.success('修改成功!')
          this.$emit('change', machineType)
          close()
        })
      }))
    },

    deleteMachineType () {
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachineType({ type_id: this.typeId }).then(_ => {
          const index = this.machineTypes.findIndex(r => r.type_id === this.typeId)
          ~index && this.machineTypes.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    apis.fetchMachineTypeList().then(machineTypes => {
      this.machineTypes = machineTypes
    })
  }
}
</script>

<style scoped>
#MachineTypeButtonGroup {
  position: relative;
}

.select-wrap {
  margin-right: 250px;
}

.button-group {
  position: absolute;
  top: 0;
  right: 0;
  width: 240px;
}
</style>
