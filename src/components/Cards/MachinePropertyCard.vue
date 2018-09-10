<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">类别属性管理</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMachineProperty">添加类别属性</el-button>
    </div>
    <el-table :data="machinePropertyList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachineProperty">
      <el-table-column prop="kind_name" label="属性名称"/>
      <el-table-column prop="description" label="属性说明"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editMachineProperty(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteMachineProperty(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachineKindForm from '@/form/machineKind'

export default{
  name: 'MachineKindCard',
  props: {
    kindId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.kindId
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.machinePropertyList = []
      if (value) {
        this.getMachinePropertyList(value)
      }
    }
  },
  data () {
    return {
      getMachinePropertyList: []
    }
  },
  methods: {
    handleClickMachineKind () {

    },

    getMachinePropertyList (kindId) {
      apis.getMachinePropertyListByKind({ kind_id: kindId }).then(data => {
        this.getMachinePropertyList = data
      })
    },

    addMachineProperty () {
      getMachinePropertyForm({kind_id: this.kindId}, 'add')
        .then(form => this.$showForm(form).$on('submit', (machineKind, close) => {
          apis.addMachineKind(machineKind).then(machineKind => {
            this.machineKindList.push(machineKind)
            this.$emit('change', machineKind)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMachineKind (machineKind) {
      getMachineKindForm(machineKind, 'edit')
        .then(form => this.$showForm(form).$on('submit', (machineKind, close) => {
          apis.updateMachineKind(machineKind).then(machineKind => {
            const index = this.machineKindList.findIndex(b => b.kind_id === machineKind.kind_id)
            ~index && this.machineKindList.splice(index, 1, machineKind)
            this.$emit('change', machineKind)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMachineKind (machineKind) {
      this.$confirm('此操作将永久删除该设备类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachineKind(machineKind).then(_ => {
          const index = this.machineKindList.findIndex(b => b.kind_id === machineKind.kind_id)
          ~index && this.machineKindList.splice(index, 1)
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
