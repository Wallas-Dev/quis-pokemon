








function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function questPokemon() {

    let valid = false;
    let valid1 = false;
    var resposta1 = document.createElement('div');
    var resposta2 = document.createElement('div');
    var resposta3 = document.createElement('div');

    resposta1.classList.add('resposta');
    resposta2.classList.add('resposta');
    resposta3.classList.add('resposta');
    var rand = Math.floor(Math.random() * 150);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(response => response.json())
        .then(allpokemon => {

            var pokemons = {};
            allpokemon.results.map(function () {

                fetch("https://pokeapi.co/api/v2/pokemon/" + rand + "/")
                    .then(response => response.json())
                    .then(pokemonSingle => {
                        pokemons = { nome: pokemonSingle.name, imagem: pokemonSingle.sprites.other.dream_world.front_default };

                        let imgpkm = document.getElementById('img-pkm');
                        var opcResposta = document.querySelector('.respostas');

                        if (valid1 == false) {


                            if (pokemons != undefined) {


                                var opc1 = document.createElement('input');
                                opc1.setAttribute('type', 'radio');
                                opc1.setAttribute('name', 'pergunta1');
                                opc1.setAttribute('value', 'correta');

                                var span1 = document.createElement('span');
                                span1.textContent = pokemons.nome[0].toUpperCase() + pokemons.nome.substring(1);

                                resposta1.appendChild(opc1);
                                resposta1.appendChild(span1);
                                var opcCorreta = resposta1;

                                var opc2 = document.createElement('input');
                                opc2.setAttribute('type', 'radio');
                                opc2.setAttribute('name', 'pergunta1');
                                opc2.setAttribute('value', 'incorreta');

                                var span2 = document.createElement('span');
                                span2.textContent = 'Wallas';

                                resposta2.appendChild(opc2);
                                resposta2.appendChild(span2);
                                var opcErrada1 = resposta2;


                                var opc3 = document.createElement('input');
                                opc3.setAttribute('type', 'radio');
                                opc3.setAttribute('name', 'pergunta1');
                                opc3.setAttribute('value', 'incorreta');

                                var span3 = document.createElement('span');
                                span3.textContent = 'João';

                                resposta3.appendChild(opc3);
                                resposta3.appendChild(span3);
                                var opcErrada2 = resposta3;


                                var opcs = [opcCorreta, opcErrada1, opcErrada2];


                                var opcsEmbaralhada = shuffle(opcs);


                                //console.log(val);
                                imgpkm.src = pokemons.imagem;
                                //console.log(pokemons.nome);
                                //opcResposta.innerHTML = "";
                                if (valid == false) {
                                    for (var i = 0; i < 3; i++) {

                                        opcResposta.appendChild(opcsEmbaralhada[i]);

                                    }
                                    valid = true;
                                }

                            }
                            var elementos = document.querySelectorAll('[type=radio]');
                            console.log(elementos.length)
                            for (var i = 0; i < elementos.length; i++) {
                                elementos[i].addEventListener('change', function (e) {

                                    let marcado = e.target.value;

                                    if (marcado == "correta") {

                                        let parentNode = e.target.parentNode;
                                        parentNode.style.backgroundColor = 'green';
                                        parentNode.style.transition = '1s';


                                        let els = parentNode.parentNode.querySelectorAll('[type=radio]');

                                        for (var n = 0; n < els.length; n++) {
                                            els[n].disabled = true
                                        }

                                    } else if (marcado == "incorreta") {

                                        let parentNode = e.target.parentNode;
                                        parentNode.style.backgroundColor = 'red';
                                        parentNode.style.transition = '1s';

                                        let els = parentNode.parentNode.querySelectorAll('[type=radio]');

                                        for (var n = 0; n < els.length; n++) {
                                            els[n].disabled = true
                                        }

                                        let correta = parentNode.parentNode.querySelector('[value=correta]');
                                        correta.parentNode.style.backgroundColor = 'green';
                                        correta.parentNode.style.transition = '1s';

                                    }
                                });
                            }
                            valid1 = true;
                        }
                    })

            });


        });
}

questPokemon();

