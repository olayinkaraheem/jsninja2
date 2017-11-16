// Welcome the user
//alert('Welcome to the Quiz Ninja!');

// creating the view object

const view = {
	score: document.querySelector('#score strong'),
	question: document.getElementById('question'),
	result: document.getElementById('result'),
	info: document.getElementById('info'),
	start: document.getElementById('start'),
	response: document.getElementById('response'),

	render(target, content, attributes){
		for(let key in attributes){
			target.setAttribute(key, attributes[key]);
		}
		target.innerHTML = content;
	},

	show(elem){
		elem.style.display = 'block';
	},

	hide(elem){
		elem.style.display = 'none';
	},

	setup(){
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);
		this.hide(this.start);
		this.render(this.score, game.score);
		this.render(this.result, '');
		this.render(this.info, '');
		this.resetForm();
	},

	tearDown(){
		this.hide(this.question);
		this.hide(this.response);
		this.show(this.start);
	},

	resetForm(){
		view.response.answer.value = '';
		view.response.answer.focus();
	}

};

//-- end of view object

// creating the 'game' namespace
 
const game = {

	start(quiz_array){

		view.hide(view.start);

		this.questions = [...quiz_array];
	
		this.score = 0;

		this.questAsked = 0;
	
		// we removed a for of loop here

		view.setup();

		this.ask();

		//this.gameOver();

	},

	ask(){

		if(this.questions.length > 0){

			this.question = this.questions.pop();

			this.questAsked++;

			var quest = `What is ${this.question.name}'s real name?`;

			console.log(quest);

			view.render(view.question, quest);

		} else {

			this.gameOver();

		}

	},

	check(event){

		event.preventDefault();

		let response = view.response.answer.value;

		let answer = this.question.realName.toLowerCase();

		if(response === answer){

			view.render(view.result, 'Correct !', {'class':'correct'});
			
			this.score++;

			view.render(view.score, this.score);

		} else {

			view.render(view.result, `Wrong! The correct answer was ${answer}`, {'class' : 'wrong'});		
		}

		view.resetForm();

		this.ask();

	},

	gameOver(){
		view.show(view.start);
		view.hide(view.result);
		view.render(view.info, `End of Quiz. You are ${(this.score/this.questAsked*100).toFixed(2)}% correct. You scored ${this.score} point${this.score !== 1 ? 's' : ''} of ${this.questAsked}.`);

		

		view.tearDown();
	}
};

//-- end of 'game' namespace

// heroes object containing name and realName properties

const heroes = [
			{
				name: "Superman",
				realName: "Clark Kent" 
			}, 
			{ 
				name: "Wonder Woman",
				realName: "Diana Prince" 
			}, 
			{ 
				name: "Batman",
				realName: "Bruce Wayne" 
			} 
		];


//question follows
//const quiz = [["What is Superman's real name?","Clark Kent"],["What is Wonder Woman's real name?","Diana Prince"],["What is Batman's real name?","Bruce Wayne"]];

// Starting Our Quiz

view.start.addEventListener('click', () => game.start(heroes), false);  // false is optional as it is the default value for propagation

view.response.addEventListener('submit', e => game.check(e), false);

view.hide(view.response);


// give the user back his/her input

//alert(`You answered ${answer}.`);