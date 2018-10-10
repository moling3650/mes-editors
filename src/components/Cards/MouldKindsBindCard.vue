<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备模具型号绑定列表</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMouldKindsBind" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMouldKindsBind(selectMouldKindsBind)" :disabled="modelDisabeld"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMouldKindsBind(selectMouldKindsBind)" :disabled="modelDisabeld"/>
      </el-button-group>
    </div>
    <el-table :data="mouldKindsBindList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMouldModel">
      <el-table-column prop="model_kind_id" label="模具类别ID"/>
      <el-table-column prop="qty" label="数量"/>
      <el-table-column prop="parameter" label="参数"/>
      <el-table-column prop="description" label="说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldKindsBindForm from '@/form/mouldKindsBind'

export default {
  name: 'MouldKindsBindCard',
  props: {
    MachinekindId: {
      type: [Number, String],
      required: true
    },
    MouldKindOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.MachinekindId
    },
    modelDisabeld () {
      return !this.selectMouldKindsBind.id
    }
  },
  data () {
    return {
      mouldKindsBindList: [],
      selectMouldKindsBind: {}
    }
  },
  watch: {
    MachinekindId (value, oldValue) {
      this.mouldKindsBindList = []
      this.selectMouldKindsBind = {}
      if (value) {
        this.getMouldKindsBindList(value)
      }
    }
  },
  methods: {

    getMouldKindsBindList (MachinekindId) {
      apis.fetchMouldKindsBindListByKind({ machineKindId: MachinekindId }).then(data => {
        this.mouldKindsBindList = data
      })
    },

    addMouldKindsBind () {
      if (!this.MachinekindId) {
        return void this.$message.info('请先选择类别')
      }
      getMouldKindsBindForm({machine_kind_id: this.MachinekindId}, 'add', this.MouldKindOptions)
        .then(form => this.$showForm(form).$on('submit', (mouldKindsBind, close) => {
          mouldKindsBind.machineKindId = this.MachinekindId
          apis.addMouldKindsBind(mouldKindsBind).then(mouldKindsBind => {
            this.mouldKindsBindList.push(mouldKindsBind)
            this.$emit('change', mouldKindsBind)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMouldKindsBind (row) {
      getMouldKindsBindForm(row, 'edit', this.MouldKindOptions)
        .then(form => this.$showForm(form).$on('submit', (mouldKindsBind, close) => {
          apis.updateMouldModel(mouldKindsBind).then(mouldKindsBind => {
            const index = this.mouldKindsBindList.findIndex(b => b.id === mouldKindsBind.id)
            ~index && this.mouldKindsBindList.splice(index, 1, mouldKindsBind)
            this.selectMouldKindsBind = {}
            this.$emit('change', mouldKindsBind)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMouldKindsBind (mouldKindsBind) {
      this.$confirm('此操作将永久删除该型号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMouldKindsBind(mouldKindsBind).then(_ => {
          const index = this.mouldKindsBindList.findIndex(b => b.id === mouldKindsBind.id)
          ~index && this.mouldKindsBindList.splice(index, 1)
          this.selectMouldKindsBind = {}
          this.$emit('change', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickMouldModel (mouldKindsBind) {
      this.selectMouldKindsBind = mouldKindsBind
      this.$emit('change', mouldKindsBind)
    }
  }
}
</script>

<style scoped>
</style>
