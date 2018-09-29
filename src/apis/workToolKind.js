import execSQL from '@/apis/executeSQL'

export default {
  // 操作WorkTool
  fetchWorkToolKindListByType (type) {
    const sql = 'SELECT * FROM B_WorkTool_Kinds WHERE type_id = @type_id'
    return execSQL(sql, type)
  },

  addWorkToolKind (workToolKind) {
    const sql = `
          INSERT INTO B_WorkTool_Kinds
            ( type_id
            , kind_name
            , description)
          VALUES
            ( @type_id
            , @kind_name
            , @description);

          SELECT TOP (1) * FROM B_WorkTool_Kinds WHERE type_id = @type_id and kind_name = @kind_name`
    return execSQL(sql, workToolKind).then(data => data.pop())
  },

  updateWorkToolKind (workToolKind) {
    const sql = `
          UPDATE B_WorkTool_Kinds
            SET kind_name = @kind_name
            , description = @description
          WHERE kind_id = @kind_id;

          SELECT TOP (1) * FROM B_WorkTool_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, workToolKind).then(data => data.pop())
  },

  deleteWorkToolKind (workToolKind) {
    const sql = `DELETE B_WorkTool_Kinds WHERE kind_id = @kind_id`
    return execSQL(sql, workToolKind)
  }
}
