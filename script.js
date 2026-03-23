// === Best Score（用浏览器存储代替文件） ===
function loadBestScore() {
  const best = localStorage.getItem("bestScore");
  return best ? Number(best) : null;
}

function saveBestScore(score) {
  localStorage.setItem("bestScore", score);
}

// === 全局变量 ===
let low = 1;
let high = 100;
let secret = 0;
let attempts = 0;
let best = loadBestScore();
let currentLevel = "2"; // 默认中等难度

// === 开始游戏（选择难度） ===
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

  // 生成随机数
  secret = Math.floor(Math.random() * (high - low + 1)) + low;
  attempts = 0;

  // 更新界面
  document.getElementById("range").textContent =
    `Range: ${low} ~ ${high}`;
  document.getElementById("result").textContent = "";
  document.getElementById("guessInput").value = "";

  updateBestDisplay();
}

// === 检查猜测 ===
function checkGuess() {
  const input = document.getElementById("guessInput").value;
  const result = document.getElementById("result");

  const guess = Number(input);

  // 输入检查
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

    // 更新 best score
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

// === 更新 best 显示（统一管理） ===
function updateBestDisplay() {
  const bestElement = document.getElementById("best");
  bestElement.textContent =
    best !== null ? `Best Score: ${best}` : "No record yet!";
}

// === 重新开始（保持当前难度） ===
function restartGame() {
  startGame(currentLevel);
  document.getElementById("result").textContent = "🔄 Game restarted!";
}

// === 页面加载时初始化 ===
window.onload = function () {
  updateBestDisplay();
  startGame(currentLevel);
};
