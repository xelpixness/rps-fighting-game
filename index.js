const resultText = document.querySelector('#result-text');
const choiceBtns = document.querySelectorAll('.choice-btn');

// move logs
const playerMove = document.querySelector('.player-move-log');
const aiMove = document.querySelector('.ai-move-log');

// health bars
const playerHealth = document.querySelector('.player-health');
const aiHealth = document.querySelector('.ai-health');

// modal
const modal = document.querySelector('#modal');
const playAgainBtn = document.querySelector('#play-again-btn');
const modalMessage = document.querySelector('#modal-msg');

let playerScore = 10;
let aiScore = 10;

playAgainBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  startAgain();
});

choiceBtns.forEach((button) =>
  button.addEventListener('click', () => {
    const player = button.getAttribute('data-weapon');
    const ai = aiTurn();

    playerMove.textContent = player;
    aiMove.textContent = ai;
    const result = checkWinner(player, ai);
    resultText.textContent = result;

    if (result === 'You lost the round!') {
      roundLost();
    }

    if (result === 'You won the round!') {
      roundWon();
    }

    // console.log({ playerScore, aiScore });
  })
);

function aiTurn() {
  const randNum = Math.floor(Math.random() * 3) + 1;
  switch (randNum) {
    case 1:
      return 'ROCK';
    case 2:
      return 'PAPER';
    case 3:
      return 'SCISSORS';
  }
}

function checkWinner(player, ai) {
  if (player === ai) {
    resultText.style.color = 'white';
    return 'Draw! Keep fighting.';
  } else if (ai == 'ROCK') {
    return player === 'PAPER' ? 'You won the round!' : 'You lost the round!';
  } else if (ai === 'PAPER') {
    return player === 'SCISSORS' ? 'You won the round!' : 'You lost the round!';
  } else if (ai === 'SCISSORS') {
    return player === 'ROCK' ? 'You won the round!' : 'You lost the round!';
  }
}

function roundWon() {
  resultText.style.color = 'green';
  aiScore -= 1;
  aiHealth.style.width = `${aiScore * 10}%`;
  if (aiScore === 0) {
    showModal('Congrats!🎉 You showed that machine who is in charge!');
  }
}

function roundLost() {
  resultText.style.color = '#c92121';
  playerScore -= 1;
  playerHealth.style.width = `${playerScore * 10}%`;
  if (playerScore === 0) {
    showModal('You lost the battle.😭 Seems like AI will replace you, soon..');
  }
}

function startAgain() {
  choiceBtns.forEach((btn) => (btn.disabled = false));
  resultText.style.color = 'white';
  playerMove.textContent = '';
  aiMove.textContent = '';
  resultText.textContent = '~Fight log~';
  playerScore = 10;
  aiScore = 10;
  playerHealth.style.width = '100%';
  aiHealth.style.width = '100%';
}

function showModal(msg) {
  modalMessage.textContent = msg;
  choiceBtns.forEach((btn) => (btn.disabled = true));
  modal.classList.add('show');
}
