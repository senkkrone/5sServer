"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file) {
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario();
            // Nombre archivo
            const nombreArchivo = this.generaNombreUnico(file.name);
            // Mover el archivo del Temp a la carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generaNombreUnico(nombreOriginal) {
        //logo5s2.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario() {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', 'imgs');
        const pathUserTemp = pathUser + '/temp';
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaPost() {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/imgs/', 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/imgs/', 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagesDeTemp();
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagesDeTemp() {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/imgs/', 'temp');
        console.log(pathTemp);
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(img) {
    }
}
exports.default = FileSystem;
