import execSQL from '@/apis/executeSQL'

export default {
  // 操作BOM
  getMachinePropertyListByKind (kindId) {
    const sql = 'SELECT * FROM B_Machine_Type_Property WHERE kind_id = @kind_id'
    return execSQL(sql, kindId)
  },
