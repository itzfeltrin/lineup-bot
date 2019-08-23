module.exports = class Formacao {
	constructor() {
		do {
			this.defesa = (Math.floor(Math.random() * 4)) + 3;
			this.meio = (Math.floor(Math.random() * 4)) + 2;
			this.ataque = (Math.floor(Math.random() * 2)) + 1;
		} while (this.defesa + this.meio + this.ataque != 10 || this.defesa > 5);
	}

	toString() {
		return '' + this.defesa + '-' + this.meio + '-' + this.ataque + '.';
	}
}