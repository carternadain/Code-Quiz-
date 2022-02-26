var startBtn = document.getElementById("start-btn");
var startPageEl = document.getElementById("start-page");
var gameScreenEl = document.getElementById("game-screen");
var allDoneEl = document.getElementById("all-done");
var highScorePage = document.getElementById("high-score-page");
var initalsForm = document.getElementById("initals-form");
var goBackBtn = document.getElementById("go-back-btn");
var highScoreLink = document.getElementById("high-score");
var timeRemainingEl = document.getElementById("time-remaining");
var printScore = document.getElementById("print-score");
var initalsInputEl = document.getElementById("initals");
var clearBtn = document.getElementById("clear-btn");
var highScoreList = document.getElementById("high-score-list");
var currentQuestion;
var timerInterval;
var startTime = 75;
var timeRemaining;
var scores = JSON.parse(localStorage.getItem("scores")) || [];

// hide and show screens at proper times

var hideStart = function () {

    startPageEl.style.display = "none";
};

var showStart = function () {
    timeRemainingEl.textContent = startTime;
    highScoreLink.style.display = "block";
    startPageEl.style.display = "block";
    hideGame();
    hideGameOver();
    hideHighScore();
};

var hideGame = function () {

    gameScreenEl.style.display = "none";
};

var showGame = function () {
    highScoreLink.style.display = "none";

    gameScreenEl.style.display = "block";
};

// start quiz
var startQuiz = function () {

    hideStart();
    showGame();
    startTimer();

    currentQuestion = 0;

    showQuestion();
};

// question logic
var showQuestion = function () {
    var question = questions[currentQuestion];
    var questionText = question.questionText;
    var answers = question.answers;
    var correctAnswer = question.correctAnswerIndex;

    var questionTextEl = document.createElement("h1");
    questionTextEl.className = "question";
    questionTextEl.textContent = questionText;

    var answersEl = document.createElement("ul");
    answersEl.className = "answers";

    for (var i = 0; i < answers.length; i++) {
        var answerEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.className = "btn";
        buttonEl.setAttribute("data-answer-index", i);
        buttonEl.textContent = answers[i];

        buttonEl.addEventListener("click", function (event) {
            var answerIndex = event.target.getAttribute("data-answer-index");
            answerIndex = parseInt(answerIndex);
            var answerIsCorrect = correctAnswer === answerIndex;
            answerQuestion(answerIsCorrect);
        })

        answerEl.appendChild(buttonEl);
        answersEl.appendChild(answerEl);
    }

    gameScreenEl.innerHTML = "";
    gameScreenEl.appendChild(questionTextEl);
    gameScreenEl.appendChild(answersEl);
};

// concluding if answer is right or wrong
var answerQuestion = function (isCorrect) {

    currentQuestion++;

    if (!isCorrect) {
        timeRemaining -= 5;
        timeRemainingEl.textContent = timeRemaining;
    }

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showGameOver();
    }

    var correctOrWrong = document.createElement("div");
    correctOrWrong.className = "correct-wrong";
    if (isCorrect) {
        correctOrWrong.textContent = "Correct!";
    } else {
        correctOrWrong.textContent = "Wrong!";
    }
    gameScreenEl.appendChild(correctOrWrong);

};

var showGameOver = function () {
    highScoreLink.style.display = "none";
    allDoneEl.style.display = "block";

    clearInterval(timerInterval);

    gameScreenEl.innerHTML = "";

    printScore.textContent = timeRemaining;

};

var hideGameOver = function () {
    allDoneEl.style.display = "none";
};

// show high score screen
var showHighScore = function () {
    highScoreLink.style.display = "none";
    highScorePage.style.display = "block";

    hideStart();
    hideGame();
    hideGameOver();
    createHighScores();
};

var hideHighScore = function () {
    highScorePage.style.display = "none";
};

// save high scores to localStorage
var saveHighScore = function (event) {
    event.preventDefault();

    if (!initalsInputEl.value) {
        alert("Please enter your initals.");
        return;
    };

    var initals = initalsInputEl.value;
    scores.push({
        initals: initals,
        score: timeRemaining
    });

    scores = scores.sort(function (a, b) {
        if (a.score > b.score) {
            return -1;
        } else if (b.score > a.score) {
            return 1;
        } else {
            return 0;
        }
    });

    localStorage.setItem("scores", JSON.stringify(scores));

    showHighScore();

    initalsInputEl.value = "";
};

// print high score to page
var createHighScores = function () {
    highScoreList.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var scoreEl = document.createElement("li");
        scoreEl.className = "high-score-item";
        scoreEl.textContent = (i + 1) + ". " + score.initals + " - " + score.score;

        highScoreList.appendChild(scoreEl);
    }


};

// go back button
var goBack = function (event) {
    event.preventDefault();
    showStart();
};

// clear high score button
var clear = function () {
    scores = [];
    localStorage.setItem("scores", JSON.stringify(scores));
    createHighScores();
};

// timer logic
var startTimer = function () {
    timeRemaining = startTime;
    timeRemainingEl.textContent = timeRemaining;

    timerInterval = setInterval(function () {
        timeRemainingEl.textContent = --timeRemaining;
        if (timeRemaining === 0) {
            showGameOver();
        }

    }, 1000);
};

// quiz question storage
questions = [{
        questionText: "Commonly used data types DO NOT include:",
        correctAnswerIndex: 2,
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ]
    },
    {
        questionText: "The condiditon in an if/else statement is enclosed with _________.",
        correctAnswerIndex: 2,
        answers: [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets"
        ]
    },
    {
        questionText: "Arrays in JavaScript can be used to store ________.",
        correctAnswerIndex: 3,
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ]
    },
    {
        questionText: "String values must be enclosed within _______ when being assigned to variables.",
        correctAnswerIndex: 2,
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ]
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        correctAnswerIndex: 3,
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ]
    }
]

timeRemainingEl.textContent = startTime;

startBtn.addEventListener("click", startQuiz);

initalsForm.addEventListener("submit", saveHighScore);

goBackBtn.addEventListener("click", goBack);

highScoreLink.addEventListener("click", showHighScore);

clearBtn.addEventListener("click", clear);