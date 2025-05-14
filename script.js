// Variáveis globais
let playerName = "";
let selectedCharacter = "";
let gameStarted = false;
let miniGamesCompleted = { galinha: 0, ovelha: 0, vaca: 0, peixe: 0, plantacao: 0, porcos: 0 };

// Iniciar o jogo
function startGame() {
    document.getElementById('screen-intro').style.display = 'none';
    document.getElementById('screen-character').style.display = 'block';
}

// Selecionar personagem
function selectCharacter(character) {
    selectedCharacter = character;
    document.querySelectorAll('.character').forEach((el) => {
        el.style.border = '';
    });
    event.target.style.border = '2px solid #3c763d';
}

// Avançar para a fazenda
function enterFarm() {
    playerName = document.getElementById('player-name').value;
    if (playerName.trim() === '') {
        alert('Por favor, insira um nome.');
        return;
    }
    document.getElementById('screen-character').style.display = 'none';
    document.getElementById('screen-farm').style.display = 'block';
    document.getElementById('player-name-display').innerText = playerName;
}

// Iniciar o mini-game
function startMiniGame(animal) {
    if (miniGamesCompleted[animal] >= 2) {
        alert("Você já completou esse mini-game!");
        return;
    }
    document.getElementById('screen-farm').style.display = 'none';
    document.getElementById(`mini-game-${animal}`).style.display = 'block';
}

// Fechar o mini-game e voltar para a fazenda
function fecharMiniGame(animal) {
    miniGamesCompleted[animal]++;
    if (miniGamesCompleted[animal] >= 2) {
        document.getElementById(`next-${animal}`).style.display = 'none';
    }
    document.getElementById(`mini-game-${animal}`).style.display = 'none';
    document.getElementById('screen-farm').style.display = 'block';
}

// Mini-game Galinha
function coletarOvo() {
    const ovosColetados = document.querySelectorAll('.ninho').length - document.querySelectorAll('.ninho[disabled]').length;
    document.getElementById('status-galinha').innerText = `Ovos coletados: ${ovosColetados}`;
    if (ovosColetados === 3) {
        document.getElementById('next-galinha').style.display = 'block';
    }
}

// Mini-game Ovelha
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    if (draggedElement && ev.target.id === "ovelha-img") {
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = ev.clientX - 50 + 'px';
        draggedElement.style.top = ev.clientY - 50 + 'px';
    }
}

// Mini-game Vaca
function ordenha() {
    let leite = 0;
    const tetas = document.querySelectorAll('.teta');
    tetas.forEach((teta) => {
        teta.addEventListener('click', function () {
            leite++;
            document.getElementById('status-vaca').innerText = `Leite coletado: ${leite}`;
        });
    });
}

// Mini-game Peixe
function pesca() {
    const barraPesca = document.getElementById('barra-pesca');
    barraPesca.style.animation = 'descer 3s linear forwards';
    setTimeout(() => {
        document.getElementById('status-peixe').innerText = "Você pescou um peixe!";
    }, 3000);
}

// Mini-game Plantação
function plantar() {
    const plantacao = document.getElementById('plantacao');
    plantacao.style.animation = 'crescer 5s linear forwards';
    setTimeout(() => {
        document.getElementById('status-plantacao').innerText = "Plantas colhidas!";
    }, 5000);
}

// Função de carregar a cena de carregamento
function carregarCena() {
    document.getElementById('screen-farm').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('screen-city').style.display = 'block';
    }, 5000);
}

// Função de retornar para a fazenda após missão
function voltarFazenda() {
    document.getElementById('screen-city').style.display = 'none';
    document.getElementById('screen-farm').style.display = 'block';
    alert("Você completou sua tarefa com sucesso! Parabéns!");
}
