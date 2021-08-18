"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/', function (request, response) {
    return response.json({
        message: 'Olá, Mundo'
    });
});
var port = 3334;
app.listen(port, function () {
    console.log("server is running on port " + port);
});
