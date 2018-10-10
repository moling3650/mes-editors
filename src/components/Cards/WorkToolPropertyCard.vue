<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">类别属性管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addWorkToolProperty" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editWorkToolProperty(selectWorkToolProperty)" :disabled="propertyDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteWorkToolProperty(selectWorkToolProperty)" :disabled="propertyDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="workToolPropertyList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickWorkToolProperty">
      <el-table-column prop="ppt_name" label="属性名称"/>
      <el-table-column prop="ppt_type" label="属性类型" :formatter="toPropertyType"/>
      <el-table-column prop="description" label="属性说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getWorkToolPropertyForm from '@/form/workTool/workToolProperty'

export default{
  name: 'WorkToolPropertyCard',
  props: {
    kindId: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    disabled () {
      return !this.kindId
    },

    propertyDisabled () {
      return !this.selectWorkToolProperty.ppt_id
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.workToolPropertyList = []
      this.selectWorkToolProperty = {}
      if (value) {
        this.getWorkToolPropertyList(value)
      }
    }
  },
  data () {
    return {
      workToolPropertyList: [],
      selectWorkToolProperty: {}
    }
  },
  methods: {

    toPropertyType (row, column, cellValue, index) {
      return ['一般属性', '匹配属性'][cellValue] || '未知'
    },

    handleClickWorkToolProperty (workToolProperty) {
      this.selectWorkToolProperty = workToolProperty
      this.$emit('change', workToolProperty)
    },

    getWorkToolPropertyList (kindId) {
      apis.getWorkToolPropertyListByKind({ kind_id: kindId }).then(data => {
        this.workToolPropertyList = data
      })
    },

    addWorkToolProperty () {
      getWorkToolPropertyForm({kind_id: this.kindId}, 'add')
        .then(form => this.$showForm(form).$on('submit', (workToolProperty, close) => {
          apis.addWorkToolProperty(workToolProperty).then(workToolProperty => {
            this.workToolPropertyList.push(workToolProperty)
            this.$emit('change', workToolProperty)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editWorkToolProperty (workToolProperty) {
      getWorkToolPropertyForm(workToolProperty, 'edit')
        .then(form => this.$showForm(form).$on('submit', (workToolProperty, close) => {
          apis.updateWorkToolProperty(workToolProperty).then(workToolProperty => {
            const index = this.workToolPropertyList.findIndex(b => b.ppt_id === workToolProperty.ppt_id)
            ~index && this.workToolPropertyList.splice(index, 1, workToolProperty)
            this.$emit('change', workToolProperty)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteWorkToolProperty (workToolProperty) {
      this.$confirm('此操作将永久删除该类别属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteWorkToolProperty(workToolProperty).then(_ => {
          const index = this.workToolPropertyList.findIndex(b => b.ppt_id === workToolProperty.ppt_id)
          ~index && this.workToolPropertyList.splice(index, 1)
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
