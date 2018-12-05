<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序管控项</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addControlItem">添加管控项</el-button>
    </div>
    <el-table :data="ProcessControlItemList" stripe header-cell-class-name="thcell" highlight-current-row size="mini" class="w100p">
      <el-table-column prop="controlName" label="管控项名称"/>
      <el-table-column prop="processCode" label="所属工序" :formatter="formatter"/>
      <el-table-column prop="inputTime" label="建立时间"/>
      <el-table-column prop="discription" label="备注信息"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editControlItem(scope)" type="text" icon="el-icon-edit" size="mini"></el-button>
            <el-button @click.stop="deleteControlItem(scope)" type="text" icon="el-icon-delete" size="mini"></el-button>
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
import getProcessControlItemForm from '@/form/ProcessControlItem'
export default {
  name: 'ProcessControlItemCard',
  props: {
    processCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.processCode
    }
  },
  data () {
    return {
      formatterMap: {},
      ProcessControlItemList: [],
      processOptions: []
    }
  },
  watch: {
    processCode: {
      handler (value, oldValue) {
        this.ProcessControlItemList = []
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
      return Api.get('ProcessLists').then(processs => {
        this.processOptions = toOptions(processs, 'processCode', 'processName')
        this.formatterMap.processCode = toMap(processs, 'processCode', 'processName')
      })
    },

    // 步骤列表
    fetchPoints (processCode) {
      Api.get(`ProcessControlItems`, { processCode }).then(data => {
        this.ProcessControlItemList = data
      })
    },

    addControlItem () {
      getProcessControlItemForm({processCode: this.processCode}, 'add', this.processOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('ProcessControlItems', formData).then(itemDetail => {
            this.ProcessControlItemList.push(itemDetail)
            this.$emit('change', itemDetail)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editControlItem (scope) {
      getProcessControlItemForm(scope.row, 'edit', this.processOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`ProcessControlItems/${formData.id}`, formData).then(_ => {
            this.ProcessControlItemList.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteControlItem (scope) {
      this.$confirm('此操作将永久删除该管控项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`ProcessControlItems/${scope.row.id}`).then(_ => {
          this.ProcessControlItemList.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
  },

  created () {
  }
}
</script>

<style scoped>
</style>
