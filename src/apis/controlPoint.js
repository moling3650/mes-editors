import execSQL from '@/apis/executeSQL'

export default {
  fetchControlPointListByProcess (process) {
    const sql = `
          SELECT DP.* FROM B_Machine_DataPoint DP
            JOIN B_StationMachine SM
              ON SM.machine_code = DP.machine_code
            JOIN B_StationList S
              ON S.station_code = SM.station_code
          WHERE S.process_code = @process_code`
    return execSQL(sql, process)
  }
}
