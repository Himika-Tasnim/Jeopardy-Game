// ------------------------
// Backend URL (Render)
// ------------------------
const BACKEND_URL = "https://jeopardy-game-lnje.onrender.com";

// ------------------------
// Categories
// ------------------------
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

// ------------------------
// Game state
// ------------------------
let questions = [];
let currentIndex = null;
let score = 0;
let answerSubmitted = false;

// ------------------------
// DOM elements
// ------------------------
const board = document.getElementById("game-board");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const answerArea = document.getElementById("answer-area");
const revealBtn = document.getElementById("reveal-answer-btn");
const giveAnswerBtn = document.getElementById("give-answer-btn");
const exitBtn = document.getElementById("exit-btn");
const submitAnswerBtn = document.getElementById("submit-answer-btn");
const scoreDiv = document.getElementById("score");

const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const modalChoices = document.getElementById("modal-choices");
const modalFeedback = document.getElementById("modal-feedback");
const modalExit = document.getElementById("modal-exit");
const modalNext = document.getElementById("modal-next");

// ------------------------
// Fetch questions from backend
// ------------------------
async function loadQuestions() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/questions`, { method: "GET", mode: "cors" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    questions = await res.json();
    buildBoard();
  } catch (err) {
    console.error("Failed to load questions:", err);
    alert("Error loading questions from server. Please check your backend.");
  }
}

// ------------------------
// Helpers
// ------------------------
function isLastQuestion(index) {
  return questions.every((q, i) => i === index || q.answered);
}

function canOpenQuestion(q) {
  const row = q.points / 100;
  const currentCol = categories.indexOf(q.category);
  
  // If this is the first category (column)
  if (currentCol === 0) {
    // Only allow if all previous questions in this category are answered
    const previousQuestions = questions.filter(
      prev => prev.category === q.category && prev.points < q.points
    );
    return previousQuestions.every(prev => prev.answered);
  }
  
  // For other categories
  // Check if this is the first question (100 points) in a new column
  if (q.points === 100) {
    // Check if previous column is completely finished
    const prevColQuestions = questions.filter(
      prev => prev.category === categories[currentCol - 1]
    );
    const isPrevColComplete = prevColQuestions.every(prev => prev.answered);
    
    // If previous column is complete, this 100-point question should be unlocked
    if (isPrevColComplete) {
      // Make sure all columns before the previous one are also complete
      for (let col = 0; col < currentCol - 1; col++) {
        const allAnswered = questions.filter(prev => 
          prev.category === categories[col]
        ).every(prev => prev.answered);
        if (!allAnswered) return false;
      }
      return true;
    }
    return false;
  }
  
  // For other questions in current category, must progress sequentially
  const currentCategoryQuestions = questions.filter(
    prev => prev.category === q.category
  ).sort((a, b) => a.points - b.points);
  
  // Find the first unanswered question in this category
  const nextUnanswered = currentCategoryQuestions.find(prev => !prev.answered);
  
  // Only allow if this is the first unanswered question in the category
  return nextUnanswered && nextUnanswered.id === q.id;
}

// ------------------------
// Build Board
// ------------------------
function buildBoard() {
  board.innerHTML = "";
  categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "tile header";
    header.innerText = cat;
    board.appendChild(header);
  });

  // Find the current unlocked question (only one should be unlocked at a time)
  let unlockedQuestion = null;
  for (let col = 0; col < categories.length; col++) {
    if (unlockedQuestion) break;
    const categoryQuestions = questions
      .filter(q => q.category === categories[col])
      .sort((a, b) => a.points - b.points);
    
    // Find first unanswered question in this category
    unlockedQuestion = categoryQuestions.find(q => !q.answered);
    
    // If all questions in this category are answered, move to next category
    if (!unlockedQuestion && !categoryQuestions.every(q => q.answered)) {
      break; // Stop if we find a category that's not complete
    }
  }

  for (let row = 1; row <= 5; row++) {
    for (let col = 0; col < categories.length; col++) {
      const q = questions.find(q => q.id === `${col}-${row}`);
      if (!q) continue;

      const tile = document.createElement("div");
      tile.className = "tile";

      if (q.answered) {
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
        const isUnlocked = unlockedQuestion && q.id === unlockedQuestion.id;
        tile.innerText = q.points;
        tile.style.opacity = isUnlocked ? "1" : "0.5";
        tile.style.cursor = isUnlocked ? "pointer" : "not-allowed";
        
        if (isUnlocked) {
          tile.classList.add("available");
          tile.classList.add("current");
        } else {
          tile.classList.add("locked");
        }

        tile.onclick = () => {
          if (!isUnlocked) {
            const currentCol = categories.indexOf(q.category);
            const prevCol = currentCol - 1;
            
            if (q.points === 100) {
              // For first question in a category
              if (prevCol >= 0) {
                const isPrevColComplete = questions.filter(
                  qq => qq.category === categories[prevCol]
                ).every(qq => qq.answered);
                
                if (!isPrevColComplete) {
                  alert(`⚠️ Complete all questions in "${categories[prevCol]}" first!`);
                } else {
                  // If some earlier category is incomplete
                  for (let col = 0; col < prevCol; col++) {
                    const isComplete = questions.filter(
                      qq => qq.category === categories[col]
                    ).every(qq => qq.answered);
                    if (!isComplete) {
                      alert(`⚠️ Complete all questions in "${categories[col]}" first!`);
                      return;
                    }
                  }
                }
              }
            } else {
              // For other questions in the category
              alert("⚠️ Complete questions in order from 100 to 500!");
            }
            return;
          }
          openQuestion(questions.indexOf(q));
        };
      }

      board.appendChild(tile);
    }
  }
}

// ------------------------
// Open Question
// ------------------------
function openQuestion(index) {
  const q = questions[index];

  currentIndex = index;
  questionText.innerText = q.q;
  feedback.innerText = "";
  answerArea.style.display = "none";
  choicesDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = opt;
    if (idx === 0) radio.checked = true;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(opt));
    choicesDiv.appendChild(label);
  });

  questionScreen.style.display = "flex";
  board.style.display = "none";

  revealBtn.disabled = false;
  giveAnswerBtn.disabled = false;
  exitBtn.disabled = false;
  submitAnswerBtn.disabled = false;
}

// ------------------------
// Modal & Scoring
// ------------------------
function revealAnswer() {
  const q = questions[currentIndex];
  modalMsg.innerHTML = `<strong>Q:</strong> ${q.q}`;
  modalChoices.style.display = "none";
  modalFeedback.innerHTML = `👁 Correct Answer: ${q.correct}<br><br><strong>Explanation:</strong> ${q.explanation}`;
  q.answered = true;
  q.revealed = true;

  modal.dataset.action = "reveal";

  if (isLastQuestion(currentIndex)) {
    modalNext.style.display = "none";
    modalExit.style.display = "inline-block";
  } else {
    modalNext.style.display = "inline-block";
    modalExit.style.display = "inline-block";
    modalNext.innerText = "Next Question";
  }

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

  modalNext.style.display = "inline-block";
  modalExit.style.display = isLastQuestion(currentIndex) ? "none" : "inline-block";
  modalNext.innerText = "Submit Answer";

  openModal();
}

// ------------------------
// Modal & Score Helpers
// ------------------------
function openModal() { modal.style.display = "flex"; }
function closeModal() {
  modal.style.display = "none";
  modalFeedback.innerText = "";
  modalChoices.innerHTML = "";
  delete modal.dataset.action;
}
function updateScore(points) { score += points; scoreDiv.innerText = `Score: ${score}`; }

// ------------------------
// Navigation
// ------------------------
function continueToNextQuestion() {
  const currentQ = questions[currentIndex];
  
  // Check if current question is not answered or revealed
  if (!currentQ.answered && !currentQ.revealed) {
    alert("⚠️ Please answer or reveal the current question before moving to the next one!");
    return;
  }

  const currentCatIndex = categories.indexOf(currentQ.category);
  const currentRow = currentQ.points / 100;

  for (let i = currentRow + 1; i <= 5; i++) {
    const nextQ = questions.find(q =>
      q.category === currentQ.category && q.points === i * 100 && !q.answered
    );
    if (nextQ && canOpenQuestion(nextQ)) return openQuestion(questions.indexOf(nextQ));
  }

  for (let cat = currentCatIndex + 1; cat < categories.length; cat++) {
    for (let row = 1; row <= 5; row++) {
      const nextQ = questions.find(q =>
        q.category === categories[cat] && q.points === row * 100 && !q.answered
      );
      if (nextQ && canOpenQuestion(nextQ)) return openQuestion(questions.indexOf(nextQ));
    }
  }

  alert("No more unanswered questions!");
  exitToBoard();
}

function exitToBoard() {
  questionScreen.style.display = "none";
  board.style.display = "grid";
  buildBoard();
}

// ------------------------
// Modal Buttons
// ------------------------
modalNext.onclick = () => {
  const q = questions[currentIndex];
  const action = modal.dataset.action;

  // In reveal mode, enable next only if the answer has been revealed
  if (action === "reveal" && !q.revealed) {
    alert("⚠️ Please wait for the answer to be revealed!");
    return;
  }

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
    isLastQuestion(currentIndex) ? exitToBoard() : continueToNextQuestion();
  }
};

revealBtn.addEventListener("click", revealAnswer);
giveAnswerBtn.addEventListener("click", giveAnswer);
exitBtn.addEventListener("click", exitToBoard);
modalExit.addEventListener("click", () => { closeModal(); exitToBoard(); });

// ------------------------
// Initialize
// ------------------------
loadQuestions();
