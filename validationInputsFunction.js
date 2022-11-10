function validateInputOptions(input, optionsRegex, inputType) {
    const invalid = "Input inesperado";
    if (isInvalidType(inputType)) {
        return invalid;
    }
    try {
        input = removeUnnecessaryInput(input);
        if (!isInsideNumberOptionsInput(optionsRegex, input)) {
            return invalid;
        }
        for (let key in optionsRegex) {
            const matching = new RegExp(key, "i");
            if (matching.test(input)) {
                return optionsRegex[key];
            }
        }
    }
    catch (e) {
        return invalid;
    }
    return invalid;
}
function isInvalidType(inputType) {
    const typeValid = "text/plain";
    return inputType != typeValid;
}
function removeUnnecessaryInput(input) {
    const EMPTY_STR = "";
    const UNNECESSARY_INPUT = RegExp("(^0+|\\.0+|^\\s+|\\s+$)", "gi");
    input = input.replace(UNNECESSARY_INPUT, EMPTY_STR);
    return removeExcessWhiteSpace(input);
}
function removeExcessWhiteSpace(input) {
    const SPACE_STR = " ";
    const WHITE_SPACES = RegExp("(\\s+)", "gi");
    return input.replace(WHITE_SPACES, SPACE_STR);
}
function isInsideNumberOptionsInput(optionsRegex, input) {
    let hasDigits = /\d+/g;
    let numbersFound = "";
    if (!hasDigits.test(input)) {
        return true;
    }
    var numbers = input.match(hasDigits);
    for (var i = 0; i < numbers.length; i++) {
        numbersFound += numbers[i];
    }
    if (numbersFound.length != 1) {
        return false;
    }
    return true;
}
function firstMatchSmallTalks(responseSt) {
    const invalid = "Not recognized";
    try {
        responseSt = JSON.parse(responseSt);
        if (responseSt.analysis.matches) {
            return responseSt.analysis.matches[0].smallTalk;
        }
    }
    catch (e) {
        return invalid;
    }
}
function run(input, inputType) {
    var optionsRegex =
    {
        "(^1|um|fazer|agendamento)": "agendamento",
        "(^2|dois|acompanhamento)": "acompanhamento",
    };
    return validateInputOptions(input, optionsRegex, inputType);
}