for (var i=0;i<questions; i++){
	var tst = calcSrc.getRandom(1, 100);
	if (tst % 3) {
		var a1 = calcSrc.getRandom(1, 9);
		var a2 = calcSrc.getRandom(1, 9);
		formulaSet.push([''+a1, '+', ''+a2]);
	} else {
		formulaSet.push(calcSrc.getAdditionWithCarryUp(1));
	}
}
