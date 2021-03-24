var config = require('../dbconfig.js')
const sql = require('mssql')

async function getPaises(){
    try {
        let conn = await sql.connect(config)
        let paises = await conn.request()
            .query('select * from Paises')
        
        return paises.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getPais(id){
    try {
        let conn = await sql.connect(config)
        let pais = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select * from Paises where PaisID = @id')
        return pais.recordset
    } catch (error) {
        console.log(error)
    }
}

async function insertPais(nombrePais, imagenPais, nombreImagen){
    try {
        let conn = await sql.connect(config)
        let insertado = await conn.request()
            .input('NombrePais', sql.NVarChar, nombrePais)
            .input('ImagenPais', sql.VarBinary, new Buffer(imagenPais, 'base64'))
            .input('NombreImagen', sql.Text, nombreImagen)
            .execute('InsertPais3')
            console.log(insertado.recordset)
        return insertado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }
}


async function borrarPaises(id){
    try {
        let conn = await sql.connect(config)
        let borrado = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('delete from Paises where PaisID = @id')
        return borrado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }

}

module.exports = {
    getPais: getPais,
    getPaises : getPaises,
    insertPais : insertPais,
    borrarPaises : borrarPaises
}