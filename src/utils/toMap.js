function toMap (dataList, key, valueKey) {
  if (!Array.isArray(dataList)) {
    throw new Error('dataList必须是Array类型')
  }
  if (!key) {
    throw new Error('key不能为空')
  }

  valueKey = valueKey || key

  const map = {}
  dataList.forEach(item => {
    map[item[key]] = item[valueKey]
  })

  return map
}

export default toMap
