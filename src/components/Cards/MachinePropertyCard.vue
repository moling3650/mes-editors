<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">类别属性管理</span>
      <el-button-group class="fl-r p3-0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMachineProperty" :disabled="disabled"/>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editMachineProperty(selectMachineProperty)" :disabled="propertyDisabled"/>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMachineProperty(selectMachineProperty)" :disabled="propertyDisabled"/>
      </el-button-group>
    </div>
    <el-table :data="machinePropertyList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickMachineProperty">
      <el-table-column prop="ppt_name" label="属性名称"/>
      <el-table-column prop="ppt_type" label="属性类型" :formatter="toPropertyType"/>
      <el-table-column prop="description" label="属性说明"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachinePropertyForm from '@/form/machineProperty'

export default{
  name: 'MachinePropertyCard',
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
      return !this.selectMachineProperty.ppt_id
    }
  },
  watch: {
    kindId (value, oldValue) {
      this.machinePropertyList = []
      this.selectMachineProperty = {}
      if (value) {
        this.getMachinePropertyList(value)
      }
    }
  },
  data () {
    return {
      machinePropertyList: [],
      selectMachineProperty: {}
    }
  },
  methods: {

    toPropertyType (row, column, cellValue, index) {
      return ['一般属性', '匹配属性'][cellValue] || '未知'
    },

    handleClickMachineProperty (machineProperty) {
      this.selectMachineProperty = machineProperty
      this.$emit('change', machineProperty)
    },

    getMachinePropertyList (kindId) {
      apis.getMachinePropertyListByKind({ kind_id: kindId }).then(data => {
        this.machinePropertyList = data
      })
    },

    addMachineProperty () {
      getMachinePropertyForm({kind_id: this.kindId}, 'add')
        .then(form => this.$showForm(form).$on('submit', (machineProperty, close) => {
          apis.addMachineProperty(machineProperty).then(machineProperty => {
            this.machinePropertyList.push(machineProperty)
            this.$emit('change', machineProperty)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMachineProperty (machineProperty) {
      getMachinePropertyForm(machineProperty, 'edit')
        .then(form => this.$showForm(form).$on('submit', (machineProperty, close) => {
          apis.updateMachineProperty(machineProperty).then(machineProperty => {
            const index = this.machinePropertyList.findIndex(b => b.ppt_id === machineProperty.ppt_id)
            ~index && this.machinePropertyList.splice(index, 1, machineProperty)
            this.$emit('change', machineProperty)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMachineProperty (machineProperty) {
      this.$confirm('此操作将永久删除该类别属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteMachineProperty(machineProperty).then(_ => {
          const index = this.machinePropertyList.findIndex(b => b.ppt_id === machineProperty.ppt_id)
          ~index && this.machinePropertyList.splice(index, 1)
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
