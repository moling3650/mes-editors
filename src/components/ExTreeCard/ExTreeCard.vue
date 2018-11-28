<template>
  <el-card :style="{ height }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
      <el-button type="text" size="mini" icon="el-icon-plus" @click="append($refs.tree.root)">
        {{ toAppendText(0) }}
      </el-button>
    </div>
    <div class="tree-wrap" :style="{ height: `${parseInt(height) - 40}px`, overflowY: 'auto' }">
      <el-tree :data="treeData" :props="props" :load="loadNode" :expand-on-click-node="false" lazy ref="tree" highlight-current @node-click="handleNodeClick">
        <span class="tree-node" slot-scope="{ node, data }">
          <font-awesome-icon :icon="['', 'folder', 'star', 'tag', 'chevron-right'][node.level]"/>
          <span :class="{ leaf: node.level === 4 }">{{ node.label }}</span>
          <span v-if="node.level < 4">
            <el-button type="text" size="mini" icon="el-icon-plus" @click="() => append(node)">
              {{ toAppendText(node.level) }}
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import forms from '@/form'

export default {
  name: 'ExTreeCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '500px'
    },
    optionMap: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      currentNode: null,
      treeData: [],
      props: {
        isLeaf (data, node) {
          return node.level > 3
        }
      }
    }
  },
  computed: {
    modelKey () {
      return this.model[0].toLowerCase() + this.model.substr(1)
    },
    modelName () {
      const nameMap = {
        Machine: '设备',
        WorkTool: '工装',
        Mould: '模具'
      }
      return nameMap[this.model] || '未知'
    }
  },
  methods: {
    _getModel (level) {
      const modelTypes = ['Type', 'Kind', 'Model', '']
      return `${this.model}${modelTypes[level]}s`
    },

    _getKey (level) {
      return ['typeId', 'kindId', 'modelCode', `${this.modelKey}Code`][level]
    },

    _getLabelKey (level) {
      return ['typeName', 'kindName', 'modelCode', `${this.modelKey}Name`][level]
    },

    _getLabel (item, level) {
      return item[this._getLabelKey(level)]
    },

    _addLabel (item, level) {
      return Object.assign({ label: this._getLabel(item, level) }, item)
    },

    loadNode (node, resolve) {
      if (node.level > 3) {
        return resolve([])
      }
      const params = {}
      if (node.level) {
        const key = this._getKey(node.level - 1)
        params[key] = node.data[key]
      }
      Api.get(this._getModel(node.level), node.data).then(data => {
        if (node.level) {
          return resolve(data.map(item => this._addLabel(item, node.level)))
        } else {
          this.treeData.push(...data.map(item => this._addLabel(item, node.level)))
        }
      })
    },

    _updateChildNodes (node, newItem) {
      if (!node.level) {
        this.treeData.push(this._addLabel(newItem, node.level))
        return
      }
      if (!node.loaded) {
        return
      }
      const nodes = []
      if (!node.data.children) {
        this.$set(node.data, 'children', [])
      }
      if (!node.data.children.length) {
        nodes.push(...node.childNodes.map(n => this._addLabel(n.data, node.level)))
      }
      nodes.push(this._addLabel(newItem, node.level))
      node.data.children.push(...nodes)
    },

    append (node) {
      const modelType = this._getModel(node.level)
      const data = {}
      // const options = []
      const key = this._getKey(node.level - 1)
      // const labelKey = this._getLabelKey(node.level - 1)
      data[key] = node.data[key]
      // options.push({ value: node.data[key], label: node.data[labelKey] })
      const departments = this.optionMap && this.optionMap.departments
      const workShops = this.optionMap && this.optionMap.workShops
      forms[modelType](data, 'add', departments, workShops).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.post(modelType, formData).then(newItem => {
          this._updateChildNodes(node, newItem)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },

    updateCurrentNode (data) {
      if (!this.currentNode) {
        return
      }
      const parent = this.currentNode.parent
      if (parent.level && !parent.data.children) {
        this.$set(parent.data, 'children', [])
      }
      const children = parent.level ? parent.data.children : parent.data
      if (!children.length) {
        children.push(...parent.childNodes.map(n => this._addLabel(n.data, parent.level)))
      }
      const key = this._getKey(parent.level)
      const index = children.findIndex(item => item[key] === data[key])
      children.splice(index, 1, this._addLabel(data, parent.level))
      const isLeaf = this.currentNode.isLeaf
      this.$nextTick(_ => {
        this.currentNode = parent.childNodes[index]
        this.currentNode.isLeaf = isLeaf
      })
    },

    removeCurrentNode () {
      if (!this.currentNode) {
        return
      }
      const parent = this.currentNode.parent
      const childNodes = parent.childNodes
      const nodeIndex = childNodes.findIndex(n => n.id === this.currentNode.id)
      childNodes.splice(nodeIndex, 1)
      parent.isLeaf = !childNodes.length
      const children = parent.data.children || parent.data
      if (Array.isArray(children)) {
        const key = this._getKey(parent.level)
        const index = children.findIndex(item => item[key] === this.currentNode.data[key])
        children.splice(index, 1)
      }
      this.currentNode = null
    },

    handleNodeClick (data, node) {
      if (this.currentNode && this.currentNode.id === node.id) {
        return
      }
      const model = this._getModel(node.level - 1)
      this.currentNode = node
      const {label, children, ...nodeData} = data
      this.$emit('change', model, nodeData)
    },

    toAppendText (level) {
      const types = ['类型', '类别', '型号', '']
      return `${this.modelName}${types[level]}`
    }
  }
}
</script>

<style scoped>
.leaf {
  color: blue;
  font-size: 12px;
}
</style>
