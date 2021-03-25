var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getUsuarios() {
    try {

        let conn = await sql.connect(config)
        let usuarios = await conn.request()
            .query("select NombreUsuario, CorreoElec, PregSeguridad, Rol from Usuarios")
        return usuarios.recordsets

    } catch (error) {
        console.log(error)
    }

}

async function getUsuario(id) {
    try {

        let conn = await sql.connect(config)
        let usuario = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select * from Usuarios where UsuarioID = @id')
        return usuario.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function agregarUsuario(usuario) {

    try {
        let conn = await sql.connect(config)
        let agregaUsuario = await conn.request()
            .input('NombreUsuario', sql.NVarChar, usuario.NombreUsuario)
            .input('Password', sql.NVarChar, usuario.Password)
            .input('CorreoElec', sql.NVarChar, usuario.CorreoElec)
            .input('PregSeguridad', sql.NVarChar, usuario.PregSeguridad)
            .input('RespSeguridad', sql.NVarChar, usuario.RespSeguridad)
            .query('Insert into Usuarios values (@NombreUsuario, @Password, @CorreoElec, @PregSeguridad, @RespSeguridad, 7)')
        return agregaUsuario.recordsets

    } catch (err) {
        console.log(err)
    }

}

async function updatePass(usuario, password) {
    try {
        let conn = await sql.connect()
        let actualizaPassword = await conn.request()
            .input('usuario', sql.NVarChar, usuario)
            .input('pass', sql.NVarChar, password)
            .query('UPDATE Usuarios SET password = @pass where NombreUsuario = @usuario')
        return actualizaPassword.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function updateRol(usuario, rol) {
    try {
        let conn = await sql.connect()
        let actualizaRol = await conn.request()
            .input('usuario', sql.NVarChar, usuario)
            .input('rol', sql.Int, rol)
            .query('UPDATE Usuarios SET Rol = @rol where NombreUsuario = @usuario')
        return actualizaRol.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function validarUsuario(nombre, password) {
    try {
        console.log(nombre, password)
        let conn = await sql.connect(config)
        let validar = await conn.request()
            .input('nombre', sql.VarChar, nombre)
            .input('password', sql.VarChar, password)
            .query('select count(*) as existe from Usuarios where NombreUsuario = @nombre and Password = @password')
        console.log(validar.recordsets[0])
        return validar.recordsets[0]
    } catch (error) {
        console.log(error)
    }
}

async function validarCorreoUsuario(correo, usuario) {
    try {
        let conn = await sql.connect(config)
        let validarCorreo = await conn.request()
            .input('correo', sql.NVarChar, correo)
            .query('select count(*) as existeCorreo from Usuarios where CorreoElec = @correo')
        let validarUsuario = await conn.request()
            .input('usuario', sql.NVarChar, usuario)
            .query('select count(*) as existeUsuario from Usuarios where NombreUsuario = @usuario')

        let resul = {
            "existeCorreo": validarCorreo.recordset[0].existeCorreo,
            "existeUsuario": validarUsuario.recordset[0].existeUsuario
        }

        console.log(resul)

        return resul

    } catch (error) {
        console.log(error)
    }
}


//METODO DE CLIENTES PERO EN USUARIOS POR QUE SI

async function validarUsuarioRegistro(correo, username) {
    try {
        let conn = await sql.connect(config)
        let validarCorreo = await conn.request()
            .input('correo', sql.VarChar, correo)
            .query('select count(*) as existeCorreo from CLIENTES where CorreoElectronico = @correo')
        let validarUsuario = await conn.request()
            .input('usuario', sql.VarChar, username)
            .query('select count(*) as existeUser from Clientes where Usuario = @usuario')

        let result = {
            "existeCorreo": validarCorreo.recordset[0].existeCorreo,
            "existeUser": validarUsuario.recordset[0].existeUsuario
        }

        console.log(result)

        return result

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsuarios: getUsuarios,
    getUsuario: getUsuario,
    agregarUsuario: agregarUsuario,
    validarUsuario: validarUsuario,
    validarUsuarioRegistro: validarUsuarioRegistro,
    updatePass: updatePass,
    updateRol: updateRol
}