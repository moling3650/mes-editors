import execSQL from '@/apis/executeSQL'

export default {
  fetchPropertyListByWorkToolCode (workToolCode) {
    const sql = `
          select  D.id, P.ppt_id,P.ppt_name, P.ppt_type, M.workTool_code, D.ppt_val
          ,D.ppt_max,D.ppt_min,D.ppt_condition,D.[enable] from B_WorkTool M inner join B_WorkTool_Model MM on M.model_code = MM.model_code
 INNER JOIN B_WorkTool_Kind_Property P ON MM.kind_id = P.kind_id
 LEFT JOIN B_WorkTool_Property_Detail D ON P.ppt_id = D.ppt_id and D.workTool_code = M.workTool_code
          WHERE M.workTool_code = @workToolCode`
    return execSQL(sql, { workToolCode })
  },

  addWorkToolPropertyDetail (workToolPropertyDetail) {
    const sql = `
          INSERT INTO B_WorkTool_Property_Detail
            ( ppt_id
            , ppt_type
            , workTool_code
            , ppt_val
            , ppt_max
            , ppt_min
            , ppt_condition
            , enable)
          VALUES
            ( @ppt_id
            , @ppt_type
            , @workTool_code
            , @ppt_val
            , @ppt_max
            , @ppt_min
            , @ppt_condition
            , @enable);

          SELECT TOP (1) * FROM B_WorkTool_Property_Detail WHERE ppt_id = @ppt_id and workTool_code = @workTool_code`
    return execSQL(sql, workToolPropertyDetail).then(data => data.pop())
  },
  // 操作B_WorkTool_Type_Property
  getWorkToolPropertyListByKind (kind) {
    const sql = 'SELECT * FROM B_WorkTool_Kind_Property WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addWorkToolProperty (workToolProperty) {
    const sql = `
          INSERT INTO B_WorkTool_Kind_Property
            ( kind_id
            , ppt_name
            , ppt_type
            , description)
          VALUES
            ( @kind_id
            , @ppt_name
            , @ppt_type
            , @description);

          SELECT TOP (1) * FROM B_WorkTool_Kind_Property WHERE kind_id = @kind_id and ppt_name = @ppt_name`
    return execSQL(sql, workToolProperty).then(data => data.pop())
  },

  updateWorkToolProperty (workToolProperty) {
    const sql = `
          UPDATE B_WorkTool_Kind_Property
            SET ppt_name = @ppt_name
            , ppt_type = @ppt_type
            , description = @description
          WHERE ppt_id = @ppt_id;

          SELECT TOP (1) * FROM B_WorkTool_Kind_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, workToolProperty).then(data => data.pop())
  },

  updateWorkToolPropertyDetail (propertyDetail) {
    const sql = `
          UPDATE B_WorkTool_Property_Detail
            SET ppt_condition = @ppt_condition
            , ppt_val = @ppt_val
            , ppt_max = @ppt_max
            , ppt_min = @ppt_min
            , enable = @enable
          WHERE id = @id;

          SELECT TOP (1) * FROM B_WorkTool_Property_Detail WHERE id = @id`
    return execSQL(sql, propertyDetail).then(data => data.pop())
  },

  deleteWorkToolProperty (workToolProperty) {
    const sql = `DELETE B_WorkTool_Kind_Property WHERE ppt_id = @ppt_id`
    return execSQL(sql, workToolProperty)
  }
}
