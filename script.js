// === Best Score ===
function loadBestScore() {
  const best = localStorage.getItem("bestScore");
  return best ? Number(best) : null;
}

function saveBestScore(score) {
  localStorage.setItem("bestScore", score);
}

// === Global value ===
let low = 1;
let high = 100;
let secret = 0;
let attempts = 0;
let best = loadBestScore();
let currentLevel = "2"; // 默认中等难度

// === start choosing difficulty level ===
function startGame(level) {
  currentLevel = level;

  if (level === "1") {
    low = 1;
    high = 50;
  } else if (level === "2") {
    low = 1;
    high = 100;
  } else {
    low = 1;
    high = 200;
  }

  // generate a random integer
  secret = Math.floor(Math.random() * (high - low + 1)) + low;
  attempts = 0;

  // 更新界面
  document.getElementById("range").textContent =
    `Range: ${low} ~ ${high}`;
  document.getElementById("result").textContent = "";
  document.getElementById("guessInput").value = "";

  updateBestDisplay();
}

// === check guess ===
function checkGuess() {
  const input = document.getElementById("guessInput").value;
  const result = document.getElementById("result");

  const guess = Number(input);

  // check input
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
    result.textContent =
      `🎉 Correct! You guessed in ${attempts} attempts. Answer: ${secret}`;

    // new best score
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

// === print new best sorce ===
function updateBestDisplay() {
  const bestElement = document.getElementById("best");
  bestElement.textContent =
    best !== null ? `Best Score: ${best}` : "No record yet!";
}

// === restart ===
function restartGame() {
  startGame(currentLevel);
  document.getElementById("result").textContent = "🔄 Game restarted!";
}

// === reset best score ===
function resetBestScore() {
  if (confirm("Are you sure you want to reset best score?")) {
    localStorage.removeItem("bestScore");
    best = null;
    updateBestDisplay();
    document.getElementById("result").textContent =
      "🗑️ Best score has been reset!";
  }
}

// === Initialize when the page loads ===
window.onload = function () {
  updateBestDisplay();
  startGame(currentLevel);
};
