"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default();
const mysql = require('mysql');
const config = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'auditoria',
    password: 'Upiicsa1',
    database: 'auditorias'
};
//configurar CORS
//server.app.use( cors({ origin:true, credentials:true }));
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, CONNECT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use(express_fileupload_1.default());
//Rutas de la app
server.app.use('/user', usuario_1.default);
//Conectar DB
//  mongoose.connect('mongodb://localhost:27017/evaluacion',
//                  {useNewUrlParser: true, useCreateIndex: true}, (err) => {
//      if(err) throw err;
//      console.log('Base de datos ONLINE');
//  });
//local mysql db connection
const connection = mysql.createConnection(config);
connection.connect(function (err) {
    if (err) {
        //throw err;
        console.error('Error de conexion: ' + err.stack);
    }
    console.log('BD ONLINE: ' + connection.threadId);
});
connection.end();
// module.exports = connection;
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
