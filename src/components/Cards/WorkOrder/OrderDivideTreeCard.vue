<template>
  <el-card class="h450">
    <div slot="header" class="clearfix">
      <span class="card-header--text">
        拆分明细
        <el-button type="text" @click="save">保存</el-button>
      </span>
    </div>
    <v-tree class="tree" ref="tree" :data="treeData" :tpl="tpl"/>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
// import getForm from '@/form/workOrder/orderDetail'

export default {
  name: 'OrderDivideTreeCard',
  props: {
    workOrder: {
      type: Object,
      required: true
    },
    formatterMap: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    productOptions () {
      if (this.formatterMap.productCode) {
        return Object.entries(this.formatterMap.productCode).map(([value, label]) => ({value, label}))
      }
      return []
    },
    flowOptions () {
      if (this.formatterMap.flowCode) {
        return Object.entries(this.formatterMap.flowCode).map(([value, label]) => ({value, label}))
      }
      return []
    },
    formulaOptions () {
      if (this.formatterMap.formulaCode) {
        return Object.entries(this.formatterMap.formulaCode).map(([value, label]) => ({value, label}))
      }
      return []
    }
  },
  data () {
    return {
      treeData: [],
      flows: {},
      nodes: []
    }
  },

  watch: {
    workOrder: {
      handler (value, oldValue) {
        this.treeData = []
        if (value) {
          this.getTree(this.workOrder, this.flows).then(node => {
            this.treeData = [node]
          })
        }
      },
      immediate: false
    }
  },

  methods: {
    getNodes (nodes) {
      nodes.forEach(node => {
        if (node.children) {
          this.getNodes(node.children)
        }
        this.nodes.push(node.rawData)
      })
    },

    save () {
      this.nodes = []
      this.getNodes(this.treeData)
      Api.post('WorkOrders/SubOrders', this.nodes.filter(o => o.orderNo !== o.mainOrder)).then(_ => {
        this.$message.success('拆分成功')
      })
    },

    formatter (property, code) {
      return this.formatterMap && this.formatterMap[property] && this.formatterMap[property][code]
    },

    getChildData (parent, product, index) {
      const childNodeData = {
        mainOrder: parent.mainOrder,
        parentOrder: parent.orderNo,
        orderNo: `${parent.orderNo}-${index + 1}`,
        productCode: product.productCode,
        flowCode: product.flows[0].value,
        lvl: parent.lvl + 1,
        plannedTime: parent.plannedTime,
        qty: parent.qty,
        state: parent.state,
        flows: product.flows
      }
      return Promise.resolve(childNodeData)
    },

    getTree (data, flows) {
      const node = {
        title: data.orderNo + ' 工艺：' + data.flowCode + ' 成品：' + this.formatter('productCode', data.productCode),
        expanded: true,
        isEdit: data.flows && data.flows.length > 1,
        rawData: data
      }
      const products = flows[data.flowCode] || []
      return Promise.all(products.map((p, index) => {
        return this.getChildData(data, p, index).then(childNodeData => this.getTree(childNodeData, flows))
      })).then(children => {
        node.children = children
        return Promise.resolve(node)
      })
    },

    cancelSelected (nodes) {
      for (const node of nodes) {
        if (Array.isArray(node.children)) {
          this.cancelSelected(node.children)
        }
        this.$set(node, 'selected', false)
      }
    },

    nodeSelected (node) {
      console.log(node.rawData)
      const root = this.$refs.tree.data
      this.cancelSelected(root)
      this.$set(node, 'selected', !node.selected)
    },

    selectFlow (node) {
      const index = node.parent.children.indexOf(node)

      this.$showForm({
        title: '选择工艺流程',
        width: '500px',
        formItems: [
          {
            value: 'flowCode',
            label: '工艺流程',
            component: 'ex-select',
            options: node.rawData.flows,
            span: 22
          }
        ],
        formData: {
          flowCode: node.rawData.flowCode
        },
        rules: {
          flowCode: [{required: true}]
        }
      }).$on('submit', (formData, close) => {
        const data = JSON.parse(JSON.stringify(node.rawData))
        if (data.flowCode !== formData.flowCode) {
          data.flowCode = formData.flowCode
          this.getTree(data, this.flows).then(newNode => {
            this.$set(node.parent.children, index, newNode)
          })
        }
        close()
      })
    },

    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      return <span>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => this.nodeSelected(node)}></span>
        <el-button type="text" icon="el-icon-edit" style={{display: node.isEdit ? 'inline-block' : 'none'}} onClick={() => this.selectFlow(node)}/>
      </span>
    }
  },

  created () {
    Api.get('ProcessFlows/SubProcessFlows').then(flows => {
      this.flows = flows
      return this.getTree(this.workOrder, this.flows)
    }).then(node => {
      this.treeData = [node]
    })
  }
}
</script>

<style scoped>
.tree {
  padding: 0;
}
</style>
