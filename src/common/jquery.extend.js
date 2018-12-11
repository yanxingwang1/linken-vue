(function ($) {
  console.log('jQuery拓展方法,jQuery版本', $.fn.jquery)
  $.extend({
    alert: function (message) {
      $.dialog({
        title: '提示',
        message: message,
        buttons: [
          {
            title: '确定',
            isBold: true
          }
        ]
      })
    },
    /*
    Demo
    $.dialog({
      title:'提示',
      message:'你好 林肯',
      html:'<input id="testtest" type="text" />',
      buttons:[{
        title:'取消'
      },{
        title:'确认',
        isBold:true,
        callback:function () {
          console.log('点击确认',$('#testtest').val())
        }
      }]
    })
    */
    dialog: function ({title, message, buttons, html,type}) {
      var $body = $('body')
      var $popupBackdrop = $(`<div class="wx-popup-backdrop" style="display: block;"></div>`)
      $body.append($popupBackdrop)
      $popupBackdrop.on('click', () => {
        hideDialog()
      }).on('touchmove', (e) => {
        e.preventDefault()
      })
      setTimeout(() => {
        $popupBackdrop.addClass('wx-active')
      }, 0)

      var $popup = $(`
      <div class="wx-popup ${type?type:'wx-dialog'}" style="display: block;">
        <div class="wx-popup-inner">
          <div class="wx-popup-title">${title ? title : ''}</div>
          <div class="wx-popup-text">${message ? message : ''}</div>
          <div class="wx-popup-html">
            ${html ? html : ''}
          </div>
        </div>
        <div class="wx-popup-buttons"></div>
      </div>
      `)
      $popup.on('touchmove', (e) => {
        e.preventDefault()
      })
      var $buttons = $popup.find('.wx-popup-buttons')
      buttons.forEach(function (btn, i) {
        let $btn = $(`<span class="wx-popup-button ${btn.isBold ? 'wx-popup-button-bold' : ''}">${btn.title ? btn.title : ''}</span>`)
        $btn.on('click', function () {
          if (btn.callback) {
            btn.callback()
          }
          hideDialog()
        })

        $buttons.append($btn)
      })

      $body.append($popup)
      setTimeout(() => {
        $popup.addClass('wx-popup-in')
      }, 0)

      function hideDialog() {
        $popup.removeClass('wx-popup-in')
        $popupBackdrop.removeClass('wx-active')
        setTimeout(() => {
          $popupBackdrop.remove()
          $popup.remove()
        }, 400)
      }
    }
  })
  //n3SelectScroll
  $.fn.n3SelectScroll = function () {
    this.css('max-height', '250px')
    this.each((i, e) => {
      //console.log('=====', i, e)
      let $menu = $(e)
      let $menuH
      let $itemLiH
      let $itemLi
      let startY
      let translateY
      $menu.on('touchstart', function (e) {
        $itemLi = $menu.find('li')
        startY = e.targetTouches[0].clientY
        translateY = $itemLi.css('transform')
        $menuH = $menu.height()
        $itemLiH = $itemLi.height() * $itemLi.length
        if (translateY == 'none') {
          translateY = 0
        } else {
          translateY = parseFloat(translateY.split(',').pop())
        }
      })
      $menu.on('touchmove', function (e) {
        // let startY = 0
        let topV = $menu.offset().top
        let moveY = e.targetTouches[0].clientY
        let tmp = translateY + (moveY - startY)
        if (tmp > 0) {
          tmp = 0
        }
        let tmp2 = ($menuH - $itemLiH)
        if (tmp < tmp2) {
          tmp = tmp2
        }
        $itemLi.css(`transform`, `translateY(${tmp}px)`)
      })
    })
  }
  $.fn.numberKeyBorad = function (maxSize) {
    var $input = this
    $input.attr('readonly', true).on('click', () => {
      window.$numKeyBoardWrap = $(`
      <div class="wx-number-keyboard-wrap">
          <div class="num-keyboard">
            <div class="num key" data="1">1</div>
            <div class="num key" data="2">2</div>
            <div class="num key" data="3">3</div>
            <div class="num key" data="4">4</div>
            <div class="num key" data="5">5</div>
            <div class="num key" data="6">6</div>
            <div class="num key" data="7">7</div>
            <div class="num key" data="8">8</div>
            <div class="num key" data="9">9</div>
            <div class="num key" data="." style="visibility: hidden">.</div>
            <div class="num key" data="0">0</div>
            <div class="del key" data="del">删除</div>
          </div>
      </div>
      `).on('touchmove', (e) => {
        e.preventDefault()
      }).on('click', (e) => {
        $numKeyBoardWrap.removeClass('active')
        setTimeout(() => {
          $numKeyBoardWrap.remove()
        }, 200)
      })
      let $numKeyboard = $numKeyBoardWrap.find('.num-keyboard').on('click', (e) => {
        e.stopPropagation()
      })
      $numKeyBoardWrap.find('.num-keyboard .key').on('click', (e) => {
        let $key = $(e.target)
        let keyvalue = $key.attr('data')
        let inputValue = $input.val()
        if (keyvalue !== 'del') {
          if (maxSize && inputValue.length > maxSize){
            console.log(inputValue.length,maxSize)
          }else {
            $input.val(`${inputValue}${keyvalue}`)
          }
        } else {
          $input.val(inputValue.substring(0, inputValue.length - 1))
        }
      })
      $('body').append($numKeyBoardWrap)
      setTimeout(() => {
        $numKeyBoardWrap.addClass('active')
      }, 0)

    })
  }
}(jQuery))
