// pcm 20152016a Blackjack object

// objeto BlackJack - construtor
function BlackJack() {
    // membros
    this.baralho       = [];
    this.cartas_dealer = [];
    this.cartas_player = [];

    this.d_cards = document.getElementById("dealer");
    this.p_cards = document.getElementById("player");

    //métodos para implementar
    this.criar_baralho = function() {
        this.baralho =  this.baralha(this.novo_baralho());
        return this.baralho;
    };

    this.novo_baralho = function () {
        var baralho = [];

        for(var i = 0; i < 4; i++)
        {
            for(var j = 1;j < 14; j++) {
                var carta = new Carta(i, j);
                baralho.push(carta);
            }
        }
        //debug(baralho);
        return baralho;
    };

    this.baralha = function (baralho){

        var indice = null;
        var indices = [];
        var baralhado = [];

        for(var k = 0; k < 52; k++) {
            indices.push(k);
        }

        for(var i = 1; i < 53; i++) {
            indice = Math.floor(Math.random() * indices.length)
            baralhado.push(baralho[indices[indice]]);
            indices.splice(indice,1);
        }

        //debug(baralhado);
        return baralhado;
    };

    this.valor = function(cartas) {
        var pontos = 0;
        var AS = false;

        for(var i = 0; i < cartas.length; i++) {
            if (cartas[i].valor > 10) {
                pontos += 10;
            } else if (cartas[i].valor === 1) {
                pontos += 1;
                AS = true;
                } else {
                pontos += cartas[i].valor;
            }
        }

        if(AS & ((pontos + 10) <= 21)) {
            pontos += 10;
        }

        //debug(pontos);
        return pontos;
    };

    this.get_cartas_dealer = function() {
        return this.cartas_dealer.slice();
    };

    this.get_cartas_player = function() {
        return this.cartas_player.slice();
    };

    this.jogada_dealer = function(dealers_turn) {
        var new_carta = this.baralho[0];
        this.baralho.splice(0,1);
        this.cartas_dealer.push(new_carta);

        if(this.cartas_dealer.length == 2 & !dealers_turn) {
            new_carta.flipCardDown();
        }

        this.d_cards.appendChild(new_carta.img);
        var dealer_status = this.terminou(this.get_cartas_dealer());

        if(this.valor(this.get_cartas_player()) < this.valor(this.get_cartas_dealer())) {
            dealer_status = [true, true];
        }

        return dealer_status;
    };

    this.flipDealerCard = function(card_nbr) {
        var carta = this.cartas_dealer[card_nbr - 1];
        if(carta.isFlipped()) {
            carta.flipCardUp();
        } else {
            carta.flipCardDown();
        }
    }

    this.flipPlayerCard = function(card_nbr) {
        var carta = this.cartas_player[card_nbr - 1];
        if(carta.isFlipped()) {
            carta.flipCardUp();
        } else {
            carta.flipCardDown();
        }
    }

    this.jogada_player = function() {
        var new_carta = this.baralho[0];
        this.baralho.splice(0, 1);
        this.cartas_player.push(new_carta);
        this.p_cards.appendChild(new_carta.img);

        return this.terminou(this.get_cartas_player());

    };

    this.terminou = function (cartas) {
        var ganhou = false;
        var acabou = false;

        if(this.valor(cartas) > 21){
            ganhou = false;
            acabou = true;
        } else if(this.valor(cartas) == this.valor(this.get_cartas_player()) & this.valor(cartas) >= 17) {
            ganhou = false;
            acabou = true;
        }else if(this.valor(cartas) < this.valor(this.get_cartas_player()) & this.valor(cartas) > 17) {
            ganhou = false;
            acabou = true;
        } else if(this.valor(cartas) > this.valor(this.get_cartas_player()) & this.valor(cartas) > 17) {
            ganhou = true;
            acabou = true;
        }
        return [acabou, ganhou];
    };
}

//Função para modificar a cor de background
function changeColor(color) {
    document.getElementById('background').style.background = color;
}

