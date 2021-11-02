const highScoreList = document.getElementById("highScoreList");
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

// console.log(
//   highScore
//     .map((score) => {
//       return `<li class="high-Score"> ${score.name} : ${score.score} </li>`;
//     })
//     .join("")
// );

highScoreList.innerHTML = highScore
  .map((score) => {
    return `<li class="high-Score"> ${score.name}  >  ${score.score} </li>`;
  })
  .join("");
