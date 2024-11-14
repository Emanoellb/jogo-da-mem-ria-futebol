const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const attemptsElement = document.querySelector('.attempts')


/* ----Array das Imagens */
const images = [
    'vini',
    'neymar',
    'romário',
    'ronaldinho',
    'kaká',
    'pelé',
];

/* ------- Função para criar os elementos automaticamente ----------- */

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
let attempts = 0;


/* ----- Menu da mensagem de vitória --------  */

const displayWinMessage = () => {
    const playerName = localStorage.getItem('player');

    const messageDiv = createElement('div', 'win-message');
    messageDiv.innerHTML = `<p>Parabéns, ${playerName}! Você ganhou o jogo com ${attempts} tentativas!</p>
    <button class="restart-game">Jogar Novamente</button>
    <button class="restart-login">Voltar ao menu do Login</button>`;
    document.body.appendChild(messageDiv);

    localStorage.setItem('attempts', attempts);

    const restartGame = document.querySelector('.restart-game');
    restartGame.addEventListener('click', () => {
        location.reload();
    });

    const restartLogin = document.querySelector('.restart-login');
    restartLogin.addEventListener('click', () => {
        window.location = '../index.html';
    })
}

/* -------  Função para verificar se houver o fim do jogo -------- */

const cheakEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card')

    if (disableCards.length == 12) {
        setTimeout(() => {
            displayWinMessage();
        }, 500);

    }
}


/* ------ Função para verificar se as cartas são iguais -------- */

const cheakCards = () => {
    const firstImage = firstCard.getAttribute('data-image');
    const secondImage = secondCard.getAttribute('data-image');

    if (firstImage == secondImage) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        cheakEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500)
    }

    /* ----- Adição do elemento "tentativas" */
    attempts++;
    attemptsElement.innerHTML = `Tentativas: ${attempts}`

}


/* ------ Função para revelar as cartas ------- */
const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        cheakCards();
    }

    ;
}


/* ----- Função para criar as cartas -----*/
const createCard = (image) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${image}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-image', image);
    return card;
}

/* ------- Função para carregar as cartas, sortear e duplicar as mesmas --------- */
const loadGame = () => {
    const duplicateImages = [...images, ...images];

    const shuffledArray = duplicateImages.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((image) => {
        const card = createCard(image);
        grid.appendChild(card);
    });
}


/* -------- Função para carregar o nome do jogador vindo do login e carregar o jogo por completo ------- */
window.onload = () => {
    const playerName = localStorage.getItem('player');

    spanPlayer.innerHTML = playerName;
    loadGame();
}
