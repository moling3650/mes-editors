<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">角色权限</span>
    </div>
    <el-tree :data="menus" :show-checkbox="true" node-key="id" :expand-on-click-node="false" @node-click="handleNodeClick">
      <span slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'

export default {
  name: 'PowerTreeCard',
  props: {
    roleId: {
      type: String,
      required: true
    }
  },
  computed: {
  },
  data () {
    return {
      formatterMap: {},
      menus: [],
      menuCode: '',
      checkedNode: null
    }
  },
  watch: {
    roleId: {
      handler (value, oldValue) {
        console.log(value)
        console.log(oldValue)
      },
      immediate: true
    }
  },

  methods: {
    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.menuCode = node.parent.data.value
      } else {
        this.checkedNode = node
        this.menuCode = data.value
      }
    }
  },

  created () {
    Api.get('MenuDetails/TreeData').then(data => {
      this.menus = data
    })
  }
}
</script>

<style scoped>
</style>
