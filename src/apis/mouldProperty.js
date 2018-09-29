import execSQL from '@/apis/executeSQL'

export default {
  fetchPropertyListByMouldCode (mouldCode) {
    const sql = `
          select  D.id, P.ppt_id,P.ppt_name, P.ppt_type, M.mould_code, D.ppt_val
          ,D.ppt_max,D.ppt_min,D.ppt_condition,D.[enable] from B_Moulds M inner join B_Mould_Model MM on M.model_code = MM.model_code
 INNER JOIN B_Mould_Kind_Property P ON MM.kind_id = P.kind_id
 LEFT JOIN B_Mould_Property_Detail D ON P.ppt_id = D.ppt_id and D.mould_code = M.mould_code
          WHERE M.mould_code = @mouldCode`
    return execSQL(sql, { mouldCode })
  },

  addMouldPropertyDetail (mouldPropertyDetail) {
    const sql = `
          INSERT INTO B_Mould_Property_Detail
            ( ppt_id
            , ppt_type
            , mould_code
            , ppt_val
            , ppt_max
            , ppt_min
            , ppt_condition
            , enable)
          VALUES
            ( @ppt_id
            , @ppt_type
            , @mould_code
            , @ppt_val
            , @ppt_max
            , @ppt_min
            , @ppt_condition
            , @enable);

          SELECT TOP (1) * FROM B_Mould_Property_Detail WHERE ppt_id = @ppt_id and mould_code = @mould_code`
    return execSQL(sql, mouldPropertyDetail).then(data => data.pop())
  },
  // 操作B_Mould_Kind_Property
  getMouldPropertyListByKind (kind) {
    const sql = 'SELECT * FROM B_Mould_Kind_Property WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addMouldProperty (mouldProperty) {
    const sql = `
          INSERT INTO B_Mould_Kind_Property
            ( kind_id
            , ppt_name
            , ppt_type
            , description)
          VALUES
            ( @kind_id
            , @ppt_name
            , @ppt_type
            , @description);

          SELECT TOP (1) * FROM B_Mould_Kind_Property WHERE kind_id = @kind_id and ppt_name = @ppt_name`
    return execSQL(sql, mouldProperty).then(data => data.pop())
  },

  updateMouldProperty (mouldProperty) {
    const sql = `
          UPDATE B_Mould_Kind_Property
            SET ppt_name = @ppt_name
            , ppt_type = @ppt_type
            , description = @description
          WHERE ppt_id = @ppt_id;

          SELECT TOP (1) * FROM B_Mould_Kind_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, mouldProperty).then(data => data.pop())
  },

  updateMouldPropertyDetail (propertyDetail) {
    const sql = `
          UPDATE B_Mould_Property_Detail
            SET ppt_condition = @ppt_condition
            , ppt_val = @ppt_val
            , ppt_max = @ppt_max
            , ppt_min = @ppt_min
            , enable = @enable
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Mould_Property_Detail WHERE id = @id`
    return execSQL(sql, propertyDetail).then(data => data.pop())
  },

  deleteMouldProperty (mouldProperty) {
    const sql = `DELETE B_Mould_Kind_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, mouldProperty)
  }
}
