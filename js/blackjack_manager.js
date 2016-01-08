// pcm 20152016a Blackjack oop

var jogo = null;
var dealer_pontos = 0;
var player_pontos = 0;
var dealers_turn = false;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function inicializa_butoes(){
    document.getElementById("carta").disabled     = false;
    document.getElementById("passo").disabled     = false;
    document.getElementById("novo_jogo").disabled = true;
}

function finaliza_butoes(){
    document.getElementById("carta").disabled     = true;
    document.getElementById("passo").disabled     = true;
    document.getElementById("novo_jogo").disabled = false;
}

function limpa_cartas() {
    var dealer_deck = document.getElementById('dealer');
    var player_deck = document.getElementById('player');
    while(dealer_deck.firstChild) {
        dealer_deck.removeChild(dealer_deck.firstChild);
    }
    while(player_deck.firstChild) {
        player_deck.removeChild(player_deck.firstChild);
    }

}

// Funções para implementar
function novo_jogo(){
    limpa_cartas();
    jogo = new BlackJack();
    jogo.criar_baralho();
    jogada_dealer();
    jogada_dealer();
    jogada_player();
    inicializa_butoes();
}


function atualiza_dealer(resultado){
    var cartas_dealer = jogo.get_cartas_dealer();
    var cartas = [];
    if(cartas_dealer.length == 2 & !dealers_turn) {
        cartas[0] = cartas_dealer[0];
        //cartas[1] = "X";
        document.getElementById("pontos_dealer").innerHTML = cartas[0];
    } else {
        //cartas = cartas_dealer;
        document.getElementById("pontos_dealer").innerHTML = resultado;
    }
    //document.getElementById("dealer").innerHTML = cartas;
}


function atualiza_player(resultado) {
    var cartas_player = jogo.get_cartas_player();
    //document.getElementById("player").innerHTML = cartas_player;
    document.getElementById("pontos_player").innerHTML = resultado;
    if(resultado > 21) {
        alert("Perdeu!");
        finaliza_butoes();
    }
}


function jogada_dealer(){
    jogo.jogada_dealer(dealers_turn);
    dealer_pontos = jogo.valor(jogo.get_cartas_dealer());
    atualiza_dealer(dealer_pontos);
}


function jogada_player(){
    jogo.jogada_player();
    player_pontos = jogo.valor(jogo.get_cartas_player());
    atualiza_player(player_pontos);
}


function dealer_acaba(){
    dealers_turn = true;
    jogo.flipDealerCard(2);
    var dealer_end = [];
    while(!dealer_end[0]) {
        jogada_dealer();
        dealer_end = jogo.terminou(jogo.get_cartas_dealer());
    }
    if(dealer_end[1]) {
        alert("Perdeu!");
    } else if(dealer_pontos == player_pontos) {
        alert("Empatou!")
    } else {
        alert("Ganhou!");
    }
    dealers_turn = false;
    finaliza_butoes();
}

