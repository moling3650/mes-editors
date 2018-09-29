import execSQL from '@/apis/executeSQL'

export default {
  // 操作MouldModel
  fetchMouldModelListByKind (kind) {
    const sql = 'SELECT * FROM B_Mould_Model WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addMouldModel (mouldModel) {
    const sql = `
          INSERT INTO B_Mould_Model
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

          SELECT TOP (1) * FROM B_Mould_Model WHERE model_code = @model_code`
    return execSQL(sql, mouldModel).then(data => data.pop())
  },

  updateMouldModel (mouldModel) {
    const sql = `
          UPDATE B_Mould_Model
            SET model_code = @model_code
            , manufacturer = @manufacturer
            , made_in = @made_in
            , description = @description
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Mould_Model WHERE id = @id`
    return execSQL(sql, mouldModel).then(data => data.pop())
  },

  deleteMouldModel (mouldModel) {
    const sql = `DELETE B_Mould_Model WHERE id = @id`
    return execSQL(sql, mouldModel)
  }
}
