var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getClientes(){
    try {
        let conn = await sql.connect(config)
        let clientes = await conn.request()
            .query("select * from Clientes")
        return clientes.recordsets 
    } catch (error) {
        console.log(error) 
    }
}

async function getCliente(id){
    try {
        
        let conn = await sql.connect(config)
        let cliente = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select * from Clientes where ClienteID = @id')
        return cliente.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function agregarCliente(cliente){

    try {
        let conn = await sql.connect(config)
        let agregaCliente = await conn.request()
            .input('NombreCliente', sql.NVarChar, cliente.NombreCliente)
            .input('Apellidos', sql.NVarChar, cliente.Apellidos)
            .input('CorreoElectronico', sql.NVarChar, cliente.CorreoElectronico)
            .input('Usuario', sql.NVarChar, cliente.Usuario)
            .input('Contrasena', sql.NVarChar, cliente.Contrasena)
            .query('Insert into Clientes values (@NombreCliente, @Apellidos, @CorreoElectronico, @Usuario, @Contrasena )')
        return agregaCliente.recordsets

    } catch(err) {
        console.log(err)
    }

}

async function validarCliente(usuario, contrasena){
    try {
        console.log(usuario, contrasena)
        let conn = await sql.connect(config)
        let validar = await conn.request()
            .input('usuario', sql.NVarChar, usuario)
            .input('contrasena', sql.NVarChar, contrasena)
            .query('select count(*) as existe from Clientes where Usuario = @usuario and Contrasena = @contrasena')
            console.log(validar.recordsets[0])
        return validar.recordsets[0]
    } catch (error) {
        console.log(error)
    }
}

async function validarCorreoCliente(correo, usuario){
    try {
        let conn = await sql.connect()
        let validarCorreo = await conn.request()
            .input('correo', sql.NVarChar, correo)
            .query('select count(*) as existeCorreo from Clientes where CorreoElectronico = @correo')
        let validarUsuario = await conn.request()
            .input('usuario', sql.NVarChar, usuario)
            .query('select count(*) as existeUsuario from Clientes where Usuario = @usuario')

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

module.exports = {
    getClientes : getClientes,
    getCliente : getCliente,
    agregarCliente : agregarCliente,
    validarCliente : validarCliente,
    validarCorreoCliente: validarCorreoCliente
}