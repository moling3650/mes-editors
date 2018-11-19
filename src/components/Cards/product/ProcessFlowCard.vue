<template>
  <el-card class="h600">
    <div class="tree">
      <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="请输入搜索条件"/>
      <button class=" tree-search-btn" type="button" @click="search">搜索</button>
      <v-tree ref='tree' :data='processFlowList' :multiple="false" :halfcheck='true' node-key="id" @node-click="handleNodeClick" />
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

    handleNodeClick (node) {
      if (node.data) {
        this.$emit('change', node.data)
      }
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
