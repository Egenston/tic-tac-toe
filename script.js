const gamemodeOptions = document.getElementById('gamemode-options');
const playerNamesForm = document.getElementById('player-names-form');
let gamemode = "";
const playersGamemode = document.getElementById('player-option');

playersGamemode.addEventListener("click", () => {
    gamemode = "players";
    gamemodeOptions.classList.toggle('disabled');
    gamemodeOptions.style.visibility = "hidden";
    playerNamesForm.style.visibility = "visible";
    playerNamesForm.classList.toggle('active');
})

let player1 = "";
let player2 = "";
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const startGame = document.getElementById('start-game');
startGame.addEventListener("click", () => {
    if(player1Input.value.length != 0 && player2Input.value.length != 0 && player1Input.value !== player2Input.value){
        player1 = player1Input.value;
        player2 = player2Input.value;
        playerNamesForm.className = "disabled";
        playerNamesForm.style.visibility = "hidden";
    }
})

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    playerNamesForm.className = "";
    playerNamesForm.style.visibility = "hidden";
    gamemodeOptions.style.visibility = "visible";
    gamemodeOptions.className = "";
})