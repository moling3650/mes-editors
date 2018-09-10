import execSQL from '@/apis/executeSQL'

export default {
  fetchMachineTypeList () {
    const sql = 'SELECT * FROM B_Machine_Type'
    return execSQL(sql)
  },

  addMachineType (machineType) {
    const sql = `
       INSERT INTO B_Machine_Type
        (type_name,
         description
        )
        VALUES
        (
          @type_name,
          @description
        );
        SELECT TOP(1) * FROM B_Machine_Type ORDER BY type_id DESC`
    return execSQL(sql, machineType).then(data => data.pop())
  },

  updateMachineType (machineType) {
    const sql = `
          UPDATE B_Machine_Type
            SET type_name = @type_name
            , description = @description
          WHERE type_id = @type_id;

          SELECT TOP (1) * FROM B_Machine_Type WHERE type_id = @type_id`
    return execSQL(sql, machineType).then(data => data.pop())
  },

  deleteMachineType (machineType) {
    const sql = `DELETE B_Machine_Type WHERE type_id = @type_id`
    return execSQL(sql, machineType)
  }
}
