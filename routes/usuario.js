"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../classes/file-system"));
const userRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
const mysql = require('mysql');
const util = require('util');
// userRoutes.get('/prueba', (req: Request, res:Response) => {
//     res.json({
//         ok:true,
//         mensaje: 'Todo funciona bien!'
//     })
// });
userRoutes.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, CONNECT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'auditoria',
    password: 'Upiicsa1',
    database: 'auditorias'
});
userRoutes.get('/ev_5s', (req, res) => {
    connection.query('SELECT * FROM ev_5s', (error, result) => {
        if (error)
            throw error;
        res.send(result);
    });
});
userRoutes.post('/createCalif', (req, res, next) => {
    const inserts = req.body;
    //console.log(inserts);
    (() => __awaiter(this, void 0, void 0, function* () {
        for (const element of inserts) {
            const sql = 'INSERT INTO ev_5s SET ?';
            connection.query(sql, element, (error, result) => {
                if (error) {
                    res.json({
                        ok: false,
                        user: req.body
                    });
                    //throw error;                
                }
            });
            yield new Promise(resolve => setTimeout(resolve, 50));
        }
        res.json({
            ok: true,
            user: req.body
        });
    }))();
});
userRoutes.post('/createProm', (req, res, next) => {
    const inserts = req.body;
    //console.log(inserts);
    (() => __awaiter(this, void 0, void 0, function* () {
        for (const element of inserts) {
            const sql = 'INSERT INTO calif_5s SET ?';
            connection.query(sql, element, (error, result) => {
                if (error) {
                    res.json({
                        ok: false,
                        user: req.body
                    });
                    //throw error;                
                }
            });
            yield new Promise(resolve => setTimeout(resolve, 50));
        }
        res.json({
            ok: true,
            user: req.body
        });
    }))();
});
// const user = {
//     fecha: req.body.fecha,
//     plaza: req.body.plaza,
//     planta: req.body.planta,
//     seccion: req.body.seccion,
//     pregunta: req.body.pregunta,
//     s: req.body.s,
//     calificacion: req.body.calificacion
// }
// Usuario.create(user).then(userDB => {
//     res.json({
//         ok: true,
//         user: userDB
//     });
// }).catch (err => {
//     res.json ({
//         ok: false,
//         err
//     });
// });
//Crear POST
userRoutes.post('/', (req, res) => {
    const body = req.body;
    const imagenes = fileSystem.imagenesDeTempHaciaPost();
    body.imgs = imagenes;
    res.json({
        ok: true,
        body: req.body
    });
});
//Servicio para subir archivos
userRoutes.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
userRoutes.get('/imagen/:img', (req, res) => {
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(img);
});
exports.default = userRoutes;
