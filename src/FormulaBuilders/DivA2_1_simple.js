(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = calcSrc.getRandom(2,9);
			var tmp2 = calcSrc.getRandom(2,9);
			var amari = calcSrc.getRandom(1, tmp - 1);
			var all = (tmp * tmp2) + amari;
			var tmps = [all + '', '/%', tmp + '']
			var key = ''+tmps[0]+tmps[1]+tmps[2];
			if (!dic[key]) {
				dic[key] = true;
				ret.push({'mode':'normal','formula':tmps});
				break;
			}
		}
	}
	return ret;
})();
