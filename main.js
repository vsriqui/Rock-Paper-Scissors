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
  reset.style.display = "none";
  gameModes();    
};

delegator.forEach(b => b.addEventListener('click', (e) => {
  if (e.target.classList.contains('center__classic')){
    gameSetUp(classic);  
  } else if (e.target.classList.contains('center__difficult')){
    gameSetUp(difficult);
  } else if (e.target.id === '🪨' || e.target.id === '📰' || e.target.id === '✂️' || e.target.id === '🦎' || e.target.id === '👽') {
    game.player1.choice = e.target.id;
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

function gameModes() {
  centerPlay1.innerHTML ='<button class ="center__classic"> CLASSIC <br><br> 🪨 > ✂️ <br> 📰 > 🪨 <br> ✂️ > 📰 </button>';
  centerPlay2.innerHTML = '<button class ="center__difficult">DIFFICULT <br><br> 🪨 > ✂️ & 🦎 <br> 📰 > 🪨 & 👽 <br> ✂️ > 📰 & 🦎 <br> 🦎 > 📰 & 👽 <br> 👽 > ✂️ & 🪨 <br></button>';
  reset.style.display = 'none';
};

function createPlayer(name, token, wins) {
  return {
    name: name,
    token: token,
    wins: wins,
  }
};

function createGame(gameType) {
  return {
    player1: userPlayer,
    player2: computerPlayer,
    gameType: gameType,
    draws: 0,
  }
};

function updateUsers() {
  userToken.innerText = userPlayer.token;
  userName.innerText = userPlayer.name;
  userWins.innerText = `Wins: ${userPlayer.wins}`;
  computerToken.innerText = computerPlayer.token;
  computerName.innerText = computerPlayer.name;
  computerWins.innerText = `Wins: ${computerPlayer.wins}`;
};

function aiChoice() {
  var random = Math.floor(Math.random() * game.gameType.length) + 1;
  if (random === 1) {
    game.player2.choice = '🪨';
  } else if (random === 2) {
    game.player2.choice = '📰';
  } else if (random === 3) {
    game.player2.choice = '✂️';
  } else if (random === 4) {
    game.player2.choice = '🦎';
  } else if (random === 5) {
    game.player2.choice = '👽';
  }
};

function displayFighters() {
  for (i=0; i<game.gameType.length; i++) {
    if (game.gameType[i] === '🪨' || game.gameType[i] === '📰' || game.gameType[i] === '✂️') {
      centerPlay1.innerHTML += `<button class="center__fighter" id="${game.gameType[i]}"> ${game.gameType[i]} </button>`;
    } else if (game.gameType[i] === '🦎' || game.gameType[i] === '👽') {
      centerPlay2.innerHTML += `<button class="center__fighter" id="${game.gameType[i]}"> ${game.gameType[i]} </button>`;
    }
  }
};

function decideWinner() {
  if (game.player1.choice === game.player2.choice){
    (game.player1.recentResult = 'draw') && (game.player2.recentResult = 'draw');
  } else if (game.player1.choice === '🪨' && (game.player2.choice === '✂️' || game.player2.choice === '🦎')){
    (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
  } else if (game.player1.choice === '📰' && (game.player2.choice === '🪨' || game.player2.choice === '👽')){
    (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
  } else if (game.player1.choice === '✂️' && (game.player2.choice === '📰' || game.player2.choice === '🦎')){
    (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
  } else if (game.player1.choice === '🦎' && (game.player2.choice === '📰' || game.player2.choice === '👽')){
    (game.player1.recentResult = 'won') && (game.player2.recentResult = 'lost');
  } else if (game.player1.choice === '👽' && (game.player2.choice === '✂️' || game.player2.choice === '🪨')){
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
    game.draws += 1;
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

function displayResults() {
  clearBoard();
  centerStatus.innerText = game.gameMessage;
  centerPlay1.innerHTML += `<div class="center__${game.player1.recentResult}"> ${game.player1.choice} </div>`;
  centerPlay1.innerHTML += `<div class="center__${game.player2.recentResult}"> ${game.player2.choice} </div>`;
}