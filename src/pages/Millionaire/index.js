import '../../utils/styles/millionaire.scss'
import {addListener, addListListeners, removeActive} from "../../utils/js/utils";
import {answerClick, fiftyPercent, friendCall, gameReset, startGame} from "./logic/logic";
import {QUESTIONS} from "../../constants/questions";

function initMillionaire() {
	const state = {
		init: false,
		questions: QUESTIONS.slice(0),
		prize: 0,
		answers: [],
		friendCall: true,
		fifty: true,
		savePrize: 0,
		questionNumber: 0,
	}
	
	addListener('startGame', 'click', startGame.bind(null, state));
	addListener('resetGame', 'click', gameReset.bind(null, state));
	addListener('friendCall', 'click', friendCall.bind(null, state));
	addListener('fiftyPercent', 'click', fiftyPercent.bind(null, state));
	addListener('friendOkButton', 'click', 	removeActive.bind(null, 'friend'));
	addListListeners('.game__answer-button', 'click', answerClick.bind(null, state));
}

initMillionaire();


