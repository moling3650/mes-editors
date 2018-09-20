import execSQL from '@/apis/executeSQL'

export default {
  // 操作MachineModel
  fetchMachineModelListByKind (kind) {
    const sql = 'SELECT * FROM B_Machine_Model WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addMachineModel (machineModel) {
    const sql = `
          INSERT INTO B_Machine_Model
            ( model_code
            , kind_id
            , manufacturer
            , made_in
            , description)
          VALUES
            ( @model_code
            , @kind_id
            , @manufacturer
            , @made_in
            , @description);

          SELECT TOP (1) * FROM B_Machine_Model WHERE model_code = @model_code`
    return execSQL(sql, machineModel).then(data => data.pop())
  },

  updateMachineModel (machineModel) {
    const sql = `
          UPDATE B_Machine_Model
            SET model_code = @model_code
            , manufacturer = @manufacturer
            , made_in = @made_in
            , description = @description
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Machine_Model WHERE id = @id`
    return execSQL(sql, machineModel).then(data => data.pop())
  },

  deleteMachineModel (machineModel) {
    const sql = `DELETE B_Machine_Model WHERE id = @id`
    return execSQL(sql, machineModel)
  }
}
