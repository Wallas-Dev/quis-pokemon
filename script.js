function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function random() {

    var numsRandom = [];
    while (numsRandom.length < 3) {
        let numRandom = Math.floor(Math.random() * 150) + 1;
        if (!numsRandom.includes(numRandom)) {
            numsRandom.push(numRandom);
        }
    }
    return numsRandom;
}

function validResp() {
    return new Promise((resolve, reject) => {
        var elementos = document.querySelectorAll('[type=radio]');
        for (var i = 0; i < elementos.length; i++) {

            elementos[i].addEventListener('change', function (e) {

                let marcado = e.target.value;

                if (marcado == "correta") {
                    var resp = true;
                    let parentNode = e.target.parentNode;
                    parentNode.style.backgroundColor = 'green';
                    parentNode.style.transition = '1s';


                    let els = parentNode.parentNode.querySelectorAll('[type=radio]');

                    for (var n = 0; n < els.length; n++) {
                        els[n].disabled = true
                    }
                } else if (marcado == "incorreta") {
                    var resp = false;
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
                return resolve(resp);
            });
        }
    });


}

function questCard() {
    return new Promise((resolve, reject) => {
        var rand = random();

        let resposta1 = document.createElement('div');
        let resposta2 = document.createElement('div');
        let resposta3 = document.createElement('div');

        resposta1.classList.add('resposta');
        resposta2.classList.add('resposta');
        resposta3.classList.add('resposta');

        var pkmCorreto = undefined;
        var pkmErrado1 = undefined;
        var pkmErrado2 = undefined;
        var resp = undefined;


        fetch("https://pokeapi.co/api/v2/pokemon/" + rand[0] + "/").then(response => response.json()).then(pokemonSingle => {
            pkmErrado1 = { nome: pokemonSingle.name };

            fetch("https://pokeapi.co/api/v2/pokemon/" + rand[1] + "/").then(response => response.json()).then(pokemonSingle => {
                pkmErrado2 = { nome: pokemonSingle.name };

                fetch("https://pokeapi.co/api/v2/pokemon/" + rand[2] + "/").then(response => response.json()).then(pokemonSingle => {

                    pkmCorreto = { nome: pokemonSingle.name, imagem: pokemonSingle.sprites.other.dream_world.front_default };

                    let imgpkm = document.getElementById('img-pkm');
                    var opcResposta = document.querySelector('.respostas');


                    if ((pkmCorreto != undefined) && (pkmErrado1 != undefined) && (pkmErrado2 != undefined)) {


                        var opc1 = document.createElement('input');
                        opc1.setAttribute('type', 'radio');
                        opc1.setAttribute('value', 'correta');

                        var span1 = document.createElement('span');
                        span1.textContent = pkmCorreto.nome[0].toUpperCase() + pkmCorreto.nome.substring(1);

                        resposta1.appendChild(opc1);
                        resposta1.appendChild(span1);
                        var opcCorreta = resposta1;

                        var opc2 = document.createElement('input');
                        opc2.setAttribute('type', 'radio');
                        opc2.setAttribute('value', 'incorreta');

                        var span2 = document.createElement('span');
                        span2.textContent = pkmErrado1.nome[0].toUpperCase() + pkmErrado1.nome.substring(1);

                        resposta2.appendChild(opc2);
                        resposta2.appendChild(span2);
                        var opcErrada1 = resposta2;


                        var opc3 = document.createElement('input');
                        opc3.setAttribute('type', 'radio');

                        opc3.setAttribute('value', 'incorreta');

                        var span3 = document.createElement('span');
                        span3.textContent = pkmErrado2.nome[0].toUpperCase() + pkmErrado2.nome.substring(1);

                        resposta3.appendChild(opc3);
                        resposta3.appendChild(span3);
                        var opcErrada2 = resposta3;

                        var opcs = [opcCorreta, opcErrada1, opcErrada2];

                        var opcsEmbaralhada = shuffle(opcs);

                        imgpkm.src = pkmCorreto.imagem;


                        for (var i = 0; i < 3; i++) {

                            opcResposta.appendChild(opcsEmbaralhada[i]);

                        }


                        resp = validResp();

                        resolve(resp.then(quest => {
                            console.log(quest);
                            return quest;
                        })
                            .catch(erro => {
                                console.erro("Erro", erro);
                                throw erro;
                            }));

                    }
                });

            });

        });
    });

}



let btn = document.querySelector('.box-ini .btn-comecar');
btn.addEventListener('click', function () {
    var score = document.querySelector('.placar .score');
    let subTitulo = document.querySelector('.box-ini h2');
    let acerto = 0;
    subTitulo.style.display = 'none';
    btn.style.display = 'none';
    var box = document.querySelector('.box-opc');
    box.style.display = 'block';

    questCard().then(quest => {
        console.log(quest);


    }).catch(erro => {
        console.erro("Erro", erro);
        throw erro;
    });


});



















