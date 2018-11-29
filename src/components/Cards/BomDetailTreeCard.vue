<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">
        <span v-show="!disabled">{{ bomCode }}的明细</span>
        <span v-show="disabled">请先选择BOM</span>
      </span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBomDetail(null)">添加明细</el-button>
    </div>
    <v-tree class="tree" ref="tree" :data="treeData" :tpl="tpl" @async-load-nodes='loadNodes'/>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toMap from '@/utils/toMap'
import toOptions from '@/utils/toOptions'
import getForm from '@/form/bomDetail'

export default {
  name: 'BomDetailTreeCard',
  props: {
    bomCode: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      default: () => []
    },
    materials: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    disabled () {
      return !this.bomCode
    },
    prodeuctOpts () {
      return toOptions(this.products, 'productCode', 'productName')
    },
    materialOpts () {
      return toOptions(this.materials, 'matCode', 'matName')
    },
    units () {
      return Object.assign({}, toMap(this.products, 'productCode', 'unit'), toMap(this.materials, 'matCode', 'unit'))
    },
    names () {
      return [toMap(this.products, 'productCode', 'productName'), toMap(this.materials, 'matCode', 'matName')]
    }
  },
  data () {
    return {
      treeData: []
    }
  },
  watch: {
    bomCode (value, oldValue) {
      this.treeData = []
      if (value) {
        this.getBomDetails(value)
      }
    }
  },

  methods: {
    _matTypeChanged (matType, _, formItems, rules, form) {
      const options = matType ? this.materialOpts : this.prodeuctOpts
      formItems[2].options = options
      formItems[3].unit = ''
      formItems[4].unit = ''
      form.matCode = ''
    },

    _matCodeChanged (matCode, _, formItems) {
      const unit = this.units[matCode]
      formItems[3].unit = unit
      formItems[4].unit = unit
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
      const bomDetail = Object.assign({}, node.rawData)
      bomDetail.matName = this.names[bomDetail.matType][bomDetail.matCode]
      bomDetail.unit = this.units[bomDetail.matCode]
      this.$emit('update:bomDetail', bomDetail)
    },

    addNode (parent, newNode) {
      let addNode = null
      this.$set(parent, 'expanded', true)
      if (typeof newNode === 'undefined') {
        throw new ReferenceError('newNode is required but undefined')
      }
      if (typeof newNode === 'string') {
        addNode = { title: newNode }
      }
      if (typeof newNode === 'object' && !newNode.hasOwnProperty('title')) {
        throw new ReferenceError('the title property is missed')
      }
      if (typeof newNode === 'object' && newNode.hasOwnProperty('title')) {
        addNode = newNode
      }
      if (!parent.hasOwnProperty('children')) {
        this.$set(parent, 'children', [])
      }
      parent.children.push(addNode)
    },

    addNodes (parent, nodes) {
      for (let node of nodes) {
        this.addNode(parent, node)
      }
    },

    newNode (item) {
      return {
        id: item.bomDetailId,
        title: this.names[item.matType] && this.names[item.matType][item.matCode],
        expanded: false,
        async: !item.matType,
        rawData: item
      }
    },

    addBomDetail (node) {
      const bomCode = node ? node.rawData.bomCode : this.bomCode
      getForm({ bomCode }, 'add', this.prodeuctOpts).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.post('BomDetails', formData).then(item => {
          if (!node) {
            this.treeData.push(this.newNode(item))
          }
          close()
        })
      }).$on('update:matType', this._matTypeChanged).$on('update:matCode', this._matCodeChanged))
    },

    getBomDetails (bomCode) {
      Api.get('BomDetails', { bomCode }).then(data => {
        this.treeData = data.map(item => this.newNode(item))
      })
    },

    editNode (node) {
      const options = node.rawData.matType ? this.materialOpts : this.prodeuctOpts
      const unit = this.units[node.rawData.matCode]
      getForm(node.rawData, 'edit', options, unit).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.put(`BomDetails/${formData.bomDetailId}`, formData).then(_ => {
          const children = node.parent === null ? this.treeData : node.parent.children
          const index = children.indexOf(node)
          if (~index) {
            children.splice(index, 1, this.newNode(formData))
            this.$emit('update:bomDetail', formData)
          }
          close()
        })
      }).$on('update:matType', this._matTypeChanged).$on('update:matCode', this._matCodeChanged))
    },

    deleteNode (node) {
      this.$confirm('此操作将永久删除该BOM明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`BomDetails/${node.rawData.bomDetailId}`).then(_ => {
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

    loadNodes (node) {
      this.$set(node, 'loading', true)
      Api.get('BomDetails', { productCode: node.rawData.matCode }).then(data => {
        const nodes = data.map(item => this.newNode(item))
        this.addNodes(node, nodes)
        this.$set(node, 'loading', false)
      })
    },

    // tpl (node, ctx, parent, index, props) {
    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      return <span>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => this.nodeSelected(node)}></span>
        <el-button-group>
          <el-button type="text" icon="el-icon-edit" onClick={() => this.editNode(node)}/>
          <el-button type="text" icon="el-icon-delete" onClick={() => this.deleteNode(node)}/>
        </el-button-group>
      </span>
    }
  }
}
</script>

<style scoped>
.tree {
  padding: 0;
}
</style>
