"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const usuarios_1 = require("./usuarios");
const usuario_1 = require("./usuario");
class Server {
    constructor() {
        this.usuariosConectados = new usuarios_1.Usuarios();
        this.app = express_1.default();
        this.httpServer = new http_1.default.Server(this.app);
        this.puerto = process.env.PORT || 3700;
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    escucharSockets() {
        console.log("escuchando sockets");
        this.io.on('connect', (cliente) => {
            console.log("Alguien se ha conectado");
            console.log(cliente.id);
            let usuario = new usuario_1.Usuario(cliente.id);
            this.usuariosConectados.agregar(usuario);
            // console.log(this.usuariosConectados.getLista());
            this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            cliente.on('disconnect', () => {
                console.log(`${cliente.id} se ha desconectado`);
                this.usuariosConectados.borrarUsuario(cliente.id);
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            });
            cliente.on('enviar-mensaje', (payload) => {
                console.log(payload);
                this.io.emit('mensaje-nuevo', payload);
            });
            cliente.on("configurar-usuario", (usuario) => {
                this.usuariosConectados.actualizarNombre(cliente.id, usuario.nombre);
                console.log(this.usuariosConectados.getLista());
            });
            cliente.on("cerrar-sesion", () => {
                this.usuariosConectados.actualizarNombre(cliente.id, "sin-nombre");
                this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
            });
            cliente.on("obtener-usuarios", () => {
                // this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
                setTimeout(() => {
                    //this.io.in(cliente.id).emit('usuarios-activos',this.usuariosConectados.getLista());
                    this.io.emit('usuarios-activos', this.usuariosConectados.getLista());
                }, 1000);
            });
        });
    }
    start() {
        this.httpServer.listen(this.puerto, () => {
            console.log("Server initialized correctly in Port : " + this.puerto);
        });
    }
}
exports.default = Server;
