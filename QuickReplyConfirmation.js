function run(input) {
    const regex = GetRegexConfirmation();
    return ProcessInput(input, JSON.stringify(regex));
}