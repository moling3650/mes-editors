<template>
  <div id="ProcessDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item v-for="item in ProcessGroupList" @click="groupCode = item.groupCode" :key="item.id" :index="item.groupCode">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.groupName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="19">
        <ProcessDetailCard :groupCode="groupCode" @skip="handleSkip"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProcessDetailCard from '@/components/Cards/process/ProcessDetailCard'
import Api from '@/utils/Api'
export default {
  name: 'ProcessDetailEditor',
  components: {
    ProcessDetailCard
  },
  data () {
    return {
      ProcessGroupList: [],
      groupCode: ''
    }
  },
  computed: {
  },
  methods: {
    handleProcessFlowChange (data) {
      this.groupCode = data.groupCode
    },
    handleSkip (name, item) {
      const labels = {
        ProcessStation: '工位',
        ProcessControlItem: '管控项'
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
</style>
