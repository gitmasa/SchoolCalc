

var calcSrc = {};
(function($, undefined){
	calcSrc.classes = {};
	calcSrc.getRandom = function (min, max) {
		if (min === max) {
			return min;
		}
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
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

	calcSrc.getGcd = function(a, b) {
		var tmp;
		a = parseInt(a, 10);
		b = parseInt(b, 10);
		if (a < b) {
			tmp = a;
			a = b;
			b = tmp;
		}
		while ((tmp = a % b) != 0) {
			a = b;
			b = tmp;
		}
		return b;
	};

	calcSrc.getLcm = function(a, b) {
		a = parseInt(a, 10);
		b = parseInt(b, 10);
		var gcd = calcSrc.getGcd(a, b);
		return a * b / gcd;

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
				if (me.timerId) {
					clearInterval(me.timerId);
				}
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
				if (me.timerId) {
					clearInterval(me.timerId);
				}
				me.result = 0;
				me.counter_first = parseInt((new Date)/1000, 10);
				me.timerId = setInterval(function(){
					if (me.timerId === null) {
						return;
					}
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
			},
			isStopped: function(){
				return this.timerId === null;
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
				if (me.cached !== null && Array.isArray(me.cached)) {
					return;
				}
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

	calcSrc.classes.QuestionBuilder = (function(){
		var _skelton = function(){
			var me = this;
			me.multiFnc = function(){
				var a1 = calcSrc.getRandom(2, 9);
				var a2 = calcSrc.getRandom(2, 9);
				return [''+a1, '×', ''+a2];
			};
			me.addFnc = function(){
				return calcSrc.getAdditionWithCarryUp(2);
			};
			me.subFnc = function(){
				return calcSrc.getSubtractionWithCarryDown_2digit_2digit();
			};
			me.divFnc = function(){
				return calcSrc.getDivision_2digit_1digit();
			};
		};
		_skelton.prototype = {
			_aSet: [
				'たろうくん',
				'花子さん',
				'いちろうくん',
				'三太くん',
				'かつやくん',
				'ゆうこさん',
				'ようこさん',
				'おにいさん',
				'おねえさん',
				'たいちくん'
			],
			_bSet: [
			'ようすけくん',
			'こうじくん',
			'れなさん',
			'めぐみさん',
			'さちこさん',
			'おとうと',
			'いもうと'
		],
			_cSet: [
			{'str':'けしごむ', 'unit':'こ'},
			{'str':'えんぴつ', 'unit':'本'},
			{'str':'あめ玉', 'unit':'こ'},
			{'str':'おはじき', 'unit':'こ'},
			{'str':'ビーだま', 'unit':'こ'},
			{'str':'おりがみ', 'unit':'まい'}
		],
			_dSet: [
			{'str':'アイスクリーム', 'unit':'こ'},
			{'str':'本', 'unit':'さつ'},
			{'str':'ジュース', 'unit':'本'},
			{'str':'ノート', 'unit':'さつ'},
			{'str':'チョコレート', 'unit':'こ'}
		],
			getAdds: function(){
				return [
					{
						'method': 'add',
						'require': ['a', 'b', 'c'],
						'fnc': function(x, y, a, b, c) {
							return a + 'は' + c['str'] + 'を' + x + c['unit'] + '持っています。'
								+ b + 'は' + c['str'] + 'を' + y + c['unit'] + '持っています。あわせて何' + c['unit'] + 'の' + c['str'] + 'を持っていますか。';
						}
					},
					{
						'method': 'add',
						'require': ['a', 'b', 'c'],
						'fnc': function(x, y, a, b, c) {
							return a + 'は' + c['str'] + 'を' + x + c['unit'] + '持っています。'
								+ b + 'は' + c['str'] + 'を' + y + c['unit'] + '持っています。' + a + 'が' + b + 'にすべてあげると'
								+ b + 'の' + c['str'] + 'は何' + c['unit'] + 'になりますか。';
						}
					},
					{
						'method': 'add',
						'require': ['a'],
						'fnc': function(x, y, a) {
							return a + 'は' + x + '円持っています。おこづかいを' + y + '円もらうと、ぜんぶで何円になりますか。';
						}
					},
					{
						'method': 'add',
						'require': ['a', 'b', 'c'],
						'fnc': function(x, y, a, b, c) {
							return a + 'のいえには、' + c['str'] + 'が' + x + c['unit'] + '、' + b + 'のいえには、' + c['str'] + 'が'
								+ y + c['unit'] + 'あります。あわせて何' + c['unit'] + 'ですか。';
						}
					},
					{
						'method': 'add',
						'require': ['c', 'd'],
						'fnc': function(x, y, c, d) {
							return x + '円の' + c['str'] + 'と、' + y + '円の' + d['str'] + 'を買います。だいきんはいくらになりますか。';
						}
					},
					{
						'method': 'add',
						'require': [],
						'fnc': function(x, y) {
							return 'ある本を' + x + 'ページまでよみました。のこりのページをかぞえると' + y + 'ページでした。この本はぜんぶで何ページですか。';
						}
					}
				];
			},
			getSubs: function(){
				return [
					{
						'method': 'sub',
						'require': ['a', 'b', 'c'],
						'fnc': function(x, y, a, b, c) {
							return a + 'は' + c['str'] + 'を' + x + c['unit'] + '持っています。' + b + 'は' + c['str'] + 'を'
							+ y + c['unit'] + '持っています。多い人は何' + c['unit'] + 'だけおおくもっていますか。';
						}
					},
					{
						'method': 'sub',
						'require': ['a', 'b', 'c'],
						'fnc': function(x, y, a, b, c) {
							return a + 'は' + c['str'] + 'を' + x + c['unit'] + '持っています。' + b + 'に'
								+ y + c['unit'] + 'あげると、のこりは何' + c['unit'] + 'になりますか。';
						}
					},
					{
						'method': 'sub',
						'require': ['a', 'c'],
						'fnc': function(x, y, a, c) {
							return a + 'は' + x + '円持っています。' + y + '円の' + c['str'] + 'をかうと、何円のこりますか。';
						}
					},
					{
						'method': 'sub',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return x + '円の' + c['str'] + 'があります。いま、おこづかいを'
								+ y + '円もっているとすると、あと何円ためると' + c['str'] + 'をかうことができますか。';
						}
					},
					{
						'method': 'sub',
						'require': [],
						'fnc': function(x, y) {
							return x + 'ページある本を' + y + 'ページまでよみました。のこりは何ページですか。';
						}
					}
				];
			},
			getMuls: function(){
				return [
					{
						'method': 'mul',
						'require': ['a'],
						'fnc': function(x, y, a) {
							return a + 'はたて' + x + 'ます、よこ' + y + 'ますのほうがん紙のそれぞれのます目に、おはじきを1つずつおいていきました。'
								+ 'ぜんぶでおはじきを何個おきましたか。'
						}
					},
					{
						'method': 'mul',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return x + '人に、' + c['str'] + 'を' + y + c['unit'] + 'ずつくばろうと思います。' + c['str']
								+ 'はぜんぶで何' + c['unit'] + 'ひつようですか。';
						}
					},
					{
						'method': 'mul',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return 'ふくろのなかにたくさんの' + c['str'] + 'がはいっています。' + x + '人が、ひとり' + y + c['unit']
								+ 'ずつふくろから' + c['str'] + 'をとりだすと、ちょうどふくろのなかの' + c['str']
								+ 'がなくなりました。さいしょにふくろに入っていた' + c['str'] + 'は何' + c['unit'] + 'だったでしょうか。';
						}
					},
					{
						'method': 'mul',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return 'ひとふくろに' + x + c['unit'] + 'の' + c['str'] + 'がはいったふくろが' + y
								+ 'ふくろあります。ぜんぶで' + c['str'] + 'は何' + c['unit'] + 'ありますか。';
						}
					},
					{
						'method': 'mul',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return '1' + c['unit'] + 'が' + x + '円の' + c['str'] + 'を、' + y + c['unit'] + 'かうためには、何円ひつようですか。';
						}
					},
					{
						'method': 'mul',
						'require': [],
						'fnc': function(x, y) {
							return '赤いリボンは、' + x + 'cmの黄色いリボンの' + y + 'ばいの長さです。赤いリボンは何cmですか。';
						}
					}
				];
			},
			getDivs: function(){
				return [
					{
						'method': 'div',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return x + c['unit'] + 'の' + c['str'] + 'を' + y + '人に同じ数ずつくばろうと思います。1人あたり何'
								+ c['unit'] + 'あげるとよいですか。';
						}
					},
					{
						'method': 'div',
						'require': ['a', 'c'],
						'fnc': function(x, y, a, c) {
							return a + 'は、' + x + c['unit'] + 'の' + c['str'] + 'を持っています。' + y
								+ '個のふくろに同じ数ずつ入れるとき、1つのふくろには何' + c['unit'] + '入っていますか。';
						}
					},
					{
						'method': 'div',
						'require': ['a', 'c'],
						'fnc': function(x, y, a, c) {
							return a + 'は' + x +'円持っています。1' + c['unit'] + 'が' + y + '円の' + c['str'] + 'は、何'
								+ c['unit'] + 'かうことができますか。';
						}
					},
					{
						'method': 'div',
						'require': ['c'],
						'fnc': function(x, y, c) {
							return c['str'] + 'が' + x + c['unit'] + 'あります。' + y + '人に同じ数ずつくばると、一人分は何' + c['unit'] + 'になりますか。';
						}
					},
					{
						'method': 'div',
						'require': [],
						'fnc': function(x, y) {
							return '花が' + x + '本あります。' + y + '本ずつたばにして花たばをつくります。花たばはいくつできますか。';
						}
					},
					{
						'method': 'div',
						'require': [],
						'fnc': function(x, y) {
							return '子どもが' + x + '人います。同じ人数ずつ' + y + 'つのチームに分けると1チームは何人になりますか。';
						}
					},
					{
						'method': 'div',
						'require': [],
						'fnc': function(x, y) {
							return x + 'cmのひもを同じ長さずつ' + y + '本に切り分けます。1本の長さは何cmになりますか。';
						}
					},
					{
						'method': 'div',
						'require': [],
						'fnc': function(x, y) {
							return x + 'cmの赤いリボンと、' + y + 'cmの黄色いリボンがあります。赤いリボンは黄色いリボンの何ばいの長さですか。';
						}
					}
				];
			},
			getAmaris: function(){

			},
			getItemSrc: function(mode){
				var me = this;
				switch(mode) {
					case 'a':
						return me._aSet[calcSrc.getRandom(0, me._aSet.length - 1)];
					case 'b':
						return me._bSet[calcSrc.getRandom(0, me._bSet.length - 1)];
					case 'c':
						return me._cSet[calcSrc.getRandom(0, me._cSet.length - 1)];
					case 'd':
						return me._dSet[calcSrc.getRandom(0, me._dSet.length - 1)];
				}
				return '';
			},
			getQuestions: function(count){
				var srcs = [];
				var me = this;
				if (typeof me.multiFnc === 'function' && me.multiFnc.nodeType !== "number") {
					$.each(me.getMuls(), function(key,val){
						srcs.push(val);
					});
				}
				if (typeof me.addFnc === 'function' && me.addFnc.nodeType !== "number") {
					$.each(me.getAdds(), function(key,val){
						srcs.push(val);
					});
				}
				if (typeof me.subFnc === 'function' && me.subFnc.nodeType !== "number") {
					$.each(me.getSubs(), function(key,val){
						srcs.push(val);
					});
				}
				if (typeof me.divFnc === 'function' && me.divFnc.nodeType !== "number") {
					$.each(me.getDivs(), function(key,val){
						srcs.push(val);
					});
				}
				var ret = [];
				var cnt = srcs.length;
				for (var i=0; i<count; i++) {
					ret.push(me._buildQuestion(srcs[calcSrc.getRandom(0, cnt - 1)]));
				}
				return ret;
			},
			_buildQuestion: function(src){
				var me = this;
				var formula = [];
				switch (src['method']) {
					case 'div':
						formula = me.divFnc();
						break;
					case 'mul':
						formula = me.multiFnc();
						break;
					case 'add':
						formula = me.addFnc();
						break;
					case 'sub':
						formula = me.subFnc();
						break;
				}
				var options = [];
				$.each(src['require'], function(key,val){
					options.push(me.getItemSrc(val));
				});
				var question = '';
				switch(options.length) {
					case 0:
						question = src.fnc(formula[0], formula[2]);
						break;
					case 1:
						question = src.fnc(formula[0], formula[2], options[0]);
						break;
					case 2:
						question = src.fnc(formula[0], formula[2], options[0], options[1]);
						break;
					case 3:
						question = src.fnc(formula[0], formula[2], options[0], options[1], options[2]);
						break;
					case 4:
						question = src.fnc(formula[0], formula[2], options[0], options[1], options[2], options[3]);
						break;
				}
				return {'question':question, 'mode':'story', 'formula':formula};
			}
		};
		return _skelton;
	})();

	calcSrc.countDownChecker = (function(){
		var _skelton = function(){

		};
		_skelton.prototype = {

		};
		return _skelton;
	})();

	calcSrc.classes.Calculator = (function(){
		var _skelton = function($parentDom, config){
			var me = this;
			var defaultConf = {
				'questionClass': 'question',
				'firstOperandClass': 'first',
				'secondOperandClass': 'second',
				'firstUnderOperandClass': 'first-under',
				'secondUnderOperandClass': 'second-under',
				'operatorClass': 'ope',
				'firstAnswerClass': 'ans',
				'secondAnswerClass': 'ans2',
				'resultClass': 'result',
				'errAddClass': 'ans_err'
			};
			me.config = $.extend(defaultConf, config);
			me.allQuestionCnt = 0;
			me.validQuestionCnt = 0;
			me.invalidQuestionCnt = 0;
		};
		_skelton.prototype = {
			getQuestion: function(order){
				var me = this;
				var $ret = $('<div>').addClass(me.config.questionClass);
				var ope = order.formula[1];
				if (ope === '+' || ope === '-' || ope === '×' || ope === '÷' || ope === '%'
					|| ope === 'gcd' || ope === 'lcm' || ope === '+f' || ope === '-f' || ope === '×f' || ope === '÷f') {
					if (order.mode === 'story') {
						$ret.addClass('story').append(
							$('<div>').text(order.question),
							$('<div>').css('display', 'none').append(
								$('<span>').attr({'data-value': order.formula[0]}).addClass(me.config.firstOperandClass).text('-'),
								$('<span>').attr({'data-value': order.formula[1]}).addClass(me.config.operatorClass).text('-'),
								$('<span>').attr({'data-value': order.formula[2]}).addClass(me.config.secondOperandClass).text('-')
							),
							$('<div>').append(
								$('<input type="number" size="5">').addClass(me.config.firstAnswerClass),
								$('<span>').addClass(me.config.resultClass).text('')
							)
						);
					} else if (order.mode === 'normal') {
						var opeStr = ope;
						var equal = '=';
						var inputSize = '5';
						var inputType = 'number';
						if (ope === 'gcd') {
							opeStr = 'と';
							equal = 'の最大公約数は';
						} else if (ope === 'lcm') {
							opeStr = 'と';
							equal = 'の最小公倍数は';
						} else if (ope === '+f' || ope === '-f' || ope === '×f' || ope === '÷f') {
							inputType = 'text';
							inputSize = '8';
							opeStr = ope.substr(0,1);
						}
						$ret.addClass('normal').append(
							$('<span>')
								.attr({'data-value': order.formula[0]})
								.addClass(me.config.firstOperandClass).text(order.formula[0]),
							$('<span>')
								.attr({'data-value': order.formula[1]})
								.addClass(me.config.operatorClass).text(opeStr),
							$('<span>')
								.attr({'data-value': order.formula[2]})
								.addClass(me.config.secondOperandClass).text(order.formula[2]),
							$('<span>').addClass('equal').text(equal),
							$('<input type="'+inputType+'">').attr('size', inputSize).addClass(me.config.firstAnswerClass),
							$('<span>').addClass(me.config.resultClass).text('')
						);
					}
					return $ret;
				}
				else if (ope === '/%') { // 商とあまり
					$ret.addClass('normal').append(
						$('<span>')
							.attr({'data-value': order.formula[0]})
							.addClass(me.config.firstOperandClass).text(order.formula[0]),
						$('<span>')
							.attr({'data-value': order.formula[1]})
							.addClass(me.config.operatorClass).text('÷'),
						$('<span>')
							.attr({'data-value': order.formula[2]})
							.addClass(me.config.secondOperandClass).text(order.formula[2]),
						$('<span>').addClass('equal').text('='),
						$('<input type="number">').attr('size', 5).addClass(me.config.firstAnswerClass),
						$('<span>').addClass('equal').text('あまり'),
						$('<input type="number">').attr('size', 5).addClass(me.config.secondAnswerClass),
						$('<span>').addClass(me.config.resultClass).text('')
					);
				}
				else if (ope === 'floatTofrac') { // 小数 => 分数
					$ret.addClass('normal').append(
						$('<div>').addClass('fraction_ope')
							.attr({'data-value': order.formula[0]}).addClass('fraction_top')
							.addClass(me.config.firstOperandClass).text(order.formula[0]),
						$('<div>').addClass('fraction_ope')
							.attr({'data-value': order.formula[1]})
							.addClass(me.config.operatorClass).text('='),
						$('<div>').addClass('fraction_ans').append(
							$('<div>').addClass('fraction_top').append(
								$('<input type="number">').attr('size', 5).addClass(me.config.firstAnswerClass)
							),
							$('<div>').addClass('fraction_bottom').append(
								$('<input type="number">').attr('size', 5).addClass(me.config.secondAnswerClass)
							)
						),
						$('<div>').addClass('fraction_ope').addClass(me.config.resultClass).text('')
					);
				}
				else if (ope === 'fracAdd' || ope === 'fracSub' || ope === 'fracMul' || ope === 'fracDiv') { // 分数 => 分数
					$ret.addClass('normal').append(
						$('<div>').addClass('fraction').append(
							$('<div>')
								.attr({'data-value': order.formula[0]}).addClass('fraction_top')
								.addClass(me.config.firstOperandClass).text(order.formula[0]),
							$('<div>')
								.attr({'data-value': order.formula[3]}).addClass('fraction_bottom')
								.addClass(me.config.firstOperandClass).text(order.formula[3])
						),
						$('<div>').addClass('fraction_ope')
							.attr({'data-value': order.formula[1]})
							.addClass(me.config.operatorClass).text(ope),
						$('<div>').addClass('fraction').append(
							$('<div>')
								.attr({'data-value': order.formula[0]}).addClass('fraction_top')
								.addClass(me.config.firstOperandClass).text(order.formula[0]),
							$('<div>')
								.attr({'data-value': order.formula[3]}).addClass('fraction_bottom')
								.addClass(me.config.firstOperandClass).text(order.formula[3])
						),
						$('<div>').addClass('fraction_ope').text('='),
						$('<div>').addClass('fraction').append(
							$('<div>').addClass('fraction_top').append(
								$('<input type="number">').attr('size', 5).addClass(me.config.firstAnswerClass)
							),
							$('<div>').addClass('fraction_bottom').append(
								$('<input type="number">').attr('size', 5).addClass(me.config.secondAnswerClass)
							)
						),
						$('<div>').addClass('fraction_ope').addClass(me.config.resultClass).text('')
					);
				}
				else if (ope === 'fracTofloat') { // 分数 => 小数
					$ret.addClass('normal').append(
						$('<div>').addClass('fraction').append(
							$('<div>')
								.attr({'data-value': order.formula[0]}).addClass('fraction_top')
								.addClass(me.config.firstOperandClass).text(order.formula[0]),
							$('<div>')
								.attr({'data-value': order.formula[2]}).addClass('fraction_bottom')
								.addClass(me.config.secondOperandClass).text(order.formula[2])
						),
						$('<div>').addClass('fraction_ope')
							.attr({'data-value': order.formula[1]})
							.addClass(me.config.operatorClass).text('='),
						$('<div>').addClass('fraction_ope').append(
							$('<input type="text">').attr('size', 5).addClass(me.config.firstAnswerClass)
						),
						$('<div>').addClass('fraction_ope').addClass(me.config.resultClass).text('')
					);
				}
				return $ret;
			},
			check: function($parentDom){
				var me = this;
				var $lines = $parentDom.find('.'+me.config.questionClass);
				me.allQuestionCnt = 0;
				me.validQuestionCnt = 0;
				me.invalidQuestionCnt = 0;
				$lines.each(function (a, lineRaw) {
					me.allQuestionCnt++;
					var valid = false;
					var $line = $(lineRaw);
					var remain = 0;
					var ope = $line.find('.'+me.config.operatorClass).data('value');
					var first = $line.find('.'+me.config.firstOperandClass).data('value');
					var second = $line.find('.'+me.config.secondOperandClass).data('value');
					var ans1 = $line.find('.'+me.config.firstAnswerClass).val();
					var ans2 = $line.find('.'+me.config.secondAnswerClass).val();
					if (ope === '+' || ope === '-' || ope === '×'
						|| ope === '÷' || ope === '%' || ope === 'gcd' || ope === 'lcm') {
						first = parseInt(first, 10);
						second = parseInt(second, 10);
						ans1 = parseInt(ans1, 10);
						if (ope === '+') {
							valid = (first + second) === ans1;
						} else if (ope === '-') {
							valid = (first - second) === ans1;
						} else if (ope === '×') {
							valid = (first * second) === ans1;
						} else if (ope === '÷') {
							valid = (first / second) === ans1;
						} else if (ope === '%') {
							valid = (first % second) === ans1;
						} else if (ope === 'gcd') { // 最大公約数
							valid = (calcSrc.getGcd(first, second) === ans1);
						} else if (ope === 'lcm') { // 最小公倍数
							valid = (calcSrc.getLcm(first, second) === ans1);
						}
					}	else if (ope === '+f' || ope === '-f' || ope === '×f'
							|| ope === '÷f') {
						first = parseFloat(first);
						second = parseFloat(second);
						ans1 = parseFloat(ans1);
						if (ope === '+f') {
							remain = ((first + second) - ans1);
						} else if (ope === '-f') {
							remain = ((first - second) - ans1);
						} else if (ope === '×f') {
							remain = ((first * second) - ans1);
						} else if (ope === '÷f') {
							remain = ((first / second) - ans1);
						}
						if (Math.abs(remain) < 0.0000001) {
							valid = true;
						} else {
							valid = false;
						}
					} else if (ope === '/%') { // 商とあまり
						first = parseInt(first, 10);
						second = parseInt(second, 10);
						ans1 = parseInt(ans1, 10);
						ans2 = parseInt(ans2, 10);
						remain = first % second;
						valid = ans2 === remain && ans1 === parseInt((first - remain) / second, 10);
					} else if (ope === 'floatTofrac') { // 小数 => 分数
						var _tmp = String(parseFloat(first)).split('.');
						if (_tmp[1]) {
							var _tmp2 = _tmp[1].length;
							var _tmp3 = Math.pow(10, _tmp2);
							_tmp2 = parseInt(_tmp[1], 10);
							_tmp = calcSrc.getGcd(_tmp2, _tmp3);
							ans1 = parseInt(ans1, 10);
							ans2 = parseInt(ans2, 10);
							valid = (ans1 === (_tmp2 / _tmp)) && (ans2 === (_tmp3 / _tmp));
						}
					} else if (ope === 'fracTofloat') { // 分数 => 小数
						first = parseFloat(first);
						second = parseFloat(second);
						ans1 = parseFloat(ans1);
						valid = ((first / second) - ans1) < 0.0000001;
					}
					var $result = $line.find('.'+me.config.resultClass);
					if (valid) {
						me.validQuestionCnt++;
						$result.removeClass(me.config.errAddClass).text('○');
					} else {
						me.invalidQuestionCnt++;
						$result.addClass(me.config.errAddClass).text('×');
					}

				});
			},
			getAllCount: function(){
				return this.allQuestionCnt;
			},
			getValidCount: function(){
				return this.validQuestionCnt;
			},
			getInvalidCount: function(){
				return this.invalidQuestionCnt;
			},
			isAllValid: function(){
				return this.validQuestionCnt === this.allQuestionCnt;
			}
		};
		return _skelton;
	})();



})(jQuery);

