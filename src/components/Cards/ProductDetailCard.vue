<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">成品维护</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addProduct">添加驱动</el-button>
    </div>
    <el-table :data="products" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="productCode" label="成品编号"/>
      <el-table-column prop="productName" label="成品名称"/>
      <el-table-column prop="versionCode" label="版本编号"/>
      <el-table-column prop="cmn" label="客户料号"/>
      <el-table-column prop="codeRule" label="条码规则"/>
      <el-table-column prop="maxQty" label="最大值"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column prop="mbm" label="是否拆分" :formatter="toIsNot"/>
      <el-table-column prop="printBind" label="是否打印" :formatter="toIsNot"/>
      <el-table-column prop="spt" label="标准生产用时"/>
      <el-table-column prop="modelCode" label="型号"/>
      <el-table-column prop="wipValid" label="wip有效时间"/>
      <el-table-column prop="stationValid" label="工位有效时间"/>
      <el-table-column prop="manageType" label="管理类型" :formatter="toManageType"/>
      <el-table-column prop="lvl" label="排序"/>
      <el-table-column prop="inputTime" label="录入时间"/>
      <el-table-column prop="description" label="说明"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editProduct(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteProduct(scope)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getDriveForm from '@/form/drive'

export default {
  name: 'ProductDetailCard',
  props: {
    pedigree: {
      type: Object,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.pedigree
    }
  },
  data () {
    return {
      products: []
    }
  },
  watch: {
    'pedigree' (value, oldValue) {
      this.products = []
      if (value) {
        this.fetchProducts(value)
      }
    }
  },
  methods: {

    toIsNot (row, column, cellValue, index) {
      return ['否', '是'][cellValue] || '未知'
    },

    toManageType (row, column, cellValue, index) {
      return ['配方管理', 'BOM管理'][cellValue] || '未知'
    },

    // 成品列表
    fetchProducts (pedigree) {
      Api.get('Products', { pedigreeCode: pedigree.pedigreeCode, typeCode: pedigree.productTypeCode }).then(data => {
        this.products = data
      })
    },

    addProduct () {
      getDriveForm(null, 'add')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.pedigreeCode = this.pedigreeCode
          Api.post('Products', formData).then(drive => {
            this.products.push(drive)
            this.$emit('change', drive)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editProduct (scope) {
      getDriveForm(scope.row, 'edit')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`Products/${formData.productId}`, formData).then(_ => {
            this.products.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteProduct (scope) {
      this.$confirm('此操作将永久删除该成品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`Products/${scope.row.productId}`).then(_ => {
          this.products.splice(scope.$index, 1)
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
