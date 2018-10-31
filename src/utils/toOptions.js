function toOptions (dataList, valueKey, labelKey) {
  if (!Array.isArray(dataList)) {
    throw new Error('dataList必须是Array类型')
  }
  if (!valueKey) {
    throw new Error('valueKey不能为空')
  }

  labelKey = labelKey || valueKey

  return dataList.map(item => {
    return {
      value: item[valueKey],
      label: item[labelKey]
    }
  })
}

export default toOptions
