<template>
  <div id="MainOrderEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        查询条件：
        <el-input  v-model="searchString" style="width: 200px;" />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" @click="searchMainOrder">搜索</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <MainOrderCard :orderNo="searchString" @skip="handleSkip"></MainOrderCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MainOrderCard from '@/components/Cards/WorkOrder/MainOrderCard'

export default {
  name: 'MainOrderEditor',
  components: {
    MainOrderCard
  },
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    handleSkip (name, mainOrder) {
      const labels = {
        MachineDataPoint: '数据点',
        MachineAnalogPoint: '过程点位',
        MachineStandardPoint: '标准点位'
      }
      const tab = {
        name,
        label: labels[name],
        machineCode: mainOrder
      }
      this.$emit('addTab', tab)
    },

    searchMainOrder () {

    }
  }
}
</script>

<style scoped>
</style>
