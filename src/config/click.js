/**
 * Created by dongooo on 2017/4/15.
 * 解决移动端300MS的点击延时，依赖fastClick
 * 更多查看：https://github.com/ftlabs/fastclick
 */

// import FastClick from 'fastclick';
(function(doc) {

    if ('addEventListener' in doc) {
      doc.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(doc.body);
      }, false);
    }

})(document);



