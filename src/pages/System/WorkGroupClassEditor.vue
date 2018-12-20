<template>
  <div id="WorkGroupEditor">

    <el-card class="box-card" :body-style="{ padding: '10px' }">
      <div slot="header" class="clearfix">
        <span class="card-header--text">工序组班别管理</span>
      </div>
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <el-tree :data="treeData" accordion @node-click="handleNodeClick"/>
        </el-col>
        <el-col :span="18">
          <ExTable :model="WorkGroupClasses" :immediate="false" needDefault :defaultForm="defaultForm" ref="wgc"/>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import WorkGroupClasses from '@/models/ProcessFlow/WorkGroupClasses'

export default {
  name: 'WorkGroupEditor',
  data () {
    return {
      WorkGroupClasses,
      treeData: [],
      defaultForm: null
    }
  },
  methods: {
    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.defaultForm = { groupCode: data.value }
        this.$refs.wgc.search(this.defaultForm)
      }
    }
  },
  created () {
    Api.get('WorkGroups/TreeData').then(data => {
      this.treeData = data
    })
  }
}
</script>

<style scoped>
.box-card {
  height: 500px;
}
</style>
