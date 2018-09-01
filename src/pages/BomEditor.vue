<template>
  <div id="BomEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader v-model="product" :options="products" placeholder="请选择产品" filterable @change="getBom" class="w100p"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-card class="h600">
          <div slot="header" class="card-header clearfix">
            <span class="card-header">BOM</span>
            <el-button :disabled="!product.length" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBom">添加BOM</el-button>
          </div>
          <el-table :data="bomList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickBom">
            <el-table-column prop="bom_code" label="BOM" width=""/>
            <el-table-column prop="version_code" label="版本" width="50"/>
            <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
            <el-table-column fixed="right" label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button @click.stop="editBom(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                  <el-button @click.stop="deleteBom(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <BomDetailTreeCard :bomCode="bomCode" :version="versionCode" :bomDetail.sync="detail"></BomDetailTreeCard>
      </el-col>

      <el-col :span="8">
        <BomDetailCard :detail="detail"></BomDetailCard>
        <SubstituteCard :detail="detail"></SubstituteCard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import getBomForm from '@/form/bom'
import BomDetailTreeCard from '@/components/Cards/BomDetailTreeCard'
import BomDetailCard from '@/components/Cards/BomDetailCard'
import SubstituteCard from '@/components/Cards/SubstituteCard'

export default {
  name: 'BomEditor',
  components: {
    BomDetailTreeCard,
    BomDetailCard,
    SubstituteCard
  },
  data () {
    return {
      bomCode: '',
      versionCode: '',
      product: [],
      products: [],
      bomList: [],
      detail: {}
    }
  },
  computed: {
    productOptions () {
      const options = []
      this.products.forEach(item => options.push(...item.children))
      return options
    }
  },
  methods: {

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    addBom () {
      const [, productCode] = this.product
      if (!productCode) {
        return void this.$message.info('请先选择产品')
      }
      getBomForm({product_code: productCode}, 'add', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (bom, close) => {
          bom.create_time = new Date()
          apis.addBom(bom).then(bom => {
            this.bomList.push(bom)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editBom (row) {
      getBomForm(row, 'edit', this.productOptions)
        .then(form => this.$showForm(form).$on('submit', (bom, close) => {
          apis.updateBom(bom).then(bom => {
            const index = this.bomList.findIndex(b => b.bom_id === bom.bom_id)
            ~index && this.bomList.splice(index, 1, bom)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteBom (bom) {
      this.$confirm('此操作将永久删除该BOM, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteBom(bom).then(_ => {
          const index = this.bomList.findIndex(b => b.bom_id === bom.bom_id)
          ~index && this.bomList.splice(index, 1)
          this.bomCode = ''
          this.detail = {}
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    getBom ([typeCode, productCode]) {
      this.bomCode = ''
      this.detail = {}
      if (!productCode) {
        return
      }
      apis.fetchBom(productCode).then(data => {
        this.bomList = data
      })
    },

    handleClickBom (bom) {
      this.detail = {}
      this.bomCode = bom.bom_code
      this.versionCode = bom.version_code
    }
  },
  mounted () {
    apis.fetchProductCascaderOptions().then(options => {
      this.products = options
    })
  }
}
</script>

<style scoped>
#BomEditor {
  margin: 5px;
}
</style>
