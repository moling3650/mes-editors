<template>
  <div id="ExTable">
    <div class="button-group"></div>
    <v-table
      style="width:100%"
      is-horizontal-resize
      is-vertical-resize
      :vertical-resize-offset='60'
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
import Api from '@/utils/Api'

export default {
  name: 'ExTable',
  props: {
    model: {
      type: String,
      required: true
    },
    cols: {
      type: Array,
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
    columns () {
      return [
        ...this.cols,
        {field: 'operation', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'ExTableOperation'}
      ]
    },
    tableData () {
      return this.rawData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
    }
  },
  methods: {
    pageChange (pageIndex) {
      this.pageIndex = pageIndex
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
    },
    rowClick (rowIndex, rowData) {
      this.currentRow = rowData
    },
    rowOperation ({ type, row, index }) {
      this[type](row, index)
    },
    edit (row, index) {
      console.log('edit')
    },
    delete (row, index) {
      this.$confirm('此操作将永久删除该行的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        // Api.delete(`Boms/${scope.row.bomId}`).then(_ => {
        this.rawData.splice((this.pageIndex - 1) * this.pageSize + index, 1)
        this.$message.success('删除成功!')
        // })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  created () {
    Api.get(this.model).then(data => {
      this.rawData = data
    })
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 10px;
}
</style>
