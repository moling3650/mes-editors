<template>
  <div id="WorkGroupClassEditor">
    <el-card class="box-card" :body-style="{ padding: '10px' }">
      <div slot="header" class="clearfix">
        <span class="card-header--text">工序组班别管理</span>
      </div>
      <!-- Card-body -->
      <el-row :gutter="20" class="row">
        <el-col :span="4">
          <el-tree :data="treeData" accordion @node-click="handleNodeClick" class="treeStyle">
            <span class="tree-node" slot-scope="{ node, data }">
              <i :class="['fa', ['', 'fa-folder-o', 'fa-file-text-o'][node.level]]"></i>
              <span>{{data.label}}</span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="20">
          <ExTable :model="WorkGroupClasses" :immediate="false" needDefault :defaultForm="group" ref="wgc">
            <template slot-scope="{ rowData }">
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="restTime(rowData)" :disabled="!rowData">休息时间</el-button>
            </template>
          </ExTable>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="休息时间" :visible.sync="showRest">
      <ExTable :model="WorkGroupClassRest" :immediate="false" needDefault :defaultForm="groupClass" ref="wgcr"/>
    </el-dialog>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import WorkGroupClasses from '@/models/ProcessFlow/WorkGroupClasses'
import WorkGroupClassRest from '@/models/ProcessFlow/WorkGroupClassRest'

export default {
  name: 'WorkGroupClassEditor',
  data () {
    return {
      WorkGroupClasses,
      WorkGroupClassRest,
      treeData: [],
      group: null,
      groupClass: null,
      showRest: false
    }
  },
  methods: {
    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.group = { groupCode: data.value }
        this.$refs.wgc.search(this.group)
      }
    },

    restTime (workGroupClass) {
      this.showRest = true
      this.$nextTick(_ => {
        this.groupClass = { classId: workGroupClass.cid }
        this.$refs.wgcr.search(this.groupClass)
      })
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
#WorkGroupClassEditor {
  margin: 15px;
}
.treeStyle {
  border-right: solid 1px #e6e6e6;
}

.treeNode {
  height: 32px;
}
</style>
