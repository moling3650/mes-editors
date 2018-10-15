<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
      <el-button type="text" size="mini" icon="el-icon-plus" @click="append($refs.tree.root)">
        {{ toAppendText(0) }}
      </el-button>
    </div>
    <el-tree :data="treeData" :props="props" :load="loadNode" :expand-on-click-node="false" lazy ref="tree" highlight-current @node-click="handleNodeClick">
      <span class="tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="node.level < 4">
          <el-button type="text" size="mini" icon="el-icon-plus" @click="() => append(node)">
            {{ toAppendText(node.level) }}
          </el-button>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import apis from '@/apis'
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
      default: '100%'
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
      return this.model + ['Type', 'Kind', 'Model', ''][level]
    },

    _getLabel (item, level) {
      const key = ['type_name', 'kind_name', 'model_code', `${this.modelKey}_name`][level]
      return item[key]
    },

    _addLabel (item, level) {
      return Object.assign({ label: this._getLabel(item, level) }, item)
    },

    loadNode (node, resolve) {
      if (node.level > 3) {
        return resolve([])
      }
      const apiKey = [
        `fetch${this.model}TypeList`,
        `fetch${this.model}KindListByType`,
        `fetch${this.model}ModelListByKind`,
        `get${this.model}ListByModel`
      ][node.level]

      apis[apiKey](node.data).then(data => {
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
      const options = []
      if (node.level === 1) {
        data['type_id'] = node.data.type_id
        options.push({ value: node.data.type_id, label: node.data.type_name })
      } else if (node.level === 2) {
        data['kind_id'] = node.data.kind_id
        options.push({ value: node.data.kind_id, label: node.data.kind_name })
      } else if (node.level === 3) {
        data['model_code'] = node.data.model_code
      }

      forms[modelType](data, 'add', options).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        apis[`add${modelType}`](formData).then(newItem => {
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
      const key = ['type_id', 'kind_id', 'model_code', `${this.modelKey}_code`][parent.level]
      const index = children.findIndex(item => item[key] === data[key])
      children.splice(index, 1, this._addLabel(data, parent.level))
      this.$nextTick(_ => {
        this.currentNode = parent.childNodes[index]
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
        const key = ['type_id', 'kind_id', 'model_code', `${this.modelKey}_code`][parent.level]
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
</style>
