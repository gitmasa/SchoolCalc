(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = calcSrc.getDivision_3digit_1digit();
			var all = parseInt(tmp[0],10);
			var amari = parseInt(tmp[2],10) - 1;
			if (all+amari >= 1000) {
				continue;
			}
			amari = calcSrc.getRandom(1, amari);
			tmp[0] = (all+amari)+'';
			var key = ''+tmp[0]+tmp[1]+tmp[2];
			if (!dic[key]) {
				tmp[1] = '/%';
				dic[key] = true;
				ret.push({'mode':'normal','formula':tmp});
				break;
			}
		}
	}
	return ret;
})();
