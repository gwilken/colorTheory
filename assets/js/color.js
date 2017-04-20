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


		$('.answers').on('click', function(event){

			clickValue = parseInt(event.target.attributes.value.value);

			console.log(clickValue);

		});


		var start = function() {

			var msg = $('<div>').addClass('message');
			var title = $('<span>').addClass('title').html('Click!');
			var sub = $('<span>').addClass('subtitle').html(' is correct!');
			
			msg.append(title);
			msg.append(sub);


			$('#containerMain').append(msg);

			msg.css('display', 'initial');

			msg.on('click', function() {

				msg.css('display', 'none');

				nextQuestion();

			});

		}


		var timer = function() {

			var counter = 10;
			
			html.addClass('run-animation');


			var stop = function() {

				clearInterval(intervalId);

			}


			var countdown = function() {

				counter--

				$('#countdownTimer').html(counter);


				console.log('val', clickValue);


				if (counter === 0) {

					clickValue = null;

					clearInterval(intervalId); 

					html.removeClass('run-animation');

					outOfTime();

				};

				if (clickValue === questions[currentQ].correct && counter > 0) {

					clickValue = null;

					window.clearInterval(intervalId); 

					html.addClass('pause-animation');		

					//$('.answers').off('click');

					correctAnswer();		
				
				}; 
					
				if (clickValue !== questions[currentQ].correct && clickValue !== null && counter > 0){
					
					clickValue = null;

					window.clearInterval(intervalId); 

					html.addClass('pause-animation');

					wrongAnswer();

				};

			};


			intervalId = setInterval(countdown, 1300);

		}


		var nextQuestion = function() {

			//console.log(currentQ, right, wrong);

			displayQuestion(questions[currentQ]);

			timer();

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

			timeOut++;

			console.log('damn, out o time');

			html.removeClass('run-animation');

			nextQuestion();
		
		}


		var wrongAnswer = function() {

			wrong++;
			
			var msg = $('<div>').addClass('message');
			var title = $('<span>').addClass('title').html('NOPE!');
			var sub = $('<span>').addClass('subtitle').html(questions[currentQ].answers[questions[currentQ].correct] + ' was the answer.');
			
			msg.append(title);
			msg.append(sub);

			$('#containerMain').append(msg);

			msg.css('display', 'initial');

			html.removeClass('run-animation');

			setTimeout(function() {

				msg.remove();

				currentQ++;

				nextQuestion();

			}, 2000);

		}

		var correctAnswer = function() {

			right++;

			var msg = $('<div>').addClass('message');
			var title = $('<span>').addClass('title').html('NICE!');
			var sub = $('<span>').addClass('subtitle').html(questions[currentQ].answers[questions[currentQ].correct] + ' is correct!');
			
			msg.append(title);
			msg.append(sub);

			$('#containerMain').append(msg);

			msg.css('display', 'initial');

			html.removeClass('run-animation');
			
			setTimeout(function() {

				msg.remove();

				currentQ++;

				nextQuestion();

			}, 2000);

		}

		start();

	});

})
