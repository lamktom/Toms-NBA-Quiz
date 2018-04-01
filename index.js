'use strict'; 

// question array of objects
const questionSet = [ 
	{
		number: 1, 
		text: 'How many minutes are in each quarter of an NBA basketball game?', 
		choice1: '10 minutes',
		choice2: '12 minutes',
		choice3: '15 minutes',
		choice4: '20 minutes',	
		choice5: '8 minutes'
	}, 
	
	{
		number: 2, 
		text: 'How many players can a team play on the court at a time?', 
		choice1: '10 players',
		choice2: '8 players',
		choice3: '3 players',
		choice4: '5 players',
		choice5: '6 players'
	}, 
	
	{
		number: 3, 
		text: 'How high is the basketball hoop from the floor?', 
		choice1: '15 feet',
		choice2: '8 feet',
		choice3: '10 feet',
		choice4: '12 feet',	
		choice5: '8.5 feet'
	}, 
	
	{
		number: 4, 
		text: 'How many points are scored if a basket is made from inside the 3 point arc?', 
		choice1: '5 points',
		choice2: '3 points',
		choice3: '1 point',
		choice4: '2 points',	
		choice5: '6 points'
	}, 
	
	{
		number: 5, 
		text: 'How many free throws is a player rewarded if he gets fouled while taking a shot and still makes the basket?',
		choice1: 'It depends where the shot was made from',
		choice2: '3 free throws',
		choice3: '1 free throw',
		choice4: '2 free throws',
		choice5: '4 free throws'
		
	}, 
	
	{
		number: 6, 
		text: 'How many personal fouls can a player commit before he "fouls out" of the game?', 
		choice1: '6 personal fouls',
		choice2: '5 personal fouls',
		choice3: '10 personal fouls',
		choice4: 'You can\'t foul out of a game',	 
		choice5: '4 personal fouls'
	}, 
	
	{
		number: 7, 
		text: 'How many technical fouls can a player commit before he gets ejected from the game?', 
		choice1: '2 technical fouls',
		choice2: '4 technical fouls',
		choice3: '6 technical fouls',
		choice4: 'You can\'t get ejected from a game',	
		choice5: '3 technical fouls'
	}, 
	
	{
		number: 8, 
		text: 'What kind of violation does a player holding the ball commit when he takes more than 2 steps without dribbling it?', 
		choice1: 'Carrying violation',
		choice2: '2 step violation',
		choice3: 'Traveling violation',
		choice4: '3 second violation',
		choice5: 'Half court violation'
	}, 
	
	{
		number: 9, 
		text: 'How many seconds does a team have in a possession before they commit a shot clock violation?', 
		choice1: '20 seconds',
		choice2: '24 seconds',
		choice3: '15 seconds',
		choice4: '30 seconds',	
		choice5: '10 seconds'
	}, 
	
	{
		number: 10, 
		text: 'What position is generally played by the tallest players on the team and who\'s main job is to protect the rim and grab rebounds?', 
		choice1: 'Shooting Guard position',
		choice2: 'Point Guard position',
		choice3: 'Forward position',
		choice4: 'Center position',	
		choice5: 'Small Forward position'
	}
]; 

// correct answer array 
const ANSWERS = [
	'12 minutes', 
	'5 players', 
	'10 feet', 
	'2 points', 
	'1 free throw', 
	'6 personal fouls',
	'2 technical fouls', 
	'Traveling violation', 
	'24 seconds',
	'Center position'
];


// initialization 
let questionNum = 1; 
let correctAnswers = 0; 
let incorrectAnswers = 0; 


// loop to generate 10 questions 
function generateQuestion(answers, question, questionsAnswered) {
	return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" ></input>
          <span>${question.choice1}</span>
        </label>
        
        <br>
  			
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice2}</span>
        </label>
  
  			<br>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice3}</span>
        </label>
  
  			<br> 
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice4}</span>
        </label>
        
        <br> 
        
        <label>
        	<input class="answer" type="radio" name="option"></input>
        	<span>${question.choice5}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span><br>
      <span id="score-count">Score: ${correctAnswers} correct, ${incorrectAnswers} incorrect</span>
    </div>
  </section>
  `;
}

// generate last page with user's final score & play again button 
function generateLastPage() { 
	$('#container').html(`
		<div class='col-12'>
	    <section id="last-page">
	      <h2>Your Final Score is: ${correctAnswers} out of 10</h2>
	      <button id="js-restart-button">Restart Quiz</button>
	    </section>
    </div>
  `);
} 

// Move to next question 
function nextQuestion() {
	const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum;

  $('#container').html(generateQuestion(correctAnswers, question, questionsAnswered));
}

// Check answer 
function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  }
  else {
    return false;
  }
}

// Feedback pages 
function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  incrementCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://media.giphy.com/media/l41Ygp66YCFw2Zi5a/giphy.gif" alt="Steph Curry three made">
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackPage(questionNum));
  incrementIncorrectAnswers(); 
}

function incorrectFeedbackPage(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Wrong, the correct answer is ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media.giphy.com/media/E9gl5Y32uzHJC/giphy.gif" alt="Tony Parker airball">
      <button id="js-next-button">Next</button>
    </section>
`;
}

// Incrementors 
function incrementQuestion() {
  questionNum++;
}

function incrementCorrectAnswers() {
  correctAnswers++;
}

function incrementIncorrectAnswers() {
	incorrectAnswers++; 
}

// Buttons
function handleStartButton() {
	$('#js-start-button').click(function(event) {
		nextQuestion(); 
	console.log("Start button clicked"); 
	}); 
}

function handleSubmitButton() {
	$('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault();

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } 
    else {
      generateIncorrectFeedback();
    }
	console.log("Submit button clicked"); 
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
		if(questionNum === 10) {
      generateLastPage(correctAnswers);
    } 
    else {
      incrementQuestion();
      nextQuestion();
  	}
  console.log("Next button clicked"); 	
  });
	
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {
    location.reload();
    console.log("Restart button clicked"); 
  });
}

function handleButtons() {
	handleStartButton(); 
	handleSubmitButton();
	handleNextButton(); 
	handleRestartButton(); 
}

handleButtons(); 






