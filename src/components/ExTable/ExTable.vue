<template>
  <div id="ExTable">
    <div class="button-group">
      <el-button-group class="toolbar-left">
        <el-button size="mini" plain icon="el-icon-plus" @click="add" :disabled="needDefault && !defaultForm">添加</el-button>
        <el-button size="mini" plain icon="el-icon-edit" @click="edit" :disabled="!(currentRow || selection.length)">修改</el-button>
        <el-button size="mini" plain icon="el-icon-delete" @click="del" :disabled="!(currentRow || selection.length)">删除</el-button>
      </el-button-group>
      <slot :rowData="currentRow"></slot>
    </div>
    <v-table
      class="v-table"
      style="width: 100%;"
      is-horizontal-resize
      is-vertical-resize
      sort-always
      :is-loading="isLoading"
      :vertical-resize-offset="60"
      :multiple-sort="false"
      :min-height="450"
      :title-row-height="36"
      :row-height="29"
      even-bg-color="#fcfcfc"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#edf7ff"
      row-click-color="#edf7ff"
      :paging-index="(pageIndex - 1) * pageSize"
      :row-click="rowClick"
      :select-change="selectChange"
      :select-all="selectAll"
      @on-custom-comp="rowOperation"
      @sort-change="sortChange"
    />
    <v-pagination
      class="pagination"
      :total="rawData.length"
      :page-size="pageSize"
      :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/utils/Api'

export default {
  name: 'ExTable',
  props: {
    model: {
      type: Object,
      required: true
    },
    immediate: {
      type: Boolean,
      default: true
    },
    defaultForm: {
      type: Object,
      default: null
    },
    needDefault: {
      type: Boolean,
      default: false
    }
  },
  provide: {
    btns: [
      { type: 'edit', icon: 'edit' },
      { type: 'delete', icon: 'delete' }
    ]
  },
  data () {
    return {
      isLoading: false,
      pageIndex: 1,
      pageSize: 10,
      rawData: [],
      currentRow: null,
      currentIndex: 0,
      selection: []
    }
  },
  computed: {
    ...mapGetters(['opts', 'dictMap']),
    columns () {
      return [
        ...this.model.cols.map(col => {
          if (col.formatter) {
            const key = col.formatter
            if (typeof key === 'string') {
              col.formatter = (rowData, index, pagingIndex, field) => {
                if (!this.dictMap[key]) {
                  throw Error(`找不到[${key}]的转译器`)
                }
                return this.dictMap[key][rowData[field]] || ''
              }
            }
          }
          return col
        })
        // {field: 'operation', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'ExTableOperation'}
      ]
    },
    tableData () {
      return this.rawData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
    }
  },
  methods: {
    getSelection () {
      return JSON.parse(JSON.stringify(this.selection))
    },

    selectAll (selection) {
      this.selection = selection
    },

    selectChange (selection) {
      this.selection = selection
    },

    pushData (...rowsData) {
      this.rawData.push(...rowsData)
    },

    clear () {
      this.rawData = []
      this.currentRow = null
    },

    search (query) {
      this.clear()
      console.log(query)
      this.isLoading = true
      Api.get(this.model.name, query).then(data => {
        this.rawData = data
        this.isLoading = false
      })
    },

    // formatter (rowData, index, pagingIndex, field) {
    //   return this.dictMap[field][rowData[field]]
    // },

    getRowIndex (index) {
      return (this.pageIndex - 1) * this.pageSize + index
    },

    pageChange (pageIndex) {
      this.pageIndex = pageIndex
      this.currentIndex = 0
      this.currentRow = null
    },

    pageSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.currentIndex = 0
      this.currentRow = null
    },

    rowClick (rowIndex, rowData) {
      this.currentRow = rowData
      this.currentIndex = rowIndex
      this.$emit('row-click', rowData)
    },

    rowOperation ({ type, row, index }) {
      this[type](row, index)
    },

    sortChange (params) {
      const list = Object.entries(params).filter(([key, orderBy]) => orderBy)
      if (list.length) {
        const [field, orderBy] = list[0]
        if (orderBy === 'asc') {
          this.rawData = this.rawData.sort((a, b) => a[field] > b[field] ? 1 : -1)
        } else {
          this.rawData = this.rawData.sort((a, b) => a[field] > b[field] ? -1 : 1)
        }
      }
    },

    add () {
      this.model.getForm(this.defaultForm, 'add', this.opts).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        if (this.model.beforeSubmit) {
          formData = this.model.beforeSubmit(formData)
        }
        Api.post(this.model.name, formData).then(newItem => {
          this.rawData.push(newItem)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },

    edit () {
      const row = this.currentRow
      const index = this.currentIndex
      this.model.getForm(row, 'edit', this.opts).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        if (this.model.beforeSubmit) {
          formData = this.model.beforeSubmit(formData)
        }
        Api.put(`${this.model.name}/${row[this.model.pk]}`, formData).then(_ => {
          this.rawData.splice(this.getRowIndex(index), 1, formData)
          this.currentRow = formData
          this.$message.success('更新成功!')
          close()
        })
      }))
    },

    del () {
      const row = this.currentRow
      const index = this.currentIndex
      this.$confirm('此操作将永久删除该行的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`${this.model.name}/${row[this.model.pk]}`).then(item => {
          this.rawData.splice(this.getRowIndex(index), 1)
          if (this.currentRow[this.model.pk] === item[this.model.pk]) {
            this.currentRow = null
            this.$emit('row-click', null)
          }
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  created () {
    if (this.immediate) {
      this.search()
    }
  }
}
</script>

<style scoped>
.v-table {
  margin: 10px auto;
  font-size: 13px;
}

.v-table .v-table-header td {
  padding-left: 10px;
}
</style>
