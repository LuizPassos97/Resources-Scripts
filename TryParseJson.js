function TryParseJson(value) {
    let parser = value;

    try {
        parser = JSON.parse(value);
    }
    catch (e) {
        parser = null;
    }
    finally {
        return parser;
    }
}