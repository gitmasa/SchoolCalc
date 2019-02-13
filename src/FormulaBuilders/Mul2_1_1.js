(function(){
	var patterns = [
		[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],
		[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],
		[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],
		[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],
		[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],
		[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],
		[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],
		[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]
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
		var add = '';
		if ((calcSrc.getRandom(1,100) % 3) === 0) {
			add = '1';
		} else if ((calcSrc.getRandom(1,100) % 3) === 1) {
				add = '2';
		}
		ret.push({'mode':'normal','formula':[add+patterns[pos][0], '×', patterns[pos][1]]});
	}
	return ret;
})();
