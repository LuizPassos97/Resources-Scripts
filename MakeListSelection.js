const BLIP_CHAT_APP_NAME = "blipchat";
const WHATSAPP_APP_NAME = "whatsapp";
const WHATSAPP_ROLE_BODY_CONTENT_MAX_LENGTH = 1024;
const WHATSAPP_ROLE_FOOTER_TEXT_MAX_LENGTH = 60;
const WHATSAPP_ROLE_BUTTON_TEXT_MAX_LENGTH = 20;
const WHATSAPP_ROLE_SECTION_TITLE_MAX_LENGTH = 24;
const WHATSAPP_ROLE_ROW_TITLE_MAX_LENGTH = 24;
const WHATSAPP_ROLE_ROW_DESCRIPTION_MAX_LENGTH = 72;

// ref by whos call whit 'this' reference
function MakeListSelection(objMaker) {

    // blip chat
    if (this.channel == BLIP_CHAT_APP_NAME) {
        return {
            text: objMaker.body,
            options: objMaker.opts.map((item) => makeOptionsForListSelection(item)),
        };
    }

    //whatsapp
    if (this.channel == WHATSAPP_APP_NAME) {
        return {
            recipient_type: "individual",
            type: "interactive",
            interactive: {
                type: "list",
                body: {
                    text: normalizeTex(objMaker.body, WHATSAPP_ROLE_BODY_CONTENT_MAX_LENGTH),
                },
                footer: {
                    text: normalizeTex(objMaker.footer, WHATSAPP_ROLE_FOOTER_TEXT_MAX_LENGTH),
                },
                action: {
                    button: normalizeTex(objMaker.button, WHATSAPP_ROLE_BUTTON_TEXT_MAX_LENGTH),
                    sections: [
                        {
                            title: normalizeTex(objMaker.sectionTitle, WHATSAPP_ROLE_SECTION_TITLE_MAX_LENGTH),
                            rows: objMaker.opts.map((item) => makeOptionsForListSelection(item)),
                        },
                    ],
                },
            },
        };
    };

    // default content when channel is empty        
    let textContent = `${objMaker.body}

`;
    objMaker.opts.forEach((opt, index) => {
        textContent = textContent + `${index + 1}- ${opt.title}
`;
    });

    return {
        text: textContent
    };
}

function makeOptionsForListSelection(objMaker) {
    // blip chat
    if (this.channel == BLIP_CHAT_APP_NAME) {
        return {
            order: objMaker.id,
            text: objMaker.title
        }
    }

    // whatsapp
    return {
        id: objMaker.id.toString(),
        title: normalizeTex(objMaker.title, WHATSAPP_ROLE_ROW_TITLE_MAX_LENGTH),
        description: normalizeTex(objMaker.description, WHATSAPP_ROLE_ROW_DESCRIPTION_MAX_LENGTH),
    };
}

function normalizeTex(text, ROLE) {
    if (text.length > ROLE) {
        let shorted = text.substring(0, ROLE - 3);
        return shorted.padEnd(ROLE, ".");
    }
    return text;
}

function MakeOption(id, title, description) {
    this.id = id.toString();
    this.title = title;
    this.description = description ? description : "";
}

function MakeMenu(mainText, sectionTitle, footer, buttonName, arrOpts) {
    this.body = mainText;
    this.sectionTitle = sectionTitle;
    this.footer = footer;
    this.button = buttonName;
    this.opts = arrOpts;
}