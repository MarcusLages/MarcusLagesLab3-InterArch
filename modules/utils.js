exports.utils = class Utils {
    static RES_SERVER_ERR = 500;
    static RES_NOT_FOUND = 404;
    static RES_SUCCESSFUL = 200;
    
    static getDate() {
        return new Date().toLocaleString();
    } 
}
