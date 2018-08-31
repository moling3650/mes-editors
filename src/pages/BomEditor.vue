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
          <el-table :data="bomList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="getBomDetail">
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
        <el-card class="h600 ova">
          <div slot="header" class="card-header clearfix">
            <span class="card-header">BOM清单： {{ bomCode }}</span>
            <el-button :disabled="!bomCode" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBomDetail">添加BOM明细</el-button>
          </div>
          <el-tree :data="bomDetail" :props="props" :expand-on-click-node="false"
            node-key="id" :load="loadNode" lazy @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span :style="{color: data.mat_type ? 'green' : 'blue'}">{{ node.label }}</span>
              <span>
                <el-button class="edit" type="text" icon="el-icon-edit" @click.stop="() => editBomDetail(node, data)">编辑</el-button>
                <el-button class="delete" type="text" icon="el-icon-delete" @click.stop="() => deleteBomDetail(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="8">
        <BomDetailCard :detail="detail"></BomDetailCard>

        <el-card class="h250">
          <div slot="header" class="card-header clearfix">
            <span class="card-header">替代料</span>
            <el-button :disabled="!detail.enable_Substitute" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addSubstitute">添加替代料</el-button>
          </div>
          <el-table :data="substitutes" stripe header-cell-class-name="thcell" size="mini" class="w100p">
            <el-table-column prop="Substitute_mat_code" label="替代料编号"/>
            <el-table-column prop="Substitute_mat_name" label="替代料名称"/>
            <el-table-column fixed="right" label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button @click.stop="editSubstitute(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                  <el-button @click.stop="deleteSubstitute(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import getBomForm from '@/form/bom'
import getBomDetailForm from '@/form/bomDetail'
import BomDetailCard from '@/components/Cards/BomDetailCard'

export default {
  name: 'BomEditor',
  components: {
    BomDetailCard,
  },
  data () {
    return {
      showSubstitute: false,
      bomCode: '',
      versionCode: '',
      product: [],
      products: [],
      bomList: [],
      bomDetail: [],
      detail: {},
      substitutes: [],
      props: {
        label: 'mat_name',
        isLeaf (data, node) {
          return data.mat_type === 1
        }
      }
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
    // 操作替代料
    addSubstitute () {
      const formData = {
        bom_code: this.detail.bom_code,
        mat_code: this.detail.mat_code
      }
      const optionsApi = this.detail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getSubstituteForm(formData, 'add', options))
        .then(form => this.$showForm(form).$on('submit', (substitute, close) => {
          apis.addSubstitute(substitute).then(substitute => {
            this.substitutes.push(substitute)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },

    editSubstitute (substitute) {
      const optionsApi = this.detail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getSubstituteForm(substitute, 'edit', options))
        .then(form => this.$showForm(form).$on('submit', (substitute, close) => {
          apis.updateSubstitute(form).then(substitute => {
            const index = this.substitutes.findIndex(s => s.id === substitute.id)
            ~index && this.substitutes.splice(index, 1, substitute)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },

    deleteSubstitute (substitute) {
      this.$confirm('此操作将永久删除该替代料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteSubstitute(substitute).then(_ => {
          const index = this.substitutes.findIndex(s => s.id === substitute.id)
          ~index && this.substitutes.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    editBomDetail (node, bomDetail) {
      const optionsApi = bomDetail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getBomDetailForm(bomDetail, 'add', options))
        .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
          bomDetail.wastage = bomDetail.wastage / 100
          apis.updateBomDetail(bomDetail).then(bomDetail => {
            const children = node.parent.childNodes
            const index = children.findIndex(c => c.data.bom_detail_id === bomDetail.bom_detail_id)
            if (~index) {
              bomDetail.wastage = bomDetail.wastage * 100
              this.$set(children[index], 'data', bomDetail)
              this.detail = bomDetail
              this.$message.success('编辑成功!')
            } else {
              this.$message.danger('编辑失败!')
            }
            close()
          })
        }))
    },

    addBomDetail (row) {
      this.$confirm('选择物料类型', '提示', {
        confirmButtonText: '半成品',
        cancelButtonText: '物料',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(_ => 0)
        .catch(action => action === 'cancel' ? 1 : Promise.reject(new Error('cancel')))
        .then(matType => {
          const optionsApi = matType ? 'fetchMaterialOptions' : 'fetchProductOptions'
          return apis[optionsApi]().then(options => getBomDetailForm({ bom_code: this.bomCode, mat_type: matType }, 'add', options))
        })
        .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
          bomDetail.wastage = bomDetail.wastage / 100
          apis.addBomDetail(bomDetail).then(detail => {
            detail.wastage = detail.wastage * 100
            this.bomDetail.push(detail)
            this.$message.success('添加成功!')
            close()
          })
        }).$on('update:mat_code', (matCode, item, formItems) => {
          const material = item.options.find(o => o.value === matCode)
          const unit = material.unit
          formItems[3].unit = unit
          formItems[4].unit = unit
        }))
    },

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
          this.bomDetail = []
          this.detail = {}
          this.substitutes = []
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleNodeClick (node) {
      this.substitutes = []
      this.detail = node
      if (node.enable_Substitute) {
        apis.fetchSubstituteMaterial(node.bom_code, node.mat_code).then(data => {
          this.substitutes = data
        })
      }
    },

    loadNode (node, resolve) {
      if (!node.data.mat_code || !this.versionCode) {
        return resolve([])
      }
      apis.fetchSubBom(node.data.mat_code, this.versionCode).then(data => {
        data.map(item => {
          item.wastage = item.wastage * 100
          return item
        })
        return resolve(data)
      })
    },

    deleteBomDetail (node, data) {
      this.$confirm('此操作将永久删除该BOM明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteBomDetail(data).then(_ => {
          const children = node.parent.childNodes
          const index = children.findIndex(c => c.data.bom_detail_id === data.bom_detail_id)
          ~index && children.splice(index, 1)
          this.detail = {}
          this.substitutes = []
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    getBom ([typeCode, productCode]) {
      this.bomCode = ''
      this.bomDetail = []
      this.detail = {}
      this.substitutes = []
      if (!productCode) {
        return
      }
      apis.fetchBom(productCode).then(data => {
        this.bomList = data
      })
    },

    getBomDetail (bom) {
      this.detail = {}
      this.substitutes = []
      this.bomCode = bom.bom_code
      this.versionCode = bom.version_code
      apis.fetchBomDetail(bom.bom_code).then(data => {
        data.map(item => {
          item.wastage = item.wastage * 100
          return item
        })
        this.bomDetail = data
      })
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
