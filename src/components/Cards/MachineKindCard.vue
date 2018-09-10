<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备类别管理</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMachineKind">添加类别</el-button>
    </div>
    <el-table :data="machineKindList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachineKind">
      <el-table-column prop="kind_name" label="类别名称"/>
      <el-table-column prop="description" label="说明"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editMachineKind(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteMachineKind(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
    typeId: {
      type: [Number, String],
      required: true
    // },
    // typeOptions: {
    //   type: Array,
    //   required: true
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    }
  },
  watch: {
    typeId (value, oldValue) {
      this.machineKindList = []
      if (value) {
        this.getMachineKindList(value)
      }
    }
  },
  data () {
    return {
      machineKindList: []
    }
  },
  methods: {
    handleClickMachineKind () {

    },

    getMachineKindList (typeId) {
      apis.fetchMachineKindListByType({ type_id: typeId }).then(data => {
        this.machineKindList = data
      })
    },

    addMachineKind () {
      getMachineKindForm({type_id: this.typeId}, 'add', this.typeOptions)
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
