const BLIP_APP_NAME = "blipchat";
const WHATSAPP_APP_NAME = "whatsapp";

function GetTypeContentByChannel() {
    switch (this.channel) {
        case BLIP_APP_NAME:
            return {
                channel: "BlipChat",
                quickReply: "application/vnd.lime.select+json",
                list: "application/vnd.lime.select+json",
                image: "application/vnd.lime.media-link+json"
            };
        case WHATSAPP_APP_NAME:
            return {
                channel: "WhatsApp",
                quickReply: "application/json",
                list: "application/json",
                image: "application/vnd.lime.media-link+json"
            };
        default:
            return {
                channel: "default",
                quickReply: "application/vnd.lime.select+json",
                list: "application/vnd.lime.select+json",
                image: "text/plain"
            };
    }
}