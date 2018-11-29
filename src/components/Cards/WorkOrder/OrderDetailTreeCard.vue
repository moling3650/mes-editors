<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">
        <span v-show="!disabled">{{ mainOrder }}的明细</span>
      </span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addOrderDetail(null)">添加明细</el-button>
    </div>
    <v-tree class="tree" ref="tree" :data="treeData" :tpl="tpl"/>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getForm from '@/form/workOrder/orderDetail'

export default {
  name: 'OrderDetailTreeCard',
  props: {
    mainOrder: {
      type: String,
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
    disabled () {
      return !this.mainOrder
    },
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
    },
    workshopOptions () {
      if (this.formatterMap.wsCode) {
        return Object.entries(this.formatterMap.wsCode).map(([value, label]) => ({value, label}))
      }
      return []
    },
    employeeOptions () {
      if (this.formatterMap.empCode) {
        return Object.entries(this.formatterMap.empCode).map(([value, label]) => ({value, label}))
      }
      return []
    },
    stateOptions () {
      if (this.formatterMap.state) {
        return Object.entries(this.formatterMap.state).map(([value, label]) => ({value: parseInt(value), label}))
      }
      return []
    }
  },
  data () {
    return {
      treeData: []
    }
  },

  watch: {
    mainOrder: {
      handler (value, oldValue) {
        this.treeData = []
        if (value) {
          Api.get('WorkOrders', { mainOrder: value }).then(data => {
            const rootNode = data.find(n => n.orderNo === value)
            this.treeData = [this.getTree(rootNode, data)]
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    formatter (property, code) {
      return this.formatterMap && this.formatterMap[property] && this.formatterMap[property][code]
    },

    getTree (data, list) {
      const node = {
        id: data.id,
        title: data.orderNo + '<span style="color:blue;font-weight: bold;">成品：' + this.formatter('productCode', data.productCode) + '</span>',
        rawData: data,
        progress: data.cpltQty / data.qty * 100
      }
      const children = list.filter(item => item.parentOrder === data.orderNo)
      if (!children.length) {
        return node
      }
      node.children = children.map(item => this.getTree(item, list))
      return node
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
      const root = this.$refs.tree.data
      this.cancelSelected(root)
      this.$set(node, 'selected', !node.selected)
      this.$emit('update:orderDetail', node.rawData)
    },
    // 待完善
    addOrderDetail () {
      getForm(null, 'add', this.productOptions, this.flowOptions, this.stateOptions, this.formulaOptions, this.workshopOptions, this.employeeOptions).then(form => this.$showForm(form).$on('submit', (formData, close) => {
      }))
    },

    search () {
      this.$refs.tree.searchNodes(this.searchword)
    },

    checkNode () {

    },

    editNode (node) {
      node.rawData.formulaCode = node.rawData.formulaCode || ''
      node.rawData.qty = node.rawData.qty || 0
      node.rawData.cpltQty = node.rawData.cpltQty || 0
      getForm(node.rawData, 'edit', this.productOptions, this.flowOptions, this.stateOptions, this.formulaOptions, this.workshopOptions, this.employeeOptions).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.put(`WorkOrders/${formData.id}`, formData).then(_ => {
          const children = node.parent === null ? this.treeData : node.parent.children
          const index = children.indexOf(node)
          if (~index) {
            children.splice(index, 1, this.newNode(formData))
            this.$emit('update:orderDetail', formData)
          }
          close()
        })
      }))
    },

    deleteNode (node) {
      this.$confirm('此操作将永久删除该工单及子工单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`WorkOrders/${node.rawData.id}`).then(_ => {
          const children = node.parent === null ? this.treeData : node.parent.children
          const index = children.indexOf(node)
          if (~index) {
            children.splice(index, 1)
            this.$emit('change', {})
            this.$message.success('删除成功!')
          }
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      return <span>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => this.nodeSelected(node)}></span>
        <el-progress class="progress" text-inside={true} stroke-width={20} percentage={node.progress}/>
        <el-button type="text" icon="el-icon-edit" onClick={() => this.editNode(node)}/>
        <el-button type="text" icon="el-icon-delete" onClick={() => this.deleteNode(node)}/>
      </span>
    }
  }
}
</script>

<style scoped>
.tree {
  padding: 0;
}
.progress {
  display: inline-block;
  width: 100px;
}
</style>
