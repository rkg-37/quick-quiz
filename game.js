const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// let questions = [
//   {
//     question: "inside which html element do we put the javascript??",
//     choice1: "<script>",
//     choice2: "<javascript>",
//     choice3: "<js>",
//     choice4: "<scripting>",
//     answer: 1,
//   },
//   {
//     question:
//       "what is the correct syntax for referring to an external script called xxx.js?",
//     choice1: "<script href='xxx.js'>",
//     choice2: "<script name='xxx.js'>",
//     choice3: "<script src='xxx.js'>",
//     choice4: "<script file='xxx.js'>",
//     answer: 3,
//   },
//   {
//     question: "how do you write 'Hello World in an alert box?",
//     choice1: "msgBox('Hello World')",
//     choice2: "alertBox('Hello World')",
//     choice3: "msg('Hello World')",
//     choice4: "alert('Hello World')",
//     answer: 4,
//   },
// ];

let questions = [];

fetch("https://opentdb.com/api.php?amount=50&difficulty=hard")
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loaddedQuestions) => {
    console.log(loaddedQuestions.results);
    questions = loaddedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion["answer"] = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    //questions = loaddedQuestions;
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // got to the end page
    localStorage.setItem("mostRecentScore", score);
    return location.replace("end.html");
  }

  questionCounter++;

  //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  progressText.innerText = `Question  ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion["question"];

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", function (e) {
    //console.log(e.target);
    if (!acceptingAnswer) return;
    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = "incorrect";
    if (selectedAnswer == currentQuestion["answer"]) {
      classToApply = "correct";
      incrementScore(CORRECT_BONUS);
      console.log(classToApply);
    }

    // console.log(selectedAnswer);
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

//startGame();
