// Config
const options = ['rock', 'paper', 'scissors'];
const optionToIndex = {'rock': 0,'paper':1,'scissors': 2}
let humanScore = 0;
let computerScore = 0;

let getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3)

    return options[choice]
}

let getHumanChoice = () => {
    let choice = ''

    while (!options.includes(choice)) {
        choice = prompt("Please enter 'rock', 'paper' or 'scissors'.").toLowerCase()
    }
    return choice
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let winMessage = (humanChoice, computerChoice, result) => {
    humanChoice = capitalizeFirstLetter(humanChoice);
    computerChoice = capitalizeFirstLetter(computerChoice);
    switch (result) {
        case 'tie':
            console.log(`Tie! Both players picked ${humanChoice}.`);
            break;
        case 'human':
            humanScore++;
            console.log(`Human wins! ${humanChoice} beats ${computerChoice}.`);
            break;
        case 'computer':
            computerScore++;
            console.log(`Computer wins! ${computerChoice} beats ${humanChoice}.`);
            break;
    }   
}

let playRound = (humanChoice, computerChoice) => {

    // Get indices chosen and calculat gape
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
        winMessage(humanChoice, computerChoice, 'tie');
    }
}

let playGame = rounds =>  {
    for (let i = 0; i < rounds; i++) {
        playRound(getHumanChoice(), getComputerChoice());
    }

    if (computerScore > humanScore) {
        console.log(`Computer wins! Final scores: Human ${humanScore}, Computer ${computerScore}`);
    } else if (humanScore > computerScore) {
        console.log(`Human wins! Final scores: Human ${humanScore}, Computer ${computerScore}`);
    } else {
        console.log(`Tie! Final scores: Human ${humanScore}, Computer ${computerScore}`);
    }
}

playGame(5);