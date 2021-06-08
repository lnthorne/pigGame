'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
// Or you can use this way
const score1EL = document.getElementById('score--1');
const curr0EL = document.getElementById('current--0');
const curr1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');


function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}


// rolling die function
btnRoll.addEventListener('click', function() {
  if(playing) {
  // generate a rabdom dice roll
    const dice = Math.floor((Math.random() * 6) + 1);
    console.log(dice);

    // display img
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // check if die is 1
    if(dice !== 1) {
      // add die to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currScore;

    } else {
      // switch active player
      switchPlayer();
    }
  }
})


btnHold.addEventListener('click', function() {
  if(playing) {
    // add current score to score of active player
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      if(scores[activePlayer] >= 100){
        playing = false;
        console.log('you win');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        diceEL.classList.add('hidden');
      } else
        switchPlayer();

    }
})

btnNew.addEventListener('click', function() {
  for(let i = 0; i < scores.length; i++){
    scores[i] = 0;
  }
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;

  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = currScore;
})
