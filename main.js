var userToken = document.querySelector(".user__token");
var userName = document.querySelector(".user__name");
var userWins = document.querySelector(".user__wins");
var computerToken = document.querySelector(".computer__token");
var computerName = document.querySelector(".computer__name");
var computerWins = document.querySelector(".computer__wins");

var bubbler = document.querySelectorAll('.center');



var classic = ['🪨', '📄', '✂️'];
var difficult = ['🪨', '📄', '✂️', '🦎', '👽'];

onload = function() {
userPlayer = createPlayer('Human', '👩🏻', 0);
computerPlayer = createPlayer('Computer', '💻', 0);
updateUsers();
}

bubbler.forEach(b => b.addEventListener('click', (e) => {
    
    if  (e.target.id === 'classic'){
        console.log('HOWDY DO')
        game = createGame(classic);
        
    } else if (e.target.id === 'difficult'){
        console.log('Nuh, Uhh')
        game = createGame(difficult);
        
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

