<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">模具管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMould" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMould(selectMould)" :disabled="mouldDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMould(selectMould)" :disabled="mouldDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="mouldList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMould">
      <el-table-column label="模具编号">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.mould_code }}</span>
      </template>
      </el-table-column>
      <el-table-column prop="mould_name" label="模具名称">
        <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>编号: {{ scope.row.mould_code }}</p>
          <p>名称: {{ scope.row.mould_name }}</p>
          <p>供应商: {{ scope.row.supplier }}</p>
          <p>说明: {{ scope.row.description }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.mould_name }}</el-tag>
          </div>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" :formatter="toState">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldForm from '@/form/mould'

export default{
  name: 'MouldCard',
  props: {
    modelCode: {
      type: String,
      required: true
    }
  },

  computed: {
    disabled () {
      return !this.modelCode
    },

    mouldDisabled () {
      return !this.selectMould.ID
    }
  },
  watch: {
    modelCode (value, oldValue) {
      this.mouldList = []
      this.selectMould = {}
      if (value) {
        this.getMouldList(value)
      }
    }
  },
  data () {
    return {
      mouldList: [],
      selectMould: {}
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    handleClickMould (mould) {
      this.selectMould = mould
      this.$emit('change', mould)
    },

    getMouldList (modelCode) {
      apis.getMouldListByModel({ model_code: modelCode }).then(data => {
        this.mouldList = data
      })
    },

    addMould () {
      getMouldForm({model_code: this.modelCode}, 'add')
        .then(form => this.$showForm(form).$on('submit', (mould, close) => {
          apis.addMould(mould).then(mould => {
            this.mouldList.push(mould)
            this.$emit('change', mould)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMould (mould) {
      getMouldForm(mould, 'edit')
        .then(form => this.$showForm(form).$on('submit', (mould, close) => {
          apis.updateMould(mould).then(mould => {
            const index = this.mouldList.findIndex(b => b.id === mould.id)
            ~index && this.mouldList.splice(index, 1, mould)
            this.$emit('change', mould)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMould (mould) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMould(mould).then(_ => {
          const index = this.mouldList.findIndex(b => b.id === mould.id)
          ~index && this.mouldList.splice(index, 1)
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
