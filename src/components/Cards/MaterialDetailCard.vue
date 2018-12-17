<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">物料管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addMaterial">添加物料</el-button>
    </div>
    <el-table :data="MaterialList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="matCode" label="物料编号"/>
      <el-table-column prop="matName" label="物料名称"/>
      <el-table-column prop="codeRule" label="编码规则"/>
      <el-table-column prop="packingStyle" label="包装方式"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column prop="maxQty" label="最大数量"/>
      <el-table-column prop="inputDate" label="写入日期"/>
      <el-table-column prop="validDate" label="有效天数"/>
      <el-table-column prop="state" label="状态" :formatter="formatter"/>
      <el-table-column prop="enable" label="是否启用" :formatter="formatter"/>
      <el-table-column prop="mbm" label="最小批次" :formatter="formatter"/>
      <el-table-column prop="lvl" label="级别"/>
      <el-table-column prop="wipValid" label="线边仓有效期"/>
      <el-table-column prop="stationValid" label="工位仓有效期"/>
      <el-table-column prop="description" label="描述说明"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editMaterial(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteMaterial(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import toOptions from '@/utils/toOptions'
import toMap from '@/utils/toMap'
import Api from '@/utils/Api'
import getMaterialForm from '@/form/Material'
export default {
  name: 'MaterialDetailCard',
  props: {
    typeId: {
      type: Number,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    },

    item () {
      return {
        processCode: this.processCode
      }
    }
  },
  data () {
    return {
      formatterMap: {},
      MaterialList: [],
      groupOptions: [],
      materialTypeOptions: [],
      processCode: ''
    }
  },
  watch: {
    typeId: {
      handler (value, oldValue) {
        this.MaterialList = []
        if (value) {
          this.fetchOptions().then(_ => this.fetchPoints(value))
        }
      },
      immediate: true
    }
  },
  methods: {
    formatter (row, col, cell, index) {
      return this.formatterMap[col.property] && this.formatterMap[col.property][cell]
    },

    fetchOptions () {
      return Api.get('MachineTypes').then(materialTypes => {
        this.materialTypeOptions = toOptions(materialTypes, 'typeId', 'typeName')
        this.formatterMap.typeId = toMap(materialTypes, 'typeId', 'typeName')
      })
    },

    // 物料列表
    fetchPoints (typeId) {
      console.log(typeId)
      Api.get(`Materials`, { typeId }).then(data => {
        this.MaterialList = data
      })
    },

    addMaterial () {
      getMaterialForm({typeId: this.typeId}, 'add', this.materialTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.inputDate = new Date()
          Api.post('Materials', formData).then(itemDetail => {
            this.MaterialList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editMaterial (scope) {
      getMaterialForm(scope.row, 'edit', this.groupOptions, this.materialTypeOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`Materials/${formData.matId}`, formData).then(_ => {
            this.MaterialList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteMaterial (scope) {
      this.$confirm('此操作将永久删除该物料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`Materials/${scope.row.matId}`).then(_ => {
          this.MaterialList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    getMaterialForm().then(form => {
      this.formatterMap.state = toMap(form.formItems[6].options, 'value', 'label')
      this.formatterMap.enable = toMap(form.formItems[7].options, 'value', 'label')
      this.formatterMap.mbm = toMap(form.formItems[7].options, 'value', 'label')
    })
  },

  created () {
    Api.get(`MaterialTypes`).then(data => {
      this.materialTypeOptions = data
    })
  }
}
</script>

<style scoped>
</style>
