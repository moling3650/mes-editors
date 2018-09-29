import execSQL from '@/apis/executeSQL'

export default {
  // 操作BOM
  fetchMachineKindListByType (type) {
    const sql = 'SELECT * FROM B_Machine_Kinds WHERE type_id = @type_id'
    return execSQL(sql, type)
  },

  addMachineKind (machineKind) {
    const sql = `
          INSERT INTO B_Machine_Kinds
            ( type_id
            , kind_name
            , description)
          VALUES
            ( @type_id
            , @kind_name
            , @description);

          SELECT TOP (1) * FROM B_Machine_Kinds WHERE type_id = @type_id and kind_name = @kind_name`
    return execSQL(sql, machineKind).then(data => data.pop())
  },

  updateMachineKind (machineKind) {
    const sql = `
          UPDATE B_Machine_Kinds
            SET kind_name = @kind_name
            , description = @description
          WHERE kind_id = @kind_id;

          SELECT TOP (1) * FROM B_Machine_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, machineKind).then(data => data.pop())
  },

  deleteMachineKind (machineKind) {
    const sql = `DELETE B_Machine_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, machineKind)
  }
}
