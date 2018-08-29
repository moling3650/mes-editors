import execSQL from '@/apis/executeSQL'

export default {
  // 操作BOM
  fetchBom (productCode) {
    const sql = 'SELECT * FROM B_Bom WHERE product_code = @productCode'
    return execSQL(sql, { productCode })
  },

  addBom (bom) {
    const sql = `
          INSERT INTO B_Bom
            ( bom_code
            , version_code
            , product_code
            , base_qty
            , designator
            , discription
            , enable
            , create_time
            , is_split)
          VALUES
            ( @bom_code
            , @version_code
            , @product_code
            , @base_qty
            , @designator
            , @discription
            , @enable
            , @create_time
            , @is_split);

          SELECT TOP (1) * FROM B_Bom WHERE bom_code = @bom_code`
    return execSQL(sql, bom).then(data => data.pop())
  },

  updateBom (bom) {
    const sql = `
          UPDATE B_Bom
            SET bom_code = @bom_code
            , version_code = @version_code
            , product_code = @product_code
            , base_qty = @base_qty
            , designator = @designator
            , discription = @discription
            , enable = @enable
            , create_time = @create_time
            , is_split = @is_split
          WHERE bom_id = @bom_id;

          SELECT TOP (1) * FROM B_Bom WHERE bom_id = @bom_id`
    return execSQL(sql, bom).then(data => data.pop())
  },

  deleteBom (bom) {
    const sql = `DELETE B_Bom_Detail WHERE bom_code = @bom_code;DELETE B_Bom WHERE bom_id = @bom_id`
    return execSQL(sql, bom)
  },

  // 操作BOM明细
  fetchBomDetail (bomCode) {
    const sql = `
          SELECT D.*
            , ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name
            , ISNULL(P.unit, M.unit) AS unit
          FROM B_Bom_Detail D
          LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
          LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
          WHERE D.bom_code = @bomCode
          ORDER BY D.mat_type`
    return execSQL(sql, { bomCode })
  },

  addBomDetail (bomDetail) {
    const sql = `
          INSERT INTO B_Bom_Detail
            ( bom_code
            , mat_code
            , mat_type
            , qty
            , base_qty
            , wastage
            , enable_Substitute
            , enable_beyond
            , be_ctrl)
          VALUES
            ( @bom_code
            , @mat_code
            , @mat_type
            , @qty
            , @base_qty
            , @wastage
            , @enable_Substitute
            , @enable_beyond
            , @be_ctrl);

          SELECT TOP(1) D.*
            , ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name
            , ISNULL(P.unit, M.unit) AS unit
          FROM B_Bom_Detail D
          LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
          LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
          WHERE D.bom_code = @bom_code AND D.mat_code = @mat_code`
    return execSQL(sql, bomDetail).then(data => data.pop())
  },

  updateBomDetail (bomDetail) {
    const sql = `
          UPDATE B_Bom_Detail
            SET bom_code = @bom_code
            , mat_code = @mat_code
            , mat_type = @mat_type
            , qty = @qty
            , base_qty = @base_qty
            , wastage = @wastage
            , enable_Substitute = @enable_Substitute
            , enable_beyond = @enable_beyond
            , be_ctrl = @be_ctrl
          WHERE bom_detail_id = @bom_detail_id;

          SELECT TOP(1) D.*
            , ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name
            , ISNULL(P.unit, M.unit) AS unit
          FROM B_Bom_Detail D
          LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
          LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
          WHERE D.bom_detail_id = @bom_detail_id`
    return execSQL(sql, bomDetail).then(data => data.pop())
  },

  deleteBomDetail (bomDetail) {
    const sql = `DELETE B_Bom_Detail WHERE bom_detail_id = @bom_detail_id`
    return execSQL(sql, bomDetail)
  }
}
