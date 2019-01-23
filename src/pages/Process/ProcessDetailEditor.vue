<template>
  <div id="ProcessDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5" class="col">
        <el-menu background-color="#ffffff" text-color="black" active-text-color="#015ea2">
          <el-menu-item v-for="item in ProcessGroupList" @click="handleProcessGroupChange(item)" :key="item.id" :index="item.groupCode">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.groupName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="19">
        <ExTable :model="ProcessLists" :immediate="false" needDefault :defaultForm="groupCode" ref="wgc">
          <template slot-scope="{ rowData }">
            <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('ProcessStationSkip', rowData)" :disabled="!rowData">工位管理</el-button>
            <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleSkip('ProcessControlItemSkip', rowData)" :disabled="!rowData">工位管控项</el-button>
          </template>
        </ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import ProcessLists from '@/models/Process/ProcessLists'
export default {
  name: 'ProcessDetailEditor',
  components: {
  },
  data () {
    return {
      ProcessGroupList: [],
      groupCode: null,
      ProcessLists
    }
  },
  computed: {
  },
  methods: {
    handleProcessGroupChange (data) {
      this.groupCode = { groupCode: data.groupCode }
      this.$refs.wgc.search(this.groupCode)
    },

    handleSkip (name, item) {
      const labels = {
        ProcessStationSkip: '工位',
        ProcessControlItemSkip: '管控项'
      }
      const tab = {
        name,
        label: labels[name],
        processCode: item.processCode
      }
      this.$emit('addTab', tab)
    }
  },
  created () {
    Api.get(`WorkGroups`).then(data => {
      this.ProcessGroupList = data
    })
  }
}
</script>

<style scoped>
#ProcessDetailEditor {
  margin: 5px;
}

.col {
  height: 500px;
  overflow-y: auto;
}
</style>
