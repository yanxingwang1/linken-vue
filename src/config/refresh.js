(function(window) {

    window.onload=function(){
            if ('addEventListener' in window) {
            var _element = document.getElementById('refreshContainer'),
                _refreshText = document.querySelector('.refreshText'),
                _startPos = 0,
                _transitionHeight = 0;
            _element.addEventListener('touchstart', function(e) {
                console.log('初始位置：', e.touches[0].pageY);
                _startPos = e.touches[0].pageY;
                _element.style.position = 'relative';
                _element.style.transition = 'transform 0s';
            }, false);

            _element.addEventListener('touchmove', function(e) {
                console.log('当前位置：', e.touches[0].pageY);
                _transitionHeight = e.touches[0].pageY - _startPos;

                if (_transitionHeight > 0 && _transitionHeight < 60) {
                    _refreshText.innerText = '下拉刷新';
                    _refreshText.style.opacity = '1';
                    _element.style.transform = 'translateY('+_transitionHeight+'px)';
                    if (_transitionHeight > 55) {
                        _refreshText.innerText = '释放更新';
                        _refreshText.style.opacity = '1';
                    }
                }
            }, false);
            _element.addEventListener('touchend', function(e) {
                _element.style.transition = 'transform 0.5s ease 1s';
                _element.style.transform = 'translateY(0px)';
                _refreshText.innerText = '更新中...';
                _refreshText.style.opacity = '0';
                // todo...
            }, false);
        }
  }
})(window);