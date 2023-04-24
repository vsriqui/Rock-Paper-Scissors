// Variables //
var userToken = document.querySelector(".user__token");
var userName = document.querySelector(".user__name");
var userWins = document.querySelector(".user__wins");
var computerToken = document.querySelector(".computer__token");
var computerName = document.querySelector(".computer__name");
var computerWins = document.querySelector(".computer__wins");
var delegator = document.querySelectorAll('.center');
var reset = document.querySelector(".user__reset");
var centerPlay2 = document.querySelector(".center__play2");
var centerPlay1 = document.querySelector(".center__play1");
var centerStatus = document.querySelector(".center__status");

// Global Variables //
var classic = ['🪨', '📰', '✂️'];
var difficult = ['🪨', '📰', '✂️', '🦎', '👽'];

// Event Listeners //
onload = function() {
  userPlayer = createPlayer('Human', '👩🏻', 0);
  computerPlayer = createPlayer('Computer', '💻', 0);
  updateUsers();
  gameModes();
};

reset.onclick = function() {    
  gameModes();
  resetMessage();   
};

delegator.forEach(delegate => delegate.addEventListener('click', (e) => {
  if (e.target.classList.contains('center__classic')){
    gameSetUp(classic);  
  } else if (e.target.classList.contains('center__difficult')){
    gameSetUp(difficult);
  } else if (e.target.id === '🪨' || e.target.id === '📰' || e.target.id === '✂️' || e.target.id === '🦎' || e.target.id === '👽') {
    game.player1.latestChoice = e.target.id;
    aiChoice();
    decideWinner();
  } 
}));

// Functions and Event Handlers //
function gameSetUp(type) {
  game = createGame(type);
  clearBoard();
  showChangeGame();
  displayFighters(); 
};

function clearBoard() {
  centerPlay2.innerHTML = '';
  centerPlay1.innerHTML = '';
};

function showChangeGame() {
  reset.style.display = 'inline';
};

function createPlayer(name, token, wins) {
  return {
    name: name,
    token: token,
    wins: wins,
    draws: 0,
  }
};

function createGame(gameType) {
  return {
    player1: userPlayer,
    player2: computerPlayer,
    gameType: gameType,
  }
};

function gameModes() {
  centerPlay1.innerHTML ='<button class ="center__classic"> CLASSIC <br><br> 🪨 > ✂️ <br> 📰 > 🪨 <br> ✂️ > 📰 </button>';
  centerPlay2.innerHTML = '<button class ="center__difficult">DIFFICULT <br><br> 🪨 > ✂️ & 🦎 <br> 📰 > 🪨 & 👽 <br> ✂️ > 📰 & 🦎 <br> 🦎 > 📰 & 👽 <br> 👽 > ✂️ & 🪨 <br></button>';
  reset.style.display = 'none';
};

function updateUsers() {
  userToken.innerText = userPlayer.token;
  userName.innerText = userPlayer.name;
  userWins.innerText = `Wins: ${userPlayer.wins}`;
  computerToken.innerText = computerPlayer.token;
  computerName.innerText = computerPlayer.name;
  computerWins.innerText = `Wins: ${computerPlayer.wins}`;
};

function displayFighters() {
  fighterMessage()
  for (i=0; i<game.gameType.length; i++) {
    if (game.gameType[i] === '🪨' || game.gameType[i] === '📰' || game.gameType[i] === '✂️') {
      centerPlay1.innerHTML += `<button class="center__fighter" id="${game.gameType[i]}"> ${game.gameType[i]} </button>`;
    } else if (game.gameType[i] === '🦎' || game.gameType[i] === '👽') {
      centerPlay2.innerHTML += `<button class="center__fighter" id="${game.gameType[i]}"> ${game.gameType[i]} </button>`;
    }
  }
};

function aiChoice() {
  var random = Math.floor(Math.random() * game.gameType.length);
  game.player2.latestChoice = game.gameType[random];
};

// function decideWinner() {
//   if (game.player1.latestChoice === game.player2.latestChoice){
//     (game.player1.recentResult = 'draw') && (game.player2.recentResult = 'draw');
//   } else if (game.player1.latestChoice === '🪨' && (game.player2.latestChoice === '✂️' || game.player2.latestChoice === '🦎')){
//     (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
//   } else if (game.player1.latestChoice === '📰' && (game.player2.latestChoice === '🪨' || game.player2.latestChoice === '👽')){
//     (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
//   } else if (game.player1.latestChoice === '✂️' && (game.player2.latestChoice === '📰' || game.player2.latestChoice === '🦎')){
//     (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
//   } else if (game.player1.latestChoice === '🦎' && (game.player2.latestChoice === '📰' || game.player2.latestChoice === '👽')){
//     (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
//   } else if (game.player1.latestChoice === '👽' && (game.player2.latestChoice === '✂️' || game.player2.latestChoice === '🪨')){
//     (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
//   } else {
//     (game.player1.recentResult = 'lost') && (game.player2.recentResult = 'won');
//   }
//     counter();
//     resultMessage();
// };

function decideWinner() {
  if (game.player1.latestChoice === game.player2.latestChoice){
    (game.player1.recentResult = 'draw') && (game.player2.recentResult = 'draw');
  } else if ((game.player1.latestChoice === '🪨' && (game.player2.latestChoice === '✂️' || game.player2.latestChoice === '🦎')) ||
    (game.player1.latestChoice === '📰' && (game.player2.latestChoice === '🪨' || game.player2.latestChoice === '👽')) ||
    (game.player1.latestChoice === '✂️' && (game.player2.latestChoice === '📰' || game.player2.latestChoice === '🦎')) ||
    (game.player1.latestChoice === '🦎' && (game.player2.latestChoice === '📰' || game.player2.latestChoice === '👽')) ||
    (game.player1.latestChoice === '👽' && (game.player2.latestChoice === '✂️' || game.player2.latestChoice === '🪨'))) {
    (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
  } else {
    (game.player1.recentResult = 'lost') && (game.player2.recentResult = 'won');
  }
    counter();
    resultMessage();
};

function counter() {
  if (game.player1.recentResult === 'won'){
    game.player1.wins += 1;     
  } else if (game.player1.recentResult === 'lost'){
    game.player2.wins += 1;   
  } else {
    game.player1.draws += 1;
    game.player2.draws += 1
  }
  updateUsers();
};

function resultMessage (){
  if (game.player1.recentResult === 'won'){ 
    game.gameMessage = `${game.player1.token} ${game.player1.name} won this round! ${game.player1.token}`;
  } else if (game.player1.recentResult === 'lost'){ 
    game.gameMessage = `${game.player2.token} ${game.player2.name} won this round! ${game.player2.token}`;
  } else {
    game.gameMessage = `😭 It's a ${game.player1.recentResult} 😭`;
  }
  displayResults();
};

function fighterMessage() {
  game.gameMessage = 'Choose your fighter!';
  updateMessage();
};

function resetMessage() {
  game.gameMessage = '';
  updateMessage();
};

function updateMessage() {
  centerStatus.innerText = game.gameMessage;
};

function displayResults() {
  clearBoard();
  updateMessage();
  centerPlay1.innerHTML += `<div class="center__${game.player1.recentResult}"> ${game.player1.latestChoice} </div>`;
  centerPlay1.innerHTML += `<div class="center__${game.player2.recentResult}"> ${game.player2.latestChoice} </div>`;
  resetBoard()
};

function resetBoard() {
  reset.style.display = "none";
  setTimeout(clearBoard, 2500);
  setTimeout(fighterMessage, 2510);
  setTimeout(displayFighters, 2510);
  setTimeout(showChangeGame, 2520);
};

