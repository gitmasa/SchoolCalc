(function(){

	var _getIntPair =function() {
		var a1 = 0;
		var a2 = 0;
		while(1) {
			a1 = calcSrc.getRandom(0, 9);
			a2 = calcSrc.getRandom(0, 9);
			if(a1 !== a2) {
				break;
			}
		}
		return [a1, a2];
	};


	var getAdd = function(){
		var tmp = ['', '+f', ''];
		var tmpSet = _getIntPair(1);
		tmp[0] = tmpSet[0]+'';
		tmp[2] = tmpSet[1]+'';
//		tmp = calcSrc.getAdditionWithCarryUp(1);
		var a1 = calcSrc.getRandom(0,9);
		tmp[0] = (tmp[0] === '0') ? a1+'' : a1 + '.' + tmp[0];
		var a2 = calcSrc.getRandom(0,9);
		tmp[2] = (tmp[2] === '0') ? a2+'' : a2 + '.' + tmp[2];
		var tmp2 = calcSrc.getRandom(0,9);
		if (tmp2 < 3) {
			tmp[0] += '' + calcSrc.getRandom(1,9);
		} else if (tmp2 < 6) {
			tmp[2] += '' + calcSrc.getRandom(1,9);
		}
		tmp[1] = '+f';
		return tmp;
	};

	var getSub = function(){
		var first = _getIntPair(1);
		var second = _getIntPair(1);
		var tmp = 0;
		if (second[0] < second[1]) {
			tmp = second[1];
			second[1] = second[0];
			second[0] = tmp;
		}
		var tmp1 = (first[0] == 0) ? second[0]+'' : second[0]+'.'+first[0];
		var tmp2 = (first[1] == 0) ? second[1]+'' : second[1]+'.'+first[1];
		var tmp3 = calcSrc.getRandom(0,9);
		if (tmp3 < 3) {
			tmp1 += '' + calcSrc.getRandom(1,9);
		} else if (tmp3 < 6) {
			tmp2 += '' + calcSrc.getRandom(1, 9);
		}
		if (parseFloat(tmp1) < parseFloat(tmp2)) {
			tmp3 = tmp1;
			tmp1 = tmp2;
			tmp2 = tmp3;
		}
		return [tmp1, '-f', tmp2];
	};

	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tst = calcSrc.getRandom(0,99);
			var tmp = (tst % 2) ? getAdd() : getSub();
			var key = ''+tmp[0]+tmp[1]+tmp[2];
			if (!dic[key] && tmp[2] !== '0') {
				dic[key] = true;
				ret.push({'mode':'normal','formula':tmp});
				break;
			}
		}
	}
	return ret;
})();
