const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);
//console.log(JSON.parse(localStorage.getItem("highScore")));
const MAX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  console.log("clicked");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScore.push(score);
  highScore.sort((a, b) => {
    b.score - a.score;
  });
  highScore.splice(5);

  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location.assign("/QuizApp/index.html");
  console.log(highScore);
}
