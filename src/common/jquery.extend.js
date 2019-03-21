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
    toast: function (message) {
      var $body = $('body')
      // <div class="mui-toast-container mui-active"><div class="mui-toast-message">欢迎体验Hello MUI</div></div>
      let $toast = $(`
      <div class="wx-toast-container">
        <div class="wx-toast-message">${message}</div>
      </div>`)
      $body.append($toast)
      setTimeout(() => {
        $toast.addClass('wx-active')
      }, 0)
      setTimeout(() => {
        $toast.removeClass('wx-active')
        setTimeout(() => {
          $toast.remove()
        }, 800)
      }, 2500)
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
      }],
      isMask:true,
      maskOnClick:()=>{console.log('点击遮罩')}
    })
    */
    dialog: function (_params) {
      const params = Object.assign({
        type: 'wx-dialog',
        title: '提示',
        message: '',
        html: '',
        buttons: [{
          title: '确认',
          isBold: true,
          callback() {
            console.log('点击确认')
          }
        }],
        isMask: true,
        maskOnClick() {
          console.log('点击遮罩')
        }
      }, _params)
      var $body = $('body')

      var $popupBackdrop = $(`<div class="wx-popup-backdrop" style="display: block;"></div>`)
      $popupBackdrop.on('click', () => {
        hideDialog()
      }).on('touchmove', (e) => {
        e.preventDefault()
      })
      setTimeout(() => {
        $popupBackdrop.addClass('wx-active')
      }, 0)

      var $popup = $(`
      <div class="wx-popup ${params.type}" style="display: block;">
        <div class="wx-popup-inner">
          <div class="wx-popup-title">${params.title}</div>
          <div class="wx-popup-text">${params.message}</div>
          <div class="wx-popup-html">
            ${params.html}
          </div>
        </div>
        <div class="wx-popup-buttons"></div>
      </div>
      `)
      $popup.on('touchmove', (e) => {
        e.preventDefault()
      })
      var $buttons = $popup.find('.wx-popup-buttons')
      params.buttons.forEach(function (btn, i) {
        let $btn = $(`<span class="wx-popup-button ${btn.isBold ? 'wx-popup-button-bold' : ''}">${btn.title ? btn.title : ''}</span>`)
        $btn.on('click', function () {
          if (btn.callback) {
            const fnRes = btn.callback()
            if (fnRes !== false) {
              hideDialog()
            }
          } else {
            hideDialog()
          }
        })

        $buttons.append($btn)
      })
      if (params.isMask) {
        $popupBackdrop.on('click', params.maskOnClick)
        $body.append($popupBackdrop)
      }
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
    },
    /**
     * 校验手机号码
     * @param mobile
     */
    checkMobile: function (mobile) {
      let _mobile = String(mobile);
      if (_mobile.length === 11 && _mobile.substr(0, 1) === '1' && $.checkNumber(_mobile)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 验证字符串 是否 全是 数字
     * @param {Object}
     */
    checkNumber: function (num) {
      let arr = String(num).split('');
      let flag = true;
      $.each(arr, function (i, n) {
        if (!(n === '0' || n === '1' || n === '2' || n === '3' || n === '4' || n === '5' || n === '6' || n === '7' || n === '8' || n === '9')) {
          flag = false;
          return false;
        }
      });
      return flag;
    },
    showKeyboard: showKeyboard,
    //日历选择 依赖 moment.js 和 mobiscroll 3.2.3
    calendar: function (_params) {
      let $body = $('body')
      let $calendarMask = $('<div class="wx-calendar-mask"></div>')
      let $calendarWrap = $(`
          <div class="wx-calendar-wrap">
              <div class="wx-calendar-header">
                  <div class="wx-calendar-title">日期选择</div>
                  <div class="wx-calendar-clear-btn">清除</div>
              </div>
              <div class="wx-calendar">
                  <input id="wx-calendar-date-input" readonly="" style="display: none">
              </div>
              <div class="wx-calendar-footer">
                  <div class="wx-calendar-btn">确认</div>
              </div>
          </div>
      `)
      let $clearBtn = $calendarWrap.find('.wx-calendar-clear-btn')
      let $wxtitle = $calendarWrap.find('.wx-calendar-title')
      let $okBtn = $calendarWrap.find('.wx-calendar-btn')
      const params = Object.assign({
        theme: 'ios',
        lang: 'zh',
        display: 'inline',
        mode: '',
        controls: ['calendar', 'time'],
        showScrollArrows: true,
        onDayChange: function (event, inst) {
          // var setday = moment(event.date).format('YYYY年MM月DD日  星期dd')
          // $wxtitle.text(setday)
        },
        onMonthChange: function (event, inst) {
          console.log('onMonthChange',event)
        }
      }, _params)
      let hideCalendar = function () {
        $calendarWrap.removeClass('wx-active')
        setTimeout(() => {
          $calendarWrap.remove()
          $calendarMask.remove()
        }, 300)
      }
      $calendarMask.on('click', hideCalendar).on('touchmove', (e) => e.preventDefault())
      $calendarWrap.on('touchmove', (e) => e.preventDefault())
      $body.append($calendarMask, $calendarWrap)
      let instance = mobiscroll.calendar('#wx-calendar-date-input', params)
      $clearBtn.on('click', () => {
        params.callback('')
        hideCalendar()
      })
      $okBtn.on('click', () => {
        const isHide = params.callback(instance.getVal(true))
        if (isHide !== false) {
          hideCalendar()
        }
      })
      setTimeout(() => {
        $calendarWrap.addClass('wx-active')
      }, 200)
    },
    //时间选择
    date: function (_params){
      let $body = $('body')
      let $calendarMask = $('<div class="wx-calendar-mask"></div>')
      let $calendarWrap = $(`
          <div class="wx-calendar-wrap">
              <div class="wx-calendar-header">
                  <div class="wx-calendar-title">日期选择</div>
                  <div class="wx-calendar-clear-btn">清除</div>
              </div>
              <div class="wx-calendar">
                  <input id="wx-calendar-date-input" readonly="" style="display: none">
              </div>
              <div class="wx-calendar-footer">
                  <div class="wx-calendar-btn">确认</div>
              </div>
          </div>
      `)
      let $clearBtn = $calendarWrap.find('.wx-calendar-clear-btn')
      let $wxtitle = $calendarWrap.find('.wx-calendar-title')
      let $okBtn = $calendarWrap.find('.wx-calendar-btn')
      const params = Object.assign({
        lang: 'zh',
        theme: 'ios',
        dateWheels: 'yy mm - MM',
        dateFormat: 'mm/yy',
        display: 'inline',
        minWidth: 100
      }, _params)
      let hideCalendar = function () {
        $calendarWrap.removeClass('wx-active')
        setTimeout(() => {
          $calendarWrap.remove()
          $calendarMask.remove()
        }, 300)
      }
      $calendarMask.on('click', hideCalendar).on('touchmove', (e) => e.preventDefault())
      $calendarWrap.on('touchmove', (e) => e.preventDefault())
      $body.append($calendarMask, $calendarWrap)

      let instance = mobiscroll.date('#wx-calendar-date-input', params)
      $clearBtn.on('click', () => {
        params.callback('')
        hideCalendar()
      })
      $okBtn.on('click', () => {
        const isHide = params.callback(instance.getVal(true))
        if (isHide !== false) {
          hideCalendar()
        }
      })
      setTimeout(() => {
        $calendarWrap.addClass('wx-active')
      }, 200)
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
  /**
   * 数字键盘
   * @param _params
   * demo:
   * {
   *    maxSize: { Number } //最大位数
   *    onBlur: { Function } //失去焦点事件
   *    isMask: { Boolean }
   *    maskOnClick: { Function }
   * }
   */
  $.fn.numberKeyBorad = function (_params) {
    const params = Object.assign({
      onBlur: (value) => {
        console.log('numberKeyBorad onBlur', value)
      },
      isMask: true,
      maskOnClick: () => {
      }
    }, _params)
    var $input = this
    $input.attr('readonly', true).on('click', () => {
      if ($('.wx-number-keyboard-wrap').length) {
        return
      }
      let $numKeyBoardMask = $(`<div class="wx-number-keyboard-mask"></div>`)
      let $numKeyBoardWrap = $(`
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
      })
      $numKeyBoardMask.on('touchmove', (e) => {
        e.preventDefault()
      }).on('click', e => {
        hideNumKeyBoard()
      })
      $numKeyBoardWrap.find('.num-keyboard .key').on('click', (e) => {
        let $key = $(e.target)
        let keyvalue = $key.attr('data')
        let inputValue = $input.val()
        if (keyvalue !== 'del') {
          if (params.maxSize && inputValue.length >= params.maxSize) {
            console.log(inputValue.length, params.maxSize)
          } else {
            $input.val(`${inputValue}${keyvalue}`)
          }
        } else {
          $input.val(inputValue.substring(0, inputValue.length - 1))
        }
      })
      if (params.isMask) {
        $('body').append($numKeyBoardMask)
      }
      $('body').append($numKeyBoardWrap)
      setTimeout(() => {
        $numKeyBoardWrap.addClass('active')
      }, 0)

      function hideNumKeyBoard() {
        $numKeyBoardWrap.removeClass('active')
        setTimeout(() => {
          $numKeyBoardMask.remove()
          $numKeyBoardWrap.remove()
        }, 300)
      }
    })
  }
  /**
   * 参数
   * @param params
   * @returns {jQuery}
   *
   * params demo：
   * {
   *     isChecked: true,//校验车牌
   *     onBlur: (value) => { }
   * }
   */
  $.fn.licensePlateKeyboard = function (_params) {
    const params = Object.assign({
      isChecked: true,
      onBlur: (value) => {
        console.log('licensePlateKeyboard onBlur', value)
      },
      onFocus: () => {
      },
    }, _params)
    var $input = this
    $input.attr('readonly', true).on('click', () => {
      const provices1 = ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘"]
      const provices2 = ["皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘"]
      const provices3 = ["晋", "蒙", "陕", "吉", "闵", "贵", "粤"]
      const provices4 = ["青", "藏", "川", "宁", "琼"]
      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      const letters1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
      const letters2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
      const letters3 = ["Z", "X", "C", "V", "B", "N", "M"]
      let $body = $('body')
      let $mask = $(`<div class="wx-license-plate-keyboard-mask"></div>`)
      let $del = $(`<div class="key del" data="del"></div>`)
      let $keyboardWrap = $(`<div class="wx-license-plate-keyboard-wrap"></div>`)
      let $keyWrap_provices1 = $(`<div class="key-wrap provice"></div>`)
      let $keyWrap_provices2 = $(`<div class="key-wrap provice"></div>`)
      let $keyWrap_provices3 = $(`<div class="key-wrap provice"></div>`)
      let $keyWrap_provices4 = $(`<div class="key-wrap provice"></div>`)
      let $keyWrap_numbers = $(`<div class="key-wrap letter"></div>`)
      let $keyWrap_letters1 = $(`<div class="key-wrap letter"></div>`)
      let $keyWrap_letters2 = $(`<div class="key-wrap letter"></div>`)
      let $keyWrap_letters3 = $(`<div class="key-wrap letter"></div>`)
      provices1.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_provices1.append($key)
      })
      provices2.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_provices2.append($key)
      })
      provices3.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_provices3.append($key)
      })
      provices4.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_provices4.append($key)
      })
      numbers.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_numbers.append($key)
      })
      letters1.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_letters1.append($key)
      })
      letters2.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_letters2.append($key)
      })
      letters3.forEach((item, i) => {
        let $key = $(`<div class="key" data="${item}">${item}</div>`)
        $keyWrap_letters3.append($key)
      })
      $keyboardWrap.append(
        $keyWrap_provices1,
        $keyWrap_provices2,
        $keyWrap_provices3,
        $keyWrap_provices4,
        $keyWrap_numbers,
        $keyWrap_letters1,
        $keyWrap_letters2,
        $keyWrap_letters3,
        $del
      )
      //绑定事件
      $mask.on('touchmove', e => {
        e.preventDefault()
      }).on('click', e => {
        if (params.isChecked) {
          const cph = $input.val()
          let express = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
          let result = express.test(cph);
          if (!(result || cph.length === 0)) {
            $.toast('请输入格式正确的车牌号码')
            return
          }
        }
        if (params.onBlur) {
          params.onBlur($input.val())
          hideLicenseKeyboard()
        }
      })
      $keyboardWrap.on('touchmove', e => {
        e.preventDefault()
      })
      $keyboardWrap.find('.key').on('click', (e) => {
        const maxSize = 7
        let $key = $(e.target)
        let keyvalue = $key.attr('data')
        let inputValue = $input.val()
        if (keyvalue !== 'del') {
          if (inputValue.length == 0) {
            $keyboardWrap.removeClass('license-provice').addClass('license-letter')
          }
          if (maxSize && inputValue.length > maxSize) {
            console.log(inputValue.length, maxSize)
          } else {
            $input.val(`${inputValue}${keyvalue}`)
          }
        } else {
          if (inputValue.length == 1) {
            $keyboardWrap.removeClass('license-letter').addClass('license-provice')
          }
          $input.val(inputValue.substring(0, inputValue.length - 1))
        }
        $input.trigger('inputplate')
      })
      $body.append($mask, $keyboardWrap)
      setTimeout(() => {
        $keyboardWrap.addClass('wx-active')
        const className = $input.val().length === 0 ? 'license-provice' : 'license-letter'
        $keyboardWrap.addClass(className)
        params.onFocus()
      }, 0)

      //收起车牌号键盘
      function hideLicenseKeyboard() {
        $keyboardWrap.removeClass('wx-active')
        setTimeout(() => {
          $keyboardWrap.remove()
          $mask.remove()
        }, 300)
      }
    })
    return $input
  }
  function showKeyboard(_params) {
    const params = Object.assign({
      type:'license-provice',
      onBlur() {
        console.log('onBlur')
      },
      onFocus(){
        console.log('onFocus')
      },
      onClick(value){},
    }, _params)
    const provices1 = ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘"]
    const provices2 = ["皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘"]
    const provices3 = ["晋", "蒙", "陕", "吉", "闵", "贵", "粤"]
    const provices4 = ["青", "藏", "川", "宁", "琼"]
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const letters1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const letters2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const letters3 = ["Z", "X", "C", "V", "B", "N", "M"]
    let $body = $('body')
    let $mask = $(`<div class="wx-license-plate-keyboard-mask"></div>`)
    let $del = $(`<div class="key del" data="del"></div>`)
    let $keyboardWrap = $(`<div class="wx-license-plate-keyboard-wrap"></div>`)
    let $keyWrap_provices1 = $(`<div class="key-wrap provice"></div>`)
    let $keyWrap_provices2 = $(`<div class="key-wrap provice"></div>`)
    let $keyWrap_provices3 = $(`<div class="key-wrap provice"></div>`)
    let $keyWrap_provices4 = $(`<div class="key-wrap provice"></div>`)
    let $keyWrap_numbers = $(`<div class="key-wrap letter"></div>`)
    let $keyWrap_letters1 = $(`<div class="key-wrap letter"></div>`)
    let $keyWrap_letters2 = $(`<div class="key-wrap letter"></div>`)
    let $keyWrap_letters3 = $(`<div class="key-wrap letter"></div>`)
    provices1.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_provices1.append($key)
    })
    provices2.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_provices2.append($key)
    })
    provices3.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_provices3.append($key)
    })
    provices4.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_provices4.append($key)
    })
    numbers.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_numbers.append($key)
    })
    letters1.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_letters1.append($key)
    })
    letters2.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_letters2.append($key)
    })
    letters3.forEach((item, i) => {
      let $key = $(`<div class="key" data="${item}">${item}</div>`)
      $keyWrap_letters3.append($key)
    })
    $keyboardWrap.append(
      $keyWrap_provices1,
      $keyWrap_provices2,
      $keyWrap_provices3,
      $keyWrap_provices4,
      $keyWrap_numbers,
      $keyWrap_letters1,
      $keyWrap_letters2,
      $keyWrap_letters3,
      $del
    )
    //绑定事件
    $mask.on('touchmove', e => {
      e.preventDefault()
    }).on('click', e => {
      const flag = params.onBlur()
      if (flag !== false){
        hideLicenseKeyboard()
      }
    })
    $keyboardWrap.on('touchmove', e => {
      e.preventDefault()
    })
    $keyboardWrap.addClass(params.type)
    // $keyboardWrap.removeClass('license-letter').addClass('license-provice')
    $keyboardWrap.find('.key').on('click', (e) => {
      let $key = $(e.target)
      let keyvalue = $key.attr('data')
      console.log('键盘:',keyvalue)
      params.onClick(keyvalue)
    })
    $body.append($mask, $keyboardWrap)
    setTimeout(() => {
      $keyboardWrap.addClass('wx-active')
      params.onFocus()
    }, 0)

    //收起车牌号键盘
    function hideLicenseKeyboard() {
      $keyboardWrap.removeClass('wx-active')
      setTimeout(() => {
        $keyboardWrap.remove()
        $mask.remove()
      }, 300)
    }
  }
}(jQuery))
