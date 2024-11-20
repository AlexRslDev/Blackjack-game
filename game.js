const mainScreen = document.querySelector('.principal-screen');
const gameScreen = document.querySelector('.game-screen');
const startBtn = document.querySelector('.start-btn');
const backBtn = document.querySelector('.back-btn');
const newBtn = document.querySelector('.new-btn');
const botCards = document.querySelector('.bot-cards');
const playerCards = document.querySelector('.player-cards');
const totalAmountBot = document.querySelector('.sum-bot');
const totalAmountPLayer = document.querySelector('.sum-player');
const hitBtn = document.querySelector('.hit-btn');
const stayBtn = document.querySelector('.stay-btn');
const result = document.querySelector('.result');

const items = ['2_of_clubs','2_of_diamonds','2_of_hearts','2_of_spades','3_of_clubs','3_of_diamonds','3_of_hearts','3_of_spades','4_of_clubs','4_of_diamonds','4_of_hearts','4_of_spades','5_of_clubs','5_of_diamonds','5_of_hearts','5_of_spades','6_of_clubs','6_of_diamonds','6_of_hearts','6_of_spades','7_of_clubs','7_of_diamonds','7_of_hearts','7_of_spades','8_of_clubs','8_of_diamonds','8_of_hearts','8_of_spades','9_of_clubs','9_of_diamonds','9_of_hearts','9_of_spades','10_of_clubs','10_of_diamonds','10_of_hearts','10_of_spades','ace_of_clubs','ace_of_diamonds','ace_of_hearts','ace_of_spades','jack_of_clubs','jack_of_diamonds','jack_of_hearts','jack_of_spades','king_of_clubs','king_of_diamonds','king_of_hearts','king_of_spades','queen_of_clubs','queen_of_diamonds','queen_of_hearts','queen_of_spades'];

let sumPlayer = 0;
let sumBot = 0; 

let stayCon = false;
let countBotA = false;
let countPlayerA = false;

startBtn.addEventListener('click', () => {
    mainScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    cardDealing();
    totalAmountBot.innerHTML=sumBot;
    totalAmountPLayer.innerHTML=sumPlayer;
});

backBtn.addEventListener('click', () => {
    mainScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    endGame();
    newBtn.style.display = 'none';
});

hitBtn.addEventListener('click', () => {
    if (result.innerHTML === '' && stayCon === false) {
        playerTurn();
    };
}); 

stayBtn.addEventListener('click', () => {
    if (result.innerHTML === '' && stayCon === false) {
        if (sumPlayer < sumBot) {
            finalWin();
        } else {
            botTurn();
        };

        if (sumPlayer === sumBot) {
            result.innerHTML=`Ties`;
            newBtn.style.display = 'block';
        };
    };

    stayCon = true;
});

newBtn.addEventListener('click', () => {
    endGame();
    cardDealing();
    totalAmountBot.innerHTML=sumBot;
    totalAmountPLayer.innerHTML=sumPlayer;
    newBtn.style.display = 'none';
});

function cardDealing() {
    playerTurn();
    playerTurn();
    botRandom();
    botRandom();
};

function playerTurn() {
    const newNumber = randomItem();

    const itemPosition = newNumber[0]; // return string

    playerCards.innerHTML+= `<img src="./cards/${newNumber}.svg" class="cards">`;

    if (itemPosition === '1' || itemPosition === 'j' || itemPosition === 'k' || itemPosition === 'q') {
        sumPlayer += 10;
        totalAmountPLayer.innerHTML = sumPlayer;
    }; 
    
    if (itemPosition === 'a') {  // change if the total is greather 
        if (countPlayerA === false) {
            sumPlayer += 11;
            totalAmountPLayer.innerHTML = sumPlayer;
            countPlayerA = true;
        } else {
            sumPlayer += 1;
            totalAmountPLayer.innerHTML = sumPlayer;
        };
    };
    
    if (itemPosition !== '1' && itemPosition !== 'j' && itemPosition !== 'k' && itemPosition !== 'q' && itemPosition !== 'a') {
        sumPlayer += parseInt(itemPosition);
        totalAmountPLayer.innerHTML = sumPlayer;
    };
    
    if (sumPlayer > 21) {
        result.innerHTML=`Bot Wins`;
        newBtn.style.display = 'block';
    };

};

function botTurn() {
    while (sumBot <= 17) {
        botRandom();
        if (sumBot > 21) {
            finalWin();
            break
        };
    };

    if (sumBot > 17 && sumBot < 22) {
        finalWin();
        newBtn.style.display = 'block';
    };


};

function botRandom() {
    const choseBot = randomItem();

    const itemBotPosition = choseBot[0]; // return string
    
    botCards.innerHTML+= `<img src="./cards/${choseBot}.svg" class="cards">`;

    if (itemBotPosition === '1' || itemBotPosition === 'j' || itemBotPosition === 'k' || itemBotPosition === 'q') {
        sumBot += 10;
        totalAmountBot.innerHTML = sumBot;
    };

    if (itemBotPosition === 'a') {  // change if the total is greather 
        if (countBotA === false) {
            sumBot += 11;
            totalAmountBot.innerHTML = sumBot;
            countBotA = true;
        } else {
            sumBot += 1;
            totalAmountBot.innerHTML = sumBot;
        };
    };

    if (itemBotPosition !== '1' && itemBotPosition !== 'j' && itemBotPosition !== 'k' && itemBotPosition !== 'q' && itemBotPosition !== 'a') {
        sumBot += parseInt(itemBotPosition);
        totalAmountBot.innerHTML = sumBot;
    };
};

function finalWin() {
    let win;
    if (sumBot > sumPlayer && sumBot < 22) {
        win = 'Bot';
    } else {
        win = 'Player';
    };

    result.innerHTML = `${win} Wins`;
    newBtn.style.display = 'block';
};

function endGame() {
    sumBot=0;
    sumPlayer=0;
    stayCon = false;
    countBotA = false;
    countPlayerA = false;
    totalAmountBot.innerHTML = '';
    totalAmountPLayer.innerHTML = '';
    botCards.innerHTML = '';
    playerCards.innerHTML = '';
    result.innerHTML = '';
};

function randomItem() {
    const number = items[Math.floor(Math.random() * items.length)];
    return number;
};
