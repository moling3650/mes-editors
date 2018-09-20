<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备类型管理</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMachineType">添加类型</el-button>
    </div>
    <el-table :data="machineTypeList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachineType">
      <el-table-column prop="type_name" label="类型名称"/>
      <el-table-column prop="description" label="说明"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editMachineType(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteMachineType(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachineTypeForm from '@/form/machineType'

export default{
  name: 'MachineType',
  data () {
    return {
      machineTypeList: []
    }
  },
  methods: {
    handleClickMachineType (machineType) {
      this.$emit('change', machineType)
    },

    addMachineType () {
      getMachineTypeForm(null, 'add')
        .then(form => this.$showForm(form).$on('submit', (machineType, close) => {
          apis.addMachineType(machineType).then(machineType => {
            this.machineTypeList.push(machineType)
            this.$emit('change', machineType)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMachineType (machineType) {
      getMachineTypeForm(machineType, 'edit')
        .then(form => this.$showForm(form).$on('submit', (machineType, close) => {
          apis.updateMachineType(machineType).then(machineType => {
            const index = this.machineTypeList.findIndex(b => b.type_id === machineType.type_id)
            ~index && this.machineTypeList.splice(index, 1, machineType)
            this.$emit('change', machineType)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMachineType (machineType) {
      this.$confirm('此操作将永久删除该设备类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachineType(machineType).then(_ => {
          const index = this.machineTypeList.findIndex(b => b.type_id === machineType.type_id)
          ~index && this.machineTypeList.splice(index, 1)
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }

  },
  mounted () {
    apis.fetchMachineTypeList().then(data => {
      this.machineTypeList = data
    })
  }
}

</script>
