export const WELCOME_SCREEN = `<div class="Card flex justified-center">
  <h2>Coding Quiz Challenge</h2>
  <p>
    Try to answer the following code-related questions within the time
    limit.
  </p>
  <p>
    Keep in mind that incorrect answers will penalize your score/time by
    ten seconds!
  </p>
  <button class="btnPrimary" id="startQuiz">Start Quiz</button>
</div>
</div>
`;

export const QUIZ_STATE = ({ questionText, options, answer = false }) => {
  let optionshtml = '';
  options.forEach((option) => {
    optionshtml += `<button class='btnOption'>${option}</button>`;
  });

  return `<div class="Card flex justified-center state-2">
        <h2>${questionText}</h2>
       ${optionshtml}
       <div class="feedback"></div>
      </div>`;
};

export const FINAL_STATE = ({ header, message, score, isWinner }) => {
  return `<div class="Card flex justified-center state-3">
  <h2>${header}</h2>
 
  <div>${message}</div>
  ${
    isWinner
      ? `<div class="flex initials">
        <div>Enter Initials:</div>
        <input type="text" id="initials" />
        <button id="btnSubmit">SUBMIT</button>
  </div>`
      : `<button id='startover'>START OVER</button>`
  }
    
  </div>`;
};

export const HIGH_SCORES_STATE = () => {
  const hs = JSON.parse(localStorage.getItem('hs')) ?? [];
  let hshtml = '';

  hs.forEach((user) => {
    hshtml += `<li class="hsitem"><span>${user.name}</span><span>${user.score}</span></li>`;
  });

  return `<div class="Card flex justified-center state-0">
  <h2>Highscores</h2>
  
  <ul class="hs">
    ${
      hs.length > 0
        ? hshtml
        : '<span class="empty">Leaderboard is empty...</span>'
    }
  </ul>
  <div class="flex controls justified-center">
    <button class="btnPrimary" id="back">GO BACK</button>
    ${
      hs.length > 0
        ? `<button class="btnPrimary" id="clearHS">CLEAR SCORE</button>`
        : ''
    }
  </div>
  </div>`;
};
