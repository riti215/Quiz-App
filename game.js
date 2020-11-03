const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));   
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;       
let availableQuestions = [];

let questionList = [
    {
        ques: "What is a group of wolves called?",
        choice1: "A herd of wolves",
        choice2: "A pride of wolves",
        choice3: "A pack of wolves",
        choice4: "A gang of wolves",
        answer: 3
    },
    {
        ques: "Which bird ia a symbol of peace?",
        choice1: "Pigeon",
        choice2: "Crow",
        choice3: "Parrot",
        choice4: "Dove",
        answer: 4
    },
    {
        ques: "How far can an owl rotate its head?",
        choice1: "90 degree",
        choice2: "160 degree",
        choice3: "235 degree",
        choice4: "270 degree",
        answer: 4
    },
    {
        ques: "Which animal is Man's best friend?",
        choice1: "Cat",
        choice2: "Dog",
        choice3: "Elephant",
        choice4: "Cow",
        answer: 2
    },
    {
        ques: "Which animal has no vocal chords?",
        choice1: "Giraffe",
        choice2: "Zebra",
        choice3: "Panda",
        choice4: "Hyena",
        answer: 1
    }
]

// Constants
const correct_bonus = 10;
const max_questions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionList];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem('mostRecentScore', score);
        //go the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    //update the progressbar
    progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);     
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.ques; 
    
    choices.forEach(option => {                                                      
        const number = option.dataset['number'];
        option.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);                               
    acceptAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        /*const classToApply = "Incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "Correct";
        }*/
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ?  "correct" : "incorrect";
        console.log(classToApply);                                                    

        if (classToApply === "correct") {
            incrementScore(correct_bonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);                   

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);                   
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
