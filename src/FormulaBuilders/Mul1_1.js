var preFormula = null;
var getFormula = function(){
	var a1 = calcSrc.getRandom(2, 9);
	var a2 = calcSrc.getRandom(2, 9);
	return [''+a1, '×', ''+a2];
};
for (var i=0;i<questions; i++){
	var tmpFormula = getFormula();
	if (preFormula !== null && preFormula[0] == tmpFormula[0] && preFormula[0] == tmpFormula[0]) {
		tmpFormula = getFormula();
	}
	preFormula = tmpFormula;
	formulaSet.push(tmpFormula);
}
