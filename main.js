var userToken = document.querySelector(".user__token");
var userName = document.querySelector(".user__name");
var userWins = document.querySelector(".user__wins");
var computerToken = document.querySelector(".computer__token");
var computerName = document.querySelector(".computer__name");
var computerWins = document.querySelector(".computer__wins");


onload = function() {
userPlayer = createPlayer('Human', '👩🏻', 0);
computerPlayer = createPlayer('Computer', '💻', 0);
updateUsers()
}

function createPlayer(name, token, wins) {
    return {
        name: name,
        token: token,
        wins: wins,
    }
}

function updateUsers() {
    userToken.innerText = userPlayer.token
    userName.innerText = userPlayer.name
    userWins.innerText = `Wins: ${userPlayer.wins}`
    computerToken.innerText = computerPlayer.token
    computerName.innerText = computerPlayer.name
    computerWins.innerText = `Wins: ${computerPlayer.wins}`
}