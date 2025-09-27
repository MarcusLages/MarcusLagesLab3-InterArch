const http = require("http");
const { URL } = require("url");
const { utils } = require("./modules/utils.js");
const { GetDate } = require("./modules/getDate.js")
const { FileHandler } = require("./modules/fileHandler.js");
const messages = require("./lang/en/en.js")

class Server {
    static GET_DATE_ROUTE = "/getDate";
    static WRITE_FILE_ROUTE = "/writeFile";
    static READ_FILE_ROUTE = "readFile";
    
    static GET_REQ = 'GET';
    static URL_TEMPLATE = "http://%1";
    static URL_PART = 1;
    static ARG_PART = 2;
    
    constructor() {
        this.port = process.env.port || 8000;
        this.server = http.createServer((req, res) => {
            // I searched it and this is a more modern way, as just
            // url.parse() was deprecated
            const req_url = new URL(req.url,
                Server.URL_TEMPLATE.replace("%1", req.headers.host)
            );
            const url_parts = req_url.pathname.split("/");
        
            if(req.method === Server.GET_REQ) {
                if(req_url.pathname === Server.GET_DATE_ROUTE) {
                    const name = req_url.searchParams.get(GetDate.URL_PARAM);
                    GetDate.send_res(name, res);
                } else if(req_url.pathname === Server.WRITE_FILE_ROUTE) {
                    const text = req_url.searchParams.get(FileHandler.WRITE_URL_PARAM);
                    FileHandler.write_file_res(text, res);
                } else if(
                    url_parts[Server.URL_PART] === Server.READ_FILE_ROUTE 
                    && url_parts[Server.ARG_PART] 
                ) {
                    const filename = url_parts[Server.ARG_PART];
                    FileHandler.read_file_res(filename, res);
                } else {
                    res.writeHead(utils.RES_NOT_FOUND, { "Content-Type": "text/plain" });
                    res.end(messages.MESSAGES[messages.NOT_FOUND_KEY]);
                }
            }
        })
    }

    start() {
        this.server.listen(this.port, () => {
            const addr = this.server.address();
            const host_ip = addr.address === "::" ? "localhost" : addr.address;
            console.log(`Server listening on http://${host_ip}:${this.port}`);
        });
    }
}

const server = new Server();
server.start();
