var startButton = document.getElementById('start-btn');
var quizDirections = document.getElementById('directions');
var questionElement = document.getElementById('question');
var answerElement = document.getElementById('answer');
var timerEl = document.getElementById('countdown');
var rightWrong = document.getElementById('right-wrong');
var questionIndex = 0;
var timeLeft = 75;

quizLength = quizQuestions.length

//Start Game Function
function startCodingQuiz() {
    startButton.classList.add('hide');
    quizDirections.classList.add('hide');
    chooseQuestion()
    countdown()

}

function chooseQuestion() {
    questionElement.innerHTML = "";
    answerElement.innerHTML = "";
    for (var i = 0; i < quizLength; i++) {
        var userQuestion = quizQuestions[questionIndex].question;
        questionElement.innerText = userQuestion
        var userOptions = quizQuestions[questionIndex].options
    }
    userOptions.forEach(function (addOption) {
        var button = document.createElement('button');
        button.innerText = addOption;
        button.classList.add('answer-btn');
        button.addEventListener('click', chooseAnswer);
        answerElement.appendChild(button);
    })
};

function chooseAnswer(event) {
    var element = event.target

    if (element.matches('button')) {
        if (element.innerText == quizQuestions[questionIndex].answer) {
            var createMessage = document.createElement('div');
            createMessage.textContent = 'Correct! ';
            createMessage.setAttribute("id", "message");
            rightWrong.appendChild(createMessage);
        } else {
            timeRem = timeRem - 10;
            var createMessage = document.createElement('div');
            createMessage.textContent = 'Incorrect! ';
            createMessage.setAttribute("id", "message");
            rightWrong.appendChild(createMessage);
        }
    }

   questionIndex++;

    if (questionIndex >= quizLength) {
        quizOver();

    } else {
        chooseQuestion(questionIndex);
    }
};

function quizOver() {
    questionElement.innerHTML = "";
    answerElement.innerHTML = "";

    var finalScore = timeRem;
    initials = window.prompt('Your time left was ' + finalScore + ' seconds. Please enter your initials to save your time. You can view all your scores at any time by clicking "View high scores" in the top left corner.')
    if (initials === null || "") {
        alert('You need to enter a valid response');
        return quizOver();
    } else {
        var score = {
            initials: initials,
            score: finalScore
        }
        var scoreLog = localStorage.getItem('scoreLog');
        if (scoreLog === null) {
            scoreLog = [];
        } else {
            scoreLog = JSON.parse(scoreLog);
        }
        scoreLog.push(score);
        var updatedScoreLog = JSON.stringify(scoreLog);
        localStorage.setItem("scoreLog", updatedScoreLog);
        window.location.replace("./highscores.html");
    }
    window.location.reload();
};

function countdown() {

    var timeInterval = setInterval(function() {
      if (timeRem > 1) {
        timerEl.textContent = timeRem + ' seconds remaining';
        timerRem--;
      }
      else if (timeRem === 1) {
        timerEl.textContent = timeRem + ' second remaining';
        timeRem--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
      };
      
    }, 1000);
  }

  function displayMessage() {
      alert ("You ran out of time! Try to answer all the questions before your time runs out.");
      window.location.reload();
  }

  

  const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        corAnswerIndex: 2,
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