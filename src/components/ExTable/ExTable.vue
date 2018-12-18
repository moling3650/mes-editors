<template>
  <div id="ExTable">
    <div class="button-group">
      <el-button type="primary" size="mini" plain icon="el-icon-plus" @click="add">添加</el-button>
    </div>
    <v-table
      class="v-table"
      style="width: 100%;"
      is-horizontal-resize
      is-vertical-resize
      :vertical-resize-offset="60"
      :multiple-sort="false"
      :min-height="350"
      even-bg-color="#f2f2f2"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :paging-index="(pageIndex - 1) * pageSize"
      :row-click="rowClick"
      @on-custom-comp="rowOperation"
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
      pageIndex: 1,
      pageSize: 10,
      rawData: [],
      currentRow: null
    }
  },
  computed: {
    ...mapGetters(['opts', 'dictMap']),
    columns () {
      return [
        ...this.model.cols.map(col => {
          if (col.formatter) {
            col.formatter = this.formatter
          }
          return col
        }),
        {field: 'operation', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'ExTableOperation'}
      ]
    },
    tableData () {
      return this.rawData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
    }
  },
  methods: {
    formatter (rowData, index, pagingIndex, field) {
      return this.dictMap[field][rowData[field]]
    },

    getRowIndex (index) {
      return (this.pageIndex - 1) * this.pageSize + index
    },

    pageChange (pageIndex) {
      this.pageIndex = pageIndex
    },

    pageSizeChange (pageSize) {
      this.pageSize = pageSize
    },

    rowClick (rowIndex, rowData) {
      this.currentRow = rowData
      this.$emit('row-click', rowData)
    },

    rowOperation ({ type, row, index }) {
      this[type](row, index)
    },

    add () {
      this.model.getForm(null, 'add', this.opts).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.post(this.model.name, formData).then(newItem => {
          this.rawData.push(newItem)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },

    edit (row, index) {
      this.model.getForm(row, 'edit', this.opts).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.put(`${this.model.name}/${row[this.model.pk]}`, formData).then(_ => {
          this.rawData.splice(this.getRowIndex(index), 1, formData)
          this.$message.success('更新成功!')
          close()
        })
      }))
    },

    delete (row, index) {
      this.$confirm('此操作将永久删除该行的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`${this.model.name}/${row[this.model.pk]}`).then(item => {
          this.rawData.splice(this.getRowIndex(index), 1)
          if (this.currentRow[this.model.pk] === item[this.model.pk]) {
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
    Api.get(this.model.name).then(data => {
      this.rawData = data
    })
  }
}
</script>

<style scoped>
.v-table {
  margin: 10px auto;
}
</style>
