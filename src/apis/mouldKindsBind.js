import execSQL from '@/apis/executeSQL'

export default {
  // 操作B_Machine_Mould_Kinds
  fetchMouldKindsBindListByKind (machineKindId) {
    const sql = 'SELECT * FROM B_Machine_Mould_Kinds WHERE machine_kind_id = @machineKindId'
    return execSQL(sql, { machineKindId })
  },

  addMouldKindsBind (machineMouldKinds) {
    const sql = `
          INSERT INTO B_Machine_Mould_Kinds
            ( machine_kind_id
            , mould_kind_id
            , qty
            , parameter
            , description
            , input_time)
          VALUES
            ( @machine_kind_id
            , @mould_kind_id
            , @qty
            , @parameter
            , @description
            , @input_time);

          SELECT TOP (1) * FROM B_Machine_Mould_Kinds WHERE machine_kind_id = @machine_kind_id`
    return execSQL(sql, machineMouldKinds).then(data => data.pop())
  },

  updateMouldKindsBind (machineMouldKinds) {
    const sql = `
          UPDATE B_Machine_Mould_Kinds
            SET mould_kind_id = @mould_kind_id
            , qty = @qty
            , parameter = @parameter
            , description = @description
            , input_time = @input_time
          WHERE id = @id;

          SELECT TOP (1) * FROM B_Machine_Mould_Kinds WHERE id = @id`
    return execSQL(sql, machineMouldKinds).then(data => data.pop())
  },

  deleteMouldKindsBind (machineMouldKinds) {
    const sql = `DELETE B_Machine_Mould_Kinds WHERE id = @id`
    return execSQL(sql, machineMouldKinds)
  }
}
