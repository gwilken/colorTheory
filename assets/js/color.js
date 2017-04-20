$(document).ready(function() {

	$(window).on('load', function () {	


		var right = 0;
		var wrong = 0;
		var startTime = 0;
		var currentQ = 6;

		var html = $('html');
		var message = $('#message');
		var subtitle = $('#subtitle');

		var questions = [
			{
				prompt: ['In 1900', 'the cause of', 'this "fever" was', 'discovered', 'to be', 'mosquitos'],
				answers: ['Yellow Fever', 'White Fever', 'Dengue Fever', 'Hangover Fever'],
				colors: ['blueviolet', 'gold'],				
				correct: 0
			},
			{
				prompt: ['When born', "a zebra's", 'black and white', 'stripes are', 'actually this', 'color'],
				answers: ['Black & white, duh.', 'Brown', 'Invisible', 'Pink'],
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
				answers: ['Blue', 'Aqua-Marine', 'Red', "Baby's cant see!"],
				colors: ['violet', 'mediumvioletred'],				
				correct: 2
			},
			{
				prompt: ['According to', 'safety studies', 'the safest', 'color for', 'an automobile', 'is?'],
				answers: ['White', 'Red', 'Poop-Brown', 'Blue'],
				colors: ['red', 'gold'],				
				correct: 1
			},	
			{
				prompt: ['What', 'is the', 'wavelength', 'of', 'visible', 'light?'],
				answers: ['My wavelength man.', '200 nm', '270 - 500nm', '400 - 700nm' ],
				colors: ['yellow', 'violet'],
				correct: 3
			},
			{
				prompt: ['The', 'irrational', 'fear of', 'color', 'is known', 'as what?'],
				answers: ['Chromophobia', 'Sprectrophobia', 'Colorsickness', 'Scaredycat-blues'],
				colors: ['orange', 'yellow'],				
				correct: 0
			}
		];



		var timer = function(time) {

			var counter = time;
			
			html.addClass('run-animation');


			$('.answers').on('click', function(event){
		
				var value = parseInt(event.target.attributes.value.value);

				if (value === questions[currentQ].correct && counter > 0) {

					stop();	

					html.addClass('pause-animation');		

					correctAnswer();		
				
				} else {

					stop();

					html.addClass('pause-animation');

					wrongAnswer();

				}

			})


			var stop = function() {

				clearInterval(intervalId);

			}


			var countdown = function() {

				counter--

				$('#countdownTimer').html(counter);

				if (counter === 0) {

					clearInterval(intervalId); 

					html.removeClass('run-animation');

					outOfTime();

				}

			};


			var intervalId = setInterval(countdown, 1000);


		}


		var nextQuestion = function() {

			displayQuestion(questions[currentQ]);

			timer(9);

		}


		displayQuestion = function(question) {

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

			html.css({'background': 'linear-gradient(180deg, ' + question.colors[0] + ',' + question.colors[1], 'background-size': '600%, 600%', 'height': '100%'} );

		}


		var outOfTime = function() {

			console.log('damn, out o time');
		
		}


		var wrongAnswer = function() {

			wrong++;

			console.log('sorry, correct answer was ', questions[currentQ].answers[questions[currentQ].correct]);

		}

		var correctAnswer = function() {

			right++;


			var title = $('<span>').addClass('title').html('NICE!');
			var sub = $('<span>').addClass('subtitle').html(questions[currentQ].answers[questions[currentQ].correct] + ' is correct!');
			
			message.css('display', 'initial');

			message.append(title);
			message.append(sub);

		}

		//displayQuestion(questions[0]);

		nextQuestion();

	});

})
