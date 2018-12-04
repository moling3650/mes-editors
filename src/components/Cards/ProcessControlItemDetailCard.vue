<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序管控细则管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addControlItemDetail">添加细则</el-button>
    </div>
    <el-table :data="controlItemDetails" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="controlId" label="管控项" :formatter="formatter"/>
      <el-table-column prop="ucl" label="上限值"/>
      <el-table-column prop="lcl" label="下限值"/>
      <el-table-column prop="groupCount" label="组距"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editControlItemDetail(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteControlItemDetail(scope)" type="text" icon="el-icon-delete" size="mini"/>
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
import getControlItemDetailForm from '@/form/processControlItemDetail'
export default {
  name: 'ProcessControlItemDetailCard',
  props: {
    pId: {
      type: Number,
      required: true
    },
    processFrom: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.processFrom
    }
  },
  data () {
    return {
      formatterMap: {},
      controlItemDetails: [],
      controlOptions: [],
      controlId: 0
    }
  },
  watch: {
    pId: {
      handler (value, oldValue) {
        this.controlItemDetails = []
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
      return Api.get('ProcessControlItems', {processCode: this.processFrom})
        .then((processLists) => {
          this.controlOptions = toOptions(processLists, 'id', 'controlName')
          this.formatterMap.controlId = toMap(processLists, 'id', 'controlName')
        })
    },

    // 数据点列表
    fetchPoints (pId) {
      Api.get(`ProcessControlItemDetails`, { pId }).then(data => {
        this.controlItemDetails = data
      })
    },

    addControlItemDetail () {
      console.log(this.controlOptions)
      getControlItemDetailForm({pid: this.pId}, 'add', this.controlOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('ProcessControlItemDetails', formData).then(itemDetail => {
            this.controlItemDetails.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editControlItemDetail (scope) {
      getControlItemDetailForm(scope.row, 'edit', this.controlOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`ProcessControlItemDetails/${formData.id}`, formData).then(_ => {
            this.controlItemDetails.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteControlItemDetail (scope) {
      this.$confirm('此操作将永久删除该管控细则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`ProcessControlItemDetails/${scope.row.id}`).then(_ => {
          this.controlItemDetails.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>
</style>
