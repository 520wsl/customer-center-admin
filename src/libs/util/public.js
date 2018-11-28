let util = {
    // input框只能输入数字
    inLimit: {
        bind: function (el) {
            var els = util.__$$.getElementsByAttr(el, 'in-limit');
            var targets = [];
            if (els.length < 1) {
                return;
            }
            for (let i = 0, len = els.length; i < len; i++) {
                if (els[i].tagName.toLocaleLowerCase() === 'input') {
                    targets.push(els[i]);
                } else {
                    var ins = els[i].getElementsByTagName('input');
                    let type = els[i].getAttribute('in-limit');
                    for (var j = 0, jLen = ins.length; j < jLen; j++) {
                        ins[j].setAttribute('in-limit', type);
                        targets.push(ins[j]);
                    }
                }
            }
            var isIe = !!document.attachEvent;
            for (let i = 0, len = targets.length; i < len; i++) {
                let type = targets[i].getAttribute('in-limit');
                if (!this[type]) {
                    continue;
                }
                if (isIe) {
                    targets[i].attachEvent('keypress', this[type]);
                    targets[i].attachEvent('keyup', this[type]);
                } else {
                    targets[i].addEventListener('keypress', this[type]);
                    targets[i].addEventListener('keyup', this[type]);
                }
            }
        },
        num: function (event) {
            return util.inLimit.__limit(event, false, true);
        },
        nNum: function (event) {
            return util.inLimit.__limit(event, true, true);
        },
        int: function (event) {
            return util.inLimit.__limit(event, false, false);
        },
        nInt: function (event) {
            return util.inLimit.__limit(event, true, false);
        },
        __limit: function (event, negative, decimal) {
            var e = typeof (window.event) !== 'undefined' ? window.event : event;
            var currKey = e.keyCode || e.which || e.charCode;
            var val = e.target.value;
            var reg = new RegExp('[^\\r\\n\\d' + (decimal ? '\\.' : '') + (negative ? '-' : '') + ']*', 'g');
            val = val.replace(reg, '');
            if (val.split('.').length > 2) {
                val = parseFloat(val) + '';
            }
            if (val.indexOf('-') > 0) {
                val = val.replace(/-/g, '');
            }
            if (val.length !== e.target.value.length) {
                e.target.value = val;
            }
            if (!(currKey === 13 || (negative && currKey === 45 && val.indexOf('-') === -1) || (decimal && currKey === 46 && val.indexOf('.') === -1 && val.match(/\d$/)) || currKey === 8 || currKey === 0 || (e.shiftKey === false && (currKey > 47 && currKey < 58)))) {
                e.preventDefault();
                return false;
            }
        }
    }
}
export default util;