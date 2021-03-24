var config = require('../dbconfig.js')
const sql = require('mssql')

async function getPuertas() {
    try {
        let conn = await sql.connect(config)
        let puertas = await conn.request()
            .query('select * from puerta')
        return puertas.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getPuerta(id) {
    try {
        let conn = await sql.connect(config)
        let puerta = await conn.request()
            .input('id', sql.VarChar, id)
            .query('select * from Puerta where PuertaID = @id')
        return puerta.recordset
    } catch (error) {
        console.log(error)
    }
}

async function insertPuerta(numero, detalle) {
    try {
        let conn = await sql.connect(config)
        let insertado = await conn.request()
            .input('NumeroPuerta', sql.Varchar, numero)
            .input('DetallePuerta', sql.VarChar, detalle)
            .execute('InsertPuerta2')
        return insertado.recordset
    } catch (error) {
        console.log(error)
        return 400
    }
}



async function getPuertas_Activas() {
    try {
        let conn = await sql.connect(config)
        let puertas_activas = await conn.request()
            .query('select * from Puertas')
        return puertas_activas.recordsets
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getPuertas: getPuertas,
    getPuerta: getPuerta,
    insertPuerta: insertPuerta,
    getPuertas_Activas: getPuertas_Activas
}