<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">BOM清单： {{ bomCode }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBomDetail">添加BOM明细</el-button>
    </div>
    <v-tree class="tree" ref="tree" :data="treeData" :tpl="tpl" @async-load-nodes='loadNodes'/>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toMap from '@/utils/toMap'
// import getForm from '@/form/bomDetail'

export default {
  name: 'BomDetailTreeCard',
  props: {
    bomCode: {
      type: String,
      required: true
    },
    version: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.bomCode
    }
  },
  data () {
    return {
      loaded: false,
      uid: 0,
      treeData: [],
      names: []
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

    addBomDetail () {},
    getBomDetails (bomCode) {
      Api.get('BomDetails', { bomCode }).then(data => {
        this.treeData = data.map(item => {
          return {
            id: item.bomDetailId,
            title: this.names[item.matType] && this.names[item.matType][item.matCode],
            expanded: false,
            async: !item.matType,
            rawData: item
          }
        })
      })
    },

    search () {
      this.$refs.tree.searchNodes(this.searchword)
    },

    checkNode () {

    },

    editNode (node) {

    },

    deleteNode (node, parent, index) {
      this.$refs.tree.delNode(node, parent, index)
    },

    loadNodes (node) {
      this.$set(node, 'loading', true)
      Api.get('BomDetails', { productCode: node.rawData.matCode, version: this.version }).then(data => {
        const nodes = data.map(item => {
          return {
            id: item.bomDetailId,
            title: this.names[item.matType] && this.names[item.matType][item.matCode],
            async: !item.matType,
            rawData: item
          }
        })
        this.addNodes(node, nodes)
        this.$set(node, 'loading', false)
      })
    },

    // tpl (node, ctx, parent, index, props) {
    tpl (node, ctx, parent, index) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      return <span>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => this.nodeSelected(node)}></span>
        <el-button type="text" icon="el-icon-edit" onClick={() => this.editNode(node)}/>
        <el-button type="text" icon="el-icon-delete" onClick={() => this.deleteNode(node, parent, index)}/>
      </span>
    }
  },

  mounted () {
    Api.get('Products').then(products => {
      this.names[0] = toMap(products, 'productCode', 'productName')
    })
    Api.get('Materials').then(materials => {
      this.names[1] = toMap(materials, 'matCode', 'matName')
    })
  }
}
</script>

<style scoped>
.tree {
  padding: 0;
}
</style>
