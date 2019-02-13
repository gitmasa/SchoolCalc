

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
				rets['0_1'] = a[0] + a[1];
				rets['1_2'] = a[1] + a[2];
				rets['3_4'] = a[3] + a[4];
				rets['4_5'] = a[4] + a[5];
				rets['6_7'] = a[6] + a[7];
				rets['7_8'] = a[7] + a[8];

				rets['0_3'] = a[0] + a[3];
				rets['3_6'] = a[3] + a[6];
				rets['1_4'] = a[1] + a[4];
				rets['4_7'] = a[4] + a[7];
				rets['2_5'] = a[2] + a[5];
				rets['5_8'] = a[5] + a[8];

				rets['0_4'] = a[0] + a[4];
				rets['2_4'] = a[2] + a[4];
				rets['6_4'] = a[6] + a[4];
				rets['8_4'] = a[8] + a[4];

				rets['1_3'] = a[1] + a[3];
				rets['5_1'] = a[5] + a[1];
				rets['7_5'] = a[7] + a[5];
				rets['3_7'] = a[3] + a[7];

				return rets;
			},
			_calcAll3_3Answers: function(numAry){
				// abc, def, ghi, adg, beh, cfi, aei, ceg
				var rets = {};
				var a = numAry;
				rets['0_1_2'] = a[0] + a[1] + a[2];
				rets['3_4_5'] = a[3] + a[4] + a[5];
				rets['6_7_8'] = a[6] + a[7] + a[8];
				rets['0_3_6'] = a[0] + a[3] + a[6];
				rets['1_4_7'] = a[1] + a[4] + a[7];
				rets['2_5_8'] = a[2] + a[5] + a[8];
				rets['0_4_8'] = a[0] + a[4] + a[8];
				rets['2_4_6'] = a[2] + a[4] + a[6];
				// 012, 345, 678, 036, 147, 258, 048, 246

				// 2x2
				// 014, 254, 874, 634
				rets['0_1_4'] = a[0] + a[1] + a[4];
				rets['2_5_4'] = a[2] + a[5] + a[4];
				rets['8_7_4'] = a[8] + a[7] + a[4];
				rets['6_3_4'] = a[6] + a[3] + a[4];
				// 143, 541, 745, 347
				rets['1_4_3'] = a[1] + a[4] + a[3];
				rets['5_4_1'] = a[5] + a[4] + a[1];
				rets['7_4_5'] = a[7] + a[4] + a[5];
				rets['3_4_7'] = a[3] + a[4] + a[7];
				// 430, 412, 458, 476
				rets['4_3_0'] = a[4] + a[3] + a[0];
				rets['4_1_2'] = a[4] + a[1] + a[2];
				rets['4_5_8'] = a[4] + a[5] + a[8];
				rets['4_7_6'] = a[4] + a[7] + a[6];
				// 301, 125, 587, 763
				rets['3_0_1'] = a[3] + a[0] + a[1];
				rets['1_2_5'] = a[1] + a[2] + a[5];
				rets['5_8_7'] = a[5] + a[8] + a[7];
				rets['7_6_3'] = a[7] + a[6] + a[3];

				// 3x2
				// 037, 213, 851, 675
				rets['0_3_7'] = a[0] + a[3] + a[7];
				rets['2_1_3'] = a[2] + a[1] + a[3];
				rets['8_5_1'] = a[8] + a[5] + a[1];
				rets['6_7_5'] = a[6] + a[7] + a[5];
				// 146, 540, 742, 348
				rets['1_4_6'] = a[1] + a[4] + a[6];
				rets['5_4_0'] = a[5] + a[4] + a[0];
				rets['7_4_2'] = a[7] + a[4] + a[2];
				rets['3_4_8'] = a[3] + a[4] + a[8];
				// 047, 243, 841, 645
				rets['0_4_7'] = a[0] + a[4] + a[7];
				rets['2_4_3'] = a[2] + a[4] + a[3];
				rets['8_4_1'] = a[8] + a[4] + a[1];
				rets['6_4_5'] = a[6] + a[4] + a[5];
				// 136, 510, 752, 378
				rets['1_3_6'] = a[1] + a[3] + a[6];
				rets['5_1_0'] = a[5] + a[1] + a[0];
				rets['7_5_2'] = a[7] + a[5] + a[2];
				rets['3_7_8'] = a[3] + a[7] + a[8];
				// 046, 240, 842, 648
				rets['0_4_6'] = a[0] + a[4] + a[6];
				rets['2_4_0'] = a[2] + a[4] + a[0];
				rets['8_4_2'] = a[8] + a[4] + a[2];
				rets['6_4_8'] = a[6] + a[4] + a[8];
				// 137, 513, 751, 375
				rets['1_3_7'] = a[1] + a[3] + a[7];
				rets['5_1_3'] = a[5] + a[1] + a[3];
				rets['7_5_1'] = a[7] + a[5] + a[1];
				rets['3_7_5'] = a[3] + a[7] + a[5];

				return rets;
			},
			_calcAll4_2Answers: function(numAry){
				var rets = {};
				var a = numAry;
				rets['0_1'] = a[0] + a[1];
				rets['1_2'] = a[1] + a[2];
				rets['2_3'] = a[2] + a[3];
				rets['4_5'] = a[4] + a[5];
				rets['5_6'] = a[5] + a[6];
				rets['6_7'] = a[6] + a[7];
				rets['8_9'] = a[8] + a[9];
				rets['9_10'] = a[9] + a[10];
				rets['10_11'] = a[10] + a[11];
				rets['12_13'] = a[12] + a[13];
				rets['13_14'] = a[13] + a[14];
				rets['14_15'] = a[14] + a[15];

				rets['0_4'] = a[0] + a[4];
				rets['4_8'] = a[4] + a[8];
				rets['8_12'] = a[8] + a[12];
				rets['1_5'] = a[1] + a[5];
				rets['5_9'] = a[5] + a[9];
				rets['9_13'] = a[9] + a[13];
				rets['2_6'] = a[2] + a[6];
				rets['6_10'] = a[6] + a[10];
				rets['10_14'] = a[10] + a[14];
				rets['3_7'] = a[3] + a[7];
				rets['7_11'] = a[7] + a[11];
				rets['11_15'] = a[11] + a[15];

				// 0, 1, 2, 3
				// 4, 5, 6, 7
				// 8, 9,10,11
				//12,13,14,15
				rets['0_5'] = a[0] + a[5];
				rets['1_4'] = a[1] + a[4];
				rets['2_7'] = a[2] + a[7];
				rets['3_6'] = a[3] + a[6];
				rets['4_9'] = a[4] + a[9];
				rets['5_8'] = a[5] + a[8];
				rets['6_11'] = a[6] + a[11];
				rets['7_10'] = a[7] + a[10];
				rets['8_13'] = a[8] + a[13];
				rets['9_12'] = a[9] + a[12];
				rets['10_15'] = a[10] + a[15];
				rets['11_14'] = a[11] + a[14];

				return rets;
			},
			_calcAll4_3Answers: function(numAry){
				var rets = {};
				var a = numAry;
				// 2x2:[0123]
				var _calc = function(sets, offset){
					var i,j;
					var tmpInt = 0;
					var val = 0;
					for(i=0;i<sets.length;i++) {
						var keys = [];
						val = 0;
						for (j=0;j<3;j++) {
							tmpInt = sets[i][j] + offset;
							keys.push('' + tmpInt);
							val += numAry[sets[i][j]+offset];
						}
						rets[keys.join('_')] = val;
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
						var tmps = key.split('_');
						results.push([parseInt(tmps[0], 10), parseInt(tmps[1], 10)])
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
						var tmps = key.split('_');
						results.push([parseInt(tmps[0], 10), parseInt(tmps[1], 10), parseInt(tmps[2], 10)])
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
						var tmps = key.split('_');
						results.push([parseInt(tmps[0], 10), parseInt(tmps[1], 10)])
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
						var tmps = key.split('_');
						results.push([parseInt(tmps[0], 10), parseInt(tmps[1], 10), parseInt(tmps[2], 10)])
					}
				});
				return results;
			}
		};
		return _skelton;
	})();

})(jQuery);


