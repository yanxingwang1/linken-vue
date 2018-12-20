/**
 * 格式化时间
 * @param {Object} fmt eg:yyyy-MM-dd HH:mm:ss
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export default {
  findKey (obj,value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value))
  },
  timeDict : {
    '31001001': '08:00',
    '31001002': '08:30',
    '31001003': '09:00',
    '31001004': '09:30',
    '31001005': '10:00',
    '31001006': '10:30',
    '31001007': '11:00',
    '31001008': '11:30',
    '31001009': '12:00',
    '31001010': '12:30',
    '31001011': '13:00',
    '31001012': '13:30',
    '31001013': '14:00',
    '31001014': '14:30',
    '31001015': '15:00',
    '31001016': '15:30',
    '31001017': '16:00',
    '31001018': '16:30',
    '31001019': '17:00',
    '31001020': '17:30',
    '31001021': '18:00',
    '31001022': '18:30',
    '31001023': '19:00',
    '31001024': '19:30',
    '31001025': '20:00',
  }
}
