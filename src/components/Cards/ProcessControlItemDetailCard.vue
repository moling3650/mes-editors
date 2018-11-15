<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序管控细则管理</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addControlItemDetail">添加细则</el-button>
    </div>
    <el-table :data="ControlItemDetailList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="driveCode" label="驱动名称" :formatter="formatter"/>
      <el-table-column prop="parameter" label="参数"/>
      <el-table-column prop="triggerType" label="触发类型" :formatter="formatter"/>
      <el-table-column prop="triggerCondition" label="触发条件">
        <template slot-scope="scope">
          {{scope.row.triggerCondition}} {{['秒', '次'][scope.row.triggerType]}}
        </template>
      </el-table-column>
      <el-table-column prop="ucl" label="上限值"/>
      <el-table-column prop="lcl" label="下限值"/>
      <el-table-column prop="groupCount" label="组距"/>
      <el-table-column prop="toMonitor" label="是否监视" :formatter="formatter"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editControlItemDetail(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteControlItemDetail(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
      ControlItemDetailList: [],
      controlOptions: [],
      driveOptions: [],
      controlId: 0
    }
  },
  watch: {
    pId: {
      handler (value, oldValue) {
        this.ControlItemDetailList = []
        if (value) {
          this.fetchOptions().then(_ => this.fetchPoints(value))
        }
      },
      immediate: true
    },

    processFrom: {
      handler (value, oldValue) {
        if (value) {
          Api.get(`ProcessControlItems`, { processCode: value }).then(data => {
            if (data.length) {
              this.controlId = data[0].processCode
            }
          })
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
      return Api.get('Drives', { driveClass: 3 })
        .then(drives => {
          console.log(drives)
          this.driveOptions = toOptions(drives, 'driveCode', 'driveName')
          this.formatterMap.driveCode = toMap(drives, 'driveCode', 'driveName')
        })
    },

    // 数据点列表
    fetchPoints (pId) {
      Api.get(`ProcessControlItemDetails`, { pId }).then(data => {
        this.ControlItemDetailList = data
      })
    },

    addControlItemDetail () {
      getControlItemDetailForm(null, 'add', this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.controlId = this.controlId
          formData.pId = this.pId
          Api.post('ProcessControlItemDetails', formData).then(itemDetail => {
            this.ControlItemDetailList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:triggerType', (value, item, formItems) => {
          formItems[5].unit = ['秒', '次'][value]
        }))
    },

    editControlItemDetail (row) {
      getControlItemDetailForm(row, 'edit', this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`ProcessControlItemDetails/${formData.id}`, formData).then(_ => {
            const index = this.ControlItemDetailList.findIndex(b => b.id === formData.id)
            ~index && this.ControlItemDetailList.splice(index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:triggerType', (value, item, formItems) => {
          formItems[5].unit = ['秒', '次'][value]
        }))
    },

    deleteControlItemDetail (row) {
      this.$confirm('此操作将永久删除该管控细则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`ProcessControlItemDetails/${row.id}`).then(_ => {
          const index = this.ControlItemDetailList.findIndex(s => s.id === row.id)
          ~index && this.ControlItemDetailList.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    getControlItemDetailForm().then(form => {
      this.formatterMap.toMonitor = toMap(form.formItems[7].options, 'value', 'label')
      this.formatterMap.triggerType = toMap(form.formItems[4].options, 'value', 'label')
    })
  }
}
</script>

<style scoped>
</style>
