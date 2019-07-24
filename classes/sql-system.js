"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class SqlSystem {
    constructor() {
        this.connection = mysql_1.default.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'auditoria',
            password: 'Upiicsa1',
            database: 'auditorias'
        });
    }
    ;
    getTablaSql() {
        this.connection.query('SELECT * FROM ev_5s', (error, result) => {
            if (error)
                throw error;
            return result;
        });
    }
    insertarTablaSql(element) {
        const sql = 'INSERT INTO ev_5s SET ?';
        this.connection.query(sql, element, (error, result) => {
            setTimeout(() => {
                if (error) {
                    return false;
                }
                else {
                    return true;
                }
            }, 200);
        });
    }
}
exports.default = SqlSystem;
