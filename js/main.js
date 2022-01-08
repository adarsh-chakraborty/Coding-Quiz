import questions from './questions.js';
import {
  WELCOME_SCREEN,
  QUIZ_STATE as renderQuiz,
  FINAL_STATE as FINAL_SCREEN,
  HIGH_SCORES_STATE as renderHS
} from './states.js';

let currentQuestion = 0;

let remainingTime = 51;
const container = document.querySelector('.container');
const hsBtn = document
  .querySelector('.highscore')
  .addEventListener('click', renderHighscore);
const tl = document.querySelector('#tl');
let time = null;

function render(state = 1) {
  if (state === 1) {
    container.innerHTML = WELCOME_SCREEN;
    document.querySelector('#startQuiz').addEventListener('click', () => {
      startQuiz();
      time = setTimeout(timeInterval, 100);
    });
    return;
  }
  if (state === 2) {
    // askQuestions;
    return;
  }
}

function startQuiz() {
  container.innerHTML = renderQuiz(questions[currentQuestion]);

  setupClickListener(questions[currentQuestion]);
}

function setupClickListener(currentQuestion) {
  const options = document.querySelectorAll('.btnOption');
  options.forEach((element) =>
    element.addEventListener('click', (e) => {
      if (e.target.classList.contains('incorrect')) return;

      if (currentQuestion.answer === e.target.innerText && remainingTime > 0) {
        feedback(true);
        setTimeout(showNextQuestion, 500);
        return;
      }

      e.target.classList.add('incorrect');
      remainingTime -= 10;
      feedback(false);
    })
  );
}

function showNextQuestion() {
  currentQuestion++;
  if (remainingTime <= 0) {
    // Game over
    remainingTime = 0;
    tl.innerText = 'Time Over';
    return;
  }

  if (currentQuestion >= questions.length) {
    clearTimeout(time);
    const isWinner = true;
    const finalscore = remainingTime;
    container.innerHTML = FINAL_SCREEN({
      header: 'ALL DONE!',
      message: `Your final score is ${finalscore}.`,
      score: finalscore,
      isWinner
    });
    setupActionClickListener(isWinner, finalscore);
    return;
  }
  startQuiz();
}

function feedback(correct) {
  if (correct) {
    document.querySelector(
      '.feedback'
    ).innerHTML = `<hr/><div class="feedback"><strong>Correct!</strong></div>`;
    return;
  }
  document.querySelector(
    '.feedback'
  ).innerHTML = `<hr/><div class="feedback"><strong>Incorrect!</strong></div>`;
}

function timeInterval() {
  remainingTime--;
  tl.innerText = remainingTime <= 0 ? 'Time Over' : remainingTime;

  if (remainingTime > 0) {
    time = setTimeout(timeInterval, 1000);
  }

  if (remainingTime <= 0) {
    container.innerHTML = FINAL_SCREEN({
      header: "Time's Up!",
      message: `Your final score is 0.`,
      score: 0,
      isWinner: false
    });

    setupActionClickListener();
  }
}

function setupActionClickListener(isWinner = false, finalscore) {
  if (isWinner) {
    // User has completed the Quiz, Submit Initial listener
    document.querySelector('#btnSubmit').addEventListener('click', () => {
      const name = document.querySelector('#initials').value;

      if (name.trim().length === 0) {
        alert('Enter name!!');
      }
      const winners = JSON.parse(localStorage.getItem('hs')) ?? [];
      const newWinner = { name, score: finalscore };
      winners.push(newWinner);
      localStorage.setItem('hs', JSON.stringify(winners));
      startOverQuiz();
    });
    return;
  }

  // User has not won the game, start over
  document.querySelector('#startover').addEventListener('click', () => {
    startOverQuiz();
  });
}

function startOverQuiz() {
  currentQuestion = 0;
  remainingTime = 51;
  clearTimeout(time);
  time = null;
  container.innerHTML = WELCOME_SCREEN;
  tl.innerHTML = '';
  document.querySelector('#startQuiz').addEventListener('click', () => {
    startQuiz();
    time = setTimeout(timeInterval, 100);
  });
}

function renderHighscore() {
  currentQuestion = 0;
  remainingTime = 51;
  clearTimeout(time);
  time = null;
  tl.innerHTML = '';
  container.innerHTML = renderHS();

  document.querySelector('#back').addEventListener('click', startOverQuiz);
  document.querySelector('#clearHS')?.addEventListener('click', () => {
    localStorage.removeItem('hs');
    renderHighscore();
  });
}

render();
