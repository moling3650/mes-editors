<template>
  <el-card class="h600">
    <div class="tree">
      <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="请输入搜索条件"/>
      <button class=" tree-search-btn" type="button" @click="search">搜索</button>
      <v-tree ref='tree' :data='processFlowList' :multiple="false" :halfcheck='true' :tpl="tpl" node-key="id"/>
    </div>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'

export default {
  name: 'ProcessFlowCard',
  data () {
    return {
      lang: 'zh',
      searchword: '',
      processFlowList: []
    }
  },
  methods: {
    search () {
      this.$refs.tree.searchNodes(this.searchword)
    },

    nodeSelected (node) {
      if (node.data) {
        this.$emit('change', node.data)
      }
    },

    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      let iconClass = `fa ${node.data ? 'fa-file-text-o' : 'fa-folder-o'}`
      return <span>
        <i class={iconClass}></i>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => this.nodeSelected(node)}></span>
      </span>
    }
  },

  created () {
    Api.get(`ProcessFlows/CascaderOptions`).then(data => {
      this.processFlowList = data
    })
  }
}

</script>

<style scoped>
#app .tree .halo-tree {
  padding-left: 0;
}
</style>
