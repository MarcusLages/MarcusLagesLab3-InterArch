const { utils } = require("./utils.js");
const messages = require("../lang/en/en.js");
const fs = require("fs");

exports.FileHandler = class FileHandler {
    static WRITE_URL_PARAM = "text";
    static DATA_FILEPATH = "./data/%1";
    static FILEPATH = "./data/file.txt";
    
    static write_file_res(text, res) {
        const line = text + "\n";
        fs.appendFile(this.FILEPATH, line, (err) => {
            if (err) {
                res.writeHead(utils.RES_SERVER_ERR, { "Content-Type": "text/plain" });
                res.end(messages.MESSAGES[messages.SERVER_ERR_KEY]);
                return;
            }
            res.writeHead(utils.RES_SUCCESSFUL, { "Content-Type": "text/plain" });
            res.end(messages.MESSAGES[messages.FILE_WRITTEN_KEY]);
        });
    }

    static read_file_res(filename, res) {
        const filepath = this.DATA_FILEPATH.replace("%1", filename);
        fs.readFile(filepath, (err, data) => {
            if (err) {
                res.writeHead(utils.RES_NOT_FOUND, { "Content-Type": "text/plain" });
                res.end(messages.MESSAGES[messages.NOT_FOUND_KEY]);
                return;
            }
            res.writeHead(utils.RES_SUCCESSFUL, { "Content-Type": "text/plain" });
            res.end(data);
        });
    }

}