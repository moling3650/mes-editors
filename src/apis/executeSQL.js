import request from '@/apis/request'

function executeSQL (sql, params = null) {
  return request.post('/DataAPI/ReportData.ashx?method=executeQuery', {
    query: sql,
    queryParams: params,
    isProcedure: false
  })
}

export default executeSQL
