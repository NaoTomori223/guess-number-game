// 生成随机数
let target = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  let input = document.getElementById("guessInput").value;
  let result = document.getElementById("result");

  let guess = Number(input);
  attempts++;

  if (!guess) {
    result.textContent = "❗ Please enter a number";
    return;
  }

  if (guess === target) {
    result.textContent = `🎉 Correct! You used ${attempts} attempts.`;
  } else if (guess < target) {
    result.textContent = "📉 Too low!";
  } else {
    result.textContent = "📈 Too high!";
  }
}
