import execSQL from '@/apis/executeSQL'

export default {
  fetchReports () {
    const sql = 'SELECT * FROM B_Report'
    return execSQL(sql)
  },

  validateReportCode (reportCode) {
    const sql = `
          SELECT
              (SELECT COUNT(*) FROM B_Report WHERE report_code = @reportCode) AS has_report
            , (OBJECT_ID(@reportCode)) AS has_object`
    return execSQL(sql, { reportCode }).then(data => data.pop())
  },

  addReport (report) {
    const sql = `
          INSERT INTO B_Report
            ( report_code
            , report_name
            , query_type
            , query_sql)
          VALUES
            ( @report_code
            , @report_name
            , @query_type
            , @query_sql);
          SELECT TOP (1) * FROM B_Report
            WHERE report_code = @report_code`
    return execSQL(sql, report).then(data => data.pop())
  },

  updateReport (report) {
    const sql = `
          UPDATE B_Report
            SET report_name = @report_name
              , query_type = @query_type
              , query_sql = @query_sql
            WHERE report_code = @report_code;
          SELECT TOP (1) * FROM B_Report
            WHERE report_code = @report_code`
    return execSQL(sql, report).then(data => data.pop())
  },

  deleteReport (report) {
    const sql = 'DELETE FROM B_Report WHERE report_code = @report_code'
    return execSQL(sql, report)
  }
}
