
// display all questions for the quiz 

const QuizQuiestion  = [
    {
        question: "Commonly used data types DO NOT include:?",
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        correct: "b",
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables?",
        a: "commas",
        b: "curly brackets",
        c: "quotes",
        d: "parenthesis",
        correct: "b",
    },
    {  
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    
    {
        question: "Arrays in Javascript can be used to store ____.",
        a: "booleans",
        b: "other arrays",
        c: "numbers and strings",
        d: "none of the above",
        correct: "b",
    },
    
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is?",
        a: "Javascript",
        b: "terminal",
        c: "for loops",
        d: "console log",
        correct: "d",
        },
];


// declare all const/variables 
let currentQuiz = 0
let scoreCard = 0
const quiz= document.getElementById('quiz')
const submitButton = document.getElementById('submit')
const answers = document.querySelectorAll('.answer')
const question = document.getElementById('question')
const first = document.getElementById('first')
const second = document.getElementById('second')
const third = document.getElementById('third')
const forth = document.getElementById('forth')
const five = document.getElementById('five')
const sixth = document.getElementById('sixth')

// this will start the quiz
startQuiz()
function startQuiz() {

// calling the deselect function 

    deselectAnswers()

    const currentQuizQuiestion = QuizQuiestion [currentQuiz]
// html elements to display data

    question.innerText = currentQuizQuiestion .question
    first.innerText = currentQuizQuiestion .a
    second.innerText = currentQuizQuiestion .b
    third.innerText = currentQuizQuiestion .c
    forth.innerText = currentQuizQuiestion .d
    
}
// function that allows you to deselect options
function deselectAnswers() {
    answers.forEach(answerEl => answerEl.checked = false)
}

// returns the answer once selected 
function getSelected() {
    let answer
    answers.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

// 60sec timer when you open browser 
window.onload = function() {
    var seconds = 60;
    setInterval(function() {
      document.getElementById("timer").innerHTML =  " : " + seconds;
      seconds--;
      if (seconds == 00) {
        seconds = 60;
        }
    }, 1000);
  }



// a submit button event listener for when you click the answer
submitButton.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === QuizQuiestion [currentQuiz].correct) {
           scoreCard++
       }

       currentQuiz++

       if(currentQuiz < QuizQuiestion .length) {
           startQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${scoreCard}/${QuizQuiestion .length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})
