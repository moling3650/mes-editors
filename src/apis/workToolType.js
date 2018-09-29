import execSQL from '@/apis/executeSQL'

export default {
  fetchWorkToolTypeList () {
    const sql = 'SELECT * FROM B_WorkTool_Type'
    return execSQL(sql)
  },

  addWorkToolType (workToolType) {
    const sql = `
       INSERT INTO B_WorkTool_Type
        (type_name,
         description
        )
        VALUES
        (
          @type_name,
          @description
        );
        SELECT TOP(1) * FROM B_WorkTool_Type ORDER BY type_id DESC`
    return execSQL(sql, workToolType).then(data => data.pop())
  },

  updateWorkToolType (workToolType) {
    const sql = `
          UPDATE B_WorkTool_Type
            SET type_name = @type_name
            , description = @description
          WHERE type_id = @type_id;

          SELECT TOP (1) * FROM B_WorkTool_Type WHERE type_id = @type_id`
    return execSQL(sql, workToolType).then(data => data.pop())
  },

  deleteWorkToolType (workToolType) {
    const sql = `DELETE B_WorkTool_Type WHERE type_id = @type_id`
    return execSQL(sql, workToolType)
  }
}
