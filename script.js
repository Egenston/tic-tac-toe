const gamemodeOptions = document.getElementById('gamemode-options');
const playerNamesForm = document.getElementById('player-names-form');
const gameScreen = document.querySelector('#game-screen');
const blurWindow = document.getElementById('popup-window');
const popupWindow = document.getElementById('popup-message');
const popupText = document.getElementById('popup-text');
const currentTurnText = document.getElementById('current-turn');

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
let currentTurn = "";

const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const closeWindowButton = document.querySelector('#close-popup');

closeWindowButton.addEventListener('click', () => {
    blurWindow.classList.toggle('active');
    popupWindow.classList.toggle('active');
    setTimeout(() => {
        popupText.textContent = "";  
    }, 400);
})
function popupMessage(message) {
    popupText.textContent = message;
    blurWindow.classList.toggle('active');
    popupWindow.classList.toggle('active');
    player1Input.value = "";
    player2Input.value = "";
}

//start game button
const startGame = document.getElementById('start-game');
function chooseFirstTurn() {
    let chosenPlayer = Math.floor(Math.random() * 2);
    currentTurn = chosenPlayer == 0 ? player1 : player2;
}
startGame.addEventListener("click", () => {
    if(player1Input.value.length > 15 || player2Input.value.length >15){
        popupMessage("Names must be shorter");
    }
    else if(player1Input.value.length != 0 && player2Input.value.length != 0 && player1Input.value !== player2Input.value){
        player1 = player1Input.value;
        player2 = player2Input.value;
        playerNamesForm.className = "disabled";
        playerNamesForm.style.visibility = "hidden";
        gameScreen.style.visibility = "visible";
        gameScreen.classList.toggle("active");
        chooseFirstTurn();
        currentTurnText.textContent = `${currentTurn}'s turn`;
        setCells();
        setTimeout(() => {
            player1Input.value = "";
            player2Input.value = "";
        }, 1000);
    }
    else if(player1Input.value.length == 0 || player2Input.value.length == 0){
        popupMessage("Enter both player names");
    }
    else if (player1Input.value == player2Input.value) {
        popupMessage("Names must be different");
    }
})

//back button
const playfield = document.querySelector('.playfield');
const backButtons = document.querySelectorAll('#back-button');
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (playerNamesForm.className == "active") {
            playerNamesForm.className = "";
            playerNamesForm.style.visibility = "hidden";
            gamemodeOptions.style.visibility = "visible";
            gamemodeOptions.className = "";
        }
        else if (gameScreen.className == "active" && gamemode == "players") {
            gameScreen.className = "";
            gameScreen.style.visibility = "hidden";
            playerNamesForm.style.visibility = "visible";
            playerNamesForm.className = "active";
            setTimeout(() => {
                for (let index = 0; index < playfield.children.length; index++) {
                    playfield.children[index].innerHTML = "";
                }
            }, 1000);
        }
    })
})

//playfield 
function setCells() {
    let cells = document.querySelectorAll('.playfield-cell');
    cells.forEach(cell => {
        let clone = cell.cloneNode(true);
        cell.parentNode.replaceChild(clone, cell);
    })
    cells = document.querySelectorAll('.playfield-cell');
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (currentTurn == player1) {
                let cross = document.createElement('i');
                cross.className = "fas fa-times";
                cell.appendChild(cross);
                currentTurn = player2;
            }
            else if (currentTurn == player2) {
                let circle = document.createElement('i');
                circle.className = "far fa-circle";
                cell.appendChild(circle);
                currentTurn = player1;
            }
            currentTurnText.textContent = `${currentTurn}'s turn`;
            let clone = cell.cloneNode(true);
            cell.parentNode.replaceChild(clone, cell);
        })
    })
}