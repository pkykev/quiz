

var score = 0;
var scoreOne = document.querySelector(".score")
var h2topScore = document.querySelector("#topscore")
var h2timer = document.querySelector("#timer");
var h2question = document.querySelector("#quest");
var Z = document.querySelector("#start");
var A = document.querySelector("#A");
var B = document.querySelector("#B");
var C = document.querySelector("#C");
var D = document.querySelector("#D");
var choice = [A, B, C, D];
var userChoice = [];
var timerCount = 60;
var timer;
var fin = false;//testing remove true later and put into finish function
var master;
var currQuestion = 0;
var savedScoreBoard;

let topScore = [
  {
    initials:'',
    userScore:0,
  }
]
let questions = [
  {
  Quest: "10+10=?",
  answer1: ["4","5","7"],
  answer2: ["20"]
  },
  {
  Quest: "6/3=?",
  answer1: ["4","1","3"],
  answer2: ["2"]
  }
]
console.log(questions[0].Quest) //targeting objects and arrays combined
h2question.textContent = questions[0].Quest //setting text content of element targeting objects and arrays
//starts with page to get scores from local



function start() {
  Z.textContent = "START"
  Z.addEventListener("click",function(){
    overForm()
    startGameshow()
    timerGo()
    addStartButton()

  });
  
}


function timerGo() {
  timer = setInterval(function(){
    reduceTimer(1);
  },1000)
}
// timerGo()//testing


function startGameshow() {
  
  score = 0;
  currQuestion = 0;
  h2question.textContent = questions[currQuestion].Quest;
  displayAnswer()
  
}

function nextQuestion(){
  if(questions.length === currQuestion){
    fin = true
    addStartButton()
    endGame()
  } else {
  h2question.textContent = questions[currQuestion].Quest;
  displayAnswer()
  }
}


function displayAnswer(){
  var answers = questions[currQuestion].answer1.concat(questions[currQuestion].answer2)
    for(var i=3; i >= 0; i--){
     var popper = Math.floor(Math.random() * (i+1))
     choice[i].textContent = answers[popper]
     answers.splice(popper, 1)
     console.log(popper)
     console.log(answers)
    }
}

function overForm(){//viktor quote from LoL this is actually my event checker lol xD
  choice.forEach(function(item){
    item.addEventListener("click",function(){
      if(item.textContent===questions[currQuestion].answer2[0]){
        youreRight()
      }else{
        youreWrong()
      }
    })
  })
  }
  
  function addStartButton(){
    if(Z.style.display === "none"){
      Z.style.display = "block"
    } else {
      Z.style.display = "none"
    }
  }

  function youreRight(){
    currQuestion++;
    score++;
    nextQuestion()
  }
  function youreWrong(){
    currQuestion++;
    reduceTimer(5);  
    nextQuestion()
  }

  function endGame(){//set var for player name to entered in scored
    scoreOne.textContent = (`You scored ${100.0*score / questions.length}%`)
    checkTopScore(100.0*score / questions.length)
    
    getScore()
  }

  
  
  // function saveScoreBoard(){
  //   var savedScoreBoard = localStorage.getItem("scoreboard")
  //   if(!savedScoreBoard) {
  //     savedScoreBoard = []
  //     savedScoreBoard.push(`Pat ${100.0*score / questions.length}%`)
  //     localStorage.setItem("scoreboard",savedScoreBoard)
  //   }else{
  //     savedScoreBoard.push(`Pat ${100.0*score / questions.length}%`)
  //     localStorage.setItem("scoreboard",savedScoreBoard)
  //   }
  // }





  function reduceTimer(num){
    timerCount-=num;
    h2timer.textContent = timerCount;
    if (fin && timerCount > 0) {
      clearInterval(timer);
      // score();//need
    }
    if (timerCount <= 0) {
      clearInterval(timer);
      // score();//need
    }
  }
  //combine with checktop score, rmv line 1 (not needed) stringify and overwrite local within the if statement for top score// DONE
  // function scoreStorage(){
  //   topScore[0].userScore =+ (100.0*score / questions.length)
  //   localStorage.setItem("scoreboard1", JSON.stringify(topScore))
  //   console.log(localStorage.getItem("scoreboard1"))
  // }
  //check for localstorage to have a top score already and push stringify if null
  function getScore(){
    let getSavedScore = localStorage.getItem("scoreboard1")
    if(getSavedScore === null){
      localStorage.setItem("scoreboard1", JSON.stringify(topScore))
    } else {
      let scoreExchange = localStorage.getItem("scoreboard1")
      topScore = JSON.parse(scoreExchange)
      console.log(topScore)
    }
  }

  // function saveInitials(){
  //  let initialsInput = prompt('Enter initials for topscore')
  //  topScore[0].initials.push(initialsInput)
  //  console.log(topScore[0].initials)
  // }

  function checkTopScore(item){
    if(item > topScore[0].userScore){
      let initialsInput = prompt('Enter initials for topscore')
      topScore[0].initials = initialsInput
      topScore[0].userScore = item
      localStorage.setItem("scoreboard1", JSON.stringify(topScore))
      h2topScore.textContent = (`${topScore[0].initials} has the current top score of ${topScore[0].userScore}%`)
    }
  }
console.log(topScore)
start()
// overForm()//possibly need to disable all 4 buttons in some function or move the overform call: this is to prevent the user from breaking my app


//load previous highscores
//if non set empty array
//.push new score to array
//sort array by high to low
//take first ten numbers of sorted array

//dispaly score from local storge
//click start button
//60sec timer starts
//question and answers pop up
//I click answer
//display wrong
//display right
//loop through qs and as
//end display percent score


// questions = [ { question: string, answers: string[] }, { question: string, answers: string[] } ] 


























