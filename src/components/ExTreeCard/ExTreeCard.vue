<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
      <el-button type="text" size="mini" icon="el-icon-plus" @click="append($refs.tree.root)">
        {{ toAppendText(0) }}
      </el-button>
    </div>
    <el-tree :data="treeData" :props="props" :load="loadNode" :expand-on-click-node="false" lazy ref="tree">
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
    loadNode (node, resolve) {
      if (node.level === 0) {
        return apis[`fetch${this.model}TypeList`]()
          .then(data => this.treeData.push(...data.map(item => Object.assign({label: item.type_name}, item))))
      } else if (node.level === 1) {
        return apis[`fetch${this.model}KindListByType`](node.data)
          .then(data => resolve(data.map(item => Object.assign({label: item.kind_name}, item))))
      } else if (node.level === 2) {
        return apis[`fetch${this.model}ModelListByKind`](node.data)
          .then(data => resolve(data.map(item => Object.assign({label: item.model_code}, item))))
      } else if (node.level === 3) {
        return apis[`get${this.model}ListByModel`](node.data)
          .then(data => resolve(data.map(item => Object.assign({label: item[`${this.modelKey}_name`]}, item))))
      } else {
        return resolve([])
      }
    },

    _updateChildNodes (node, newItem) {
      const labelKey = ['type_name', 'kind_name', 'model_code', `${this.modelKey}_name`][node.level]
      if (!node.level) {
        this.treeData.push(Object.assign({label: newItem[labelKey]}, newItem))
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
        nodes.push(...node.childNodes.map(n => Object.assign({label: n.data[labelKey]}, n.data)))
      }
      nodes.push(Object.assign({label: newItem[labelKey]}, newItem))
      node.data.children.push(...nodes)
    },

    append (node) {
      const types = ['Type', 'Kind', 'Model', '']
      const modelType = this.model + types[node.level]
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

    toAppendText (level) {
      const types = ['类型', '类别', '型号', '']
      return `${this.modelName}${types[level]}`
    }
  }
}
</script>

<style scoped>
</style>
