import execSQL from '@/apis/executeSQL'

export default {
  fetchPropertyListByMachineCode (machineCode) {
    const sql = `
          select  D.id, P.ppt_id,P.ppt_name, P.ppt_type, M.machine_code, D.ppt_val
          ,D.ppt_max,D.ppt_min,D.ppt_condition,D.[enable] from B_Machine M inner join B_Machine_Model MM on M.model_code = MM.model_code
 INNER JOIN B_Machine_Type_Property P ON MM.kind_id = P.kind_id
 LEFT JOIN B_Machine_Property_Detail D ON P.ppt_id = D.ppt_id and D.machine_code = M.machine_code
          WHERE M.machine_code = @machineCode`
    return execSQL(sql, { machineCode })
  },

  addMachinePropertyDetail (machinePropertyDetail) {
    const sql = `
          INSERT INTO B_Machine_Property_Detail
            ( ppt_id
            , ppt_type
            , machine_code
            , ppt_val
            , ppt_max
            , ppt_min
            , ppt_condition
            , enable)
          VALUES
            ( @ppt_id
            , @ppt_type
            , @machine_code
            , @ppt_val
            , @ppt_max
            , @ppt_min
            , @ppt_condition
            , @enable);

          SELECT TOP (1) * FROM B_Machine_Property_Detail WHERE ppt_id = @ppt_id and machine_code = @machine_code`
    return execSQL(sql, machinePropertyDetail).then(data => data.pop())
  },
  // 操作B_Machine_Type_Property
  getMachinePropertyListByKind (kind) {
    const sql = 'SELECT * FROM B_Machine_Type_Property WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addMachineProperty (machineProperty) {
    const sql = `
          INSERT INTO B_Machine_Type_Property
            ( kind_id
            , ppt_name
            , ppt_type
            , description)
          VALUES
            ( @kind_id
            , @ppt_name
            , @ppt_type
            , @description);

          SELECT TOP (1) * FROM B_Machine_Type_Property WHERE kind_id = @kind_id and ppt_name = @ppt_name`
    return execSQL(sql, machineProperty).then(data => data.pop())
  },

  updateMachineProperty (machineProperty) {
    const sql = `
          UPDATE B_Machine_Type_Property
            SET ppt_name = @ppt_name
            , ppt_type = @ppt_type
            , description = @description
          WHERE ppt_id = @ppt_id;

          SELECT TOP (1) * FROM B_Machine_Type_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, machineProperty).then(data => data.pop())
  },

  updateMachinePropertyDetail (propertyDetail) {
    const sql = `
          UPDATE B_Machine_Property_Detail
            SET ppt_condition = @ppt_condition
            , ppt_val = @ppt_val
            , ppt_max = @ppt_max
            , ppt_min = @ppt_min
            , enable = @enable
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Machine_Property_Detail WHERE id = @id`
    return execSQL(sql, propertyDetail).then(data => data.pop())
  },

  deleteMachineProperty (machineProperty) {
    const sql = `DELETE B_Machine_Type_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, machineProperty)
  }
}
