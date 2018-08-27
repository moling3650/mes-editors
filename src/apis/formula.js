import execSQL from '@/apis/executeSQL'

export default {
  fetchDetailByFormula (formula) {
    const sql = 'SELECT * FROM B_Formula_Detail WHERE formula_code = @formula_code'
    return execSQL(sql, formula)
  },

  fetchFormulaByBom (bom) {
    const sql = 'SELECT * FROM B_Formula WHERE bom_code = @bom_code'
    return execSQL(sql, bom)
  },

  addFormula (formula) {
    const sql = `
          INSERT INTO B_Formula
            ( bom_code
            , formula_code
            , formula_name
            , base_qty
            , designator
            , description
            , enable
            , create_time)
          VALUES
            ( @bom_code
            , @formula_code
            , @formula_name
            , @base_qty
            , @designator
            , @description
            , @enable
            , @create_time);
          SELECT TOP (1) * FROM B_Formula
            WHERE bom_code = @bom_code AND formula_code = @formula_code`
    return execSQL(sql, formula).then(data => data.pop())
  },

  updateFormula (formula) {
    const sql = `
          UPDATE B_Formula
            SET formula_name = @formula_name
              , base_qty = @base_qty
              , designator = @designator
              , description = @description
              , enable = @enable
            WHERE ID = @ID;
          SELECT TOP (1) * FROM B_Formula
            WHERE ID = @ID;`
    return execSQL(sql, formula).then(data => data.pop())
  },

  deleteFormula (formula) {
    const sql = 'DELETE FROM B_Formula WHERE ID = @ID'
    return execSQL(sql, formula)
  }
}
