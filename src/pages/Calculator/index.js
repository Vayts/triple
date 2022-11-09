import '../../utils/styles/calculator.scss'
import {addListener} from "../../utils/js/utils";
import {getButtonClick} from "./logic/logic";

function initCalculator() {
	const state = {
		window: '',
		result: '',
		slicedString: '',
		slicedExpression: '',
		previous: '',
		clear: false,
	}
	
	addListener('buttons', 'click', getButtonClick.bind(null, state))
}

initCalculator();




