/*
* @Author: Marte
* @Date:   2017-06-02 17:31:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-05 09:46:05
*/

// 日期数据
export const date = (()=>{
    let arr = []

    // 初始化时间
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();
    // 数据初始化
    for (let i = nowYear - 100; i <= nowYear + 30; i++) {
      arr.push({
          id: i + '',
          name: i + '年',
          value: i+"",
          parent: 0
      });
      formatMonth(i+"")
    }
    return arr

    // 获取月份
    function formatMonth(year) {
      for (let i = 1; i <= 12; i++) {
        let y = (i<10 ? '0'+i : i+'')
          arr.push({
              id: y + '',
              name: y + '月',
              value: year+"-"+y,
              parent: year
          });
          if(/^4|6|9|11$/.test(i)){
              formatDate(30,year+"-"+y)
          }else if(/^1|3|5|7|8|10|12$/.test(i)){
              formatDate(31,year+"-"+y)
          }else if(/^2$/.test(i)){
            if (parseInt(year) % 4 === 0 && parseInt(year) % 100 !==0 || parseInt(year) % 400 === 0) {
                formatDate(29,year+"-"+'02')
            } else {
                formatDate(28,year+"-"+'02')
            }
          }
      }
    }
    // 获取日期
    function formatDate (count,month) {
      for (let i = 1; i <= count; i++) {
        let r = (i<10 ? '0'+i : i+'')
        arr.push({
            id: r + '',
            name: r + '日',
            value: '-'+r,
            parent: month
        });
      }
    }

})()

// 车牌简称
export const licenseTag = [
  { name:'京', value:'京', parent: 0 },
  { name:'津', value:'津', parent: 0 },
  { name:'沪', value:'沪', parent: 0 },
  { name:'渝', value:'渝', parent: 0 },
  { name:'冀', value:'冀', parent: 0 },
  { name:'豫', value:'豫', parent: 0 },
  { name:'云', value:'云', parent: 0 },
  { name:'辽', value:'辽', parent: 0 },
  { name:'黑', value:'黑', parent: 0 },
  { name:'湘', value:'湘', parent: 0 },
  { name:'皖', value:'皖', parent: 0 },
  { name:'鲁', value:'鲁', parent: 0 },
  { name:'新', value:'新', parent: 0 },
  { name:'苏', value:'苏', parent: 0 },
  { name:'浙', value:'浙', parent: 0 },
  { name:'赣', value:'赣', parent: 0 },
  { name:'鄂', value:'鄂', parent: 0 },
  { name:'桂', value:'桂', parent: 0 },
  { name:'甘', value:'甘', parent: 0 },
  { name:'晋', value:'晋', parent: 0 },
  { name:'蒙', value:'蒙', parent: 0 },
  { name:'陕', value:'陕', parent: 0 },
  { name:'吉', value:'吉', parent: 0 },
  { name:'闽', value:'闽', parent: 0 },
  { name:'贵', value:'贵', parent: 0 },
  { name:'粤', value:'粤', parent: 0 },
  { name:'青', value:'青', parent: 0 },
  { name:'藏', value:'藏', parent: 0 },
  { name:'川', value:'川', parent: 0 },
  { name:'宁', value:'宁', parent: 0 },
  { name:'琼', value:'琼', parent: 0 },
  { name:'A', value:'A', parent: '京' },
  { name:'C', value:'C', parent: '京' },
  { name:'E', value:'E', parent: '京' },
  { name:'F', value:'F', parent: '京' },
  { name:'G', value:'G', parent: '京' },
  { name:'B', value:'B', parent: '京' },
  { name:'A', value:'A', parent: '津' },
  { name:'B', value:'B', parent: '津' },
  { name:'C', value:'C', parent: '津' },
  { name:'E', value:'E', parent: '津' },
  { name:'A', value:'A', parent: '沪' },
  { name:'B', value:'B', parent: '沪' },
  { name:'D', value:'D', parent: '沪' },
  { name:'E', value:'E', parent: '沪' },
  { name:'A', value:'A', parent: '渝' },
  { name:'B', value:'B', parent: '渝' },
  { name:'D', value:'D', parent: '渝' },
  { name:'C', value:'C', parent: '渝' },
  { name:'F', value:'F', parent: '渝' },
  { name:'G', value:'G', parent: '渝' },
  { name:'H', value:'H', parent: '渝' },
  { name:'A', value:'A', parent: '冀' },
  { name:'B', value:'B', parent: '冀' },
  { name:'C', value:'C', parent: '冀' },
  { name:'D', value:'D', parent: '冀' },
  { name:'E', value:'E', parent: '冀' },
  { name:'F', value:'F', parent: '冀' },
  { name:'G', value:'G', parent: '冀' },
  { name:'H', value:'H', parent: '冀' },
  { name:'J', value:'J', parent: '冀' },
  { name:'R', value:'R', parent: '冀' },
  { name:'T', value:'T', parent: '冀' },
  { name:'A', value:'A', parent: '豫' },
  { name:'B', value:'B', parent: '豫' },
  { name:'C', value:'C', parent: '豫' },
  { name:'D', value:'D', parent: '豫' },
  { name:'E', value:'E', parent: '豫' },
  { name:'F', value:'F', parent: '豫' },
  { name:'G', value:'G', parent: '豫' },
  { name:'H', value:'H', parent: '豫' },
  { name:'J', value:'J', parent: '豫' },
  { name:'K', value:'K', parent: '豫' },
  { name:'L', value:'L', parent: '豫' },
  { name:'M', value:'M', parent: '豫' },
  { name:'N', value:'N', parent: '豫' },
  { name:'P', value:'P', parent: '豫' },
  { name:'Q', value:'Q', parent: '豫' },
  { name:'R', value:'R', parent: '豫' },
  { name:'S', value:'S', parent: '豫' },
  { name:'U', value:'U', parent: '豫' },
  { name:'A', value:'A', parent: '云' },
  { name:'B', value:'B', parent: '云' },
  { name:'C', value:'C', parent: '云' },
  { name:'D', value:'D', parent: '云' },
  { name:'E', value:'E', parent: '云' },
  { name:'F', value:'F', parent: '云' },
  { name:'G', value:'G', parent: '云' },
  { name:'H', value:'H', parent: '云' },
  { name:'J', value:'J', parent: '云' },
  { name:'K', value:'K', parent: '云' },
  { name:'L', value:'L', parent: '云' },
  { name:'M', value:'M', parent: '云' },
  { name:'N', value:'N', parent: '云' },
  { name:'P', value:'P', parent: '云' },
  { name:'Q', value:'Q', parent: '云' },
  { name:'R', value:'R', parent: '云' },
  { name:'S', value:'S', parent: '云' },
  { name:'A', value:'A', parent: '辽' },
  { name:'B', value:'B', parent: '辽' },
  { name:'C', value:'C', parent: '辽' },
  { name:'D', value:'D', parent: '辽' },
  { name:'E', value:'E', parent: '辽' },
  { name:'F', value:'F', parent: '辽' },
  { name:'G', value:'G', parent: '辽' },
  { name:'H', value:'H', parent: '辽' },
  { name:'J', value:'J', parent: '辽' },
  { name:'K', value:'K', parent: '辽' },
  { name:'L', value:'L', parent: '辽' },
  { name:'M', value:'M', parent: '辽' },
  { name:'N', value:'N', parent: '辽' },
  { name:'P', value:'P', parent: '辽' },
  { name:'V', value:'V', parent: '辽' },
  { name:'A', value:'A', parent: '黑' },
  { name:'B', value:'B', parent: '黑' },
  { name:'C', value:'C', parent: '黑' },
  { name:'D', value:'D', parent: '黑' },
  { name:'E', value:'E', parent: '黑' },
  { name:'F', value:'F', parent: '黑' },
  { name:'G', value:'G', parent: '黑' },
  { name:'H', value:'H', parent: '黑' },
  { name:'J', value:'J', parent: '黑' },
  { name:'K', value:'K', parent: '黑' },
  { name:'L', value:'L', parent: '黑' },
  { name:'M', value:'M', parent: '黑' },
  { name:'N', value:'N', parent: '黑' },
  { name:'P', value:'P', parent: '黑' },
  { name:'A', value:'A', parent: '湘' },
  { name:'B', value:'B', parent: '湘' },
  { name:'C', value:'C', parent: '湘' },
  { name:'D', value:'D', parent: '湘' },
  { name:'E', value:'E', parent: '湘' },
  { name:'F', value:'F', parent: '湘' },
  { name:'G', value:'G', parent: '湘' },
  { name:'H', value:'H', parent: '湘' },
  { name:'J', value:'J', parent: '湘' },
  { name:'K', value:'K', parent: '湘' },
  { name:'L', value:'L', parent: '湘' },
  { name:'M', value:'M', parent: '湘' },
  { name:'N', value:'N', parent: '湘' },
  { name:'P', value:'P', parent: '湘' },
  { name:'A', value:'A', parent: '皖' },
  { name:'B', value:'B', parent: '皖' },
  { name:'C', value:'C', parent: '皖' },
  { name:'D', value:'D', parent: '皖' },
  { name:'E', value:'E', parent: '皖' },
  { name:'F', value:'F', parent: '皖' },
  { name:'G', value:'G', parent: '皖' },
  { name:'H', value:'H', parent: '皖' },
  { name:'J', value:'J', parent: '皖' },
  { name:'K', value:'K', parent: '皖' },
  { name:'L', value:'L', parent: '皖' },
  { name:'M', value:'M', parent: '皖' },
  { name:'N', value:'N', parent: '皖' },
  { name:'P', value:'P', parent: '皖' },
  { name:'Q', value:'Q', parent: '皖' },
  { name:'R', value:'R', parent: '皖' },
  { name:'A', value:'A', parent: '鲁' },
  { name:'B', value:'B', parent: '鲁' },
  { name:'C', value:'C', parent: '鲁' },
  { name:'D', value:'D', parent: '鲁' },
  { name:'E', value:'E', parent: '鲁' },
  { name:'F', value:'F', parent: '鲁' },
  { name:'G', value:'G', parent: '鲁' },
  { name:'H', value:'H', parent: '鲁' },
  { name:'J', value:'J', parent: '鲁' },
  { name:'K', value:'K', parent: '鲁' },
  { name:'L', value:'L', parent: '鲁' },
  { name:'M', value:'M', parent: '鲁' },
  { name:'N', value:'N', parent: '鲁' },
  { name:'P', value:'P', parent: '鲁' },
  { name:'Q', value:'Q', parent: '鲁' },
  { name:'R', value:'R', parent: '鲁' },
  { name:'U', value:'U', parent: '鲁' },
  { name:'A', value:'A', parent: '新' },
  { name:'B', value:'B', parent: '新' },
  { name:'C', value:'C', parent: '新' },
  { name:'D', value:'D', parent: '新' },
  { name:'E', value:'E', parent: '新' },
  { name:'F', value:'F', parent: '新' },
  { name:'G', value:'G', parent: '新' },
  { name:'H', value:'H', parent: '新' },
  { name:'J', value:'J', parent: '新' },
  { name:'K', value:'K', parent: '新' },
  { name:'L', value:'L', parent: '新' },
  { name:'M', value:'M', parent: '新' },
  { name:'N', value:'N', parent: '新' },
  { name:'P', value:'P', parent: '新' },
  { name:'Q', value:'Q', parent: '新' },
  { name:'R', value:'R', parent: '新' },
  { name:'A', value:'A', parent: '苏' },
  { name:'B', value:'B', parent: '苏' },
  { name:'C', value:'C', parent: '苏' },
  { name:'D', value:'D', parent: '苏' },
  { name:'E', value:'E', parent: '苏' },
  { name:'F', value:'F', parent: '苏' },
  { name:'G', value:'G', parent: '苏' },
  { name:'H', value:'H', parent: '苏' },
  { name:'J', value:'J', parent: '苏' },
  { name:'K', value:'K', parent: '苏' },
  { name:'L', value:'L', parent: '苏' },
  { name:'M', value:'M', parent: '苏' },
  { name:'N', value:'N', parent: '苏' },
  { name:'A', value:'A', parent: '浙' },
  { name:'B', value:'B', parent: '浙' },
  { name:'C', value:'C', parent: '浙' },
  { name:'D', value:'D', parent: '浙' },
  { name:'E', value:'E', parent: '浙' },
  { name:'F', value:'F', parent: '浙' },
  { name:'G', value:'G', parent: '浙' },
  { name:'H', value:'H', parent: '浙' },
  { name:'J', value:'J', parent: '浙' },
  { name:'K', value:'K', parent: '浙' },
  { name:'L', value:'L', parent: '浙' },
  { name:'A', value:'A', parent: '赣' },
  { name:'B', value:'B', parent: '赣' },
  { name:'C', value:'C', parent: '赣' },
  { name:'D', value:'D', parent: '赣' },
  { name:'E', value:'E', parent: '赣' },
  { name:'F', value:'F', parent: '赣' },
  { name:'G', value:'G', parent: '赣' },
  { name:'H', value:'H', parent: '赣' },
  { name:'J', value:'J', parent: '赣' },
  { name:'K', value:'K', parent: '赣' },
  { name:'L', value:'L', parent: '赣' },
  { name:'A', value:'A', parent: '鄂' },
  { name:'B', value:'B', parent: '鄂' },
  { name:'C', value:'C', parent: '鄂' },
  { name:'D', value:'D', parent: '鄂' },
  { name:'E', value:'E', parent: '鄂' },
  { name:'F', value:'F', parent: '鄂' },
  { name:'G', value:'G', parent: '鄂' },
  { name:'H', value:'H', parent: '鄂' },
  { name:'J', value:'J', parent: '鄂' },
  { name:'K', value:'K', parent: '鄂' },
  { name:'L', value:'L', parent: '鄂' },
  { name:'M', value:'M', parent: '鄂' },
  { name:'N', value:'N', parent: '鄂' },
  { name:'P', value:'P', parent: '鄂' },
  { name:'Q', value:'Q', parent: '鄂' },
  { name:'A', value:'A', parent: '桂' },
  { name:'B', value:'B', parent: '桂' },
  { name:'C', value:'C', parent: '桂' },
  { name:'D', value:'D', parent: '桂' },
  { name:'E', value:'E', parent: '桂' },
  { name:'F', value:'F', parent: '桂' },
  { name:'G', value:'G', parent: '桂' },
  { name:'H', value:'H', parent: '桂' },
  { name:'J', value:'J', parent: '桂' },
  { name:'K', value:'K', parent: '桂' },
  { name:'L', value:'L', parent: '桂' },
  { name:'M', value:'M', parent: '桂' },
  { name:'N', value:'N', parent: '桂' },
  { name:'P', value:'P', parent: '桂' },
  { name:'A', value:'A', parent: '甘' },
  { name:'B', value:'B', parent: '甘' },
  { name:'C', value:'C', parent: '甘' },
  { name:'D', value:'D', parent: '甘' },
  { name:'E', value:'E', parent: '甘' },
  { name:'F', value:'F', parent: '甘' },
  { name:'G', value:'G', parent: '甘' },
  { name:'H', value:'H', parent: '甘' },
  { name:'J', value:'J', parent: '甘' },
  { name:'K', value:'K', parent: '甘' },
  { name:'L', value:'L', parent: '甘' },
  { name:'M', value:'M', parent: '甘' },
  { name:'N', value:'N', parent: '甘' },
  { name:'P', value:'P', parent: '甘' },
  { name:'A', value:'A', parent: '晋' },
  { name:'B', value:'B', parent: '晋' },
  { name:'C', value:'C', parent: '晋' },
  { name:'D', value:'D', parent: '晋' },
  { name:'E', value:'E', parent: '晋' },
  { name:'F', value:'F', parent: '晋' },
  { name:'G', value:'G', parent: '晋' },
  { name:'H', value:'H', parent: '晋' },
  { name:'J', value:'J', parent: '晋' },
  { name:'K', value:'K', parent: '晋' },
  { name:'L', value:'L', parent: '晋' },
  { name:'M', value:'M', parent: '晋' },
  { name:'A', value:'A', parent: '蒙' },
  { name:'B', value:'B', parent: '蒙' },
  { name:'C', value:'C', parent: '蒙' },
  { name:'D', value:'D', parent: '蒙' },
  { name:'E', value:'E', parent: '蒙' },
  { name:'F', value:'F', parent: '蒙' },
  { name:'G', value:'G', parent: '蒙' },
  { name:'H', value:'H', parent: '蒙' },
  { name:'J', value:'J', parent: '蒙' },
  { name:'K', value:'K', parent: '蒙' },
  { name:'L', value:'L', parent: '蒙' },
  { name:'A', value:'A', parent: '陕' },
  { name:'B', value:'B', parent: '陕' },
  { name:'C', value:'C', parent: '陕' },
  { name:'D', value:'D', parent: '陕' },
  { name:'E', value:'E', parent: '陕' },
  { name:'F', value:'F', parent: '陕' },
  { name:'G', value:'G', parent: '陕' },
  { name:'H', value:'H', parent: '陕' },
  { name:'J', value:'J', parent: '陕' },
  { name:'K', value:'K', parent: '陕' },
  { name:'U', value:'U', parent: '陕' },
  { name:'A', value:'A', parent: '吉' },
  { name:'B', value:'B', parent: '吉' },
  { name:'C', value:'C', parent: '吉' },
  { name:'D', value:'D', parent: '吉' },
  { name:'E', value:'E', parent: '吉' },
  { name:'F', value:'F', parent: '吉' },
  { name:'G', value:'G', parent: '吉' },
  { name:'H', value:'H', parent: '吉' },
  { name:'A', value:'A', parent: '闽' },
  { name:'B', value:'B', parent: '闽' },
  { name:'C', value:'C', parent: '闽' },
  { name:'D', value:'D', parent: '闽' },
  { name:'E', value:'E', parent: '闽' },
  { name:'F', value:'F', parent: '闽' },
  { name:'G', value:'G', parent: '闽' },
  { name:'H', value:'H', parent: '闽' },
  { name:'J', value:'J', parent: '闽' },
  { name:'K', value:'K', parent: '闽' },
  { name:'A', value:'A', parent: '贵' },
  { name:'B', value:'B', parent: '贵' },
  { name:'C', value:'C', parent: '贵' },
  { name:'D', value:'D', parent: '贵' },
  { name:'E', value:'E', parent: '贵' },
  { name:'F', value:'F', parent: '贵' },
  { name:'G', value:'G', parent: '贵' },
  { name:'H', value:'H', parent: '贵' },
  { name:'J', value:'J', parent: '贵' },
  { name:'A', value:'A', parent: '粤' },
  { name:'B', value:'B', parent: '粤' },
  { name:'C', value:'C', parent: '粤' },
  { name:'D', value:'D', parent: '粤' },
  { name:'E', value:'E', parent: '粤' },
  { name:'F', value:'F', parent: '粤' },
  { name:'G', value:'G', parent: '粤' },
  { name:'H', value:'H', parent: '粤' },
  { name:'J', value:'J', parent: '粤' },
  { name:'K', value:'K', parent: '粤' },
  { name:'L', value:'L', parent: '粤' },
  { name:'M', value:'M', parent: '粤' },
  { name:'N', value:'N', parent: '粤' },
  { name:'P', value:'P', parent: '粤' },
  { name:'Q', value:'Q', parent: '粤' },
  { name:'R', value:'R', parent: '粤' },
  { name:'S', value:'S', parent: '粤' },
  { name:'T', value:'T', parent: '粤' },
  { name:'U', value:'U', parent: '粤' },
  { name:'V', value:'V', parent: '粤' },
  { name:'W', value:'W', parent: '粤' },
  { name:'X', value:'X', parent: '粤' },
  { name:'Y', value:'Y', parent: '粤' },
  { name:'Z', value:'Z', parent: '粤' },
  { name:'A', value:'A', parent: '青' },
  { name:'B', value:'B', parent: '青' },
  { name:'C', value:'C', parent: '青' },
  { name:'D', value:'D', parent: '青' },
  { name:'E', value:'E', parent: '青' },
  { name:'F', value:'F', parent: '青' },
  { name:'G', value:'G', parent: '青' },
  { name:'H', value:'H', parent: '青' },
  { name:'A', value:'A', parent: '藏' },
  { name:'B', value:'B', parent: '藏' },
  { name:'C', value:'C', parent: '藏' },
  { name:'D', value:'D', parent: '藏' },
  { name:'E', value:'E', parent: '藏' },
  { name:'F', value:'F', parent: '藏' },
  { name:'G', value:'G', parent: '藏' },
  { name:'A', value:'A', parent: '川' },
  { name:'B', value:'B', parent: '川' },
  { name:'C', value:'C', parent: '川' },
  { name:'D', value:'D', parent: '川' },
  { name:'E', value:'E', parent: '川' },
  { name:'F', value:'F', parent: '川' },
  { name:'G', value:'G', parent: '川' },
  { name:'H', value:'H', parent: '川' },
  { name:'J', value:'J', parent: '川' },
  { name:'K', value:'K', parent: '川' },
  { name:'L', value:'L', parent: '川' },
  { name:'P', value:'P', parent: '川' },
  { name:'R', value:'R', parent: '川' },
  { name:'S', value:'S', parent: '川' },
  { name:'T', value:'T', parent: '川' },
  { name:'U', value:'U', parent: '川' },
  { name:'V', value:'V', parent: '川' },
  { name:'W', value:'W', parent: '川' },
  { name:'A', value:'A', parent: '宁' },
  { name:'B', value:'B', parent: '宁' },
  { name:'C', value:'C', parent: '宁' },
  { name:'D', value:'D', parent: '宁' },
  { name:'A', value:'A', parent: '琼' },
  { name:'B', value:'B', parent: '琼' },
  { name:'C', value:'C', parent: '琼' },
]