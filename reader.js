var fs  = require("fs");
var arrayGoleiros = fs.readFileSync('./csv/goalkeepers.txt').toString().split('\r\n');
var arrayLaterais = fs.readFileSync('./csv/fullbacks.txt').toString().split('\r\n');
var arrayZagueiros = fs.readFileSync('./csv/centerbacks.txt').toString().split('\r\n');
var arrayMeias = fs.readFileSync('./csv/midfielders.txt').toString().split('\r\n');
var arrayAtacantes = fs.readFileSync('./csv/strikers.txt').toString().split('\r\n');7

function sort(array, nr) {
	if(nr == 1) return array[Math.floor(Math.random() * array.length)];
	else {
		var aux = [];
		for(var i = 0; i < nr; i++) {
			aux.push(array[Math.floor(Math.random() * array.length)]);
		}
		return aux;
	}	
}

module.exports = function () {
	var gk = sort(arrayGoleiros, 1);
	var cb = sort(arrayZagueiros, 2);
	var fb = sort(arrayLaterais, 2);
	var mf = sort(arrayMeias, 4);
	var st = sort(arrayAtacantes, 2);

	var resp = '';
	resp += ('\n' + gk);
	//zagueiros e laterais
	resp += ('\n\n' + fb[0]);
	resp += ('\n' + cb[0]);
	resp += ('\n' + cb[1]);
	resp += ('\n' + fb[1]);
	//meias
	resp += ('\n\n' + mf[0]);
	resp += ('\n' + mf[1]);
	resp += ('\n' + mf[2]);
	resp += ('\n' + mf[3]);	
	//atacantes
	resp += ('\n\n' + st[0]);
	resp += ('\n' + st[1]);

	return resp;
}