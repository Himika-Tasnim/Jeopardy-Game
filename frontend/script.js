// ========================
// Backend URL
// ========================
const BACKEND_URL = "https://jeopardy-game-lnje.onrender.com";

// ========================
// Categories
// ========================
const categories = [
  "Market Systems & Livelihood Goals",
  "Stakeholder & Ecosystem Mapping",
  "Market Enablers & Service Delivery",
  "Value Chain Analysis & Product Development",
  "Systemic Change & Impact Measurement",
  "Business Development & Entrepreneurial Thinking",
  "Developing Market Linkages & Inclusive Value Chains",
  "Monitoring & Adaptive Management"
];

// ========================
// Game state
// ========================
let questions = [];
let currentIndex = null;
let score = 0;
let answerSubmitted = false;

// ========================
// DOM elements
// ========================
const board = document.getElementById("game-board");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const revealBtn = document.getElementById("reveal-answer-btn");
const giveAnswerBtn = document.getElementById("give-answer-btn");
const exitBtn = document.getElementById("exit-btn");
const scoreDiv = document.getElementById("score");

const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const modalChoices = document.getElementById("modal-choices");
const modalFeedback = document.getElementById("modal-feedback");
const modalExit = document.getElementById("modal-exit");
const modalNext = document.getElementById("modal-next");

// ========================
// Helpers
// ========================
const isCompleted = q => q.answered || q.revealed;

function canOpenQuestion(q) {
  const colIndex = categories.indexOf(q.category);

  // First column, first question always unlocked
  if (colIndex === 0 && q.points === 100) return true;

  // Previous column must be fully completed
  if (colIndex > 0) {
    const prevColQuestions = questions.filter(q => q.category === categories[colIndex - 1]);
    if (!prevColQuestions.every(isCompleted)) return false;
  }

  // Within column, must unlock sequentially
  const currentColQuestions = questions
    .filter(qq => qq.category === q.category)
    .sort((a, b) => a.points - b.points);
  const firstUncompleted = currentColQuestions.find(qq => !isCompleted(qq));
  return firstUncompleted && firstUncompleted.id === q.id;
}

function isLastQuestion(index) {
  return questions.every((q, i) => i === index || isCompleted(q));
}

// ========================
// Build Board
// ========================
function buildBoard() {
  board.innerHTML = "";

  // Headers
  categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "tile header";
    header.innerText = cat;
    board.appendChild(header);
  });

  // Tiles
  for (let row = 1; row <= 5; row++) {
    for (let col = 0; col < categories.length; col++) {
      const q = questions.find(q => q.id === `${col}-${row}`);
      if (!q) continue;

      const tile = document.createElement("div");
      tile.className = "tile";

      if (isCompleted(q)) {
        tile.classList.add("disabled");
        if (q.revealed) {
          tile.innerText = "👁";
          tile.style.backgroundColor = "#555";
        } else if (q.userAnswer === q.correct) {
          tile.innerText = "✔";
          tile.style.backgroundColor = "green";
        } else {
          tile.innerText = "✖";
          tile.style.backgroundColor = "red";
        }
      } else {
        const unlocked = canOpenQuestion(q);
        tile.innerText = q.points;
        tile.style.opacity = unlocked ? "1" : "0.5";
        tile.style.cursor = unlocked ? "pointer" : "not-allowed";
        if (unlocked) tile.classList.add("available");
        else tile.classList.add("locked");

        tile.onclick = () => {
          if (!unlocked) return alert("⚠️ Complete previous column first!");
          openQuestion(questions.indexOf(q));
        };
      }

      board.appendChild(tile);
    }
  }
}

// ========================
// Open Question
// ========================
function openQuestion(index) {
  const q = questions[index];
  currentIndex = index;

  questionText.innerText = q.q;
  feedback.innerText = "";
  choicesDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "modal-answer";
    radio.value = opt;
    if (idx === 0) radio.checked = true;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(opt));
    choicesDiv.appendChild(label);
    choicesDiv.appendChild(document.createElement("br"));
  });

  questionScreen.style.display = "flex";
  board.style.display = "none";

  revealBtn.disabled = false;
  giveAnswerBtn.disabled = false;
  exitBtn.disabled = false;
}

// ========================
// Reveal & Answer
// ========================
function revealAnswer() {
  const q = questions[currentIndex];
  modalMsg.innerHTML = `<strong>Q:</strong> ${q.q}`;
  modalChoices.style.display = "none";
  modalFeedback.innerHTML = `👁 Correct Answer: ${q.correct}<br><br><strong>Explanation:</strong> ${q.explanation}`;
  q.answered = true;
  q.revealed = true;

  modal.dataset.action = "reveal";
  modalNext.style.display = isLastQuestion(currentIndex) ? "none" : "inline-block";
  modalExit.style.display = "inline-block";
  openModal();
  updateScore(0);
}

function giveAnswer() {
  const q = questions[currentIndex];
  modalMsg.innerHTML = `<strong>Q:</strong> ${q.q}`;
  modalChoices.innerHTML = "";
  modalFeedback.innerText = "";
  answerSubmitted = false;

  modal.dataset.action = "answer";

  q.options.forEach(opt => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "modal-answer";
    radio.value = opt;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(opt));
    modalChoices.appendChild(label);
    modalChoices.appendChild(document.createElement("br"));
  });

  modalChoices.style.display = "block";
  modalFeedback.style.display = "block";
  modalNext.innerText = "Submit Answer";
  modalExit.style.display = isLastQuestion(currentIndex) ? "none" : "inline-block";
  openModal();
}

// ========================
// Modal & Score Helpers
// ========================
function openModal() { modal.style.display = "flex"; }
function closeModal() {
  modal.style.display = "none";
  modalChoices.innerHTML = "";
  modalFeedback.innerText = "";
  delete modal.dataset.action;
}
function updateScore(points) {
  score += points;
  scoreDiv.innerText = `Score: ${score}`;
}

// ========================
// Navigation
// ========================
function continueToNextColumn() {
  const currentQ = questions[currentIndex];

  // Find next column
  const currentColIndex = categories.indexOf(currentQ.category);
  for (let col = currentColIndex + 1; col < categories.length; col++) {
    const nextColQuestions = questions
      .filter(q => q.category === categories[col])
      .sort((a, b) => a.points - b.points);
    const firstUncompleted = nextColQuestions.find(q => !isCompleted(q));
    if (firstUncompleted) return openQuestion(questions.indexOf(firstUncompleted));
  }

  // No more columns
  alert("No more uncompleted questions!");
  exitToBoard();
}

function exitToBoard() {
  questionScreen.style.display = "none";
  board.style.display = "grid";
  buildBoard();
}

// ========================
// Modal Buttons
// ========================
modalNext.onclick = () => {
  const q = questions[currentIndex];
  const action = modal.dataset.action;

  if (action === "answer" && !answerSubmitted) {
    const selected = document.querySelector('input[name="modal-answer"]:checked');
    if (!selected) {
      modalFeedback.innerText = "⚠️ Please select an answer!";
      return;
    }

    const isCorrect = selected.value === q.correct;
    q.userAnswer = selected.value;

    if (isCorrect) {
      modalFeedback.innerHTML = `✅ Correct!<br><br><strong>Explanation:</strong> ${q.explanation}`;
      updateScore(q.points);
    } else {
      modalFeedback.innerHTML = `❌ Incorrect.<br>Correct Answer: ${q.correct}<br><br><strong>Explanation:</strong> ${q.explanation}`;
    }

    q.answered = true;
    answerSubmitted = true;
    modalChoices.style.display = "none";

    modalNext.innerText = isLastQuestion(currentIndex) ? "Exit" : "Next Question";
    modalExit.style.display = "inline-block";

  } else {
    closeModal();
    continueToNextColumn();
  }
};

revealBtn.addEventListener("click", revealAnswer);
giveAnswerBtn.addEventListener("click", giveAnswer);
exitBtn.addEventListener("click", exitToBoard);
modalExit.addEventListener("click", () => { closeModal(); exitToBoard(); });

// ========================
// Initialize
// ========================
async function loadQuestions() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/questions`, { mode: "cors" });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    questions = await res.json();
    buildBoard();
  } catch (err) {
    console.error("Failed to load questions:", err);
    alert("Error loading questions from server. Check backend.");
  }
}
loadQuestions();
