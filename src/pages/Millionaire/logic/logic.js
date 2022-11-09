import {
	getNodeList,
	randomNumber,
	randomNumberWithException,
	removeDisabled,
	setActive,
	setDisabled,
	setDisplay,
	setTextContent
} from "../../../utils/js/utils";
import {PRIZE} from "../../../constants/prize";

export function startGame(state) {
	state.init = true;
	setDisplay('startGame', 'none');
	setDisplay('gameWindow', 'block');
	setDisplay('gameProgress', 'block');
	setQuestion(state);
	return state;
}

function setQuestion(state) {
	const answerButtons = getNodeList('.game__answer-button');
	const answers = state.questions[state.questionNumber].answers.slice(0);
	state.answers = state.questions[state.questionNumber].answers.slice(0);
	setTextContent('hostText', state.questions[state.questionNumber].question);
	answerButtons.forEach((item) => {
		const random = randomNumber(0, answers.length - 1);
		item.value = answers[random];
		item.textContent = answers[random];
		answers.splice(random, 1);
	})
	return state;
}

export function answerClick(state, e) {
	if (state.init) {
		checkAnswer(state, e.target);
		removeDisabledAttributeAnswers(state);
		return true;
	}
	return false;
}

export function checkAnswer(state, target) {
	if (state.questions[state.questionNumber].correct === target.value) {
		correctAnswer(state, target);
		state.prize = PRIZE[state.questionNumber];
		answerDelay(state, target);
		return true;
	}
	wrongAnswer(state, target);
	looseGameDelay(state, target);
}

function answerDelay(state, target) {
	setTimeout(() => {
		resetColor(state, target);
		state.questionNumber++
		if (!winGameCheck(state)) {
			setQuestion(state);
		} else {
			winGame(state);
		}
	}, 700);
	return state;
}

function looseGameDelay(state, target) {
	setTimeout(() => {
		resetColor(state, target);
		looseGame(state);
	}, 700);
	return state;
}

function winGameCheck(state) {
	if (state.questionNumber === 4) {
		state.savePrize = 1000;
	}
	if (state.questionNumber === 9) {
		state.savePrize = 32000;
	}
	if (state.questionNumber === 14) {
		state.savePrize = 1000000;
	}
	return state.questionNumber === 15;
}

function winGame(state) {
	setDisplay('gameHelp', 'none');
	setDisplay('gameAnswers', 'none');
	setDisplay('gameRestart', 'flex');
	setTextContent('hostText', `Ви перемогли=) Хочете спробувати ще? Ваш виграш склав - ${state.savePrize}$.`);
	return true;
}

export function gameReset(state) {
	setDisplay('gameHelp', 'flex');
	setDisplay('gameAnswers', 'flex');
	setDisplay('gameRestart', 'none');
	removeDisabled('friendCall');
	removeDisabled('fiftyPercent');
	resetState(state);
	setQuestion(state);
	resetPrizeBar();
	return state;
}

function resetState(state) {
	state.questionNumber = 0;
	state.prize = 0;
	state.savePrize = 0;
	state.friendCall = true;
	state.fifty = true;
	state.answers = [];
	return state;
}

function resetPrizeBar() {
	const progressbarLever = getNodeList('.game__progressbar-item');
	progressbarLever.forEach((item) => {
		item.classList.remove('active');
	})
}

function looseGame(state) {
	setDisplay('gameHelp', 'none');
	setDisplay('gameAnswers', 'none');
	setDisplay('gameRestart', 'flex');
	setTextContent('hostText', `О ні! Ви програли=( Хочете спробувати ще? Ваш виграш склав - ${state.savePrize}$.`);
	return false;
}

function correctAnswer(state, target) {
	const progressbarLevel = getNodeList('.game__progressbar-item');
	progressbarLevel[state.questionNumber].classList.add('active');
	state.init = false;
	target.style.backgroundColor = '#7abe54';
	target.style.borderColor = '#7abe54';
	target.style.color = '#fff'
	return state;
}

function wrongAnswer(state, target) {
	state.init = false;
	target.style.backgroundColor = '#bd4545';
	target.style.borderColor = '#bd4545';
	target.style.color = '#fff'
	return state;
}

function resetColor(state, target) {
	state.init = true;
	target.style.backgroundColor = '';
	target.style.borderColor = '';
	target.style.color = ''
	return state;
}

export function friendCall(state) {
	if (state.friendCall) {
		state.friendCall = false;
		setDisabled('friendCall');
		setActive('friend');
		setTextContent('friendText', `Я гадаю, що правильна відповідь - ${state.answers[randomNumber(0, state.answers.length - 1)]}`);
		return true;
	}
	return false;
}

export function fiftyPercent(state) {
	if (state.fifty) {
		state.fifty = false;
		setDisabled('fiftyPercent');
		const randomAnswers = [state.questions[state.questionNumber].correct];
		const exceptionNumber = state.answers.indexOf(state.questions[state.questionNumber].correct);
		randomAnswers.push(state.answers[randomNumberWithException(0, state.answers.length - 1, exceptionNumber)]);
		removeWrongValueFromAnswers(state, randomAnswers);
		disableAnswers(state);
		return state;
	}
	return false;
}

function removeWrongValueFromAnswers(state, arr) {
	const result = [];
	state.answers.forEach((item) => {
		if (arr.includes(item)) {
			result.push(item);
		}
	})
	state.answers = result;
	return state;
}

function disableAnswers(state) {
	const nodeList = getNodeList('.game__answer-button');
	nodeList.forEach((item) => {
		if (!state.answers.includes(item.value)) {
			item.setAttribute('disabled', 'disabled');
		}
	})
	return true;
}

function removeDisabledAttributeAnswers(state) {
	if (!state.fifty) {
		const nodeList = getNodeList('.game__answer-button');
		nodeList.forEach((item) => {
			item.removeAttribute('disabled');
		})
		return true;
	}
	return false;
}
