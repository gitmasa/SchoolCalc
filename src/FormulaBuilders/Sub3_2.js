(function(){
	var dic = {};
	var ret = [];
	for (var i=0;i<questions; i++){
		while(1) {
			var tmp = calcSrc.getSubtractionWithCarryDown_3digit_2digit();
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
