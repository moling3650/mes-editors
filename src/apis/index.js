import request from '@/apis/request'

function execSQL (sql, params = null) {
  return request.post('/DataAPI/ReportData.ashx?method=executeQuery', {
    query: sql,
    queryParams: params,
    isProcedure: false
  })
}

export default {
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
              SELECT ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name, D.* FROM B_Bom_Detail D
              LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
              LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
              WHERE D.bom_code = @bomCode
              ORDER BY D.mat_type`
    return execSQL(sql, { bomCode })
  },

  fetchSubBom (productCode, version) {
    const sql = `
              SELECT ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name, D.* FROM B_Bom_Detail D
              LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
              LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
              WHERE bom_code = (SELECT bom_code FROM B_Bom WHERE product_code = @productCode AND version_code = @version)
              ORDER BY D.mat_type`
    return execSQL(sql, { productCode, version })
  },

  fetchSubstituteMaterial (bomCode, matCode) {
    const sql = `
              SELECT S.mat_code, M.mat_code AS sCode, M.mat_name AS sName FROM B_MatSubstitute S
              JOIN B_Material M ON M.mat_code = S.Substitute_mat_code
              WHERE S.bom_code = @bomCode AND S.mat_code = @matCode`
    return execSQL(sql, { bomCode, matCode })
  }
}
