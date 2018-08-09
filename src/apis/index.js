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
              SELECT P.product_code, P.product_name, B.version_code, B.bom_code FROM B_Bom B
              INNER JOIN B_Product P ON P.product_code = B.product_code`
    return execSQL(sql)
  },
  fetchBom (bomCode) {
    const sql = `
              SELECT ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name, D.* FROM B_Bom_Detail D
              LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
              LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
              WHERE D.bom_code = @bomCode`
    return execSQL(sql, { bomCode })
  },
  fetchSubBom (productCode, version) {
    const sql = `
              SELECT ISNULL(ISNULL(P.product_name, M.mat_name), D.mat_code) AS mat_name, D.* FROM B_Bom_Detail D
              LEFT JOIN B_Product P ON P.product_code = D.mat_code AND D.mat_type = 0
              LEFT JOIN B_Material M ON M.mat_code = D.mat_code AND D.mat_type = 1
              WHERE bom_code = (SELECT bom_code FROM B_Bom WHERE product_code = @productCode AND version_code = @version)`
    return execSQL(sql, { productCode, version })
  }
}
