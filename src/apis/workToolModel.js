import execSQL from '@/apis/executeSQL'

export default {
  // 操作WorkToolModel
  fetchWorkToolModelListByKind (kind) {
    const sql = 'SELECT * FROM B_WorkTool_Model WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },

  addWorkToolModel (workToolModel) {
    const sql = `
          INSERT INTO B_WorkTool_Model
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

          SELECT TOP (1) * FROM B_WorkTool_Model WHERE model_code = @model_code`
    return execSQL(sql, workToolModel).then(data => data.pop())
  },

  updateWorkToolModel (workToolModel) {
    const sql = `
          UPDATE B_WorkTool_Model
            SET model_code = @model_code
            , manufacturer = @manufacturer
            , made_in = @made_in
            , description = @description
          WHERE id = @id;

          SELECT TOP (1) * FROM B_WorkTool_Model WHERE id = @id`
    return execSQL(sql, workToolModel).then(data => data.pop())
  },

  deleteWorkToolModel (workToolModel) {
    const sql = `DELETE B_WorkTool_Model WHERE id = @id`
    return execSQL(sql, workToolModel)
  }
}
