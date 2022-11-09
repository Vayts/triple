import {getInputValue, setTextContent} from "../../../utils/js/utils";

export function setUnique(state, e) {
	if (e.target.checked) {
		state.unique = true;
		return state;
	}
	state.unique = false;
	return state;
}

export function randomize(state) {
	const min = Math.floor(Number(getInputValue('minValue')));
	const max = Math.floor(Number(getInputValue('maxValue')));
	const count = Number(getInputValue('countValue'));
	
	if (!validateInputs(min, max, count)) {
		setTextContent('randomResult', 'Некоретні дані');
		return false;
	}
	
	if (state.unique) {
		uniqueRandom(state, min, max, count);
	}
	if (!state.unique) {
		baseRandom(state, min, max, count)
	}
	drawNumbers(state);
	return true;
}

function uniqueRandom(state, min, max, counter) {
	const arr = [];
	for (let i = min; i <= max; i++) {
		arr.push(i);
	}
	for (let i = 0; i < counter; i++) {
		const number = getRandomNumber(0, arr.length - 1);
		state.result.push(arr[number]);
		arr.splice(number, 1);
	}
	
}

function baseRandom(state, min, max, counter) {
	for (let i = 0; i < counter; i++) {
		state.result.push(getRandomNumber(min, max))
	}
}

function drawNumbers(state) {
	setTextContent('randomResult', state.result.join('  '));
	state.result = [];
	return state;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function validateInputs(min, max, counter) {
	if (min > max) {
		return false;
	}
	if (min < -100000) {
		return false;
	}
	if (max > 100000) {
		return false;
	}
	if (counter > 20) {
		return false;
	}
	if (counter < 1) {
		return false;
	}
	return true;
}
