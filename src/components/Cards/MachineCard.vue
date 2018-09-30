<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMachine" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMachine(selectMachine)" :disabled="machineDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMachine(selectMachine)" :disabled="machineDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="machineList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachine">
      <el-table-column label="设备编号">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.machine_code }}</span>
      </template>
      </el-table-column>
      <el-table-column prop="machine_name" label="设备名称">
        <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>编号: {{ scope.row.machine_code }}</p>
          <p>名称: {{ scope.row.machine_name }}</p>
          <p>部门: {{ scope.row.depart_name }}</p>
          <p>车间: {{ scope.row.ws_name }}</p>
          <p>时间: {{ scope.row.arrivaldate }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.machine_name }}</el-tag>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" width="60" :formatter="toState">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachineForm from '@/form/machine'

export default{
  name: 'MachineCard',
  props: {
    modelCode: {
      type: String,
      required: true
    },
    DepartmentOptions: {
      type: Array,
      required: true
    },
    WSCodeOptions: {
      type: Array,
      required: true
    }
  },

  computed: {
    disabled () {
      return !this.modelCode
    },

    machineDisabled () {
      return !this.selectMachine.id
    }
  },
  watch: {
    modelCode (value, oldValue) {
      this.machineList = []
      this.selectMachine = {}
      if (value) {
        this.getMachineList(value)
      }
    }
  },
  data () {
    return {
      machineList: [],
      selectMachine: {}
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    handleClickMachine (machine) {
      this.selectMachine = machine
      this.$emit('change', machine)
    },

    getMachineList (modelCode) {
      apis.getMachineListByModel({ model_code: modelCode }).then(data => {
        this.machineList = data
      })
    },

    addMachine () {
      getMachineForm({model_code: this.modelCode}, 'add', this.DepartmentOptions, this.WSCodeOptions)
        .then(form => this.$showForm(form).$on('submit', (machine, close) => {
          apis.addMachine(machine).then(machine => {
            this.machineList.push(machine)
            this.$emit('change', machine)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMachine (machine) {
      getMachineForm(machine, 'edit', this.DepartmentOptions, this.WSCodeOptions)
        .then(form => this.$showForm(form).$on('submit', (machine, close) => {
          apis.updateMachine(machine).then(machine => {
            const index = this.machineList.findIndex(b => b.id === machine.id)
            ~index && this.machineList.splice(index, 1, machine)
            this.$emit('change', machine)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMachine (machine) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachine(machine).then(_ => {
          const index = this.machineList.findIndex(b => b.id === machine.id)
          ~index && this.machineList.splice(index, 1)
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
