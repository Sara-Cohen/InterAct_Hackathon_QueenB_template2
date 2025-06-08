let currentQuestion = 0;
let score = 0;
let gameData = [];

const questions = [
  {
    text: "החבר שלי שכח את יום ההולדת שלי 😔",
    image: "img/SAD.jpeg",
    options: [
      { text: "עצב", value: "sad", image: "img/SAD.jpeg", correct: true },
      { text: "שמחה", value: "happy", image: "img/HAPPY.jpeg", correct: false },
      {
        text: "תקווה",
        value: "hopeful",
        image: "img/HOPE.jpeg",
        correct: false,
      },
    ],
  },
  {
    text: "שמעתי את החברות שלי מתכננות לי מסיבת הפתעה 🎉",
    image: "img/HAPPY.jpeg",
    options: [
      { text: "דאגה", value: "worry", image: "img/WORRY.jpeg", correct: false },
      { text: "עצב", value: "sad", image: "img/SAD.jpeg", correct: false },
      { text: "שמחה", value: "happy", image: "img/HAPPY.jpeg", correct: true },
    ],
  },
  {
    text: "אחותי מחקה לי את כל העבודה בספרות 📚",
    image: "img/ANGRY OR MAD.jpeg",
    options: [
      { text: "דאגה", value: "worry", image: "img/WORRY.jpeg", correct: false },
      { text: "עצב", value: "sad", image: "img/SAD.jpeg", correct: false },
      {
        text: "כעס",
        value: "angry",
        image: "img/ANGRY OR MAD.jpeg",
        correct: true,
      },
    ],
  },
  {
    text: "נולד לי אח  🥹🎉",
    image: "img/HAPPY.jpeg",
    options: [
      { text: "דאגה", value: "worry", image: "img/WORRY.jpeg", correct: false },
      { text: "עצב", value: "sad", image: "img/SAD.jpeg", correct: false },
      { text: "שמחה", value: "happy", image: "img/HAPPY.jpeg", correct: true },
    ],
  },
  {
    text: "פספסתי את האוטובוס ביום של טיול ואולי אני אפסיד את הטיול 🚌",
    image: "img/WORRY.jpeg",
    options: [
      { text: "דאגה", value: "worry", image: "img/WORRY.jpeg", correct: true },
      { text: "עצב", value: "sad", image: "img/SAD.jpeg", correct: false },
      { text: "שמחה", value: "happy", image: "img/HAPPY.jpeg", correct: false },
    ],
  },
];

function startGame() {
  currentQuestion = 0;
  score = 0;
  gameData = [];
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("finalScreen").style.display = "none";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.text;
  document.getElementById("questionNum").textContent = currentQuestion + 1;
  document.getElementById("score").textContent = score;
  document.getElementById("emotionImage").src = question.image;

  const buttonsArea = document.getElementById("buttonsArea");
  buttonsArea.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = `emotion-btn ${option.value}`;
    button.onclick = () => selectAnswer(option);

    const img = document.createElement("img");
    img.src = option.image;
    img.alt = option.text;
    button.appendChild(img);

    const label = document.createElement("div");
    label.className = "emotion-label";
    label.textContent = option.text;
    button.appendChild(label);

    buttonsArea.appendChild(button);
  });

  document.getElementById("feedback").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
}

function selectAnswer(selectedOption) {
  const question = questions[currentQuestion];
  const feedback = document.getElementById("feedback");
  const buttons = document.querySelectorAll(".emotion-btn");

  // השבת את כל הכפתורים
  buttons.forEach((btn) => (btn.disabled = true));

  gameData.push({
    question: question.text,
    selected: selectedOption.text,
    correct: selectedOption.correct,
  });

  if (selectedOption.correct) {
    score++;
    feedback.textContent = "🎉 נכון! בחירה מעולה!";
    feedback.className = "feedback correct";
  } else {
    const correctAnswer = question.options.find((opt) => opt.correct);
    feedback.textContent = `❌ לא נכון. התשובה הנכונה היא: ${correctAnswer.text}`;
    feedback.className = "feedback incorrect";
  }

  feedback.style.display = "block";

  if (currentQuestion < questions.length - 1) {
    document.getElementById("nextBtn").style.display = "block";
  } else {
    setTimeout(showFinalScore, 1500);
  }
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function showFinalScore() {
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("finalScreen").style.display = "block";
  document.getElementById("finalScore").textContent = score;

  let message = "";
  if (score === questions.length) {
    message = "מושלם! אתה מבין רגשות בצורה מעולה! 🌟";
  } else if (score >= questions.length * 0.75) {
    message = "כל הכבוד! יש לך הבנה טובה של רגשות! 👏";
  } else if (score >= questions.length * 0.5) {
    message = "לא רע! עם קצת תרגול תשתפר עוד יותר! 💪";
  } else {
    message = "זה בסדר, כולנו לומדים! נסה שוב! 🌈";
  }

  document.getElementById("finalMessage").textContent = message;
}

function restartGame() {
  startGame();
}

// התחל את המשחק
startGame();
