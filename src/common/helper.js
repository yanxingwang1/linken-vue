/**
 * 常用公共方法
 */
import _ from 'lodash';
let _this;


class Helper {
    constructor() {
        this.regions = null;
        _this = this;
    }
    /**
     * 验证手机号
     * @param {String} mobile 
     */
    isMobile(mobile) {
        let _mobile = String(mobile);
        if (_mobile.length === 11 && _mobile.substr(0, 1) === '1' 
            && checkNumber(_mobile)) {
            return true;
        } else {
            return false;
        }

        function checkNumber(num) {
            let arr = String(num).split(''),
                flag = true;
            arr.forEach(function(n, i) { 
                if(!(n === '0' || n === '1' || n === '2' || n === '3' || n === '4' || n === '5' || n === '6' || n === '7' || n === '8' || n === '9')) {
                    flag = false;
                    return false;
                }
            });
            return flag;
        }
    }
    /**
     * 获取url参数
     * @param {String} key 
     * @param {String} url 
     */
    getUrlParams(key, url) {
        url = url || location.href;
        let len = url.indexOf('?'),
            params = {};

        if (len !== -1) {
            let paramStr = url.substr(len + 1);
            paramStr = paramStr.split('&');

            paramStr.forEach(function(val) {
                let param = val.split('=');
                if (param[0]) {
                    params[param[0]] = param[1] || "";
                }
            });  
        }

        return key ? (params[key] ? params[key] : '') : params;
    }

    setData(key, value) {
        if (! key || ! value) return;

        if (Array.isArray(value) || _.isPlainObject(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    getData(key, isFormated) {
        isFormated = typeof isFormated == 'boolean' ? isFormated : false;

        if (isFormated) {
            let val = localStorage.getItem(key);
            return val ? JSON.parse(localStorage.getItem(key)) : {};
        } else {
            return localStorage.getItem(key);
        }    
    }

    clear(key) {
        if (key) {
            localStorage.removeItem(key);
        } else {
            localStorage.clear();
        }
    }

    getSelectedValue(res, key, id) {
        let len, i;
        res = res || [];
        key = key || '';
        len = res.length;

        for (i = 0; i < len; i++) {
            if (res[i][key] === id) {
                return res[i];
            }
        }

        return null;
    }

    createNonceStr($len) {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            str = "", i;
        $len = $len || 16;
        for (i = 0; i < $len; i++) {
            str += chars.substr((Math.random() * Math.floor(chars.length - 1)), 1);
        }

        return str;
    }

    hexCode(str, method) {
        debugger
        var hexcase = 0; /*   hex   output   format.   0   -   lowercase;   1   -   uppercase                 */
        var b64pad = ""; /*   base-64   pad   character.   "="   for   strict   RFC   compliance       */
        var chrsz = 8; /*   bits   per   input   character.   8   -   ASCII;   16   -   Unicode             */
        method = method || "hex_sha1";
        /*   
        *   These   are   the   functions   you'll   usually   want   to   call   
        *   They   take   string   arguments   and   return   either   hex   or   base-64   encoded   strings   
        */
        function hex_sha1(s) {
            return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
        }

        function b64_sha1(s) {
            return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
        }

        function str_sha1(s) {
            return binb2str(core_sha1(str2binb(s), s.length * chrsz));
        }

        function hex_hmac_sha1(key, data) {
            return binb2hex(core_hmac_sha1(key, data));
        }

        function b64_hmac_sha1(key, data) {
            return binb2b64(core_hmac_sha1(key, data));
        }

        function str_hmac_sha1(key, data) {
            return binb2str(core_hmac_sha1(key, data));
        }

        /*   
        *   Perform   a   simple   self-test   to   see   if   the   VM   is   working   
        */
        function sha1_vm_test() {
            return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
        }

        /*   
        *   Calculate   the   SHA-1   of   an   array   of   big-endian   words,   and   a   bit   length   
        */
        function core_sha1(x, len) {
            /*   append   padding   */
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;

            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;

                for (var j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j];
                    else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return Array(a, b, c, d, e);

        }

        /*   
        *   Perform   the   appropriate   triplet   combination   function   for   the   current   
        *   iteration   
        */
        function sha1_ft(t, b, c, d) {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        }

        /*   
        *   Determine   the   appropriate   additive   constant   for   the   current   iteration   
        */
        function sha1_kt(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        }

        /*   
        *   Calculate   the   HMAC-SHA1   of   a   key   and   some   data   
        */
        function core_hmac_sha1(key, data) {
            var bkey = str2binb(key);
            if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

            var ipad = Array(16),
                opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }

            var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
            return core_sha1(opad.concat(hash), 512 + 160);
        }

        /*   
        *   Add   integers,   wrapping   at   2^32.   This   uses   16-bit   operations   internally   
        *   to   work   around   bugs   in   some   JS   interpreters.   
        */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*   
        *   Bitwise   rotate   a   32-bit   number   to   the   left.   
        */
        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        /*   
        *   Convert   an   8-bit   or   16-bit   string   to   an   array   of   big-endian   words   
        *   In   8-bit   function,   characters   >255   have   their   hi-byte   silently   ignored.   
        */
        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
            return bin;
        }

        /*   
        *   Convert   an   array   of   big-endian   words   to   a   string   
        */
        function binb2str(bin) {
            var str = "";
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
            return str;
        }

        /*   
        *   Convert   an   array   of   big-endian   words   to   a   hex   string.   
        */
        function binb2hex(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        }

        /*   
        *   Convert   an   array   of   big-endian   words   to   a   base-64   string   
        */
        function binb2b64(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                    else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
            return str;
        }

        return eval(method + "(str)");
    }
}

export default new Helper;