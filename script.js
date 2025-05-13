document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.getElementById('mapa');
    const personagem = document.getElementById('personagem');
    const infoBox = document.getElementById('info-box');
    const infoTitulo = document.getElementById('info-titulo');
    const infoTexto = document.getElementById('info-texto');
    const fecharInfoBotao = document.getElementById('fechar-info');

    let personagemX = 50;
    let personagemY = 50;
    const velocidade = 5;

    // Dados dos elementos interativos (animais e plantações)
    const elementosInterativosData = [
        { tipo: 'animal', nome: 'Vaca Mimosa', posicao: { x: 200, y: 150 }, info: 'A Mimosa produz cerca de 20 litros de leite por dia e se alimenta de pasto orgânico.' },
        { tipo: 'plantacao', nome: 'Milho Doce', posicao: { x: 400, y: 300 }, info: 'Nosso milho doce é cultivado sem pesticidas e é colhido manualmente na época certa.' },
        { tipo: 'animal', nome: 'Galinha Carijó', posicao: { x: 600, y: 100 }, info: 'As galinhas Carijó são criadas soltas e botam ovos caipiras deliciosos.' },
        { tipo: 'plantacao', nome: 'Horta Orgânica', posicao: { x: 100, y: 450 }, info: 'Nossa horta orgânica fornece uma variedade de legumes frescos e saudáveis para a comunidade local.' },
        { tipo: 'lugar', nome: 'Lagoa Azul', posicao: { x: 700, y: 400 }, info: 'A Lagoa Azul é uma importante fonte de água para a fazenda e um habitat para diversas espécies.' }
        // Adicione mais animais, plantações e lugares com suas informações
    ];

    // Função para criar e posicionar os elementos interativos
    function criarElemento(data) {
        const elemento = document.createElement('div');
        elemento.classList.add('elemento-interativo');
        elemento.classList.add(data.tipo);
        elemento.style.left = `${data.posicao.x}px`;
        elemento.style.top = `${data.posicao.y}px`;
        elemento.textContent = data.nome.charAt(0); // Exibe a primeira letra como ícone

        elemento.addEventListener('click', () => mostrarInfo(data.nome, data.info));
        mapa.appendChild(elemento);
    }

    // Criar todos os elementos interativos
    elementosInterativosData.forEach(criarElemento);

    // Função para mostrar a caixa de informações
    function mostrarInfo(titulo, texto) {
        infoTitulo.textContent = titulo;
        infoTexto.textContent = texto;
        infoBox.classList.remove('escondido');
    }

    // Função para esconder a caixa de informações
    function esconderInfo() {
        infoBox.classList.add('escondido');
    }

    // Event listener para fechar a caixa de informações
    fecharInfoBotao.addEventListener('click', esconderInfo);

    // Controle do personagem pelo teclado
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                personagemY -= velocidade;
                break;
            case 'ArrowDown':
            case 's':
                personagemY += velocidade;
                break;
            case 'ArrowLeft':
            case 'a':
                personagemX -= velocidade;
                break;
            case 'ArrowRight':
            case 'd':
                personagemX += velocidade;
                break;
        }

        // Manter o personagem dentro dos limites do mapa (opcionalmente do container)
        const mapaRect = mapa.getBoundingClientRect();
        const personagemRect = personagem.getBoundingClientRect();

        personagemX = Math.max(0, Math.min(personagemX, mapaRect.width - personagemRect.width));
        personagemY = Math.max(0, Math.min(personagemY, mapaRect.height - personagemRect.height));

        personagem.style.left = `${personagemX}px`;
        personagem.style.top = `${personagemY}px`;
    });
});
