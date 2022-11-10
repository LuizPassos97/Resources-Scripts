function getQuickReply(Menu) {
    const menuOptions = [];
    if (Menu.values) {
        for (let i = 0; i < Menu.options.length; i++) {
            menuOptions.push({
                text: Menu.options[i],
                type: "text/plain",
                value: Menu.values[i],
            });
        }
    } else {
        for (let i = 0; i < Menu.options.length; i++) {
            menuOptions.push({
                text: Menu.options[i],
                type: "text/plain",
                value: Menu.options[i],
            });
        }
    }
    return {
        scope: "immediate",
        text: Menu.text,
        options: menuOptions,
    };
}
function defineMenuByplatform(platform, boldTags, mainMenu) {
    try {
        mainMenu.text = replaceBoldTags(mainMenu.text, boldTags);
        if (platform === "blipchat") {
            return getQuickReply(mainMenu);
        }
        return getTextMenu(mainMenu);
    } catch (e) {
        return getTextMenu(mainMenu);
    }
}
function defineMenuWithButtonByplatform(platform, boldTags, mainMenu) {
    try {
        mainMenu.text = replaceBoldTags(mainMenu.text, boldTags);
        if (platform === "blipchat") {
            return getQuickReply(mainMenu);
        }
        return getWhatsButtonMenu(mainMenu);
    } catch (e) {
        return getTextMenu(mainMenu);
    }
}
function replaceBoldTags(text, boldTags) {
    try {
        if (!boldTags) {
            boldTags = {
                open: "",
                close: "",
            };
        } else {
            boldTags = JSON.parse(boldTags);
        }
        return text
            .replace(/\{0\}/gi, boldTags.open)
            .replace(/\{1\}/gi, boldTags.close);
    } catch (e) {
        return text.replace(/\{0\}/gi, "").replace(/\{1\}/gi, "");
    }
}
function isValidExceptionReturn(exceptionReturn) {
    const rules = JSON.parse(exceptionReturn);
    return rules.showMsg;
}
function getEmptyMsg() {
    const emptyMsg = [""];
    return getText(emptyMsg);
}
function getTextMenu(Menu) {
    var options = Menu.options;
    let menu = Menu.text + "\n";
    if (Menu.enableOptions != false) {
        let totalItens = parseInt(options.length);

        for (let i = 0; i < totalItens; i++) {
            let option = i + 1;

            if (Menu.isSurvey) {
                option = totalItens - i;
            }

            menu += "\n*" + option + "*. " + options[i];
        }
    }

    let result = {
        text: menu,
    };

    return result;
}
function getText(texts, boldTags) {
    let textsWithBoldTags = [];
    for (var i = 0; i < texts.length; i++) {
        textsWithBoldTags.push(replaceBoldTags(texts[i], boldTags));
    }
    return {
        itemType: "text/plain",
        items: textsWithBoldTags,
    };
}
function getWhatsButtonMenu(Menu) {
    var options = Menu.options;
    let menu = Menu.text + "\n";
    if (Menu.enableOptions != false) {
        let totalItens = parseInt(options.length);

        for (let i = 0; i < totalItens; i++) {
            let option = i + 1;

            if (Menu.isSurvey) {
                option = totalItens - i;
            }

            menu += "\n*" + option + "*. " + options[i];
        }

        return {
            "text": menu
        };
    }

    let buttons = [];
    for (let i = 0; i < options.length; i++) {
        buttons.push({
            type: "reply",
            reply: {
                id: options[i],
                title: options[i],
            }
        });
    }

    let result = {
        recipient_type: "individual",
        type: "interactive",
        interactive: {
            type: "button",
            body: {
                text: menu,
            },
            action: {
                buttons: buttons,
            },
        },
    };

    return result;
}