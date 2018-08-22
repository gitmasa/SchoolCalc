for (var i=0;i<questions; i++){
	var a1 = calcSrc.getRandom(1, 9);
	var a2 = calcSrc.getRandom(1, 9);
	var tmp = 0;
	if (a1 < a2) {
		tmp = a1;
		a1 = a2;
		a2 = tmp;
	}
	formulaSet.push([''+a1, '-', ''+a2]);
}
