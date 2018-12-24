<template>
  <div id="WorkCalendarEditor">
    <el-card class="box-card" :body-style="{ padding: '10px' }">
      <div slot="header" class="clearfix">
        <span class="card-header--text">工作日历</span>
      </div>
      <!-- Card-body -->
      <el-row :gutter="20" class="row">
        <el-col :span="4">
          <el-tree :data="treeData" accordion @node-click="handleNodeClick"/>
        </el-col>
        <el-col :span="20">

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Api from '@/utils/Api'

export default {
  name: 'WorkCalendarEditor',
  data () {
    return {
      treeData: []
    }
  },
  methods: {
    handleNodeClick ({ data }, node) {
      if (node.level === 2) {
        console.log(data)
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
