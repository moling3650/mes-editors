import execSQL from '@/apis/executeSQL'
import bomApis from '@/apis/bom'
import formulaApis from '@/apis/formula'
import reportApis from '@/apis/report'
import processFlowApis from '@/apis/processFlow'
import controlPointApis from '@/apis/controlPoint'
import machineTypeApis from '@/apis/machineType'
import machineKindApis from '@/apis/machineKind'
import machineModelApis from '@/apis/machineModel'
import machinePropertyApis from '@/apis/machineProperty'
import machineApis from '@/apis/machine'
import mouldKindsBind from '@/apis/mouldKindsBind'

export default {
  addSubstitute (substitute) {
    const sql = `
          INSERT INTO B_MatSubstitute
            ( bom_code
            , mat_code
            , Substitute_mat_code)
          VALUES
            ( @bom_code
            , @mat_code
            , @Substitute_mat_code);

          SELECT TOP(1) S.*
            , CASE
                WHEN EXISTS(SELECT * FROM B_Material WHERE mat_code = S.Substitute_mat_code) THEN (SELECT TOP(1) mat_name FROM B_Material WHERE mat_code = S.Substitute_mat_code)
                WHEN EXISTS(SELECT * FROM B_Product WHERE product_code = S.Substitute_mat_code) THEN (SELECT TOP(1) product_name FROM B_Product WHERE product_code = S.Substitute_mat_code)
              ELSE NULL
            END AS Substitute_mat_name
          FROM B_MatSubstitute S
          WHERE S.bom_code = @bom_code AND S.Substitute_mat_code = @Substitute_mat_code`
    return execSQL(sql, substitute).then(data => data.pop())
  },

  updateSubstitute (substitute) {
    const sql = `
          UPDATE B_MatSubstitute
            SET Substitute_mat_code = @Substitute_mat_code
          WHERE id = @id;
          SELECT TOP(1) S.*
            , CASE
                WHEN EXISTS(SELECT * FROM B_Material WHERE mat_code = S.Substitute_mat_code) THEN (SELECT TOP(1) mat_name FROM B_Material WHERE mat_code = S.Substitute_mat_code)
                WHEN EXISTS(SELECT * FROM B_Product WHERE product_code = S.Substitute_mat_code) THEN (SELECT TOP(1) product_name FROM B_Product WHERE product_code = S.Substitute_mat_code)
              ELSE NULL
            END AS Substitute_mat_name
          FROM B_MatSubstitute S
          WHERE bom_code = @bom_code AND Substitute_mat_code = @Substitute_mat_code`
    return execSQL(sql, substitute).then(data => data.pop())
  },

  deleteSubstitute (substitute) {
    const sql = 'DELETE FROM B_MatSubstitute WHERE id = @id'
    return execSQL(sql, substitute)
  },

  fetchProductOptions () {
    const sql = 'SELECT product_code AS value, product_name AS label, unit FROM B_Product'
    return execSQL(sql).then(opts => opts.map(({value, label, unit}) => ({value, label: `${label} / ${value}`, unit})))
  },

  fetchMaterialOptions () {
    const sql = 'SELECT mat_code AS value, mat_name AS label, unit FROM B_Material'
    return execSQL(sql).then(opts => opts.map(({value, label, unit}) => ({value, label: `${label} / ${value}`, unit})))
  },

  fetchProductCascaderOptions () {
    const sql = `
          SELECT DISTINCT T.typecode, T.type_name, P.product_code, P.product_name FROM B_Bom B
          INNER JOIN B_Product P ON P.product_code = B.product_code
          INNER JOIN B_Product_Type T ON T.typecode = P.typecode
          ORDER BY T.typecode`
    return execSQL(sql).then(data => {
      const products = {}
      data.forEach(item => {
        if (!products[item.typecode]) {
          products[item.typecode] = {
            value: item.typecode,
            label: item.type_name,
            children: []
          }
        }
        products[item.typecode].children.push({
          value: item.product_code,
          label: item.product_name
        })
      })
      return Object.values(products)
    })
  },

  fetchMachineTypeKindOptions () {
    const sql = `
          SELECT DISTINCT B.type_id,B.type_name,k.kind_id,K.kind_name FROM B_Machine_Type B
          LEFT JOIN B_Machine_Kinds K ON B.type_id = K.type_id
          ORDER BY K.kind_id`
    return execSQL(sql).then(data => {
      const Kinds = {}
      data.forEach(item => {
        if (!Kinds[item.type_id]) {
          Kinds[item.type_id] = {
            value: item.type_id,
            label: item.type_name,
            children: []
          }
        }
        if (item.kind_id) {
          Kinds[item.type_id].children.push({
            value: item.kind_id,
            label: item.kind_name
          })
        }
      })
      return Object.values(Kinds)
    })
  },

  fetchWorkToolTypeKindOptions () {
    const sql = `
          SELECT DISTINCT B.type_id,B.type_name,k.kind_id,K.kind_name FROM B_WorkTool_Type B
          LEFT JOIN B_WorkTool_Kinds K ON B.type_id = K.type_id
          ORDER BY K.kind_id`
    return execSQL(sql).then(data => {
      const Kinds = {}
      data.forEach(item => {
        if (!Kinds[item.type_id]) {
          Kinds[item.type_id] = {
            value: item.type_id,
            label: item.type_name,
            children: []
          }
        }
        if (item.kind_id) {
          Kinds[item.type_id].children.push({
            value: item.kind_id,
            label: item.kind_name
          })
        }
      })
      return Object.values(Kinds)
    })
  },

  fetchMouldTypeKindOptions () {
    const sql = `
          SELECT DISTINCT B.type_id,B.type_name,k.kind_id,K.kind_name FROM B_Mould_Type B
          LEFT JOIN B_Mould_Kinds K ON B.type_id = K.type_id
          ORDER BY K.kind_id`
    return execSQL(sql).then(data => {
      const Kinds = {}
      data.forEach(item => {
        if (!Kinds[item.type_id]) {
          Kinds[item.type_id] = {
            value: item.type_id,
            label: item.type_name,
            children: []
          }
        }
        if (item.kind_id) {
          Kinds[item.type_id].children.push({
            value: item.kind_id,
            label: item.kind_name
          })
        }
      })
      return Object.values(Kinds)
    })
  },

  fetchBomMaterialOptions (bomCode) {
    const sql = `
          SELECT D.mat_code AS value
            , CASE
                WHEN D.mat_type = 0 THEN P.product_name
                WHEN D.mat_type = 1 THEN M.mat_name
                ELSE NULL
              END AS label
          FROM B_Bom_Detail D
          LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
          LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
          WHERE D.bom_code = @bomCode`
    return execSQL(sql, { bomCode }).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchSubBom (productCode, version) {
    const sql = `
          SELECT D.*
            , ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name
            , ISNULL(P.unit, M.unit) AS unit
          FROM B_Bom_Detail D
          LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
          LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
          WHERE bom_code = (SELECT bom_code FROM B_Bom WHERE product_code = @productCode AND version_code = @version)
          ORDER BY D.mat_type`
    return execSQL(sql, { productCode, version })
  },

  fetchSubstituteMaterial (bomCode, matCode) {
    const sql = `
          SELECT S.*
            , CASE
                WHEN EXISTS(SELECT * FROM B_Material WHERE mat_code = S.Substitute_mat_code) THEN (SELECT TOP(1) mat_name FROM B_Material WHERE mat_code = S.Substitute_mat_code)
                WHEN EXISTS(SELECT * FROM B_Product WHERE product_code = S.Substitute_mat_code) THEN (SELECT TOP(1) product_name FROM B_Product WHERE product_code = S.Substitute_mat_code)
              ELSE NULL
            END AS Substitute_mat_name
          FROM B_MatSubstitute S
          WHERE S.bom_code = @bomCode AND S.mat_code = @matCode`
    return execSQL(sql, { bomCode, matCode })
  },

  validateBomCode (bomCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Bom WHERE bom_code = @bomCode'
    return execSQL(sql, { bomCode }).then(data => data[0].c === 0)
  },

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
    return Promise.resolve('192.168.0.28')
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

  ...bomApis,
  ...formulaApis,
  ...reportApis,
  ...processFlowApis,
  ...controlPointApis,
  ...machineTypeApis,
  ...machineKindApis,
  ...machinePropertyApis,
  ...machineModelApis,
  ...machineApis,
  ...mouldKindsBind
}
