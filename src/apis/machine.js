import execSQL from '@/apis/executeSQL'

export default {
  // 操作BOM
  getMachineListByModel (modelCode) {
    const sql = 'SELECT * FROM B_Machine WHERE model_code = @model_code'
    return execSQL(sql, modelCode)
  },

  addMachine (machine) {
    const sql = `
          INSERT INTO B_Machine
            ( machine_code
            , machine_name
            , model_code)
          VALUES
            ( @machine_code
            , @machine_name
            , @model_code);

          SELECT TOP (1) * FROM B_Machine WHERE machine_code = @machine_code`
    return execSQL(sql, machine).then(data => data.pop())
  },

  updateMachine (machine) {
    const sql = `
          UPDATE B_Machine
            SET machine_code = @machine_code
            , machine_name = @machine_name
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Machine WHERE id = @id`
    return execSQL(sql, machine).then(data => data.pop())
  },

  deleteMachine (machine) {
    const sql = `DELETE B_Machine WHERE id = @id`
    return execSQL(sql, machine)
  }
}
