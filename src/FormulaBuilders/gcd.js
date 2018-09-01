(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = [];
			tmp.push(calcSrc.getRandom(20,99));
			tmp.push('gcd');
			tmp.push(calcSrc.getRandom(20,99));
			if (tmp[0] === tmp[2] || calcSrc.getGcd(tmp[0], tmp[2]) === 1) {
				continue;
			}
			var key = ''+tmp[0]+tmp[1]+tmp[2];
			if (!dic[key]) {
				dic[key] = true;
				ret.push({'mode':'normal','formula':tmp});
				break;
			}
		}
	}
	return ret;
})();
