var fs = require("fs");
var arrayOponentes = fs.readFileSync('./txt/teams.txt').toString().split('\r\n');
var arrayGoleiros = fs.readFileSync('./txt/goalkeepers.txt').toString().split('\r\n');
var arrayLateraisEsq = fs.readFileSync('./txt/fullbacksEsq.txt').toString().split('\r\n');
var arrayLateraisDir = fs.readFileSync('./txt/fullbacksDir.txt').toString().split('\r\n');
var arrayZagueiros = fs.readFileSync('./txt/centerbacks.txt').toString().split('\r\n');
var arrayMeias = fs.readFileSync('./txt/midfielders.txt').toString().split('\r\n');
var arrayAtacantes = fs.readFileSync('./txt/strikers.txt').toString().split('\r\n');
var arrayTecnicos = fs.readFileSync('./txt/managers.txt').toString().split('\r\n');

function sort(array, nr) {
	if(nr == 1) return array[Math.floor(Math.random() * array.length)];
	else {
		var aux = [];

		for(var i = 0; i < nr; i++) {
			var numero = Math.floor(Math.random() * array.length);
			if(!aux.includes(array[numero])) {
				aux.push(array[numero]);	
			}
			else {
				aux.push(array[numero + 1]);
			}
		}
		return aux;
	}	
}



module.exports = function (f) {
	var formacao = require('./formacao.js');
	var f = new formacao();

	var gk = sort(arrayGoleiros, 1);	
	if(f.defesa == 3) {
		var cb = sort(arrayZagueiros, f.defesa);	
	}
	else {
		var cb = sort(arrayZagueiros, f.defesa - 2);	
		var fbEsq = sort(arrayLateraisEsq, 1);	
		var fbDir = sort(arrayLateraisDir, 1);	
	}
	
	var mf = sort(arrayMeias, f.meio);
	var st = sort(arrayAtacantes, f.ataque);
	var mg = sort(arrayTecnicos, 1);
	var op = sort(arrayOponentes, 1);

	var resp = 'Internacional x ' + op; + '.'

	resp += '\n\nFormacao: ' + f.toString();
	
	resp += '\n';
	resp += ('\n' + gk);
	//zagueiros e laterais
	resp += '\n';
	if(f.defesa == 3) {
		for(var i = 0; i < cb.length; i++) {
			resp += ('\n' + cb[i]);
		}
	}
	else {
		resp += ('\n' + fbEsq);	
		if(Array.isArray(cb)) {
			for(var i = 0; i < cb.length; i++) {
				resp += ('\n' + cb[i]);
			}
		}
		else {
			resp += ('\n' + cb);		
		}
		resp += ('\n' + fbDir);
	}

	//meias
	resp += '\n';
	for(var i = 0; i < mf.length; i++) {
		resp += ('\n' + mf[i]);
	}
	//atacantes
	resp += '\n';

	if (Array.isArray(st)) {
		for(var i = 0; i < st.length; i++) {
			resp += ('\n' + st[i]);
		}
	}
	else {
		resp += ('\n' + st);
	}

	resp += '\n\nTecnico: ' + mg + '.';



	return resp;
}