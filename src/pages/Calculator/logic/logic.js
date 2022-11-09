import {getElement} from "../../../utils/js/utils";

export function getButtonClick(state, e) {
	if (e.target.dataset.value) {
		if (state.clear) {
			setValueToWindow(state, '');
			state.clear = false;
		}
		checkValue(state, e.target.dataset.value)
	}
}

function checkValue(state, value) {
	switch (value) {
		case 'C':
			setValueToWindow(state, '');
			break;
		case 'x':
			setValueToWindow(state, state.window.slice(0, state.window.length - 1));
			break;
		case '=':
			calculate(state);
			break;
		case '%':
			calculatePercent(state);
			break;
		default:
			addValueToWindow(state, value)
			break;
	}
}

function calculatePercent(state) {
	getSlicedValue(state);
	if (state.previous.length === 0) {
		setValueToWindow(state, '');
		addValueToWindow(state.slicedString / 100);
	} else {
		const subResult = eval(state.slicedExpression);
		const result = subResult * (state.previous / 100).toFixed(2)
		setValueToWindow(state, state.slicedString + '' + result);
	}
	return state;
}

function getSlicedValue(state) {
	const arr = state.window.split('');
	
	let index = arr.length;
	for (let i = arr.length - 1; i >= 0; i--) {
		if (['+', '-', '/', '*'].includes(arr[i])) {
			index = i + 1;
			break;
		}
	}
	state.slicedString = state.window.slice(0, index);
	state.slicedExpression = state.window.slice(0, index - 1);
	state.previous = state.window.slice(index, state.window.length);
	
	return state.window.slice(0, index);
}



function addValueToWindow(state, value) {
	const window = getElement('result');
	state.window += value;
	window.value += value;
}

function calculate(state) {
	try {
		setValueToWindow(state, eval(state.window).toFixed(1));
	} catch {
		setWindowError(state)
	}
}

function setWindowError(state) {
	const window = getElement('result');
	window.value = 'Invalid'
	state.clear = true;
}

function setValueToWindow(state, value) {
	const window = getElement('result');
	state.window = value;
	window.value = value;
}
