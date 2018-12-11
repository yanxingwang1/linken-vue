/**
 * Created by dongooo on 2017/4/10.
 * 全局自定义过滤器，业务场景式过滤器在需要的实例处添加
 */
import Vue from 'vue'
import * as path from '../config/path';
let filters = {

  prefixImagePath:function (value,level) {
    if(!value||typeof value =='undefined'||value==0){
      return './images/noPicture.png';
    }
    return path['JD_GOODS_IMG_N'+level]+value.toString();
  },
  dotReplace:function (value,maxNum) {
    //todo计算字节
    if(!value||typeof(value)=='undefined'||value==0){
      return '';
    }
    if(maxNum>(value.length-1)){
      return value;
    }
    return value.toString().substr(0,maxNum)+'...'
  },
  //.....

  priceFormat:function(value){
    try {
      var valueSplit = [];
      value=value.replace(/^(\d*)$/,"$1.");
      value=(value+"00").replace(/(\d*\.\d\d)\d*/,"$1");
      value=value.replace(".",",");
      var re=/(\d)(\d{3},)/;
      while(re.test(value))
      value=value.replace(re,"$1,$2");
      value=value.replace(/,(\d\d)$/,".$1");
      valueSplit = value.split('.');
      if(valueSplit[1]>0){
        return  value.replace(/^\./,"0.")
      }else {
        return valueSplit[0];
      }
    }catch(err) {
      
    }
    
  }

};


export default ((vue)=> {
  for(let fid in filters){
    vue.filter(fid,filters[fid]);
  }
})(Vue)
