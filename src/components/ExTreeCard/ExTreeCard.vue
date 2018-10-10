<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
    </div>
    <el-tree :props="props" :load="loadNode" :expand-on-click-node="false" lazy/>
  </el-card>
</template>

<script>
import apis from '@/apis'

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
    }
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        return apis[`fetch${this.model}TypeList`]()
          .then(data => resolve(data.map(item => Object.assign({label: item.type_name}, item))))
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
    }
  }
}
</script>

<style scoped>
</style>
