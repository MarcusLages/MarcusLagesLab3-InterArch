const { utils } = require("./utils.js");
const messages = require("../lang/en/en.js")

exports.GetDate = class GetDate {
    static URL_PARAM = "name";

    static send_res(name, res) {
        const date = utils.getDate();
        res.writeHead(utils.RES_SUCCESSFUL, {"Content-Type": "text/html"});
        res.end(messages.MESSAGES[messages.GREETING_MSG_KEY]
            .replace("%1", name)
            .replace("%2", date)
        );
    }
}