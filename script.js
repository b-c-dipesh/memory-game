const h1 = document.querySelector('h1');
const gameContainer = document.getElementById('game');
const startGameBtn = document.querySelector('.start-game-btn');
const restartGameBtn = document.querySelector('.restart-game-btn');
const scoreCounter = document.querySelector('.score-counter');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
];

const FUNNY_REACTIONS = [
	'Wumbo',
	'Blubber',
	'Flibbertigibbet',
	'Skedaddle',
	'Rigmarole',
	'Rigmarole',
	'Fiddle-faddle',
	'Skullduggery',
	'Hocus-pocus',
	'Hooligan',
	'Hanky-panky',
	'Hoodwink',
	'Hocuspocus',
	'Flibberty-gibbet',
	'Skulduggery',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	let counter = 0;
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// give a simple numeric id so we can distinguish it
		newDiv.dataset.id = counter;

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);

		++counter;
	}
}

function getFunnyReaction() {
	const reaction = Math.floor(Math.random() * FUNNY_REACTIONS.length);

	return FUNNY_REACTIONS[reaction];
}

let prevCard = '';
let counter = 0;
let score = 0;
let matchedCards = [];

function handleCardClick(event) {
	// proceed only if user has not clicked on the card that is already matched.
	if (!matchedCards.includes(event.target.dataset.id)) {
		// make sure the user can click only at 2 cards at a time.
		if (counter < 2) {
			// change the background color.
			event.target.style.backgroundColor = event.target.className;

			// increment the counter to track the number of cards clicked.
			++counter;

			console.log(counter);

			// if it's the first card save it.
			if (counter === 1) {
				prevCard = event.target;
			}
			// if it's the second card check if the cards match.
			else if (counter === 2) {
				const currentCard = event.target;

				if (prevCard.className === currentCard.className) {
					// proceed only if user has not clicked on the same card twice.
					if (prevCard.dataset.id !== currentCard.dataset.id) {
						counter = 0;
						matchedCards.push(prevCard.dataset.id);
						matchedCards.push(currentCard.dataset.id);
						scoreCounter.innerText = ++score;
						console.log('matched');
						console.log(matchedCards);

						// check if game has ended notify and display a button to restart the game.
						if (score === 5) {
							restartGameBtn.style.display = 'block';
							startGameBtn.style.display = 'none';
							h1.innerText = 'YOU WON!!';
							startGameBtn.disabled = false;
						}
					} else {
						counter = 1;
					}
				}
				// if the second card doesn't match the first reset the cards after 1s and reset the counter.
				else {
					setTimeout(() => {
						h1.innerText = getFunnyReaction();
						prevCard.style.backgroundColor = '';
						currentCard.style.backgroundColor = '';
						counter = 0;
					}, 1000);
				}
			}
		}
	}
}

// when the DOM loads
// createDivsForColors(shuffledColors);

// start the game.
startGameBtn.addEventListener('click', () => {
	createDivsForColors(shuffledColors);

	// disable button until game is finished
	startGameBtn.disabled = true;
});

// restart the game.
restartGameBtn.addEventListener('click', () => {
	// clear the gamecontainer div.
	gameContainer.innerHTML = '';

	// reshuffle colors.
	shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
	prevCard = '';
	counter = 0;
	score = 0;
	matchedCards = [];
	restartGameBtn.style.display = 'none';
	startGameBtn.style.display = 'block';
	h1.innerText = 'Memory Game';
	scoreCounter.innerText = 0;
	startGameBtn.disabled = true;
});
/* */
