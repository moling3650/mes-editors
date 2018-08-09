<template>
  <div id="BomEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-select v-model="code" filterable placeholder="请选择BOM" @change="getBom">
          <el-option
            v-for="item in products"
            :key="item.bom_code"
            :label="`${item.product_name} ${item.version_code}`"
            :value="`${item.bom_code}__${item.version_code}`">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <div class="panel">
          <el-tree :data="bom" :props="props" :expand-on-click-node="false"
            node-key="id" :load="loadNode" lazy @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{detail.mat_name || '先选择物料'}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <dl>
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
            <dd>{{detail.wastage}}</dd>
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

export default {
  name: 'BomEditor',
  data () {
    return {
      versionCode: '',
      products: [],
      code: '',
      bom: [],
      detail: {},
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
      this.detail = node
    },

    loadNode (node, resolve) {
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

    getBom (codes) {
      if (!codes) {
        return
      }
      const [bomCode, version] = codes.split('__')
      this.versionCode = version
      apis.fetchBom(bomCode).then(data => {
        this.bom = data
      })
    }
  },
  mounted () {
    apis.fetchProducts().then(data => {
      this.products = data
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
  overflow-y: scroll;
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
</style>
