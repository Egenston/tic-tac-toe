let gamemode = "";
let player1 = "";
let player2 = "";
let currentTurn = "";
let winnerFound = false;

//screen1
const gamemodeOptions = document.getElementById('gamemode-options');
const playersGamemode = document.getElementById('player-option');

//screen2
const playerNamesForm = document.getElementById('player-names-form');
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const startGame = document.getElementById('start-game');
const backButtons = document.querySelectorAll('#back-button');

//screen3
const gameScreen = document.querySelector('#game-screen');
const currentTurnText = document.getElementById('current-turn');
const playfield = document.querySelector('.playfield');
const restartButton = document.getElementById('restart-button-top');


//popup screen
const blurredPage = document.getElementById('popup-window');
const popupWindow = document.getElementById('popup-message');
const popupText = document.getElementById('popup-text');
const popupButtons = document.getElementById('popup-buttons');
const okButton = document.getElementById('ok-button');
const homeButton = document.getElementById('home-button');
const restartPopupButton = document.getElementById('restart-button');
const closeWindowButton = document.querySelector('#close-popup');


//"players" gamemode was chosen
playersGamemode.addEventListener("click", () => {
    gamemode = "players";
    activateScreen(2);
})
//"start game" button was pressed
startGame.addEventListener("click", () => {
    //player names are too long exception
    if (player1Input.value.length > 15 || player2Input.value.length > 15) {
        popupMessage("Names must be shorter");
    }
    //player name wasnt entered exception
    else if (player1Input.value.length == 0 || player2Input.value.length == 0) {
        popupMessage("Enter both player names");
    }
    //player names are equal exception
    else if (player1Input.value == player2Input.value) {
        popupMessage("Names must be different");
    }
    //correct input
    else if (player1Input.value.length != 0 && player2Input.value.length != 0 && player1Input.value !== player2Input.value) {
        player1 = player1Input.value;
        player2 = player2Input.value;
        activateScreen(3);
        chooseFirstTurn();
        setCells();
        setTimeout(() => {
            player1Input.value = "";
            player2Input.value = "";
        }, 1000);
    }
})
//"back" button was pressed
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        //"back" button on screen 2
        if (playerNamesForm.className == "active") {
            activateScreen(1);
        }
        //"back" button on screen 3 with "players" gamemode active
        else if (gameScreen.className == "active" && gamemode == "players") {
            popupMessage("This will restart your game progress");
            //this popup message must be confirmed with "ok" button
            okButton.style.visibility = "visible";
            activatePopupButtons();
            //"ok" button was pressed
            okButton.addEventListener("click", () => {
                disableBlur();
                activateScreen(2);
                setTimeout(() => {
                    clearCells();
                    popupText.textContent = "";
                    disablePopupButtons();
                    okButton.style.visibility = "hidden";
                }, 1000);
            })
            
        }
    })
})
//"close" button was pressed
closeWindowButton.addEventListener('click', () => {
    disableBlur();
    setTimeout(() => {
        popupText.textContent = ""; 
        disablePopupButtons(); 
    }, 400);
})
//"restart" button was pressed
restartButton.addEventListener('click', () => {
    winnerFound = false;
    chooseFirstTurn();
    setCells();
    gameScreen.children[0].style.visibility = "visible";
    gameScreen.children[1].style.visibility = "hidden";
})
//"restart" popup button was pressed
restartPopupButton.addEventListener('click', () => {
    winnerFound = false;
    chooseFirstTurn();
    setCells();
    disableBlur();
    disablePopupButtons();
    homeButton.style.visibility = "hidden";
    restartPopupButton.style.visibility = "hidden";
    gameScreen.children[0].style.visibility = "visible";
    gameScreen.children[1].style.visibility = "hidden";
})
//"home" popup button was pressed
homeButton.addEventListener("click", () => {
    winnerFound = false;
    disableBlur();
    disablePopupButtons();
    homeButton.style.visibility = "hidden";
    restartPopupButton.style.visibility = "hidden";
    gameScreen.children[0].style.visibility = "visible";
    gameScreen.children[1].style.visibility = "hidden";
    activateScreen(1);
})

function activateScreen(screenNumber) {
    if (screenNumber == 1 && playerNamesForm.className == "active") {
        gamemodeOptions.className = "";
        gamemodeOptions.style.visibility = "visible";
        playerNamesForm.style.visibility = "hidden";
        playerNamesForm.className = "";
    }
    else if(screenNumber == 1 && gameScreen.className == "active"){
        playerNamesForm.className = "";
        gameScreen.className = "";
        gameScreen.style.visibility = "hidden";
        gamemodeOptions.style.visibility = "visible";
        gamemodeOptions.className = "";
    }
    else if (screenNumber == 2 && gamemodeOptions.className == "") {
        gamemodeOptions.classList.toggle('disabled');
        gamemodeOptions.style.visibility = "hidden";
        playerNamesForm.style.visibility = "visible";
        playerNamesForm.classList.toggle('active');
    }
    else if (screenNumber == 2 && gameScreen.className == "active"){
        gameScreen.className = "";
        gameScreen.style.visibility = "hidden";
        playerNamesForm.style.visibility = "visible";
        playerNamesForm.className = "active";
    }
    else if (screenNumber == 3) {
        playerNamesForm.className = "disabled";
        playerNamesForm.style.visibility = "hidden";
        gameScreen.style.visibility = "visible";
        gameScreen.classList.toggle("active");
    }
}

function activateBlur(){
    blurredPage.className = "active";
    popupWindow.className = "active";
}

function disableBlur() {
    blurredPage.className = "";
    popupWindow.className = "";
}

function popupMessage(message) {
    popupText.textContent = message;
    activateBlur();
    player1Input.value = "";
    player2Input.value = "";
}

function clearCells() {
    for (let index = 0; index < playfield.children.length; index++) {
        playfield.children[index].children[0].className = "";
    }
}

function activatePopupButtons() {
    popupButtons.style.marginTop = "10px";
    popupButtons.style.padding = "10px";
    popupButtons.style.height = "50px";
}

function disablePopupButtons() {
    popupButtons.style.marginTop = "0";
    popupButtons.style.padding = "0";
    popupButtons.style.height = "0";
    for (let index = 0; index < popupButtons.children.length; index++) {
        popupButtons.children[index].style.visibility = "hidden";
    }
}

function chooseFirstTurn() {
    let chosenPlayer = Math.floor(Math.random() * 2);
    currentTurn = chosenPlayer == 0 ? player1 : player2;
    currentTurnText.textContent = `${currentTurn}'s turn`;
}

function setCells() {
    clearCells();
    let cells = document.querySelectorAll('.playfield-cell');
    cells.forEach(cell => {
        let clone = cell.cloneNode(true);
        clone.style.pointerEvents = "all";
        cell.parentNode.replaceChild(clone, cell);
    })
    cells = document.querySelectorAll('.playfield-cell');
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (currentTurn == player1) {
                cell.children[0].className = "fas fa-times";
                checkSituation();
                if(!winnerFound) currentTurn = player2;
            }
            else if (currentTurn == player2) {
                cell.children[0].className = "far fa-circle";
                checkSituation();
                if(!winnerFound) currentTurn = player1;
            }
            cell.style.pointerEvents = "none";
            currentTurnText.textContent = `${currentTurn}'s turn`;
            let clone = cell.cloneNode(true);
            cell.parentNode.replaceChild(clone, cell);
        })
    })
}

function checkSituation() {
    //checking horizontally
    if (!winnerFound) {
        for (let i = 0; i < playfield.children.length; i+=3) {
            let crossAmount = 0; 
            let circleAmount = 0;
            for (let j = 0; j < 3; j++) {
                if (playfield.children[i + j].children[0].className == "fas fa-times") crossAmount++;
                else if (playfield.children[i + j].children[0].className == "far fa-circle") circleAmount++;
            }
            if (crossAmount == 3){
                gameResult(player1);
                winnerFound = true;
            } 
            else if(circleAmount == 3){
                gameResult(player2);
                winnerFound = true;
            } 
        }
    }
    //checking vertically
    if (!winnerFound) {
        for (let i = 0; i < 3; i++) {
            let crossAmount = 0;
            let circleAmount = 0;
            for (let j = i; j < playfield.children.length; j+=3) {
                if (playfield.children[j].children[0].className == "fas fa-times") crossAmount++;
                else if (playfield.children[j].children[0].className == "far fa-circle") circleAmount++;
            }
            if (crossAmount == 3) {
                gameResult(player1);
                winnerFound = true;
            }
            else if (circleAmount == 3) {
                gameResult(player2);
                winnerFound = true;
            }    
        }
    }
    //checking diagonally
    if (!winnerFound) {
        if (playfield.children[0].children[0].className == playfield.children[4].children[0].className && playfield.children[4].children[0].className == playfield.children[8].children[0].className){
            if (playfield.children[4].children[0].className == "fas fa-times") {
                gameResult(player1);
                winnerFound = true;
            }
            else if (playfield.children[4].children[0].className == "far fa-circle") {
                gameResult(player2);
                winnerFound = true;
            }
        }
        else if (playfield.children[2].children[0].className == playfield.children[4].children[0].className && playfield.children[4].children[0].className == playfield.children[6].children[0].className) {
            if (playfield.children[4].children[0].className == "fas fa-times") {
                gameResult(player1);
                winnerFound = true;
            }
            else if (playfield.children[4].children[0].className == "far fa-circle") {
                gameResult(player2);
                winnerFound = true;
            }
        }
    }
}

function gameResult(winnerName) {
    gameScreen.children[0].style.visibility = "hidden";
    restartButton.style.visibility = "visible";
    homeButton.style.visibility = "visible";
    restartPopupButton.style.visibility = "visible";
    activatePopupButtons();
    popupMessage(`${winnerName} is the winner!`);

    // gameScreen.children[0].style.visibility = "hidden";
    // restartButton.style.visibility = "visible";
    // popupMessage(`${winnerName} is the winner!`);
    // popupButtons.style.marginTop = "10px";
    // popupButtons.style.padding = "10px";
    // let homeButton = document.createElement('button');
    // homeButton.setAttribute('id', "home-button");
    // homeButton.textContent = "Home";
    // popupButtons.appendChild(homeButton);
    // homeButton = document.getElementById('home-button');
    // let newGameButton = document.createElement('button');
    // newGameButton.setAttribute('id', "new-game-button");
    // newGameButton.textContent = "Restart";
    // popupButtons.appendChild(newGameButton);
    // newGameButton = document.getElementById('new-game-button');
    // homeButton.addEventListener('click', () => {
    //     blurWindow.classList.toggle('active');
    //     popupWindow.classList.toggle('active');
    //     gameScreen.className = "";
    //     gameScreen.style.visibility = "hidden";
    //     playerNamesForm.className = "";
    //     gamemodeOptions.style.visibility = "visible";
    //     gamemodeOptions.className = "";
    //     setTimeout(() => {
    //         for (let index = 0; index < playfield.children.length; index++) {
    //             playfield.children[index].children[0].className = "";
    //         }
    //         gameScreen.children[0].style.visibility = "visible";
    //         gameScreen.children[1].style.visibility = "hidden";
    //         chooseFirstTurn();
    //         setCells();
    //         popupText.textContent = "";
    //         popupButtons.innerHTML = "";
    //         popupButtons.style.marginTop = "0";
    //         popupButtons.style.padding = "0";
    //         popupButtons.removeChild(homeButton);
    //     }, 1000);
    // })
    // newGameButton.addEventListener('click', () => {
    //     for (let index = 0; index < playfield.children.length; index++) {
    //         playfield.children[index].children[0].className = "";
    //     }
    //     gameScreen.children[0].style.visibility = "visible";
    //     gameScreen.children[1].style.visibility = "hidden";
    //     chooseFirstTurn();
    //     setCells(); 
    //     blurWindow.classList.toggle('active');
    //     popupWindow.classList.toggle('active');
    //     setTimeout(() => {
    //         popupText.textContent = "";
    //         popupButtons.innerHTML = "";
    //     }, 400);
    // });
    // restartButton.addEventListener('click', () =>{
    //     gameScreen.children[0].style.visibility = "visible";
    //     gameScreen.children[1].style.visibility = "hidden";
    //     for (let index = 0; index < playfield.children.length; index++) {
    //         playfield.children[index].children[0].className = "";
    //     }
    //     chooseFirstTurn();
    //     setCells();
    // });
}