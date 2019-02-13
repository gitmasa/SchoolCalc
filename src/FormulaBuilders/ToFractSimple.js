(function(){
	var randomize = function(){
		var patterns = [
			0.5,
			0.25,0.75,
			0.2,0.4,0.6,0.8,
			0.125,0.375,0.625,0.875,
			0.1,0.3,0.7,0.9
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
			ret.push({'mode':'floatTofrac','formula':[rnd[pos], 'floatTofrac']});
			i++;
			if (i>=questions) {
				break;
			}
		}
	}
	return ret;
})();
