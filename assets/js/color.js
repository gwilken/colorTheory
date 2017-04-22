$(document).ready(function() {

	$(window).on('load', function () {	

		var right = 0;
		var wrong = 0;
		var timeOut = 0;
		var startTime = 0;
		var currentQ = 0;
		var clickValue = null;
		var intervalId;

		var html = $('html');
		var msg = $('#message');

		var titleSpan = $('#title');
		var subSpan = $('#subtitle');

		var questions = [
			{
				prompt: ['In 1900', 'the cause of', 'this "fever" was', 'discovered', 'to be', 'mosquitos'],
				answers: ['Yellow Fever', 'White Fever', 'Dengue Fever', 'Hangover Fever'],
				colors: ['blueviolet', 'gold'],				
				correct: 0
			},

			{
				prompt: ['When born', "a zebra's", 'black and white', 'stripes are', 'actually this', 'color'],
				answers: ['Black & white', 'Brown', 'Invisible', 'Pink'],
				colors: ['yellow', 'yellowgreen'],
				correct: 1
			},

			{
				prompt: ['The', '"black box"', 'of an aircraft', 'flight recorder', 'is', 'what color?'],
				answers: ['Flourescent green', 'Orange', 'Fire Engine Red', 'Black. Nice try.'],
				colors: ['blue', 'orange'],				
				correct: 1
			},

			{
				prompt: ['Elvis', "Presley's", 'first', 'Cadillac', 'was', 'this color.'],
				answers: ['Lime Green', 'Mystery Mauve', 'Blue Suede', 'Murder Red'],
				colors: ['green', 'blueviolet'],
				correct: 2
			},
			{
				prompt: ['Sunlight', 'causes', 'sneezing in', 'what', 'precent', 'of people?'],
				answers: ['100%', '6-11%', '18-35%','45-50%'],
				colors: ['green', 'red'],
				correct: 2
			},
			{
				prompt: ["In it's", 'pure state', 'topaz', 'is', 'what', 'color?'],
				answers: ['Light blue', 'Light green', 'Light green', "Ain't got no color"],
				colors: ['blue', 'blueviolet'],
				correct: 3
			},
			{
				prompt: ['A single light', 'bulb has been', 'burning', 'continously','for how many', 'years?'],
				answers: ['27 years', '52 years', '116 years', '99 years'],
				colors: ['yellowgreen', 'mediumvioletred'],
				correct: 2
			},
			{
				prompt: ['Litmus paper', 'turns this', 'color', 'when dipped', 'in', 'acid.'],
				answers: ['pink', 'blue', 'black', 'psychedelic!'],
				colors: ['lightseagreen', 'tomato'],				
				correct: 0
			},
			{
				prompt: ['The first', 'color a', 'baby can', 'perceive', 'is', 'what?'],
				answers: ['Blue', 'Aqua-Marine', 'Red', "Babies cant see!"],
				colors: ['violet', 'mediumvioletred'],				
				correct: 2
			},
			{
				prompt: ['According to', 'safety studies', 'the safest', 'color for', 'an automobile', 'is?'],
				answers: ['White', 'Red', 'Poop-Brown', 'Blue'],
				colors: ['red', 'gold'],				
				correct: 0
			},	
			{
				prompt: ['What', 'is the', 'wavelength', 'of', 'visible', 'light?'],
				answers: ['My wavelength', '200 nm', '270 - 500nm', '400 - 700nm' ],
				colors: ['yellow', 'violet'],
				correct: 3
			},
			{
				prompt: ['The', 'irrational', 'fear of', 'color', 'is known', 'as what?'],
				answers: ['Chromophobia', 'Sprectrophobia', 'Colorsickness', 'Pigmentfear'],
				colors: ['orange', 'yellow'],				
				correct: 0
			}
		];


		$('.answers').on('click', function(event){

			//tie our click event to a value we assigned each answer

			clickValue = parseInt(event.target.attributes.value.value);

			console.log(clickValue);

		});


		var start = function() {

			//run this function first, provides a landing page 

			displayMessage('Color Trivia!', 'click to start');

			console.log(titleSpan, subSpan);

			msg.on('click', function() {

				msg.css('display', 'none');

				msg.off('click');

				msg.remove();

				$('.numbers').css('visibility', 'visible');

				//if user clicks to play, make the answer number visable and the mask used to create the question text.

				$('#svgText').find('#alpha').css('fill', 'rgb(255, 255, 255)');

				nextQuestion();

			});

		}


		var timer = function() {

			var counter = 10;
			
			var stop = function() {

				clearInterval(intervalId);
			}


			var countdown = function() {

				counter--

				$('#countdownTimer').html(counter);

				// our countdown if conditions

				if (counter === 0) {

					clickValue = null;

					stop(); 

					outOfTime();

				};

				if (clickValue === questions[currentQ].correct && counter > 0) {

					clickValue = null;

					stop(); 

					correctAnswer();		
				
				}; 
					
				if (clickValue !== questions[currentQ].correct && clickValue !== null && counter > 0){
					
					clickValue = null;

					stop(); 

					wrongAnswer();

				};

			};

			//start our interval, give em just a lil' longer than 1 sec.

			intervalId = setInterval(countdown, 1200);

		}


		var nextQuestion = function() {

			//if our current question index tracker reaches the end of array, end game

			if(currentQ === questions.length) {

				endOfGame();

			} else {

				displayQuestion(questions[currentQ]);

				timer();

				}

		}


		var displayQuestion = function(question) {

			// svg text doesnt automatically wrap in it's container. so we do it one line at a time.

			for(var i = 0; i < 6; i++) {

				var qLine = $('#svgText').find('#q-line-' + i);

				// because we are using an SVG we .text to get access to the innertext. .html wont work

				qLine.text(question.prompt[i]);
			
				// but the answers are in a html div, so .html here, also populate them in the same for loop, why not?

				if(i < 4) {

					var aLine = $('#answer-'+i);

					aLine.html(question.answers[i]);

				}
				
			}

			//rebuild the background div on each new question so we can swap out colors

			html.css({
				'background': 'linear-gradient(180deg, ' + question.colors[0] + ',' + question.colors[1],
				'background-size': '600%, 600%',
				'height': '100%',
				'animation': 'fade 15s linear alternate infinite'
			});

		}


		var outOfTime = function() {

			timeOut++;
			wrong++;

			displayMessage("You're outta time sucka!", 'hurry up.');

			html.removeClass('run-animation');

			setTimeout(function() {

				msg.remove();

				currentQ++;

				nextQuestion();

			}, 2000);
		
		}

		//a helper function for displaying messages to users

		var displayMessage = function(title, subtitle) {

			titleSpan.html(title);
			subSpan.html(subtitle);
			msg.css('display', 'initial');
			$('#containerMain').append(msg);

		}


		var wrongAnswer = function() {

			wrong++;
			
			displayMessage('NOPE!', questions[currentQ].answers[questions[currentQ].correct] + ' was the answer.');

			html.removeClass('run-animation');

			setTimeout(function() {

				title = null;
				subtitle = null;

				msg.remove();

				currentQ++;

				nextQuestion();

			}, 2000);

		}


		var correctAnswer = function() {

			right++;

			displayMessage('NICE!', questions[currentQ].answers[questions[currentQ].correct] + ' is correct!');

			html.removeClass('run-animation');
			
			setTimeout(function() {

				title = null;
				subtitle = null;

				msg.remove();

				currentQ++;

				nextQuestion();

			}, 2000);

		}


		var endOfGame = function() {

			displayMessage('Fin!', 'you got ' + right + ' right & ' + wrong + ' wrong');

			$('#subsubtitle').html('click to play again!');


			msg.on('click', function() {

				currentQ = 0;
				right = 0;
				wrong = 0;
				timeOut = 0;

				$('#subsubtitle').html('');

				msg.css('display', 'none');

				msg.off('click');

				msg.remove();

				start();

			});

		}


		start();


	});

})
