$(document).ready(function() {

	$(window).on('load', function () {	


		var right = 0;
		var wrong = 0;
		var clock = 0;
		var currentQ = 0;

		var questions = [

		{
			prompt: ['What', 'is the', 'wavelength', 'of', 'visible', 'light?'],
			answers: ['My wavelength man.', '200 nm', '270 - 500nm', '400 - 700nm' ],
			correct: 3
		},
		{
			prompt: ['A single light', 'bulb has been', 'burning', 'continously','for how many', 'years?'],
			answers: ['27 years', '52 years', '116 years', '99 years'],
			correct: 2
		},
		{
			prompt: ['Sunlight', 'causes', 'sneezing in', 'what', 'precent', 'of people?'],
			answers: ['100%', '6-11%', '18-35%','45-50%'],
			correct: 2
		},
				{
			prompt: ['Litmus paper', 'turns this', 'color', 'when dipped', 'in', 'acid.'],
			answers: ['pink', 'blue', 'black', 'psychedelic!'],
			correct: 0
		},
		{
			prompt: ['The', '"black box"', 'of an aircraft', 'flight recorder', 'is', 'what color?'],
			answers: ['Flourescent green', 'Orange', 'Fire Engine Red', 'Black. Nice try.'],
			correct: 1
		},
		{
			prompt: ['In 1900', 'the cause of', 'this "fever" was', 'discovered', 'to be', 'mosquitos'],
			answers: ['Yellow Fever', 'White Fever', 'Dengue Fever', 'Hangover Fever'],
			correct: 0
		},
		{
			prompt: ['When born', "a zebra's", 'black and white', 'stripes are', 'actually this', 'color'],
			answers: ['Black & white, duh.', 'Brown', 'Invisible', 'Pink'],
			correct: 1
		},
		{
			prompt: ['Elvis', "Presley's", 'first', 'Cadillac', 'was', 'this color.'],
			answers: ['Lime Green', 'Mystery Mauve', 'Blue Suede', 'Murder Red'],
			correct: 2
		},
		{
			prompt: ["In it's", 'pure state', 'topaz', 'is', 'what', 'color?'],
			answers: ['Light blue', 'Light green', 'Light green', "Ain't got no color"],
			correct: 3
		},
		{
			prompt: ['The first', 'color a', 'baby can', 'perceive', 'is', 'what?'],
			answers: ['Blue', 'Aqua-Marine', 'Red', "Baby's cant see!"],
			correct: 2
		},
		{
			prompt: ['According to', 'safety studies', 'the safest', 'color for', 'an automobile', 'is?'],
			answers: ['White', 'Red', 'Poop-Brown', 'Blue'],
			correct: 1
		},	
		{
			prompt: ['The', 'irrational', 'fear of', 'color', 'is known', 'as what?'],
			answers: ['Chromophobia', 'Sprectrophobia', 'Colorsickness', 'Scaredycat-blues'],
			correct: 0
		}];


		//colorwheel 





		var win = function() {
			console.log('win');
		}


		$('.answers').on('click', function(event){
		
			var value = parseInt(event.target.attributes.value.value);

			displayQuestion(questions[0]);

			console.log(value);
		
			if(value === 0) {

				console.log('goto timer');

				timer(9, lose);

			}

		})



		var timer = function(time, funct) {

			var counter = time;
			

			var countdown = function() {

				counter--

				console.log(counter);

				$('#countdownTimer').html(counter);

				if (counter === 0) {

					clearInterval(intervalId); 

					funct();

				}

			};

			var intervalId = setInterval(countdown, 1000);

			console.log(counter);

		}


		var nextQuestion = function() {

		}


		displayQuestion = function(question) {

			// special handling is required to display the questions because svg
			// text doesnt automatically wrap in it's container. so we do it one line
			// at a time.

			for(var i = 0; i < 5; i++) {

				var line = $('#svgText').find('#q-line-' + i);

				// because we are using an SVG doc to display the questions as a mask,
				// we must use .text to get access to the innertext. it is not html, so
				// .html wont work.

				line.text(question.prompt[i]);

				console.log(question.prompt[i]);
			}

		}



		var lose = function() {

			wrong++;

			console.log('lose!');


		}

		var win = function() {

			right++;

			console.log('a win!');

		}


	});

})
