// === Best Score（用浏览器存储代替文件） ===
function loadBestScore() {
  let best = localStorage.getItem("bestScore");
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
  currentLevel = level; // ⭐ 记录当前难度

  if (level === "1") {
    low = 1;
    high = 50;
  } else if (level === "2") {
    low = 1;
    high = 100;
  } else if (level === "3") {
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
}

// === 检查猜测 ===
function checkGuess() {
  let input = document.getElementById("guessInput").value;
  let result = document.getElementById("result");

  let guess = Number(input);

  // 输入检查
  if (isNaN(guess)) {
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
      document.getElementById("best").textContent =
        `Best Score: ${best}`;
    }
  }
}

// === 重新开始（保持当前难度） ===
function restartGame() {
  startGame(currentLevel);
  document.getElementById("result").textContent = "🔄 Game restarted!";
}

// === 页面加载时初始化 ===
window.onload = function () {
  if (best !== null) {
    document.getElementById("best").textContent =
      `Best Score: ${best}`;
  } else {
    document.getElementById("best").textContent =
      "No record yet!";
  }

  // 默认启动一局游戏（中等难度）
  startGame(currentLevel);
};
