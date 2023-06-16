const startBtn = document.querySelector('.start');

//jak zapali sie zielony to dostaje klase active

//FUNKCJA ROZPOCZYNAJĄCA GRĘ

//Ustawienie punktow, czasu , zyc
const setHTMLElements = (life, points) => {
	document.querySelector('.life').textContent = life;
	document.querySelector('.point').textContent = points;
};

//Stworzenie divów w gridzie na planszy
const createFields = (fieldsCount, fields) => {
	for (let i = 0; i < fieldsCount; i++) {
		const div = document.createElement('div');
		div.classList.add('gridField');
		document.querySelector('.grid').appendChild(div);
		fields.push(div);
	}
};

const randomNumber = (number) => {
	number = Math.floor(Math.random() * 25);
	return number;
};

const ifLose = (life) => {
	if (life === 0) {
		setTimeout(() => {
			window.location.reload();
		}, 1000);
		console.log("koniec żyć")
	} 
};

const fieldClick = (e) => {
	clickedElement = e.target;
	console.log(clickedElement);
	if (e.target.classList.contains('active')) {
		points++;
		document.querySelector('.point').textContent = points;
	} else if (!e.target.classList.contains('active')) {
		life--;
		ifLose(life);
		document.querySelector('.life').textContent = life;
		console.log(life);
	}

	document.querySelectorAll('.grid div').forEach((div) => {
		div.classList.remove('active');
	});
};

const handleClickField = (points, life) => {
	this.points = points;
	this.life = life;
	document.querySelectorAll('.grid div').forEach((div) => {
		div.addEventListener('click', (e) => {
			fieldClick(e);
		});
	});
};

//zmienna aby zapobiec wlaczeniu licznika i nalozeniu na siebie setInterval
let startCountTime = false;
let isChoose = false;

const startGame = () => {
	let intervalTime = null;
	let intervalField = null;

	let life = 3;
	const youDie = 0;

	let time = 0;
	const maxTime = 60;

	let points = 0;

	const fieldsCount = 25;
	let randomField = '';
	let fields = [];
	let number = '';

	//START GAME TIME
	//jezeli startTime = false to włączy się jeżeli jest true już się nie uruchomi
	if (!startCountTime) {
		startCountTime = true;
		createFields(fieldsCount, fields);
		intervalTime = setInterval(startTime, 1000);
	}
	function startTime() {
		time++;
		if (time === maxTime) {
			clearInterval(intervalTime);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
			console.log('przegrywasz przez limit czasu');
		}
		document.querySelector('.time').textContent = time;
	}

	intervalField = setInterval(chooseField, 3000);

	handleClickField(points, life);

	function chooseField() {
		number = randomNumber();
		randomField = fields[number];
		randomField.classList.add('active');
		setTimeout(() => {
			if (randomField.classList.contains('active')) {
				life--;
				ifLose(life);
				document.querySelector('.life').textContent = life;
			}
			randomField.classList.remove('active');
		}, 2000);
	}
};

startBtn.addEventListener('click', startGame);
