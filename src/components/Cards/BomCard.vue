<template>
  <el-card class="h450">
    <div slot="header" class="clearfix">
      <span class="card-header--text">BOM</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBom">添加BOM</el-button>
    </div>
    <v-table style="width: 100%"
      is-horizontal-resize
      column-width-drag
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :columns="columns"
      :table-data="bomList"
      :row-click="handleClickBom"
      @on-custom-comp="handleTableOperation"/>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getBomForm from '@/form/bom'

export default {
  name: 'BomCard',
  provide: {
    btns: [
      { type: 'formula', icon: 'tickets' },
      { type: 'edit', icon: 'edit' },
      { type: 'delete', icon: 'delete' }
    ]
  },
  props: {
    productCode: {
      type: String,
      required: true
    },
    productOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.productCode
    }
  },
  data () {
    return {
      bomList: [],
      columns: [
        {field: 'bomCode', title: 'BOM', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true, overflowTitle: true},
        {field: 'versionCode', title: '版本', width: 50, titleAlign: 'center', columnAlign: 'center'},
        {field: 'enable', title: '状态', width: 50, titleAlign: 'center', columnAlign: 'center', formatter: this.formatter},
        {field: 'operation', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center', componentName: 'ExTableOperation'}
      ]
    }
  },
  watch: {
    productCode (value, oldValue) {
      this.bomList = []
      if (value) {
        this.getBomList(value)
      }
    }
  },
  methods: {
    formatter (rowData, rowIndex, pagingIndex, field) {
      return ['禁用', '启用'][rowData[field]] || '未知'
    },

    handleTableOperation ({type, row, index}) {
      const funMap = {
        formula: ({ row }) => this.$emit('skip', 'Formula', row),
        edit: this.editBom,
        delete: this.deleteBom
      }
      funMap[type] && funMap[type]({ row, index })
    },

    getBomList (productCode) {
      Api.get('Boms', { productCode }).then(boms => {
        this.bomList = boms
      })
    },

    addBom () {
      if (!this.productCode) {
        return void this.$message.info('请先选择产品')
      }
      getBomForm({productCode: this.productCode}, 'add', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.createTime = new Date()
          Api.post('Boms', formData).then(bom => {
            this.bomList.push(bom)
            this.$emit('change', bom)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editBom (scope) {
      getBomForm(scope.row, 'edit', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`Boms/${formData.bomId}`, formData).then(_ => {
            this.bomList.splice(scope.index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteBom (scope) {
      this.$confirm('此操作将永久删除该BOM, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`Boms/${scope.row.bomId}`).then(_ => {
          this.bomList.splice(scope.index, 1)
          this.$emit('update:bomDetail', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleClickBom (rowIndex, rowData, column) {
      this.$emit('change', rowData)
    }
  }
}
</script>

<style scoped>
</style>
