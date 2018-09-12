(function(){
	var randomize = function(){
		var patterns = [1,2,3,4,5,6,7,8,9];
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
			ret.push({'mode':'normal','formula':['3.14', '×f', rnd[pos]]});
			i++;
			if (i>=questions) {
				break;
			}
		}
	}
	return ret;
})();
