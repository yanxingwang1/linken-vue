/**
 * Created by dongooo on 2017/6/21.
 */
const http = require('http');
const utils = require('./utils');
const entries =  utils.getMultiEntry('./src/modules/**/mock/')
const fs = require('fs')
const url = require('url')
const hostName = '127.0.0.1';
const port = 8080;
const httpServer = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','accept, content-type');
  res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('content-type','application/json;charset=UTF-8');
  return handleRequest(req,res);
}).listen(port,hostName,()=>{
  console.log(`数据服务运行在http:${hostName}:${port}`);
})



var mock = {'api':{}};

function doMatchApi(_path) {
  var rst;
  var reg = new RegExp(/^\/ap(i\/|i)$/);
  if(reg.test(_path)){
    rst = {'code':-100,'data':mock['api']};
  }else{
    rst = {'code':-404,'data':''};
    for(var key in mock['api']){
      if('/'+key === _path){
        rst['data'] = mock['api'][key];
        rst['code'] = -200;
        break;
      }
    }
  }

  return rst;
}


function handleRequest(req, res) {


  try {


    var method = req.method,data;
    var pathName = url.parse(req.url).pathname;

    switch (method){
      case 'GET':

        resData = doMatchApi(pathName);
        if(resData['code'] == -404){
          res.writeHeader(404,{'content-type':'text/html;charset=UTF-8'});
          res.write('<!doctype html>\n');
          res.write('<title>404 Not Found</title>\n');
          res.write('<h1>THIS API-- ' +pathName+' --Not Found</h1>');
        }else if(resData['code'] == -200){
          res.write(JSON.stringify(resData['data']));
        }else if(resData['code'] == -100){
          res.writeHeader(200,{'content-type':'text/html;charset=UTF-8'});
          res.write('<!doctype html>\n');
          res.write('<title>API LIST</title>\n');
          res.write('<h1>API LIST</h1>');
          for(var i in resData['data']){
            res.write('<a style="margin-left: 20px;line-height: 30px;" href="../'+i+'">'+i+'</a><br/>');
          }

        }

        break;
      case 'POST':

        resData = doMatchApi(pathName);
        if(resData['code'] == -404){
          res.writeHeader(404,{'content-type':'text/html;charset=UTF-8'});
          res.write('<!doctype html>\n');
          res.write('<title>404 Not Found</title>\n');
          res.write('<h1>Not Found</h1>');
        }else if(resData['code'] == -200){
          res.write(JSON.stringify(resData['data']));
        }else if(resData['code'] == -100){
          res.writeHeader(200,{'content-type':'text/html;charset=UTF-8'});
          res.write('<!doctype html>\n');
          res.write('<title>API LIST</title>\n');
          res.write('<h1>API LIST</h1>');
          for(var i in resData['data']){
            res.write('<a style="margin-left: 20px;line-height: 30px;" href="../'+i+'">'+i+'</a><br/>');
          }

        }

        break;

      case 'OPTIONS':
        res.write("OPTIONS");
        break;
      default:
        res.write("SORRY, NOT SUPPORT !");

    }

    res.end();

  }catch (error){
    console.log('----error----',error);
    res.end();
    return ;

  }
}

function splitAsArray(_str,_split) {
  var rst=[],count=0,pos=0;
  setAsString(_str);
  function setAsString(_in) {
    var temp=_in,index=temp.indexOf(_split),hasStr = '',st;

    ++count;
    pos = index+1;
    if(count == 1&&index>-1){
      st = temp.substring(0,index);
      hasStr = temp.substring(index+1,temp.length)
      setAsString(hasStr)
    }else if(count > 1&&index>-1) {
      st = temp.substring(0,index);
      hasStr = temp.substring(index+1,temp.length)
      setAsString(hasStr)
    }

    rst.push(st);
  }

  var curRst = rst.reverse();
  return curRst.slice(0,curRst.length-1);

}


function generatorApi(){
  var reg = new RegExp(/^api_/),apiPath='';
  for(var key in global){

    if(reg.test(key)){
      apiPath = key.replace(/_/g,'/');
      if(typeof mock['api'][apiPath] === 'undefined'){

        mock['api'][apiPath] = global[key];
      }else {
        Object.assign(mock['api'][apiPath],global[key]);
      }

    }
  }

  for(var skey in mock['api']){

    var temp = mock['api'][skey];
    delete mock['api'][skey];
    for(var akey in temp){
      var pathKey = skey+'/'+akey;
      mock['api'][pathKey] = temp[akey];
    }
  }

}
//读取文件并写入缓存
function readFile(_files,_path) {

  var _prefix = '(function(){';
  var _suffix = '})()';
  var res = '';
  try {
    var thisPath = splitAsArray(_path,'/');
    var replaceName = 'api_'+thisPath[thisPath.length-2];

    global[replaceName] = {};

    if (_files.length) {
      _files.forEach(function(fileName, index) {
        if (/(.js$)/.test(fileName)) {
          var _file = _path + fileName;
          //console.log(_path);


          var _content = fs.readFileSync(_file);
          try {
            var _js = _content.toString().replace(/export const /g,replaceName+'.');

            res += _js;
          } catch (err) {
            console.log('Parse API Error: ', _file, err)
          }

        }
      });

      var _script =  _prefix+ res + _suffix

      eval(_script);

    }
  } catch (err) {
    console.log('read file error------ >' + err.message + '!');
  }

}

function getMockFiles() {

  var files = [],tempPath={};
  for(var path in entries){
    files = fs.readdirSync(entries[path]);
    readFile(files,entries[path]);
  }

  generatorApi();

}



module.exports = function () {
  getMockFiles();
}

