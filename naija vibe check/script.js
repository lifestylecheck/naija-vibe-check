const startButton = document.getElementById("startQuiz");
const message = document.getElementById("message");

const questions = [
  {
    question: 'What does "How far?" usually mean in Nigerian Pidgin?',
    options: [
      "How far away is it?",
      "How are you? / What's up?",
      "How old are you?",
      "Where are you going?"
    ],
    answer: 1
  },
  {
    question: "Which food is at the centre of the famous Jollof rivalry?",
    options: ["Pounded yam", "Akara", "Jollof rice", "Moi moi"],
    answer: 2
  },
  {
    question: 'What does "No wahala" mean?',
    options: [
      "There is a big problem",
      "No problem",
      "I am hungry",
      "I am leaving"
    ],
    answer: 1
  },
  {
    question: "What is Nigeria's film industry popularly called?",
    options: ["Hollywood", "Bollywood", "Nollywood", "Kannywood"],
    answer: 2
  },
  {
    question: 'What does "Abeg" commonly mean?',
    options: ["Please", "Tomorrow", "Food", "Money"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  message.innerHTML = `
    <div class="quiz-card">
      <p class="quiz-progress">
        Question ${currentQuestion + 1} of ${questions.length}
      </p>
      <h3>${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((option, index) => `
          <button class="quiz-option" data-index="${index}">
            ${option}
          </button>
        `).join("")}
      </div>
      <p id="quizFeedback" aria-live="polite"></p>
      <button id="nextQuestion" class="primary-button" hidden>
        ${currentQuestion === questions.length - 1
          ? "See My Results"
          : "Next Question →"}
      </button>
    </div>
  `;

  message.querySelectorAll(".quiz-option").forEach(button => {
    button.addEventListener("click", () => {
      checkAnswer(Number(button.dataset.index));
    });
  });

  document.getElementById("nextQuestion").addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const options = message.querySelectorAll(".quiz-option");
  const feedback = document.getElementById("quizFeedback");

  options.forEach(button => button.disabled = true);

  if (selectedIndex === q.answer) {
    score++;
    feedback.textContent = "Correct! You sabi this Naija vibe! 🎉";
    feedback.className = "correct-answer";
  } else {
    feedback.textContent = `Not quite! The correct answer is: ${q.options[q.answer]}`;
    feedback.className = "wrong-answer";
  }

  options[q.answer].classList.add("correct-option");
  document.getElementById("nextQuestion").hidden = false;
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  let vibe;

  if (score === questions.length) {
    vibe = "Certified Naija Legend! 🏆";
  } else if (percentage >= 60) {
    vibe = "You Get Naija Vibes! 🇳🇬";
  } else {
    vibe = "Your Naija Vibe Is Loading! 😄";
  }

  message.innerHTML = `
    <div class="quiz-card results-card">
      <h3>${vibe}</h3>
      <p>You scored ${score} out of ${questions.length}.</p>
      <p>${percentage}% Naija knowledge!</p>
      <button id="playAgain" class="primary-button">Play Again 🔄</button>
    </div>
  `;

  document.getElementById("playAgain").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });
}

if (startButton && message) {
  startButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    startButton.hidden = true;
    showQuestion();
  });
} else {
  console.error("Quiz elements not found. Check index.html for startQuiz and message IDs.");
}