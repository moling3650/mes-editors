import execSQL from '@/apis/executeSQL'
import processFlowApis from '@/apis/processFlow'
import controlPointApis from '@/apis/controlPoint'
import mouldKindsBind from '@/apis/mouldKindsBind'

export default {

  validataMachineModelCode (modelCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Machine_Model WHERE model_code = @modelCode'
    return execSQL(sql, { modelCode }).then(data => data[0].c === 0)
  },

  validataWorkToolModelCode (modelCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_WorkTool_Model WHERE model_code = @modelCode'
    return execSQL(sql, { modelCode }).then(data => data[0].c === 0)
  },

  validataMouldModelCode (modelCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Mould_Model WHERE model_code = @modelCode'
    return execSQL(sql, { modelCode }).then(data => data[0].c === 0)
  },

  validataMachineCode (machineCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Machine WHERE machine_code = @machineCode'
    return execSQL(sql, { machineCode }).then(data => data[0].c === 0)
  },

  validataWorkToolCode (workToolCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_WorkTool WHERE workTool_code = @workToolCode'
    return execSQL(sql, { workToolCode }).then(data => data[0].c === 0)
  },

  validataMouldCode (mouldCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Moulds WHERE mould_code = @mouldCode'
    return execSQL(sql, { mouldCode }).then(data => data[0].c === 0)
  },

  validateFormulaCode (formulaCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Formula WHERE formula_code = @formulaCode'
    return execSQL(sql, { formulaCode }).then(data => data[0].c === 0)
  },

  fetchDepartmentOptions () {
    const sql = 'SELECT depart_code as value, depart_name as label FROM S_Department'
    return execSQL(sql).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchMouldKindsOptions () {
    const sql = 'SELECT mould_code as value, mould_name as label FROM B_Moulds'
    return execSQL(sql).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchWSCodeOptions () {
    const sql = 'SELECT ws_code AS value, ws_name AS label FROM B_WorkShop'
    return execSQL(sql).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchIP () {
    return Promise.resolve('192.168.0.36')
  },

  fetchStationOptionsByIp (ip) {
    const sql = `
          select A.process_code,B.process_name,A.station_code,A.station_name from b_stationlist A inner
          join B_ProcessList B on A.process_code = B.process_code
          where ip_address= @ip
          ORDER BY A.process_code`
    return execSQL(sql, {ip}).then(data => {
      const processes = {}
      data.forEach(item => {
        if (!processes[item.process_code]) {
          processes[item.process_code] = {
            value: item.process_code,
            label: item.process_name,
            children: []
          }
        }
        processes[item.process_code].children.push({
          value: item.station_code,
          label: item.station_name
        })
      })
      return Object.values(processes)
    })
  },

  validateUserLogin (userCode, userPwd) {
    const sql = 'SELECT COUNT(*) AS c FROM S_Employee WHERE emp_code = @userCode AND pass_wprd = @userPwd'
    return execSQL(sql, { userCode, userPwd }).then(data => data[0].c === 1)
  },

  // 根据SFC，查询工单、数量、不良工序、产品类型
  fetchDataBySFC (sfc) {
    const sql = `
          select a.order_no,a.qty,b.typecode,b.type_name,e.process_code,e.process_name,e.group_code,e.route_type,
          (select COUNT(*) as fail_times from P_FailLog where sfc = @sfc) as cnt
          from P_SFC_State as a
          inner join V_Order_Produc_Type_Name as b on a.order_no = b.order_no
          inner join P_WorkOrder c on a.order_no = c.order_no
          inner join B_Process_Flow_Detail d on c.flow_code = d.flow_code
          inner join B_ProcessList e on d.process_from = e.process_code
          where a.SFC = @sfc`
    return execSQL(sql, { sfc })
  },

  fetchNGCodeByTypeCode (typecode) {
    const sql = `
          select ng_id,idx,typecode,ng_code,ng_name,b.type_code,b.[type_name],decription,exec_proc from
          B_NG_Code a inner join B_NG_Type b on a.type_code = b.type_code
          where a.typecode = @typecode`
    return execSQL(sql, { typecode })
  },

  fetcgNGType () {
    const sql = `
          select type_name from B_NG_Type`
    return execSQL(sql)
  },

  validateSfcStateBySFC (SFC) {
    const sql = 'SELECT COUNT(*) AS c FROM P_SFC_State WHERE SFC = @SFC'
    return execSQL(sql, { SFC }).then(data => data[0].c === 0)
  },

  addFailLog (FailLog) {
    console.log(FailLog)
    const sql = `
          INSERT INTO P_FailLog
            ( fguid
            , order_no
            , sfc
            , from_process
            , process_code
            , fail_times
            , p_date
            , class_code
            , ws_code
            , state
            , qty
            , ng_remark)
          VALUES
            ( @fguid
            , @order_no
            , @sfc
            , @from_process
            , @process_code
            , @fail_times
            , @p_date
            , @class_code
            , @ws_code
            , @state
            , @qty
            , @ng_remark)`
    return execSQL(sql, FailLog)
  },
  fetchRepairBySFC (sfc) {
    const sql = `
          select fid,fguid,order_no,sfc,from_process,from_station,from_emp,process_code,Disposal_Process,fail_times,state,input_time,finish_time,emp_code,from_process_name,process_name,ng_remark,repair_remark,processid,Expr1,qty from V_P_FailLog_Name where sfc=@sfc and state = 0`
    return execSQL(sql, { sfc })
  },
  fetchNgCodeListByFidAndTypeCode (fid, typeCode) {
    const sql = `
          SElect * from V_Fail_Detail_NGName where fid = @fid and typecode = @typecode`
    return execSQL(sql, { fid, typeCode })
  },

  fetchNGReasonByTypeCode (typecode) {
    const sql = `
          select reason_code AS value,reason_name AS label from B_NG_Reason where typecode = @typecode`
    return execSQL(sql, { typecode })
  },

  fetchNGReasonType () {
    const sql = `
          select reasontype_code AS value,reasontype_name AS label from B_NG_ReasonType`
    return execSQL(sql)
  },

  fetchProductGradeByTypeCode (typecode) {
    const sql = `
          select grade_id AS value,grade_name AS label from B_Product_Grade where typecode = @typecode`
    return execSQL(sql, { typecode })
  },

  fetchReturnProcessByOrderNo (orderNo) {
    const sql = `
          select c.process_code,c.process_name,c.group_code,c.route_type from P_WorkOrder a inner join  B_Process_Flow_Detail b on  a.flow_code = b.flow_code inner join B_ProcessList c on b.process_from = c.process_code
          where a.order_no= @orderNo`
    return execSQL(sql, { orderNo })
  },

  ...processFlowApis,
  ...controlPointApis,
  ...mouldKindsBind
}
