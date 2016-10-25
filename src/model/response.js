'use strict';


let Response = function () {

}
Response.prototype.status = function (status) {
    this.status = status;
}
Response.prototype.message = function (message) {
    this.message = message;
}
Response.prototype.data = function (data) {
    this.data = data;
}
Response.prototype.error = function (error) {
    this.error = JSON.stringify(error);
}
module.exports = Response;