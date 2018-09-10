<template>
  <div id="MachineTypeButtonGroup">
    <div class="select-wrap">
      <ex-select :options="machineTypeOptions" :value="typeId" clearable placeholder="请选择设备类型" @change="handleReportChange"/>
    </div>
    <el-button-group class="button-group">
      <el-button @click="addReport" type="primary" icon="el-icon-plus">报表</el-button>
      <el-button :disabled="disabled" @click="editReport" icon="el-icon-edit" type="primary"></el-button>
      <el-button :disabled="disabled" @click="deleteReport" icon="el-icon-delete" type="primary"></el-button>
    </el-button-group>
  </div>
</template>

<script>
import apis from '@/apis'
import getReportForm from '@/form/report'

export default {
  name: 'ReportButtonGroup',
  props: {
    typeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      machineTypes: []
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    },
    machineTypeOptions () {
      return this.machineTypes.map(r => {
        return {
          value: r.type_id,
          label: r.type_name
        }
      })
    }
  },
  methods: {
    handleReportChange (typeId) {
      this.$emit('update:typeId', typeId)
    },

    addReport () {
      getReportForm(null, 'add').then(form => this.$showForm(form).$on('submit', (report, close) => {
        if (!report.query_sql.trim()) {
          report.query_sql = `SELECT * FROM ${report.report_code}`
        }
        apis.addReport(report).then(report => {
          this.reports.push(report)
          this.$message.success('添加成功!')
          this.$emit('update:reportCode', report.report_code)
          close()
        })
      }))
    },

    editReport () {
      const report = this.reports.find(r => r.report_code === this.reportCode)
      getReportForm(report, 'edit').then(form => this.$showForm(form).$on('submit', (report, close) => {
        if (!report.query_sql.trim()) {
          report.query_sql = `SELECT * FROM ${report.report_code}`
        }
        apis.updateReport(report).then(report => {
          const index = this.reports.findIndex(r => r.report_code === report.report_code)
          ~index && this.reports.splice(index, 1, report)
          this.$message.success('修改成功!')
          this.$emit('update:reportCode', report.report_code)
          close()
        })
      }))
    },

    deleteReport () {
      this.$confirm('此操作将永久删除该报表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteReport({ report_code: this.reportCode }).then(_ => {
          const index = this.reports.findIndex(r => r.report_code === this.reportCode)
          ~index && this.reports.splice(index, 1)
          this.$emit('update:reportCode', '')
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    apis.fetchReports().then(reports => {
      this.reports = reports
    })
  }
}
</script>

<style scoped>
#ReportButtonGroup {
  position: relative;
}

.select-wrap {
  margin-right: 220px;
}

.button-group {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
}
</style>
