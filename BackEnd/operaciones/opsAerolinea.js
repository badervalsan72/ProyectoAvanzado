var config = require('../dbconfig.js')
const sql = require('mssql')

async function getAerolineas(){
    try {
        let conn = await sql.connect(config)
        let aerolineas = await conn.request()
            .query('select * from Aerolineas')
        
        return aerolineas.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getAerolinea(id){
    try {
        let conn = await sql.connect(config)
        let aerolinea = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select * from Aerolinea where AerolineaID = @id')
        return aerolinea.recordset
    } catch (error) {
        console.log(error)
    }
}

async function insertAerolinea(nombreAerolinea, imagenAerolinea, pais){
    try {
        let conn = await sql.connect(config)
        let insertado = await conn.request()
            .input('nombreAerolinea', sql.NVarChar, nombreAerolinea)
            .input('gimaenAerolinea', sql.VarBinary, new Buffer(imagenAerolinea, 'base64'))
            .input('pais', sql.NVarChar, pais)
            .execute('InsertAerolinea')
            console.log(insertado.recordset)
        return insertado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }
}



async function getAerolineas_Pais(){
    try {
        let conn = await sql.connect(config)
        let aerolineas_pais = await conn.request()
            .query('select * from Aerolineas')
        
        return aerolineas_pais.recordsets
    } catch (error) {
        console.log(error)
    }
}


async function borrarAerolinea(id){
    try {
        let conn = await sql.connect(config)
        let borrado = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('delete from Aerolineas where AerolineaID = @id')
        return borrado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }

}

module.exports = {
    getAerolineas: getAerolineas,
    getAerolinea : getAerolinea,
    insertAerolinea : insertAerolinea,
    getAerolineas_Pais : getAerolineas_Pais,
    borrarAerolinea : borrarAerolinea
}