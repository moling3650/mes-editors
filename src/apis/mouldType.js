import execSQL from '@/apis/executeSQL'

export default {
  fetchMouldTypeList () {
    const sql = 'SELECT * FROM B_Mould_Type'
    return execSQL(sql)
  },

  addMouldType (mouldType) {
    const sql = `
       INSERT INTO B_Mould_Type
        (type_name,
         description
        )
        VALUES
        (
          @type_name,
          @description
        );
        SELECT TOP(1) * FROM B_Mould_Type ORDER BY type_id DESC`
    return execSQL(sql, mouldType).then(data => data.pop())
  },

  updateMouldType (mouldType) {
    const sql = `
          UPDATE B_Mould_Type
            SET type_name = @type_name
            , description = @description
          WHERE type_id = @type_id;

          SELECT TOP (1) * FROM B_Mould_Type WHERE type_id = @type_id`
    return execSQL(sql, mouldType).then(data => data.pop())
  },

  deleteMouldType (mouldType) {
    const sql = `DELETE B_Mould_Type WHERE type_id = @type_id`
    return execSQL(sql, mouldType)
  }
}
