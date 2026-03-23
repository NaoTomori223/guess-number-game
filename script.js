// === Best Score (替代文件存储) ===
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

// === 初始化游戏 ===
function startGame(level) {
  if (level === "1") {
    low = 1; high = 50;
  } else if (level === "2") {
    low = 1; high = 100;
  } else if (level === "3") {
    low = 1; high = 200;
  }

  secret = Math.floor(Math.random() * (high - low + 1)) + low;
  attempts = 0;

  document.getElementById("range").textContent =
    `Range: ${low} ~ ${high}`;
  document.getElementById("result").textContent = "";
}

// === 检查猜测 ===
function checkGuess() {
  let input = document.getElementById("guessInput").value;
  let result = document.getElementById("result");

  let guess = Number(input);

  if (isNaN(guess)) {
    result.textContent = "❗ Please enter an integer!";
    return;
  }

  attempts++;

  if (guess < secret) {
    result.textContent = "📉 Too low";
  } else if (guess > secret) {
    result.textContent = "📈 Too high";
  } else {
    result.textContent =
      `🎉 Congratulations! You guessed in ${attempts} attempts. Answer: ${secret}`;

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

// === 页面加载初始化 ===
window.onload = function () {
  if (best !== null) {
    document.getElementById("best").textContent =
      `Best Score: ${best}`;
  } else {
    document.getElementById("best").textContent =
      "No record yet!";
  }
};
