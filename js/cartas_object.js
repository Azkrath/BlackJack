/**
 * Created by dkfsg on 05/11/2015.
 */
function Carta(i, j) {
    this.valor = j;
    this.naipe = i;

    this.img = document.createElement("img");
    this.img.style.width = '110px';
    this.img.style.height = '190px';
    this.img.style.marginLeft = '10px';
    this.flipped = false;

    var card_nbr = ((this.naipe * 13) + this.valor);
    var imgPath = "images/" + card_nbr + ".gif";
    this.img.src = imgPath.split('http://localhost:63342/blackjack_alunos/').pop();
}


Carta.prototype.toString = function() {
    return this.valor;
}

Carta.prototype.flipCardUp = function() {
    var card_nbr = ((this.naipe * 13) + this.valor);
    var imgPath = "images/" + card_nbr + ".gif";
    this.img.src = imgPath.split('http://localhost:63342/blackjack_alunos/').pop();
    this.flipped = false;
}

Carta.prototype.flipCardDown = function() {
    var imgPath = "images/0.gif";
    this.img.src = imgPath.split('http://localhost:63342/blackjack_alunos/').pop();
    this.flipped = true;
}

Carta.prototype.isFlipped = function() {
    return this.flipped;
}