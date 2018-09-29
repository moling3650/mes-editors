import execSQL from '@/apis/executeSQL'

export default {
  // 操作WorkTool
  getWorkToolListByModel (modelCode) {
    const sql = `
          SELECT * FROM B_WorkTool M
          WHERE M.model_code = @model_code`
    return execSQL(sql, modelCode)
  },

  addWorkTool (workTool) {
    const sql = `
          INSERT INTO B_WorkTool
            ( workTool_code
            , workTool_name
            , model_code
            , state
            , supplier
            , storage_room
            , store_place
            , use_place
            , description)
          VALUES
            ( @workTool_code
            , @workTool_name
            , @model_code
            , @state
            , @supplier
            , @storage_room
            , @store_place
            , @use_place
            , @description);

          SELECT TOP (1) * FROM B_WorkTool WHERE workTool_code = @workTool_code`
    return execSQL(sql, workTool).then(data => data.pop())
  },

  updateWorkTool (workTool) {
    const sql = `
          UPDATE B_WorkTool
            SET workTool_code = @workTool_code
            , workTool_name = @workTool_name
          WHERE id = @id;

          SELECT TOP (1) * FROM B_WorkTool WHERE id = @id`
    return execSQL(sql, workTool).then(data => data.pop())
  },

  deleteWorkTool (workTool) {
    const sql = `DELETE B_WorkTool WHERE id = @id`
    return execSQL(sql, workTool)
  }
}
