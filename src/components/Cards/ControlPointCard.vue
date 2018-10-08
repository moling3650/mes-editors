<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工序管控点</span>
    </div>
    <el-tree v-show="processCode" :default-expand-all="true" :expand-on-click-node="false"
      :data="controlPointTree" @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :style="{color: node.level !== 1 ? 'green' : 'blue'}">{{ node.label }}</span>
        <span v-if="node.level === 1 && data.label !== '工序设备'">
          <el-button class="plus" type="text" icon="el-icon-plus" @click.stop="() => addTreeNode(node, data)">添加子项</el-button>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'ControlPointCard',
  props: {
    processCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      controlPointList: [],
      controlPointTree: [{
        label: '工序统计',
        children: [{
          label: '完成数'
        }, {
          label: '异常数'
        }]
      }, {
        label: '工序管控点',
        children: []
      }, {
        label: '工序设备',
        children: [{
          label: '设备状态'
        }, {
          label: '设备状态代码'
        }]
      }]
    }
  },
  watch: {
    processCode (value, oldValue) {
      apis.fetchControlPointListByProcess({ process_code: this.processCode }).then(data => {
        this.controlPointList = data
      })
    }
  },
  methods: {
    handleNodeClick (node, data) {
      console.log(node)
      console.log(data)
    },
    addTreeNode (node, data) {
      console.log(node)
      console.log(data)
    }
  }
}
</script>

<style scoped>
</style>
