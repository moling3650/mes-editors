<template>
  <div id="BomEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-cascader v-model="product" :options="products" filterable @change="getBom" style="width: 100%;"/>
      </el-col>
      <el-col :span="6">
        <el-button type="success" icon="el-icon-plus" @click="openBomForm">添加Bom</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-card class="h600">
          <el-table :data="bomList" stripe style="width: 100%" @row-click="getBomDetail">
            <el-table-column prop="bom_code" label="BOM" width=""/>
            <el-table-column prop="version_code" label="版本" width="50"/>
            <el-table-column prop="enable" label="状态" width="50" :formatter="toState"/>
            <el-table-column fixed="right" label="操作" width="78" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button @click.stop="editBomForm(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                  <el-button @click.stop="deleteBomForm(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="h600 ova">
          <div slot="header" class="clearfix">
            <span>BOM清单： {{ bomCode }}</span>
            <el-button :disabled="!bomCode" icon="el-icon-plus" class="fl-r p3-0" type="text" size="medium" @click="addBomDetail">添加BOM明细</el-button>
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
        <el-card class="h600">
          <div slot="header" class="clearfix">
            <span>物料明细</span>
            <el-button v-show="detail.mat_name" class="fl-r p3-0" type="text">添加替代料</el-button>
          </div>
          <dl v-show="detail.mat_code">
            <dt>BOM编号：</dt>
            <dd>{{detail.bom_code}}</dd>
            <dt>物料编号：</dt>
            <dd>{{detail.mat_code}}</dd>
            <dt>物料名称：</dt>
            <dd>{{detail.mat_name}}</dd>
            <dt>物料类型：</dt>
            <dd>{{detail.mat_type === 1 ? '原材料' : '半成品'}}</dd>
            <dt>基础数量：</dt>
            <dd>{{detail.base_qty}}</dd>
            <dt>数量：</dt>
            <dd>{{detail.qty}}</dd>
            <dt>消耗：</dt>
            <dd>{{detail.wastage || 0}}</dd>
            <dt>是否管控：</dt>
            <dd>{{detail.be_ctrl === 1 ? '是' : '否'}}</dd>
            <dt>可否替代：</dt>
            <dd>{{detail.enable_Substitute === 1 ? '是' : '否'}}</dd>
          </dl>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import getBomForm from '../form/bom'
import getBomDetailForm from '../form/bomDetail'

export default {
  name: 'BomEditor',
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
      substitute: {},
      props: {
        label: 'mat_name',
        isLeaf (data, node) {
          return data.mat_type === 1
        }
      }
    }
  },
  methods: {
    editBomDetail (node, row) {
      getBomDetailForm(row, 'edit').then(form => this.$showForm(form).$on('submit', (form, done) => {
        this.submitBomDetailForm(form, () => {
          const children = node.parent.childNodes
          const index = children.findIndex(c => c.data.bom_detail_id === form.bom_detail_id)
          if (~index) {
            this.$set(children[index], 'data', form)
            this.$message.success('编辑成功!')
          } else {
            this.$message.danger('编辑失败!')
          }
          done()
        })
      }))
    },

    addBomDetail (row) {
      getBomDetailForm({ bom_code: this.bomCode }, 'add').then(form => this.$showForm(form).$on('submit', this.submitBomDetailForm))
    },

    submitBomDetailForm (form, done) {
      if (form.bom_detail_id) {
        apis.updateBomDetail(form).then(_ => {
          done()
        })
      } else {
      }
    },

    deleteBomForm (row) {
      this.$confirm('此操作将永久删除该BOM, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteBom(row).then(_ => {
          const index = this.bomList.findIndex(b => b.bom_id === row.bom_id)
          ~index && this.bomList.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    editBomForm (row) {
      getBomForm(row, 'edit').then(form => this.$showForm(form).$on('submit', this.submitBomForm))
    },

    toState (row, column, cellValue, index) {
      return ['禁用', '启用'][cellValue] || '未知'
    },

    openBomForm () {
      const bom = this.product.length ? { product_code: this.product[1] } : null
      getBomForm(bom, 'add').then(form => this.$showForm(form).$on('submit', this.submitBomForm))
    },

    submitBomForm (form, done) {
      if (form.bom_id) {
        apis.updateBom(form).then(_ => {
          const index = this.bomList.findIndex(bom => bom.bom_id === form.bom_id)
          ~index && this.bomList.splice(index, 1, form)
          done()
        })
      } else {
        apis.addBom(form).then(_ => {
          this.getBom([null, form.product_code])
          done()
        })
      }
    },

    handleNodeClick (node) {
      this.showSubstitute = false
      this.detail = node
      if (node.enable_Substitute) {
        apis.fetchSubstituteMaterial(node.bom_code, node.mat_code).then(data => {
          this.substitute = data.length ? data.pop() : {}
          this.showSubstitute = true
        })
      }
    },

    loadNode (node, resolve) {
      if (!node.data.mat_code || !this.versionCode) {
        return resolve([])
      }
      apis.fetchSubBom(node.data.mat_code, this.versionCode).then(data => resolve(data))
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
      this.substitute = {}
      if (!productCode) {
        return
      }
      apis.fetchBom(productCode).then(data => {
        this.bomList = data
      })
    },

    getBomDetail (bom) {
      this.detail = {}
      this.substitute = {}
      this.bomCode = bom.bom_code
      this.versionCode = bom.version_code
      apis.fetchBomDetail(bom.bom_code).then(data => {
        this.bomDetail = data
      })
    }
  },
  mounted () {
    apis.fetchProducts().then(data => {
      const products = {}
      data.forEach(item => {
        if (!products[item.typecode]) {
          products[item.typecode] = {
            value: item.typecode,
            label: item.type_name,
            children: []
          }
        }
        products[item.typecode].children.push({
          value: item.product_code,
          label: item.product_name
        })
      })
      this.products = Object.values(products)
    })
  }
}
</script>

<style scoped>
#BomEditor {
  margin: 5px;
}
.panel {
  height: 600px;
  border: 1px solid #333;
  border-radius: 5px;
  overflow-y: auto;
}
.row {
  margin: 15px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 100px;
  margin-top: -20px;
}
.h600 {
  height: 600px;
}
.ova {
  overflow: auto;
}
.fl-r {
  float: right;
}
.p3-0 {
  padding: 3px 0%;
}
.edit, .delete {
  padding: 3px 5px;
  border: 1px solid;
  border-radius: 5px;
  margin: 0 5px;
}
.edit {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.edit:hover {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.delete {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4
}
.delete:hover {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
