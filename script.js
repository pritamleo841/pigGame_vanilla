'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

//Selecting dice
const diceEl = document.querySelector('.dice');

//Selecting buttons
const btnNew= document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');

//Initialisations
let scores,current_score,activePlayer;
let playing = true;
const MAX_SCORE = 100;

//Function to initialize the gameś
const init = ()=>{
    scores = [0,0];
    current_score = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add('hidden');
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent=0;
    current1.textContent=0;
    
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
}
init();

//Switching between players
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0?1:0;
    current_score=0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click',()=>{
    /**
     * 1. Generate a random dice roll
     * 2. Display dice
     * 3. Check for rolled 1 ; if true ->switch to next player
     */
    if(playing){
        const dice = Math.floor(Math.random()*6)+1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if(dice!==1){
            current_score += dice;
            document.getElementById(`current--${activePlayer}`).textContent = current_score;

        }else{
            //switch to active player
            switchPlayer();

        }
    }
    
});

btnHold.addEventListener('click',()=>{
    /**
     * 1. Add current_score to the score of active player
     * 2. Check if total >=100 -> finish the game
     * 3. Switch to the next
     */
    if(playing){
        scores[activePlayer]+=current_score;
        // scores[1]=scores[1]+current_score;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Player has won
        if(scores[activePlayer] >= MAX_SCORE){
            playing=false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click',init);