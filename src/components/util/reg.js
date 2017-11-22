
exports.highLightForTitle = function (str, replace) {
  let reg = new RegExp(replace.toUpperCase(), 'gm')
  str = str.toUpperCase().replace(reg, '<span style="color: #ed3f14;font-weight: 600;font-size: 16px" >' + replace + '</span>')
  return str
}

exports.highLightForSummary = function (str, replace) {
  let reg = new RegExp(replace.toUpperCase(), 'gm')
  str = str.toUpperCase().replace(reg, '<span style="color: #ed3f14;font-weight: 600;font-size: 14px" >' + replace + '</span>')
  return str
}
