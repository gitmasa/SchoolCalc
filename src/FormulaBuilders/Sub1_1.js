(function(){
	var patterns = [
		[1,1],
		[2,1],[2,2],
		[3,1],[3,2],[3,3],
		[4,1],[4,2],[4,3],[4,4],
		[5,1],[5,2],[5,3],[5,4],[5,5],
		[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],
		[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],
		[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],
		[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]
	];
	for(var i = patterns.length - 1; i > 0; i--){
		var r = Math.floor(Math.random() * (i + 1));
		var tmp = patterns[i];
		patterns[i] = patterns[r];
		patterns[r] = tmp;
	}
	var ret = [];
	for (i=0; i<questions; i++){
		var pos = i;
		if (i >= patterns.length) {
			pos = calcSrc.getRandom(0, patterns.length-1);
		}
		ret.push({'mode':'normal','formula':[patterns[pos][0], '-', patterns[pos][1]]});
	}
	return ret;
})();
