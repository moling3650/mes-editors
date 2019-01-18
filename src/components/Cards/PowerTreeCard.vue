<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">角色权限</span>
    </div>
    <div class="clearfix">
      <div class="fl-r">
        <el-button size="mini" round @click="submit">保存</el-button>
      </div>
    </div>
    <el-tree :data="menus" :show-checkbox="true" node-key="value" ref="tree" :expand-on-click-node="false" @node-click="handleNodeClick">
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
      checkedNode: null,
      checkRoles: []
    }
  },
  watch: {
    roleId: {
      handler (value, oldValue) {
        if (!value) {
          return
        }
        Api.get('MenuDetails', { roleId: value }).then(data => {
          this.checkRoles = data.map(item => item.id)
          if (this.$refs.tree) {
            this.$refs.tree.setCheckedKeys(this.checkRoles)
          }
        })
      },
      immediate: true
    }
  },

  methods: {
    submit () {
      this.$refs.tree.getCheckedNodes().map(node => node.data.moduleCode)
    },

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
