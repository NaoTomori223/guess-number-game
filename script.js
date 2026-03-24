// === Load / Save ===
function load(key) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// === Global ===
let low = 1, high = 100;
let secret = 0;
let attempts = 0;
let currentLevel = "2";

let bestScore = load("bestScore");
let bestTime = load("bestTime");
let leaderboard = load("leaderboard") || [];

// 👉 关键修复（防 undefined）
if (bestScore === undefined) bestScore = null;
if (bestTime === undefined) bestTime = null;

let startTime = 0;
let timerInterval = null;
let isGameActive = false;

// === Start Game ===
function startGame(level) {
  currentLevel = level;

  if (level === "1") { low = 1; high = 50; }
  else if (level === "2") { low = 1; high = 100; }
  else { low = 1; high = 200; }

  secret = Math.floor(Math.random() * (high - low + 1)) + low;
  attempts = 0;

  resetTimer();
  startTimer();

  document.getElementById("range").textContent = `Range: ${low} ~ ${high}`;
  document.getElementById("result").textContent = "";
  document.getElementById("guessInput").value = "";
  document.body.classList.remove("win");

  updateBestDisplay();
}

// === Guess ===
function checkGuess() {
  const input = document.getElementById("guessInput").value;
  const result = document.getElementById("result");

  if (!isGameActive) {
    result.textContent = "⚠️ Game over. Restart!";
    return;
  }

  const guess = Number(input);

  if (input === "" || isNaN(guess)) {
    result.textContent = "❗ Enter a valid number!";
    return;
  }

  attempts++;

  if (guess < secret) result.textContent = "📉 Too low!";
  else if (guess > secret) result.textContent = "📈 Too high!";
  else {
    stopTimer();

    const timeUsed = Date.now() - startTime;
    const seconds = (timeUsed / 1000).toFixed(2);

    result.textContent = `🎉 Correct! Attempts: ${attempts}, Time: ${seconds}s`;
    document.body.classList.add("win");

    document.getElementById("winSound").play();

    updateRecords(attempts, timeUsed);
  }
}

// === Records ===
function updateRecords(attempts, timeUsed) {
  // Best score
  if (bestScore === null || attempts < bestScore) {
    bestScore = attempts;
    save("bestScore", bestScore);
  }

  // Best time
  if (bestTime === null || timeUsed < bestTime) {
    bestTime = timeUsed;
    save("bestTime", bestTime);
  }

  // Leaderboard
  leaderboard.push({ attempts, time: timeUsed });
  leaderboard.sort((a, b) => a.time - b.time);
  leaderboard = leaderboard.slice(0, 5);

  save("leaderboard", leaderboard);

  updateBestDisplay();
  updateLeaderboard();
}

// === UI ===
function updateBestDisplay() {
  const bestText =
    bestScore !== null && bestScore !== undefined
      ? `🎯 Best Attempts: ${bestScore}`
      : "No record";

  const timeText =
    bestTime !== null && bestTime !== undefined
      ? `⏱ Best Time: ${(bestTime / 1000).toFixed(2)}s`
      : "No record";

  document.getElementById("best").textContent =
    `${bestText} | ${timeText}`;
}

function updateLeaderboard() {
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";

  leaderboard.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent =
      `#${i + 1} - ${item.attempts} tries | ${(item.time / 1000).toFixed(2)}s`;
    list.appendChild(li);
  });
}

// === Timer ===
function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  isGameActive = true;

  timerInterval = setInterval(() => {
    if (!isGameActive) return;

    const seconds = ((Date.now() - startTime) / 1000).toFixed(2);
    document.getElementById("timer").textContent =
      `⏱ Time: ${seconds}s`;
  }, 50);
}

function stopTimer() {
  isGameActive = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "⏱ Time: 0.00s";
}

// === Controls ===
function restartGame() {
  startGame(currentLevel);
}

function resetBestScore() {
  if (confirm("Reset all records?")) {
    localStorage.clear();
    bestScore = null;
    bestTime = null;
    leaderboard = [];
    updateBestDisplay();
    updateLeaderboard();
  }
}

// === Init ===
window.onload = function () {
  updateBestDisplay();
  updateLeaderboard();
  resetTimer();
};
