<template>
  <el-card class="h600">
    <div slot="header" class="card-header clearfix">
      <span class="card-header">工艺流程的工序</span>
    </div>
    <el-table :data="flowDetailList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row @row-click="handleClickProcess">
      <el-table-column prop="process_code" label="工序编号"/>
      <el-table-column prop="process_name" label="工序名称"/>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'ProcessFlowCard',
  props: {
    flowCode: {
      type: String,
      required: true
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
      apis.fetchProcessListByFlow({ flow_code: value }).then(data => {
        this.flowDetailList = data
      })
    }
  },
  methods: {
    handleClickProcess (row) {
      this.$emit('update:processCode', row.process_code)
    }
  }
}
</script>

<style scoped>
</style>
