import execSQL from '@/apis/executeSQL'

export default {
  // 操作BOM
  getMachinePropertyListByKind (kindId) {
    const sql = 'SELECT * FROM B_Machine_Type_Property WHERE kind_id = @kind_id'
    return execSQL(sql, kindId)
  },

  addMachineProperty (machineProperty) {
    const sql = `
          INSERT INTO B_Machine_Type_Property
            ( kind_id
            , ppt_name
            , description)
          VALUES
            ( @kind_id
            , @ppt_name
            , @description);

          SELECT TOP (1) * FROM B_Machine_Type_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, machineProperty).then(data => data.pop())
  },

  updateMachineProperty (machineProperty) {
    const sql = `
          UPDATE B_Machine_Type_Property
            SET ppt_name = @ppt_name
            , description = @description
          WHERE ppt_id = @ppt_id;

          SELECT TOP (1) * FROM B_Machine_Type_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, machineProperty).then(data => data.pop())
  },

  deleteMachineProperty (machineProperty) {
    const sql = `DELETE B_Machine_Type_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, machineProperty)
  }
}
