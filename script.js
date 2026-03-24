// === Best Score ===
function loadBestScore() {
  const best = localStorage.getItem("bestScore");
  return best ? Number(best) : null;
}

function saveBestScore(score) {
  localStorage.setItem("bestScore", score);
}

// === Global Variables ===
let low = 1;
let high = 100;
let secret = 0;
let attempts = 0;
let best = loadBestScore();
let currentLevel = "2";

// === Timer ===
let startTime = 0;
let timerInterval = null;
let isGameActive = false;

// === Start Game ===
function startGame(level) {
  currentLevel = level;

  if (level === "1") {
    low = 1; high = 50;
  } else if (level === "2") {
    low = 1; high = 100;
  } else {
    low = 1; high = 200;
  }

  resetTimer();
  startTimer();
  
  secret = Math.floor(Math.random() * (high - low + 1)) + low;
  attempts = 0;

  document.body.classList.remove("win");

  document.getElementById("range").textContent =
    `Range: ${low} ~ ${high}`;
  document.getElementById("result").textContent = "";
  document.getElementById("guessInput").value = "";

  updateBestDisplay();
}

// === Check Guess ===
function checkGuess() {
  const input = document.getElementById("guessInput").value;
  const result = document.getElementById("result");

  if (!isGameActive) {
    result.textContent = "⚠️ Game is over. Click Restart!";
    return;
  }

  const guess = Number(input);

  if (input === "" || isNaN(guess)) {
    result.textContent = "❗ Please enter a valid number!";
    return;
  }

  attempts++;

  if (guess < secret) {
    result.textContent = "📉 Too low!";
  } else if (guess > secret) {
    result.textContent = "📈 Too high!";
  } else {
    stopTimer();

    const timeUsed = Math.floor((Date.now() - startTime) / 1000);

    result.textContent =
      `🎉 Correct! Attempts: ${attempts}, Time: ${timeUsed}s`;

    document.body.classList.add("win");

    if (best === null || attempts < best) {
      best = attempts;
      saveBestScore(best);
      document.getElementById("best").textContent =
        `🏆 New Best Score: ${best}`;
    } else {
      updateBestDisplay();
    }
  }
}

// === Update Best Score ===
function updateBestDisplay() {
  document.getElementById("best").textContent =
    best !== null ? `Best Score: ${best}` : "No record yet!";
}

// === Restart ===
function restartGame() {
  startGame(currentLevel);
  document.getElementById("result").textContent = "🔄 Game restarted!";
}

// === Reset Score ===
function resetBestScore() {
  if (confirm("Reset best score?")) {
    localStorage.removeItem("bestScore");
    best = null;
    updateBestDisplay();
  }
}

// === Timer ===
function startTimer() {
  clearInterval(timerInterval);

  startTime = Date.now();
  isGameActive = true;

  timerInterval = setInterval(() => {
    if (!isGameActive) return;

    const seconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent =
      `⏱ Time: ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  isGameActive = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "⏱ Time: 0s";
}

// === Init ===
window.onload = function () {
  updateBestDisplay();
  restTimer()
};
