import request from '@/apis/request'

function execSQL (sql, params = null) {
  return request.post('/DataAPI/ReportData.ashx?method=executeQuery', {
    query: sql,
    queryParams: params,
    isProcedure: false
  })
}

export default {
  addSubstitute (substitute) {
    const sql = `
          INSERT INTO B_MatSubstitute
            ( bom_code
            , mat_code
            , Substitute_mat_code)
          VALUES
            ( @bom_code
            , @mat_code
            , @Substitute_mat_code);
          SELECT TOP(1) S.*, M.mat_name AS Substitute_mat_name
          FROM B_MatSubstitute S
          JOIN B_Material M ON M.mat_code = S.Substitute_mat_code
          WHERE bom_code = @bom_code AND Substitute_mat_code = @Substitute_mat_code`
    return execSQL(sql, substitute).then(substitutes => substitutes.pop())
  },

  updateSubstitute (substitute) {
    const sql = `
          UPDATE B_MatSubstitute
            SET Substitute_mat_code = @Substitute_mat_code
          WHERE id = @id;
          SELECT TOP(1) S.*, M.mat_name AS Substitute_mat_name
          FROM B_MatSubstitute S
          JOIN B_Material M ON M.mat_code = S.Substitute_mat_code
          WHERE bom_code = @bom_code AND Substitute_mat_code = @Substitute_mat_code`
    return execSQL(sql, substitute).then(substitutes => substitutes.pop())
  },

  deleteSubstitute (substitute) {
    const sql = 'DELETE FROM B_MatSubstitute WHERE id = @id'
    return execSQL(sql, substitute)
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
    return execSQL(sql, bomDetail).then(bds => bds.pop())
  },

  updateBomDetail (bomDetail) {
    const sql = `
          UPDATE B_Bom_Detail
            SET bom_code = @bom_code
            ,  mat_code = @mat_code
            ,  mat_type = @mat_type
            ,  qty = @qty
            ,  base_qty = @base_qty
            ,  wastage = @wastage
            ,  enable_Substitute = @enable_Substitute
            ,  enable_beyond = @enable_beyond
            ,  be_ctrl = @be_ctrl
          WHERE bom_detail_id = @bom_detail_id`
    return execSQL(sql, bomDetail)
  },

  deleteBomDetail (bomDetail) {
    const sql = `DELETE B_Bom_Detail WHERE bom_detail_id = @bom_detail_id`
    return execSQL(sql, bomDetail)
  },

  deleteBom (bom) {
    const sql = `DELETE B_Bom_Detail WHERE bom_code = @bom_code;DELETE B_Bom WHERE bom_id = @bom_id`
    return execSQL(sql, bom)
  },

  addBom (bom) {
    bom.create_time = new Date()
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
          SELECT TOP (1) * FROM B_Bom ORDER BY bom_id DESC`
    return execSQL(sql, bom).then(bs => bs.pop())
  },

  updateBom (bom) {
    const sql = `
          UPDATE B_Bom
            SET bom_code = @bom_code
            ,  version_code = @version_code
            ,  product_code = @product_code
            ,  base_qty = @base_qty
            ,  designator = @designator
            ,  discription = @discription
            ,  enable = @enable
            ,  create_time = @create_time
            ,  is_split = @is_split
          WHERE bom_id = @bom_id`
    return execSQL(sql, bom)
  },

  fetchProductOptions () {
    const sql = 'SELECT product_code AS value, product_name AS label FROM B_Product'
    return execSQL(sql).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchMaterialOptions () {
    const sql = 'SELECT mat_code AS value, mat_name AS label FROM B_Material'
    return execSQL(sql).then(opts => opts.map(({value, label}) => ({value, label: `${label} / ${value}`})))
  },

  fetchProducts () {
    const sql = `
              SELECT DISTINCT T.typecode, T.type_name, P.product_code, P.product_name FROM B_Bom B
              INNER JOIN B_Product P ON P.product_code = B.product_code
              INNER JOIN B_Product_Type T ON T.typecode = P.typecode
              ORDER BY T.typecode`
    return execSQL(sql)
  },

  fetchBom (productCode) {
    const sql = 'SELECT * FROM B_Bom WHERE product_code = @productCode'
    return execSQL(sql, { productCode })
  },

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

  fetchSubBom (productCode, version) {
    const sql = `
              SELECT D.*
                , ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name
                , ISNULL(P.unit, M.unit) AS unit
              FROM B_Bom_Detail D
              LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
              LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
              WHERE bom_code = (SELECT bom_code FROM B_Bom WHERE product_code = @productCode AND version_code = @version)
              ORDER BY D.mat_type`
    return execSQL(sql, { productCode, version })
  },

  fetchSubstituteMaterial (bomCode, matCode) {
    const sql = `
              SELECT S.*, M.mat_name AS Substitute_mat_name
              FROM B_MatSubstitute S
              JOIN B_Material M ON M.mat_code = S.Substitute_mat_code
              WHERE S.bom_code = @bomCode AND S.mat_code = @matCode`
    return execSQL(sql, { bomCode, matCode })
  },

  validateBomCode (bomCode) {
    const sql = 'SELECT COUNT(*) AS c FROM B_Bom WHERE bom_code = @bomCode'
    return execSQL(sql, { bomCode }).then(data => data[0].c === 0)
  }
}
