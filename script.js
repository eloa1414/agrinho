// script.js

let jogador = {
    nome: '',
    personagem: '',
    progresso: {
        galinha: 0,
        ovelha: 0,
        vaca: 0,
        peixe: 0,
        plantacao: 0,
        porco: 0
    }
};

function startGame() {
    document.getElementById('screen-intro').style.display = 'none';
    document.getElementById('screen-character').style.display = 'block';
}

function selectCharacter(tipo) {
    jogador.personagem = tipo;
}

function enterFarm() {
    const nome = document.getElementById('player-name').value;
    if (nome.trim() === '') return alert("Digite seu nome");
    jogador.nome = nome;
    document.getElementById('player-name-display').innerText = nome;
    document.getElementById('screen-character').style.display = 'none';
    document.getElementById('screen-farm').style.display = 'block';
}

// MINI-GAME GALINHA
let ovosColetados = 0;
function coletarOvo() {
    ovosColetados++;
    document.getElementById('status-galinha').innerText = `Ovos coletados: ${ovosColetados}`;
    if (ovosColetados >= 2) document.getElementById('next-galinha').style.display = 'inline';
}

// MINI-GAME OVELHA
let laColetada = 0;
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if (data === 'tesoura') {
        laColetada++;
        document.getElementById('status-ovelha').innerText = `Lã coletada: ${laColetada}`;
        if (laColetada >= 2) document.getElementById('next-ovelha').style.display = 'inline';
    }
}

// MINI-GAME VACA
let leiteColetado = 0;
function ordenhar(id) {
    leiteColetado++;
    document.getElementById('status-vaca').innerText = `Leite coletado: ${leiteColetado}`;
    if (leiteColetado >= 2) document.getElementById('next-vaca').style.display = 'inline';
}

// MINI-GAME PEIXE
let peixePescado = 0;
function puxarLinha() {
    peixePescado++;
    document.getElementById('status-peixe').innerText = `Peixes pescados: ${peixePescado}`;
    if (peixePescado >= 2) document.getElementById('next-peixe').style.display = 'inline';
}

// MINI-GAME PLANTAÇÃO
let colheita = 0;
function plantar(tipo) {
    setTimeout(() => {
        colheita++;
        document.getElementById('status-plantacao').innerText = `Plantado e colhido: ${colheita}`;
        if (colheita >= 2) document.getElementById('next-plantacao').style.display = 'inline';
    }, 2000);
}

// MINI-GAME PORCO
let comidaPorcos = 0;
function alimentarPorcos() {
    comidaPorcos++;
    document.getElementById('status-porco').innerText = `Comidas colocadas: ${comidaPorcos}`;
    if (comidaPorcos >= 2) document.getElementById('next-porco').style.display = 'inline';
}

// FUNÇÃO UNIVERSAL DE MINI-GAME
function startMiniGame(tipo) {
    document.getElementById('screen-farm').style.display = 'none';
    document.getElementById(`mini-game-${tipo}`).style.display = 'block';
}

function fecharMiniGame(tipo) {
    document.getElementById(`mini-game-${tipo}`).style.display = 'none';
    document.getElementById('screen-farm').style.display = 'block';
    jogador.progresso[tipo] = 2;
    verificarFim();
}

function verificarFim() {
    const completo = Object.values(jogador.progresso).every(v => v >= 2);
    if (completo) {
        alert("Todos os minigames concluídos! Vá até a caminhonete para ir à cidade.");
        // Aqui você pode habilitar a caminhonete no HTML
    }
}
