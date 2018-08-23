

var calcSrc = {};
(function($, undefined){
	calcSrc.classes = {};
	calcSrc.getRandom = function (min, max) {
		if (min === max) {
			return min;
		}
		return parseInt(Math.random() * (max - min) + min, 10);
	};

	calcSrc.getThreeOneDiv = function(){
		var a1 = calcSrc.getRandom(2,9);
		var randMin = Math.ceil(100.0 / parseFloat(a1));
		var randMax = Math.floor(1000.0 / parseFloat(a1));
		var a2 = calcSrc.getRandom(randMin, randMax);
		return [(a2*a1)+'', '÷', a1+''];
	};

	calcSrc.getThreeOneMul = function(){
		var a1 = calcSrc.getRandom(100,999)+'';
		var a2 = calcSrc.getRandom(2,9)+'';
		return [a1, '×', a2];
	};

	calcSrc.getTwoOneDiv = function(){
		var a1 = calcSrc.getRandom(2,9);
		var randMin = Math.ceil(10.0 / parseFloat(a1));
		var randMax = Math.floor(100.0 / parseFloat(a1));
		var a2 = calcSrc.getRandom(randMin, randMax);
		return [(a2*a1)+'', '÷', a1+''];
	};

	calcSrc.getTwoOneMul = function(){
		var a1 = calcSrc.getRandom(10,99)+'';
		var a2 = calcSrc.getRandom(2,9)+'';
		return [a1, '×', a2];
	};

	calcSrc.getIntPair =function(digit) {
		var min = Math.floor(Math.pow(10, digit-1));
		var max = Math.floor(Math.pow(10, digit)) - 1;
		var a1 = 0;
		var a2 = 0;
		while(1) {
			a1 = calcSrc.getRandom(min, max);
			a2 = calcSrc.getRandom(min, max);
			if(a1 !== a2) {
				break;
			}
		}
		return [a1, a2];
	};

	calcSrc.getSubtraction = function(digit){
		var first = calcSrc.getIntPair(digit);
		var tmp = 0;
		if (first[0] > first[1]) {
			tmp = first[1];
			first[1] = first[0];
			first[0] = tmp;
		}
		return [''+first[0], '-', ''+first[1]];
	};

	calcSrc.getAddition = function(digit){
		var first = calcSrc.getIntPair(digit);
		return [''+first[0], '+', ''+first[1]];
	};

	var _getAdditionWithCarryUp_1Digit = function() {
		var a1 = calcSrc.getRandom(5, 9);
		var a2 = calcSrc.getRandom(10 - a1, 9);
		if (calcSrc.getRandom(1,100) % 3) {
			return [a2, a1];
		}
		return [a1, a2];
	};

	calcSrc.getAdditionWithCarryUp = function(digit) {
		var first = _getAdditionWithCarryUp_1Digit();
		if (digit === 1) {
			return [first[0]+'', '+', first[1]+''];
		}
		var a = [];
		var b = [];
		a.push(calcSrc.getRandom(1, 9) + '');
		b.push(calcSrc.getRandom(1, 9) + '');
		digit--;
		var target = calcSrc.getRandom(1, digit);
		while (digit > 0) {
			if (digit === target) {
				a.push(first[0] + '');
				b.push(first[1] + '');
				digit--;
				continue;
			}
			a.push(calcSrc.getRandom(0, 9) + '');
			b.push(calcSrc.getRandom(0, 9) + '');
			digit--;
		}
		return [a.join(''), '+', b.join('')];
	};

	calcSrc.getAdditionWithCarryUp_2digit_1digit = function() {
		var first = _getAdditionWithCarryUp_1Digit();
		var sec = calcSrc.getRandom(1,8);
		return [sec+''+first[0], '+', first[1]+''];
	};

	calcSrc.getSubtractionWithCarryDown_min18_1digit = function(){
		var first = _getAdditionWithCarryUp_1Digit();
		var add = first[0] + first[1];
		return (calcSrc.getRandom(0, 99) % 2) ? [add+'', '-', first[1]] : [add+'', '-', first[0]];
	};

	calcSrc.getSubtractionWithCarryDown_2digit_1digit = function(){
		var first = _getAdditionWithCarryUp_1Digit();
		var add = first[0] + first[1] + (calcSrc.getRandom(0, 8) * 10);
		return (calcSrc.getRandom(0, 99) % 2) ? [add+'', '-', first[1]] : [add+'', '-', first[0]];
	};

	calcSrc.getSubtractionWithCarryDown_2digit_2digit = function(){
		var first = calcSrc.getIntPair(1);
		var second = calcSrc.getIntPair(1);
		var tmp = 0;
		if (first[0] > first[1]) {
			tmp = first[1];
			first[1] = first[0];
			first[0] = tmp;
		}
		if (second[0] < second[1]) {
			tmp = second[1];
			second[1] = second[0];
			second[0] = tmp;
		}
		return [second[0]+''+first[0], '-', second[1]+''+first[1]];
	};

	calcSrc.getDivision_2digit_1digit = function(){
		var a1 = calcSrc.getRandom(2,9);
		var randMin = parseInt(Math.ceil(10.0 / parseFloat(a1)), 10);
		var randMax = parseInt(Math.floor(100.0 / parseFloat(a1)), 10);
		var a2 = calcSrc.getRandom(randMin, randMax);
		return [(a2*a1)+'', '÷', a1+''];
	};

	calcSrc.getDivision_3digit_1digit = function(){
		var a1 = calcSrc.getRandom(2,9);
		var randMin = parseInt(Math.ceil(100.0 / parseFloat(a1)), 10);
		var randMax = parseInt(Math.floor(1000.0 / parseFloat(a1)), 10);
		var a2 = calcSrc.getRandom(randMin, randMax);
		return [(a2*a1)+'', '÷', a1+''];
	};

	calcSrc.getMultiple_2digit_1digit = function(){
		var a1 = calcSrc.getRandom(10,99)+'';
		var a2 = calcSrc.getRandom(2,9)+'';
		return [a1, '×', a2];
	};

	calcSrc.getMultiple_3digit_1digit = function(){
		var a1 = calcSrc.getRandom(100,999)+'';
		var a2 = calcSrc.getRandom(2,9)+'';
		return [a1, '×', a2];
	};


	calcSrc.classes.CountDownTimer = (function(){
		var _skelton = function($target, startSec){
			var me = this;
			me.$timer = $target;
			me.counterLimit = parseInt(startSec, 10);
			me.counterFirst = 0;
			me.timerId = null;
			me.onStopCallback = null;
		};
		_skelton.prototype = {
			start: function (onStopCallback) {
				var me = this;
				me.onStopCallback = onStopCallback;
				me.counter_first = parseInt((new Date) / 1000, 10);
				me.timerId = setInterval(function () {
					var _now = parseInt((new Date) / 1000, 10);
					var nowSec = _now - me.counter_first;
					var remain = me.counterLimit - nowSec;
					if (remain <= 0) {
						me.stop();
						return;
					}
					var _sec = remain % 60;
					var _min = (remain - _sec) / 60;
					me.$timer.text((_min < 10 ? '0' : '') + _min.toString() + ':' + (_sec < 10 ? '0' : '') + _sec.toString());
				}, 1000);
			},
			stop: function () {
				var me = this;
				if (me.timerId) {
					if (typeof me.onStopCallback === 'function' && me.onStopCallback.nodeType !== "number") {
						me.onStopCallback();
					}
					clearInterval(me.timerId);
					me.timerId = null;
				}
			}
		};
		return _skelton;
	})();

	calcSrc.classes.CountUpTimer = (function(){
		var _skelton = function($target){
			var me = this;
			me.$timer = $target;
			me.counter_first = 0;
			me.timerId = null;
			me.result = 0;
		};
		_skelton.prototype = {
			start: function(){
				var me = this;
				me.counter_first = parseInt((new Date)/1000, 10);
				me.timerId = setInterval(function(){
					var _now = parseInt((new Date)/1000, 10);
					var nowSec = _now - me.counter_first;
					var _sec = nowSec % 60;
					var _min = (nowSec -_sec) / 60;
					me.$timer.text((_min < 10 ? '0' : '')+_min.toString()+':'+(_sec < 10 ? '0' : '')+_sec.toString());
				}, 1000);
			},
			stop: function(){
				var me = this;
				if (me.timerId) {
					var _now = parseInt((new Date)/1000, 10);
					me.result = _now - me.counter_first;
					clearInterval(me.timerId);
					me.timerId = null;
				}
			}
		};
		return _skelton;
	})();

	// LocalStorageが使えるかどうか。
	var _isAllowLocalStorage = function(){
		try {
			if (typeof localStorage === 'undefined') {
				return false;
			} else if(window.localStorage) {
			}
		} catch(e) {
			return false;
		}
		return true;
	};

	calcSrc.classes.ResultDb = (function(){
		var _skelton = function(keyName){
			var me = this;
			me.keyName = keyName;
			me.cached = null;
			me.isAllow = _isAllowLocalStorage();
		};
		_skelton.prototype = {
			_formatData: function(raw){
				if (raw) {
					try {
						raw = JSON.parse(raw);
					} catch(e) {
						raw = [];
					}
				}
				if (!raw || raw.constructor !== Array) {
					raw = [];
				}
				return raw;
			},
			save: function(val){
				var me = this;
				if (!me.isAllow || !val) {
					return;
				}
				me._load();
				if (me.cached.length >= 50) {
					me.cached.shift();
				}
				var dt = new Date();
				me.cached.push({'dt':dt.toJSON(), 'value':val});
				window.localStorage.setItem(me.keyName, JSON.stringify(me.cached));
			},
			_load: function(){
				var me = this;
				if (!me.isAllow) {
					return;
				}
				if (me.cached !== null) {
					return;
				}
				window.localStorage.getItem(me.keyName);
				me.cached = me._formatData(window.localStorage.getItem(me.keyName));
			},
			clear: function(){
				var me = this;
				if (!me.isAllow) {
					return;
				}
				window.localStorage.setItem(me.keyName, JSON.stringify([]));
			},
			getMax: function(){
				var me = this;
				var ret = {'dt':null, 'value':0};
				if (!me.isAllow) {
					return ret;
				}
				me._load();
				var max = 0;
				$.each(me.cached, function(key,val){
					if (max < val['value']) {
						max = val['value'];
						ret['dt'] = val['dt'];
						ret['value'] = val['value'];
					}
				});
				return ret;
			},
			getMin: function(){
				var me = this;
				var ret = {'dt':null, 'value':0};
				if (!me.isAllow) {
					return ret;
				}
				me._load();
				var min = 9999999999;
				$.each(me.cached, function(key,val){
					if (min > val['value']) {
						min = val['value'];
						ret['dt'] = val['dt'];
						ret['value'] = val['value'];
					}
				});
				return ret;
			},
			getRecent: function(cnt){
				var me = this;
				var ret = [];
				if (!me.isAllow) {
					return ret;
				}
				me._load();
				var len = me.cached.length;
				var first = 0;
				var tmp = 0;
				if (len > cnt) {
					first = len - cnt;
				}
				$.each(me.cached, function(key,val){
					if (tmp >= first) {
						ret.push({'dt':val['dt'], 'value':val['value']});
					}
					tmp++;
				});
				return ret;
			},
			formatTime: function(dtStr){
				if (dtStr === null) {
					return '--年--月--日 --:--'
				}
				var tmp = null;
				try {
					tmp = new Date(dtStr);
				} catch (e){
					tmp = null;
				}
				if (tmp === null) {
					return '-';
				}
				return tmp.getFullYear()+'年'+(tmp.getMonth()+1)+'月'+tmp.getDate()+'日 '+tmp.getHours()+':'+tmp.getMinutes();
			}
		};
		return _skelton;
	})();


})(jQuery);

