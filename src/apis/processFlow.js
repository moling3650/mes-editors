import execSQL from '@/apis/executeSQL'

export default {
  fetchProcessFlowList () {
    const sql = 'SELECT * FROM B_Process_Flow'
    return execSQL(sql)
  },

  fetchProcessListByFlow (flow) {
    const sql = `
    SELECT P.process_code, P.process_name FROM B_ProcessList P
    JOIN B_Process_Flow_Detail D ON D.process_from = P.process_code
    WHERE D.flow_code = @flow_code
    ORDER BY D.idx`
    return execSQL(sql, flow)
  }
}
