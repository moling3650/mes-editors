import execSQL from '@/apis/executeSQL'

export default {
  fetchProcessFlowList () {
    const sql = 'SELECT * FROM B_Process_Flow'
    return execSQL(sql)
  },

  fetchProcessFlowDetailListByFlow (flow) {
    const sql = 'SELECT * FROM B_Process_Flow_Detail WHERE flow_code = @flow_code ORDER BY idx'
    return execSQL(sql, flow)
  }
}
