"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuarios {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
    }
    getLista() {
        // let listaTemporal = this.lista.filter(usuario=>usuario.nombre !== 'sin-nombre');
        let listaTemporal = this.lista.filter((usuario) => {
            //if(usuario.nombre!='sin nombre'){
            return usuario;
            // }
        });
        return listaTemporal;
    }
    //actualiza el nombre de un usuario presente en la lista de usuarios sU IDde pc
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
    }
    getUsuario(id) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                return usuario;
            }
        }
    }
    borrarUsuario(id) {
        this.lista = this.lista.filter((usuario) => {
            if (usuario.id !== id) {
                return usuario;
            }
        });
    }
}
exports.Usuarios = Usuarios;
