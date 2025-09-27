const http = require("http");
const { URL } = require("url");
const { utils } = require("./modules/utils.js");
const { GetDate } = require("./modules/getDate.js")
const { FileHandler } = require("./modules/fileHandler.js");
const messages = require("./lang/en/en.js")

const GET_DATE_ROUTE = "/getDate";
const WRITE_FILE_ROUTE = "/writeFile";
const READ_FILE_ROUTE = "readFile";

const GET_REQ = 'GET';
const URL_TEMPLATE = "http://%1";
const URL_PART = 1;
const ARG_PART = 2;

const port = process.env.port || 8000;

const server = http.createServer((req, res) => {
    // I searched it and this is a more modern way, as just
    // url.parse() was deprecated
    const req_url = new URL(req.url,
        URL_TEMPLATE.replace("%1", req.headers.host)
    );
    const url_parts = req_url.pathname.split("/");

    if(req.method === GET_REQ) {
        if(req_url.pathname === GET_DATE_ROUTE) {
            const name = req_url.searchParams.get(GetDate.URL_PARAM);
            GetDate.send_res(name, res);
        } else if(req_url.pathname === WRITE_FILE_ROUTE) {
            const text = req_url.searchParams.get(FileHandler.WRITE_URL_PARAM);
            FileHandler.write_file_res(text, res);
        } else if(url_parts[URL_PART] === READ_FILE_ROUTE && url_parts[ARG_PART] ) {
            const filename = url_parts[ARG_PART];
            FileHandler.read_file_res(filename, res);
        } else {
            res.writeHead(utils.RES_NOT_FOUND, { "Content-Type": "text/plain" });
            res.end(messages.MESSAGES[messages.NOT_FOUND_KEY]);
        }
    }
})

server.listen(port, () => {
    const addr = server.address();
    const host_ip = addr.address === "::" ? "localhost" : addr.address;
    console.log(`Server listening on http://${host_ip}:${port}`);
});