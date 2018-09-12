(function(){
	var randomize = function(){
		var patterns = [
			[1,2],
			[1,4],[3,4],
			[1,5],[2,5],[3,5],[4,5],
			[1,8],[3,8],[5,8],[7,8],
			[1,10],[3,10],[7,10],[9,10]
		];
		for(var i = patterns.length - 1; i > 0; i--){
			var r = Math.floor(Math.random() * (i + 1));
			var tmp = patterns[i];
			patterns[i] = patterns[r];
			patterns[r] = tmp;
		}
		return patterns;
	};
	var ret = [];
	var i=0;
	while(i<questions) {
		var rnd = randomize();
		for (var pos=0;pos<rnd.length;pos++) {
			ret.push({'mode':'fracTofloat','formula':[rnd[pos][0], 'fracTofloat', rnd[pos][1]]});
			i++;
			if (i>=questions) {
				break;
			}
		}
	}
	return ret;
})();
