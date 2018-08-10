<template>
  <div id="BomEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-cascader :options="products" filterable @change="getBom" style="width: 100%;"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-card class="h600">
          <el-table :data="bom" stripe style="width: 100%" @row-click="getBomDetail">
            <el-table-column prop="bom_code" label="BOM" width=""/>
            <el-table-column prop="version_code" label="版本" width="50"/>
            <el-table-column prop="enable" label="状态" width="50"/>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="h600 ovya">
          <el-tree :data="bomDetail" :props="props" :expand-on-click-node="false"
            node-key="id" :load="loadNode" lazy @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="h600">
          <div slot="header" class="clearfix">
            <span>{{detail.mat_name || '先选择物料'}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
            <template v-if="showSubstitute">
              <dt>替代料编号：</dt>
              <dd>{{substitute.sCode}}</dd>
              <dt>替代料名称：</dt>
              <dd>{{substitute.sName}}</dd>
            </template>
          </dl>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'BomEditor',
  data () {
    return {
      showSubstitute: false,
      versionCode: '',
      products: [],
      bom: [],
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

    append (data) {
      const newChild = { id: 1000, mat_code: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    getBom ([typeCode, productCode]) {
      this.bomDetail = []
      this.detail = {}
      this.substitute = {}
      if (!productCode) {
        return
      }
      apis.fetchBom(productCode).then(data => {
        this.bom = data
      })
    },

    getBomDetail (bom) {
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
dd {
  margin-left: 100px;
  margin-top: -20px;
}
.h600 {
  height: 600px;
}
.ovya {
  overflow-y: auto;
}
</style>
