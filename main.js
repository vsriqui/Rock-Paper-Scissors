var userToken = document.querySelector(".user__token");
var userName = document.querySelector(".user__name");
var userWins = document.querySelector(".user__wins");
var computerToken = document.querySelector(".computer__token");
var computerName = document.querySelector(".computer__name");
var computerWins = document.querySelector(".computer__wins");

var delegator = document.querySelectorAll('.center');
var classicButton = document.getElementById("classic");
var difficultButton = document.getElementById("difficult");
var reset = document.querySelector(".user__reset");
var centerPlay2 = document.querySelector(".center__play2");
var centerPlay1 = document.querySelector(".center__play1");

var classic = ['🪨', '📄', '✂️'];
var difficult = ['🪨', '📄', '✂️', '🦎', '👽'];

onload = function() {
userPlayer = createPlayer('Human', '👩🏻', 0);
computerPlayer = createPlayer('Computer', '💻', 0);
updateUsers();
gameModes();
}

reset.onclick = function() {    
    reset.style.display = "none";
    gameModes();    
}

function gameModes(){
    centerPlay1.innerHTML ='<button class ="play__button" id="classic">CLASSIC <br><br> 🪨 > ✂️ <br> 📄 > 🪨 <br> ✂️ > 📄 </button>';
    centerPlay2.innerHTML = ' <button class ="play__button" id="difficult">DIFFICULT <br><br> 🪨 > ✂️ & 🦎 <br> 📄 > 🪨 & 👽 <br> ✂️ > 📄 & 🦎 <br> 🦎 > 📄 & 👽 <br> 👽 > ✂️ & 🪨 <br></button>';
    reset.style.display = "none";
}

delegator.forEach(b => b.addEventListener('click', (e) => {
    if (e.target.id === 'classic'){
        game = createGame(classic);
        centerPlay2.innerHTML = '';
        centerPlay1.innerHTML = '';
        reset.style.display = "inline";
        displayFighters();   
    } else if (e.target.id === 'difficult'){
        game = createGame(difficult);
        centerPlay2.innerHTML = '';
        centerPlay1.innerHTML = '';
        reset.style.display = "inline";
        displayFighters();  
    } else if (e.target.id === '🪨' || e.target.id === '📄' || e.target.id === '✂️' || e.target.id === '🦎' || e.target.id === '👽') {
        console.log('wwowwwooooh');
        game.player1.choice = e.target.id;
        aiChoice();
        decideWinner();
    }
}))

function createPlayer(name, token, wins) {
    return {
        name: name,
        token: token,
        wins: wins,
    }
}

function createGame(gameType){
    return {
      player1: userPlayer,
      player2: computerPlayer,
      gameType: gameType,
      draws: 0,
    };
}
    

function updateUsers() {
    userToken.innerText = userPlayer.token
    userName.innerText = userPlayer.name
    userWins.innerText = `Wins: ${userPlayer.wins}`
    computerToken.innerText = computerPlayer.token
    computerName.innerText = computerPlayer.name
    computerWins.innerText = `Wins: ${computerPlayer.wins}`
}

function hide(element) {
    element.classList.add("hidden")
  }
  
  function show(element) {
    element.classList.remove("hidden")
}

function aiChoice() {
    var random = Math.floor(Math.random() * game.gameType.length) + 1;
    if (random === 1) {
        game.player2.choice = '🪨'
      }
      if (random === 2) {
        game.player2.choice = '📄'
      }
      if (random === 3) {
        game.player2.choice = '✂️'
      }
      if (random === 4) {
        game.player2.choice = '🦎'
      }
      if (random === 5) {
        game.player2.choice = '👽'
      }
      // return game
    }

  
// function display() {
//     console.log("jibbajabba")
    
//     centerPlay2.innerHTML = `<button id='0'> ${game.gameType[0]} </button>`
// }

function displayFighters() {
    console.log("jibbajabba")
    for (i=0; i<game.gameType.length; i++) {
        if (game.gameType[i] === '🪨' || game.gameType[i] === '📄' || game.gameType[i] === '✂️') {
    centerPlay1.innerHTML += `<button id='${game.gameType[i]}'> ${game.gameType[i]} </button>`
        }
        if (game.gameType[i] === '🦎' || game.gameType[i] === '👽') {
            centerPlay2.innerHTML += `<button id='${game.gameType[i]}'> ${game.gameType[i]} </button>`
        }
    }
}

function decideWinner() {
  if (game.player1.choice === game.player2.choice){
    game.player1.recentResult = 'draw'
    console.log('draw')
  } else if (game.player1.choice === '🪨' && (game.player2.choice === '✂️' || game.player2.choice === '🦎')){
    game.player1.recentResult = 'won'
    console.log('winner')
  } else if (game.player1.choice === '📄' && (game.player2.choice === '🪨' || game.player2.choice === '👽')){
    game.player1.recentResult = 'won'
    console.log('winner')
  } else if (game.player1.choice === '✂️' && (game.player2.choice === '📄' || game.player2.choice === '🦎')){
    game.player1.recentResult = 'won'
    console.log('winner')
  } else if (game.player1.choice === '🦎' && (game.player2.choice === '📄' || game.player2.choice === '👽')){
    game.player1.recentResult = 'won'
    console.log('winner')
  } else if (game.player1.choice === '👽' && (game.player2.choice === '✂️' || game.player2.choice === '🪨')){
    game.player1.recentResult = 'won'
    console.log('winner')
  } else {
    game.player1.recentResult = 'lost'
    console.log('loser')
  }
  counter()
  resultMessage()
}

function counter() {
  if (game.player1.recentResult === 'won'){
    game.player1.wins += 1;     
  } else if (game.player1.recentResult === 'lost'){
    game.player2.wins += 1;   
  } else {
    game.draws += 1;
  }
  updateUsers()
}

function resultMessage (){
  if (game.player1.recentResult === 'won'){ 
    game.gameMessage = `${game.player1.token} ${game.player1.name} won this round! ${game.player1.token}`;
  } else if (game.player1.recentResult === 'lost'){ 
    game.gameMessage = `${game.player2.token} ${game.player2.name} won this round! ${game.player2.token}`;
  } else {
    game.gameMessage = `😭 It's a ${game.player1.recentResult} 😭`
  }
}