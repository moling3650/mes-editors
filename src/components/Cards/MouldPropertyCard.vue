<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">类别属性管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMouldProperty" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMouldProperty(selectMouldProperty)" :disabled="propertyDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMouldProperty(selectMouldProperty)" :disabled="propertyDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="mouldPropertyList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMouldProperty">
      <el-table-column prop="ppt_name" label="属性名称"/>
      <el-table-column prop="ppt_type" label="属性类型" :formatter="toPropertyType"/>
      <el-table-column prop="description" label="属性说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldPropertyForm from '@/form/mouldProperty'

export default{
  name: 'MouldPropertyCard',
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
      return !this.selectMouldProperty.ppt_id
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.mouldPropertyList = []
      this.selectMouldProperty = {}
      if (value) {
        this.getMouldPropertyList(value)
      }
    }
  },
  data () {
    return {
      mouldPropertyList: [],
      selectMouldProperty: {}
    }
  },
  methods: {

    toPropertyType (row, column, cellValue, index) {
      return ['一般属性', '匹配属性'][cellValue] || '未知'
    },

    handleClickMouldProperty (mouldProperty) {
      this.selectMouldProperty = mouldProperty
      this.$emit('change', mouldProperty)
    },

    getMouldPropertyList (kindId) {
      apis.getMouldPropertyListByKind({ kind_id: kindId }).then(data => {
        this.mouldPropertyList = data
      })
    },

    addMouldProperty () {
      getMouldPropertyForm({kind_id: this.kindId}, 'add')
        .then(form => this.$showForm(form).$on('submit', (mouldProperty, close) => {
          apis.addMouldProperty(mouldProperty).then(mouldProperty => {
            this.mouldPropertyList.push(mouldProperty)
            this.$emit('change', mouldProperty)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMouldProperty (mouldProperty) {
      getMouldPropertyForm(mouldProperty, 'edit')
        .then(form => this.$showForm(form).$on('submit', (mouldProperty, close) => {
          apis.updateMouldProperty(mouldProperty).then(mouldProperty => {
            const index = this.mouldPropertyList.findIndex(b => b.ppt_id === mouldProperty.ppt_id)
            ~index && this.mouldPropertyList.splice(index, 1, mouldProperty)
            this.$emit('change', mouldProperty)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMouldProperty (mouldProperty) {
      this.$confirm('此操作将永久删除该类别属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMouldProperty(mouldProperty).then(_ => {
          const index = this.mouldPropertyList.findIndex(b => b.ppt_id === mouldProperty.ppt_id)
          ~index && this.mouldPropertyList.splice(index, 1)
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
