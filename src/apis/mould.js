import execSQL from '@/apis/executeSQL'

export default {
  // 操作Mould
  getMouldListByModel (model) {
    const sql = `
          SELECT * FROM B_Moulds M
          WHERE M.model_code = @model_code`
    return execSQL(sql, model)
  },

  addMould (mould) {
    const sql = `
          INSERT INTO B_Moulds
            ( mould_code
            , mould_name
            , model_code
            , state
            , supplier
            , description)
          VALUES
            ( @mould_code
            , @mould_name
            , @model_code
            , @state
            , @supplier
            , @description);

          SELECT TOP (1) * FROM B_Moulds WHERE mould_code = @mould_code`
    return execSQL(sql, mould).then(data => data.pop())
  },

  updateMould (mould) {
    const sql = `
          UPDATE B_Moulds
            SET mould_code = @mould_code
            , mould_name = @mould_name
            , state = @state
            , supplier = @supplier
            , description = @description
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Moulds WHERE id = @id`
    return execSQL(sql, mould).then(data => data.pop())
  },

  deleteMould (mould) {
    const sql = `DELETE B_Moulds WHERE id = @id`
    return execSQL(sql, mould)
  }
}
