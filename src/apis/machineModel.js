import execSQL from '@/apis/executeSQL'

export default {
  // 操作MachineModel
  fetchMachineModelListByKind (kind) {
    const sql = 'SELECT * FROM B_Machine_Model WHERE kind_id = @kind_id'
    return execSQL(sql, kind)
  },
