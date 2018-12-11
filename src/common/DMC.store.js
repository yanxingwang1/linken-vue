/**
 * 简单封装本地存储及cookie操作
 * 只实例化一次，同域下跨页面数据共享
 * https://github.com/marcuswestin/store.js
 * https://github.com/js-cookie/js-cookie
 */

import iStore from 'store';
import jsCookie from 'js-cookie';

class Store {

  constructor(){

  }

  getLocal(key){
    return iStore.get(key);
  }

  setLocal(key,value){
    iStore.set(key,value);
  }

  removeLocal(key){
    iStore.remove(key);
  }

  setCookie(key,value){
    jsCookie.set(key,value);
  }

  setCookies(_object={}){
    for(let key in _object){
      this.setCookie(key,_object[key]);
    }
  }

  getCookie(key){
    return jsCookie.get(key);
  }

  removeCookie(key){
    jsCookie.remove(key);
  }
  getCookies(){
    return jsCookie.get();
  }

}

function install(){
    let instance;
    if(!window.hasOwnProperty('store')){
      window.store = instance = new Store();
    }else {
      instance = window['store'];
    }

    return instance;
}

export default install();


