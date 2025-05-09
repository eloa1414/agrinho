document.addEventListener('DOMContentLoaded', () => {
    const tabuleiro = document.querySelector('.tabuleiro');
    const tentativasElemento = document.getElementById('tentativas');
    const resetBotao = document.getElementById('reset');
    let tentativas = 0;
    let cartasViradas = [];
    let paresEncontrados = 0;

    // Array com os pares de cartas (você pode adicionar mais!)
    const pares = [
        { nome: 'Milho', simbolo1: '🌽', simbolo2: '🌾' }, // Exemplo: Milho (campo) e Farinha de Milho (cidade)
        { nome: 'Leite', simbolo1: '🥛', simbolo2: '🧀' }, // Exemplo: Leite (campo) e Queijo (cidade)
        { nome: 'Trator', simbolo1: '🚜', simbolo2: '🔧' }, // Exemplo: Trator (campo) e Ferramenta (cidade)
        { nome: 'Mel', simbolo1: '🍯', simbolo2: '🍞' }  // Exemplo: Mel (campo) e Pão com Mel (cidade)
    ];

    // Duplica os pares para criar as cartas do tabuleiro
    const cartasData = [...pares, ...pares].sort(() => Math.random() - 0.5);

    function criarCarta(par) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.par = par.nome;

        const frente = document.createElement('div');
        frente.classList.add('carta-conteudo', 'carta-frente');
        frente.textContent = '?'; // Lado da carta virada para baixo

        const verso = document.createElement('div');
        verso.classList.add('carta-conteudo', 'carta-verso');
        verso.textContent = par.simbolo1; // Símbolo do par (poderíamos alternar entre simbolo1 e simbolo2)

        carta.appendChild(frente);
        carta.appendChild(verso);

        carta.addEventListener('click', virarCarta);
        return carta;
    }

    function virarCarta() {
        if (cartasViradas.length < 2 && !this.classList.contains('virada') && !this.classList.contains('combinada')) {
            this.classList.add('virada');
            cartasViradas.push(this);

            if (cartasViradas.length === 2) {
                setTimeout(verificarPar, 800);
                tentativas++;
                atualizarTentativas();
            }
        }
    }

    function verificarPar() {
        const carta1 = cartasViradas[0];
        const carta2 = cartasViradas[1];

        if (carta1.dataset.par === carta2.dataset.par) {
            carta1.classList.add('combinada');
            carta2.classList.add('combinada');
            paresEncontrados++;
            if (paresEncontrados === pares.length) {
                setTimeout(() => alert(`Parabéns! Você encontrou todos os pares em ${tentativas} tentativas!`), 500);
            }
        } else {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
        }

        cartasViradas = [];
    }

    function atualizarTentativas() {
        tentativasElemento.textContent = tentativas;
    }

    function resetJogo() {
        tabuleiro.innerHTML = '';
        tentativas = 0;
        paresEncontrados = 0;
        atualizarTentativas();
        cartasData.sort(() => Math.random() - 0.5);
        cartasData.forEach(par => {
            tabuleiro.appendChild(criarCarta(par));
        });
    }

    cartasData.forEach(par => {
        tabuleiro.appendChild(criarCarta(par));
    });

    resetBotao.addEventListener('click', resetJogo);
});
