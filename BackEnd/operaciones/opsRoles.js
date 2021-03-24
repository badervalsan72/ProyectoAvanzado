var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getRoles(){
    try{
        let conn = await sql.connect(config)
        let roles = await conn.request()
            .query("select * from Roles")
        
        return roles.recordsets
    }
    catch(err){
        console.log(err)
    }
    
}

async function getRol(RolID){
    try {
        let conn = await sql.connect(config)
        let rol = await conn.request()
            .input('input_parameter', RolID)
            .query("select * from Roles where RolID = @input_parameter")
        return rol.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function agregarRol(rol){

    try {
        let conn = await sql.connect(config)
        let agregaRol = await conn.request()
            .input('RolID', sql.NVarChar, rol.RolID)
            .input('NombreRol', sql.NVarChar, rol.NombreRol)
            .input('DescripcionRol', sql.NVarChar, rol.DescripcionRol)
            .query('Insert into Roles values (@RolID, @NombreRol, @DescripcionRol)')
        return agregaRol.recordsets

    } catch (err) {
        console.log(err)
    }

}

async function borrarRol(id){
    try {

        let conn = await sql.connect(config)
        let borraRol = await conn.request()
            .input('RolID', sql.NVarChar, id)
            .query('delete from Roles where RolID = @RolID')
        return borraRol.recordsets

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getRoles : getRoles,
    getRol : getRol,
    agregaRol : agregarRol,
    borrarRol : borrarRol
}