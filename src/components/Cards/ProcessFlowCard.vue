<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工艺流程的工序</span>
    </div>
    <el-table :data="flowDetailList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickProcess">
      <el-table-column prop="processCode" label="工序编号"/>
      <el-table-column prop="processName" label="工序名称"/>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'

export default {
  name: 'ProcessFlowCard',
  props: {
    flowCode: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      flowDetailList: []
    }
  },
  watch: {
    flowCode (value, oldValue) {
      this.flowDetailList = []
      Api.get('ProcessLists', { flowCode: value }).then(data => {
        this.flowDetailList = data
      })
    }
  },
  methods: {
    handleClickProcess (row) {
      this.$emit('update:processCode', row.processCode)
    }
  }
}
</script>

<style scoped>
</style>
