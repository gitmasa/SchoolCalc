(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = calcSrc.getRandom(11,99);
			var tmp2 = calcSrc.getRandom(2,9);
			var tmp3 = calcSrc.getRandom(0, tmp2-1);
			if (tmp*tmp2+tmp3 > 999) {
				continue;
			}
			var tmps = [tmp*tmp2+tmp3, '/%', tmp];
			var key = ''+tmps[0]+'_'+tmps[1]+'_'+tmps[2];
			if (!dic[key]) {
				dic[key] = true;
				ret.push({'mode':'normal','formula':tmps});
				break;
			}
		}
	}
	return ret;
})();
