function ProcessInput(userInput, menuRegex) {

    // user inactivity
    if (!userInput) {
        return "sem interacao";
    }

    // it processed input by a gived pattern and return value from that pattern
    let optionsRegex = JSON.parse(menuRegex); // menu regex gets same pattern from option menu, by qtd opts

    let mediaVerificator = {
        "(type).*": "input inesperado",
        ...optionsRegex
    }

    let processedInput = null;

    for (let key in mediaVerificator) {
        if (mediaVerificator.hasOwnProperty(key)) {
            const matching = new RegExp(key, "i");

            if (matching.test(userInput)) {
                processedInput = mediaVerificator[key];
                break;
            }
        }
    }

    if (processedInput == null) {
        return 'input inesperado';
    }
    return processedInput;
}