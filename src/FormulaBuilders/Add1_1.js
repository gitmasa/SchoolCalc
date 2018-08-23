var preFormula = null;
var getFormula = function(){
	var tst = calcSrc.getRandom(1, 100);
	if (tst % 3) {
		var a1 = calcSrc.getRandom(1, 9);
		var a2 = calcSrc.getRandom(1, 9);
		return [''+a1, '+', ''+a2];
	} else {
		return calcSrc.getAdditionWithCarryUp(1);
	}
};
for (var i=0;i<questions; i++){
	var tmpFormula = getFormula();
	if (preFormula !== null && preFormula[0] == tmpFormula[0] && preFormula[0] == tmpFormula[0]) {
		tmpFormula = getFormula();
	}
	preFormula = tmpFormula;
	formulaSet.push(tmpFormula);
}
