"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    fecha: {
        type: String
    },
    plaza: {
        type: String
    },
    planta: {
        type: String
    },
    seccion: {
        type: String
    },
    pregunta: {
        type: Number
    },
    s: {
        type: Number
    },
    calificacion: {
        type: Number
    },
    imgs: [{
            type: String
        }]
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
