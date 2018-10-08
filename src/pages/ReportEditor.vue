<template>
  <div id="ReportEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <ExSelectButtonGroup model="Report" name="报表" value="report_code" label="report_name"/>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ReportEditor',
  data () {
    return {
      reportCode: ''
    }
  }
}
</script>
