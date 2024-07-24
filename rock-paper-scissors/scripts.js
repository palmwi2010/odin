// Config
const options = ['rock', 'paper', 'scissors'];
const optionToIndex = {'rock': 0,'paper':1,'scissors': 2}
let humanScore = 0;
let computerScore = 0;

let getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3)

    return options[choice]
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let winMessage = (humanChoice, computerChoice, result) => {
    humanChoice = capitalizeFirstLetter(humanChoice);
    computerChoice = capitalizeFirstLetter(computerChoice);

    const resultDiv = document.querySelector('.result-div');
    resultDiv.style.display = 'block';

    const humanScoreBoard = document.querySelectorAll('.score')[0];
    const computerScoreBoard = document.querySelectorAll('.score')[1]; 
    const resultMessage = document.querySelector('.result-msg');

    switch (result) {
        case 'tie':
            resultMessage.innerText =`Tie! Both players picked ${humanChoice}.`;
            break;
        case 'human':
            humanScore++;
            humanScoreBoard.innerText = humanScore;
            resultMessage.innerText = `Human wins! ${humanChoice} beats ${computerChoice}.`;
            break;
        case 'computer':
            computerScore++;
            computerScoreBoard.innerText = computerScore;
            resultMessage.innerText = `Computer wins! ${computerChoice} beats ${humanChoice}.`;
            break;
    }   
}

let playRound = (humanChoice, computerChoice) => {

    // Get indices chosen and calculate gape
    let humanIndex = optionToIndex[humanChoice];
    let computerIndex = optionToIndex[computerChoice];
    let delta = humanIndex - computerIndex;

    // Resolve
    if (Math.abs(delta) === 2) {
        winMessage(humanChoice, computerChoice, delta > 0 ? 'computer':'human');
    } 
    else if (delta === 1) {
        winMessage(humanChoice, computerChoice, 'human');
    } 
    else if (delta === -1) {
        winMessage(humanChoice, computerChoice, 'computer');
    }
    else {
        return winMessage(humanChoice, computerChoice, 'tie');
    }
}

let setup = () => {
    const body = document.querySelector('body');
    
    const header = document.createElement('h1');
    header.innerText = 'Rock paper scissors';
    body.appendChild(header);

    const subHeader = document.createElement('h2');
    subHeader.innerText = 'Human: Please select your object.'
    body.appendChild(subHeader);

    const buttonDiv = document.createElement('div');
    buttonDiv.style = "display: flex; justify-content: space-between;"

    for (let i = 0; i < options.length; i++) {
        let btn = document.createElement('button');
        btn.innerText = capitalizeFirstLetter(options[i]);
        btn.addEventListener('click', () => {
            playRound(btn.innerText.toLowerCase(), getComputerChoice());
        })
        buttonDiv.appendChild(btn);
    }
    body.appendChild(buttonDiv);

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-div')

    const resultHeader = document.createElement('h2');
    resultHeader.innerText = "Results";

    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('scoreboard');
    
    // Scoreboard
    for (let i = 0; i < 2; i++) {
        let scoreCard = document.createElement('div');
        scoreCard.classList.add('card');
        let playerName = document.createElement('span');
        playerName.classList.add('player-name');
        
        let playerScore = document.createElement('span');
        playerScore.classList.add('score');

        playerName.innerText = (i === 0) ? 'Human': 'Computer';
        playerScore.innerText = (i===0) ? humanScore: computerScore;

        scoreCard.appendChild(playerName);
        scoreCard.appendChild(playerScore);
        scoreBoard.appendChild(scoreCard);
    }

    resultDiv.appendChild(resultHeader);
    resultDiv.appendChild(scoreBoard);

    // Game result message
    const resultMessage = document.createElement('p');
    resultMessage.classList.add('result-msg');

    resultDiv.appendChild(resultMessage);

    body.appendChild(resultDiv);
}

setup();