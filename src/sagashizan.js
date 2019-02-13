

(function($, undefined) {
	// a, b, c
	// d, e, f
	// g, h, i

	// 0, 1, 2
	// 3, 4, 5
	// 6, 7, 8
	// 012, 345, 678, 036, 147, 258, 048, 246

	// 2x2
	// 014, 254, 874, 634
	// 143, 541, 745, 347
	// 430, 412, 458, 476
	// 301, 125, 587, 763

	// 3x2
	// 037, 213, 851, 675
	// 146, 540, 742, 348
	// 047, 243, 841, 645
	// 136, 510, 752, 378
	// 046, 240, 842, 648
	// 137, 513, 751, 375

	calcSrc.classes.Sagashizan = (function(){
		// ansLen:選択数 resultNum:答えの組み合わせ数, uniqCnt: 重複しない数字の数
		var _skelton = function(nn, ansLen, resultNum, uniqCnt){
			var me = this;
			me.nn = parseInt(nn,10);
			me.ansLen = parseInt(ansLen,10);
			if (me.ansLen !== 3) {
				me.ansLen = 2;
			}
			me.resultNum = parseInt(resultNum, 10);
			if (me.resultNum < 1) {
				me.resultNum = 1;
			}
			if (me.resultNum > 4) {
				me.resultNum = 4;
			}
			me.uniqCnt = parseInt(uniqCnt, 10);
			if (me.uniqCnt < 5) {
				me.uniqCnt = 5;
			}
			if (me.uniqCnt > 9) {
				me.uniqCnt = 9;
			}
			me.table = [];
			me.ansVal = 0;
		};
		_skelton.prototype = {
			_posEnables: {'3x':
					{
						'_0':{'_1':true, '_4':true, '_3':true},
						'_1':{'_0':true, '_2':true, '_3':true, '_4':true, '_5':true},
						'_2':{'_1':true, '_4':true, '_5':true},
						'_3':{'_0':true, '_1':true, '_4':true, '_7':true, '_6':true},
						'_4':{'_0':true, '_1':true, '_2':true, '_3':true, '_5':true, '_6':true, '_7':true, '_8':true},
						'_5':{'_2':true, '_1':true, '_4':true, '_7':true, '_8':true},
						'_6':{'_3':true, '_4':true, '_7':true},
						'_7':{'_6':true, '_3':true, '_4':true, '_5':true, '_8':true},
						'_8':{'_7':true, '_4':true, '_5':true},
					},'4x':
					{
						'_0':{'_1':true, '_5':true, '_4':true},
						'_1':{'_0':true, '_4':true, '_5':true, '_6':true, '_2':true},
						'_2':{'_1':true, '_5':true, '_6':true, '_7':true, '_3':true},
						'_3':{'_2':true, '_6':true, '_7':true},
						'_4':{'_0':true, '_1':true, '_5':true, '_9':true, '_8':true},
						'_5':{'_0':true, '_1':true, '_2':true, '_6':true, '_10':true, '_9':true, '_8':true, '_4':true},
						'_6':{'_1':true, '_2':true, '_3':true, '_7':true, '_11':true, '_10':true, '_9':true, '_5':true},
						'_7':{'_3':true, '_2':true, '_6':true, '_10':true, '_11':true},
						'_8':{'_4':true, '_5':true, '_9':true, '_13':true, '_12':true},
						'_9':{'_4':true, '_5':true, '_6':true, '_10':true, '_14':true, '_13':true, '_12':true, '_8':true},
						'_10':{'_5':true, '_6':true, '_7':true, '_11':true, '_15':true, '_14':true, '_13':true, '_9':true},
						'_11':{'_7':true, '_6':true, '_10':true, '_14':true, '_15':true},
						'_12':{'_8':true, '_9':true, '_13':true},
						'_13':{'_12':true, '_8':true, '_9':true, '_10':true, '_14':true},
						'_14':{'_13':true, '_9':true, '_10':true, '_11':true, '_15':true},
						'_15':{'_11':true, '_10':true, '_14':true}
					}},
			isNearly: function(prePos, pos){
				var me = this;
				return me._posEnables[me.nn+'x']['_'+prePos] && me._posEnables[me.nn+'x']['_'+prePos]['_'+pos];
			},
			_shuffle: function(srcAry){
				var i;
				var ary = [];
				for(i=0;i<srcAry.length;i++) {
					ary[i] = srcAry[i];
				}
				for(i = ary.length - 1; i > 0; i--){
					var r = Math.floor(Math.random() * (i + 1));
					var tmp = ary[i];
					ary[i] = ary[r];
					ary[r] = tmp;
				}
				return ary;
			},
			_makeRandoms: function(uniqCnt, wantCnt){
				if (uniqCnt > 9) {
					uniqCnt = 9;
				}
				if (uniqCnt < 1) {
					uniqCnt = 1;
				}
				var me = this;
				var src = me._shuffle([1,2,3,4,5,6,7,8,9]);
				var dst = [];
				var i;
				for (i=0; i<uniqCnt; i++) {
					dst.push(src[i]);
				}
				src = me._shuffle(src);
				var j = 0;
				for (i=dst.length;i<wantCnt;i++) {
					dst[i] = src[j];
					j++;
					if (j >= src.length){
						j=0;
						src = me._shuffle(src);
					}
				}
				return me._shuffle(dst);
			},
			_calcAll3_2Answers: function(numAry){
				var rets = {};
				// 0, 1, 2
				// 3, 4, 5
				// 6, 7, 8
				var a = numAry;
				rets['01'] = a[0] + a[1];
				rets['12'] = a[1] + a[2];
				rets['34'] = a[3] + a[4];
				rets['45'] = a[4] + a[5];
				rets['67'] = a[6] + a[7];
				rets['78'] = a[7] + a[8];

				rets['03'] = a[0] + a[3];
				rets['36'] = a[3] + a[6];
				rets['14'] = a[1] + a[4];
				rets['47'] = a[4] + a[7];
				rets['25'] = a[2] + a[5];
				rets['58'] = a[5] + a[8];

				rets['04'] = a[0] + a[4];
				rets['24'] = a[2] + a[4];
				rets['64'] = a[6] + a[4];
				rets['84'] = a[8] + a[4];

				rets['13'] = a[1] + a[3];
				rets['51'] = a[5] + a[1];
				rets['75'] = a[7] + a[5];
				rets['37'] = a[3] + a[7];

				return rets;
			},
			_calcAll3_3Answers: function(numAry){
				// abc, def, ghi, adg, beh, cfi, aei, ceg
				var rets = {};
				var a = numAry;
				rets['012'] = a[0] + a[1] + a[2];
				rets['345'] = a[3] + a[4] + a[5];
				rets['678'] = a[6] + a[7] + a[8];
				rets['036'] = a[0] + a[3] + a[6];
				rets['147'] = a[1] + a[4] + a[7];
				rets['258'] = a[2] + a[5] + a[8];
				rets['048'] = a[0] + a[4] + a[8];
				rets['246'] = a[2] + a[4] + a[6];
				// 012, 345, 678, 036, 147, 258, 048, 246

				// 2x2
				// 014, 254, 874, 634
				rets['014'] = a[0] + a[1] + a[4];
				rets['254'] = a[2] + a[5] + a[4];
				rets['874'] = a[8] + a[7] + a[4];
				rets['634'] = a[6] + a[3] + a[4];
				// 143, 541, 745, 347
				rets['143'] = a[1] + a[4] + a[3];
				rets['541'] = a[5] + a[4] + a[1];
				rets['745'] = a[7] + a[4] + a[5];
				rets['347'] = a[3] + a[4] + a[7];
				// 430, 412, 458, 476
				rets['430'] = a[4] + a[3] + a[0];
				rets['412'] = a[4] + a[1] + a[2];
				rets['458'] = a[4] + a[5] + a[8];
				rets['476'] = a[4] + a[7] + a[6];
				// 301, 125, 587, 763
				rets['301'] = a[3] + a[0] + a[1];
				rets['125'] = a[1] + a[2] + a[5];
				rets['587'] = a[5] + a[8] + a[7];
				rets['763'] = a[7] + a[6] + a[3];

				// 3x2
				// 037, 213, 851, 675
				rets['037'] = a[0] + a[3] + a[7];
				rets['213'] = a[2] + a[1] + a[3];
				rets['851'] = a[8] + a[5] + a[1];
				rets['675'] = a[6] + a[7] + a[5];
				// 146, 540, 742, 348
				rets['146'] = a[1] + a[4] + a[6];
				rets['540'] = a[5] + a[4] + a[0];
				rets['742'] = a[7] + a[4] + a[2];
				rets['348'] = a[3] + a[4] + a[8];
				// 047, 243, 841, 645
				rets['047'] = a[0] + a[4] + a[7];
				rets['243'] = a[2] + a[4] + a[3];
				rets['841'] = a[8] + a[4] + a[1];
				rets['645'] = a[6] + a[4] + a[5];
				// 136, 510, 752, 378
				rets['136'] = a[1] + a[3] + a[6];
				rets['510'] = a[5] + a[1] + a[0];
				rets['752'] = a[7] + a[5] + a[2];
				rets['378'] = a[3] + a[7] + a[8];
				// 046, 240, 842, 648
				rets['046'] = a[0] + a[4] + a[6];
				rets['240'] = a[2] + a[4] + a[0];
				rets['842'] = a[8] + a[4] + a[2];
				rets['648'] = a[6] + a[4] + a[8];
				// 137, 513, 751, 375
				rets['137'] = a[1] + a[3] + a[7];
				rets['513'] = a[5] + a[1] + a[3];
				rets['751'] = a[7] + a[5] + a[1];
				rets['375'] = a[3] + a[7] + a[5];

				return rets;
			},
			_calcAll4_2Answers: function(numAry){
				var rets = {};
				// 0, 1, 2
				// 3, 4, 5
				// 6, 7, 8
				var a = numAry;
				rets['01'] = a[0] + a[1];
				rets['12'] = a[1] + a[2];
				rets['34'] = a[3] + a[4];
				rets['45'] = a[4] + a[5];
				rets['67'] = a[6] + a[7];
				rets['78'] = a[7] + a[8];

				rets['03'] = a[0] + a[3];
				rets['36'] = a[3] + a[6];
				rets['14'] = a[1] + a[4];
				rets['47'] = a[4] + a[7];
				rets['25'] = a[2] + a[5];
				rets['58'] = a[5] + a[8];

				rets['04'] = a[0] + a[4];
				rets['24'] = a[2] + a[4];
				rets['64'] = a[6] + a[4];
				rets['84'] = a[8] + a[4];

				rets['13'] = a[1] + a[3];
				rets['51'] = a[5] + a[1];
				rets['75'] = a[7] + a[5];
				rets['37'] = a[3] + a[7];

				return rets;
			},
			_calcAll4_3Answers: function(numAry){
				var rets = {};
				var a = numAry;
				// 2x2:[0123]
				var _calc = function(sets, offset){
					var i,j;
					var tmpInt = 0;
					var key = '';
					var val = 0;
					for(i=0;i<sets.length;i++) {
						key = '';
						val = 0;
						for (j=0;j<3;j++) {
							tmpInt = sets[i][j] + offset;
							key += '' + tmpInt;
							val += numAry[sets[i][j]+offset];
						}
						rets[key] = val;
					}
				};
				var k;
				// 2_2 ([0,1][4,5])
				var tmpSets = [[0,1,5],[1,5,4],[5,4,0],[4,0,1]];
				var offsets = [0,1,2,4,5,6,8,9,10];
				for (k=0;k<offsets.length;k++) {
					_calc(tmpSets, offsets[k]);
				}

				// 3_2 ([0,1,2][4,5,6])
				tmpSets = [[0,1,2],[4,5,6],[0,5,2],[4,1,6],[0,5,6],[4,1,2],[0,1,6],[4,5,2]];
				offsets = [0,1,4,5,8,9];
				for (k=0;k<offsets.length;k++) {
					_calc(tmpSets, offsets[k]);
				}

				// 2_3 ([0,1][4,5][8,9])
				tmpSets = [[0,4,8],[1,5,9],[0,5,8],[1,4,9],[0,5,9],[1,4,8],[0,4,9],[1,5,8]];
				offsets = [0,1,2,4,5,6];
				for (k=0;k<offsets.length;k++) {
					_calc(tmpSets, offsets[k]);
				}

				// 3_3 ([0,1,2][4,5,6][8,9,10])
				tmpSets = [[0,5,10],[2,5,8]];
				offsets = [0,1,4,5];
				for (k=0;k<offsets.length;k++) {
					_calc(tmpSets, offsets[k]);
				}
				return rets;
			},
			_calcAllAnswers: function(numAry){
				var me = this;
				return (me.nn === 4)
					? ((me.ansLen === 2) ? me._calcAll4_2Answers(numAry) : me._calcAll4_3Answers(numAry))
					: ((me.ansLen === 2) ? me._calcAll3_2Answers(numAry) : me._calcAll3_3Answers(numAry));
			},
			recalcValidSet: function(){ // 再計算して、テーブルを返す。
				this.table = [];
				this.ansVal = 0;
				return this.getValidSet();
			},
			getAnsValue: function(){ // 合計値
				return this.ansVal;
			},
			getValidSet: function(){
				var me = this;
				if (me.table.length) {
					return me.table;
				}
				var wantCnt = (me.nn === 4) ? 16 : 9;
				var limit = (me.ansLen === 3) ? 6 : 4;

				while(1) {
					var rnd = me._makeRandoms(me.uniqCnt, wantCnt);
					for (var i=0; i<50; i++) {
						var test = me._shuffle(rnd);
						var chk = me._calcAllAnswers(test);
						var result = me._isValid(chk, me.resultNum, limit);
						if (result > 0) {
							this.table = test;
							this.ansVal = result;
							return this.table;
//							return {'src':test, 'setCnt':me.nn, 'result':result, 'resultNum':resultNum};
						}
					}
				}
			},
			_isValid: function(chkAry, resultNum, limit){ // limitは合計値の最小
				var dic = {};
				$.each(chkAry, function(key, val){
					if (val < limit) {
						return true; // continue;
					}
					var index = '_'+val;
					if (index in dic) {
						dic[index] += 1;
					} else {
						dic[index] = 1;
					}
				});
				var resultInfos = [];
				$.each(dic, function(key, val){
					if (val === resultNum) {
						resultInfos.push(key.substr(1));
					}
				});
				if (resultInfos.length > 0) {
					var index = Math.floor(Math.random() * (resultInfos.length + 1));
					return parseInt(resultInfos[index], 10)
				}
				return 0;
			},
			getResultSets: function(){
				var me = this;
				if (!me.table.length) {
					return [];
				}
				return (me.nn === 4)
					? ((me.ansLen === 2) ? me._calcResult4_2(me.table, me.ansVal) : me._calcResult4_3(me.table, me.ansVal))
					: ((me.ansLen === 2) ? me._calcResult3_2(me.table, me.ansVal) : me._calcResult3_3(me.table, me.ansVal));
			},
			validate: function(answerSet){
				var sum = 0;
				var me = this;
				$.each(answerSet, function(key, pos){
					sum += me.table[pos] ? me.table[pos] : 0;
				});
				return sum === this.getAnsValue();
			},
			_calcResult3_2: function(numAry, ansVal){
				var me = this;
				var chkAry = me._calcAll3_2Answers(numAry);
				var results = [];
				ansVal = parseInt(ansVal, 10);
				$.each(chkAry, function(key, val){
					if (val === ansVal) {
						results.push([parseInt(key.substr(0,1), 10), parseInt(key.substr(1,1), 10)])
					}
				});
				return results;
			},
			_calcResult3_3: function(numAry, ansVal){
				var me = this;
				var chkAry = me._calcAll3_3Answers(numAry);
				var results = [];
				ansVal = parseInt(ansVal, 10);
				$.each(chkAry, function(key, val){
					if (val === ansVal) {
						results.push([parseInt(key.substr(0,1), 10), parseInt(key.substr(1,1), 10), parseInt(key.substr(2,1), 10)])
					}
				});
				return results;
			},
			_calcResult4_2: function(numAry, ansVal){
				var me = this;
				var chkAry = me._calcAll4_2Answers(numAry);
				var results = [];
				ansVal = parseInt(ansVal, 10);
				$.each(chkAry, function(key, val){
					if (val === ansVal) {
						results.push([parseInt(key.substr(0,1), 10), parseInt(key.substr(1,1), 10)])
					}
				});
				return results;
			},
			_calcResult4_3: function(numAry, ansVal){
				var me = this;
				var chkAry = me._calcAll4_3Answers(numAry);
				var results = [];
				ansVal = parseInt(ansVal, 10);
				$.each(chkAry, function(key, val){
					if (val === ansVal) {
						results.push([parseInt(key.substr(0,1), 10), parseInt(key.substr(1,1), 10), parseInt(key.substr(2,1), 10)])
					}
				});
				return results;
			}
		};
		return _skelton;
	})();

})(jQuery);


