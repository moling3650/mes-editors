<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">模具类别管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMouldKind" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMouldKind(selectMouldKind)" :disabled="kindDisabeld"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMouldKind(selectMouldKind)" :disabled="kindDisabeld"/>
      </el-button-group>
    </div>
    <el-table :data="mouldKindList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMouldKind">
      <el-table-column prop="kind_name" label="类别名称"/>
      <el-table-column prop="description" label="类别说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldKindForm from '@/form/mouldKind'

export default{
  name: 'MouldKindCard',
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
      return !this.selectMouldKind.kind_id
    }
  },
  watch: {
    typeId (value, oldValue) {
      this.mouldKindList = []
      this.selectMouldKind = {}
      if (value) {
        this.getMouldKindList(value)
      }
    }
  },
  data () {
    return {
      mouldKindList: [],
      selectMouldKind: {}
    }
  },
  methods: {
    handleClickMouldKind (mouldKind) {
      this.selectMouldKind = mouldKind
      this.$emit('change', mouldKind)
    },

    getMouldKindList (typeId) {
      apis.fetchMouldKindListByType({ type_id: typeId }).then(data => {
        this.mouldKindList = data
      })
    },

    addMouldKind () {
      getMouldKindForm({type_id: this.typeId}, 'add', this.typeOptions)
        .then(form => this.$showForm(form).$on('submit', (mouldKind, close) => {
          apis.addMouldKind(mouldKind).then(mouldKind => {
            this.mouldKindList.push(mouldKind)
            this.$emit('change', mouldKind)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMouldKind (mouldKind) {
      getMouldKindForm(mouldKind, 'edit')
        .then(form => this.$showForm(form).$on('submit', (mouldKind, close) => {
          apis.updateMouldKind(mouldKind).then(mouldKind => {
            const index = this.mouldKindList.findIndex(b => b.kind_id === mouldKind.kind_id)
            ~index && this.mouldKindList.splice(index, 1, mouldKind)
            this.$emit('change', mouldKind)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMouldKind (mouldKind) {
      this.$confirm('此操作将永久删除该模具类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMouldKind(mouldKind).then(_ => {
          const index = this.mouldKindList.findIndex(b => b.kind_id === mouldKind.kind_id)
          ~index && this.mouldKindList.splice(index, 1)
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
