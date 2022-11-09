import '../../utils/styles/random.scss'
import {addListener} from "../../utils/js/utils";
import {randomize, setUnique} from "./logic/logic";

function initRandom() {
	const state = {
		result: [],
		unique: true,
	}
	
	addListener('randomize', 'click', randomize.bind(null, state));
	addListener('uniqueValue', 'change', setUnique.bind(null, state));
}

initRandom();


