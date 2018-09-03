<template>
  <div id="ReportEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <ReportButtonGroup :reportCode.sync="reportCode"></ReportButtonGroup>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import ReportButtonGroup from '@/components/ButtonGroup/ReportButtonGroup'

export default {
  name: 'ReportEditor',
  components: {
    ReportButtonGroup
  },
  data () {
    return {
      reportCode: ''
    }
  }
}
</script>
