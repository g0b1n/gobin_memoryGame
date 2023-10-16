// const cards = document.querySelectorAll('#card');

// let hasFlippedCard = false;
// let firstCard, secondCard;
// let boardLock = false;

// function flipCard() {
//     if (boardLock)
//     return;
//     this.classList.add('flip');
    
//     if (!hasFlippedCard){
//         // first click
//         hasFlippedCard = true;
//         firstCard = this;
//     } else {
//         // second card
//         hasFlippedCard = false;
//         secondCard = this;

//         // cards match??
//         if (firstCard.dataset.player === secondCard.dataset.player) {
//             // if its a match
//             firstCard.removeEventListner('click', flipCard)
//             secondCard.removeEventListner('click', flipCard)
//         } else {
//             // if not a match
//             setTimeout(() => {
//                 firstCard.classList.remove('flip');
//                 secondCard.classList.remove('flip');
//             }, 1000)
            
//         }
//     }
// }

// cards.forEach(card => card.addEventListener('click', flipCard));



const cards = document.querySelectorAll('#card');

let hasFlippedCard = false;
let firstCard, secondCard;
let boardLock = false;

function flipCard() {
    if (boardLock) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    
    if (!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } else {
        // second card
        hasFlippedCard = false;
        secondCard = this;

       checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.player === secondCard.dataset.player;
    isMatch ? disableCards() : unFlipCards()
     // cards match??
     
}

function disableCards() {
    firstCard.removeEventListner('click', flipCard);
    secondCard.removeEventListner('click', flipCard);

    resetBoard();

}

function unFlipCards() {
    boardLock = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFlippedCard, boardLock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
       let randomPosition = Math.floor(Math.random() * 20);
       card.style.order = randomPosition;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));