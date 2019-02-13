(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = [];
			tmp.push(calcSrc.getRandom(8,30));
			tmp.push('lcm');
			tmp.push(calcSrc.getRandom(4,30));
			if (tmp[0] === tmp[2]) {
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
