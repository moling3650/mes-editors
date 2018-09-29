import execSQL from '@/apis/executeSQL'

export default {
  // 操作Mould
  fetchMouldKindListByType (type) {
    const sql = 'SELECT * FROM B_Mould_Kinds WHERE type_id = @type_id'
    return execSQL(sql, type)
  },

  addMouldKind (mouldKind) {
    const sql = `
          INSERT INTO B_Mould_Kinds
            ( type_id
            , kind_name
            , description)
          VALUES
            ( @type_id
            , @kind_name
            , @description);

          SELECT TOP (1) * FROM B_Mould_Kinds WHERE type_id = @type_id and kind_name = @kind_name`
    return execSQL(sql, mouldKind).then(data => data.pop())
  },

  updateMouldKind (mouldKind) {
    const sql = `
          UPDATE B_Mould_Kinds
            SET kind_name = @kind_name
            , description = @description
          WHERE kind_id = @kind_id;

          SELECT TOP (1) * FROM B_Mould_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, mouldKind).then(data => data.pop())
  },

  deleteMouldKind (mouldKind) {
    const sql = `DELETE B_Mould_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, mouldKind)
  }
}
