$(document).ready(function() {

	$(window).on('load', function () {	


		var right = 0;
		var wrong = 0;
		var clock = 0;
		var currentQ = 0;

		var questions = [

		{
			prompt: ['What is the', 'wavelength', 'of', 'infrared', 'light?']
		}








		];








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


		//var questions = $('#svgText').find('#group');
		

	

	});

})
