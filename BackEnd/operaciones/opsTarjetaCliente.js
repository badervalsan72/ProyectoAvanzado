var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function existeTarjetas(id){
    try {
        let conn = await sql.connect(config)
        let existe = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select count(*) as existe from CompraTarjeta where Cliente = @id')
        console.log(existe.recordset[0])
        if(existe.recordset[0].existe > 0 ){
            return 'true'
        } else {
            return 'false'
        }
    } catch (error) {
        console.log(error)
    }
}

async function getTarjetas(){
    try {
        let conn = await sql.connect()
        let tarjetas = await conn.request()
            .query('select * from Tarjetas')
        return tarjetas.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getTarjetasCliente(id){
    try {
        let conn = await sql.connect()
        let tarjetas = await conn.request()
            .input('id', sql.Int, id)
            .query('select * from CompraTarjeta where Cliente = @id')
        return tarjetas.recordset
    } catch (error) {
        console.log(error)
    }
}

async function insertaTarjeta(tarjeta){
    try {
        let conn = await sql.connect()
        let insertada = await conn.request()
            .input('numero', sql.BigInt, tarjeta.NumTarjeta)
            .input('mes', sql.Int, tarjeta.MesExp)
            .input('anno', sql.Int, tarjeta.AnnoExp)
            .input('cvv', sql.Int, tarjeta.Cvv)
            .input('tipo', sql.NVarChar, tarjeta.TipoTarjeta)
            .input('cliente', sql.Int, tarjeta.Cliente)
            .query('insert into CompraTarjeta values(@numero, @mes, @anno, @cvv, @tipo, @cliente)')
        return insertada.recordset
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    existeTarjetas : existeTarjetas,
    insertaTarjeta : insertaTarjeta,
    getTarjetas : getTarjetas,
    getTarjetasCliente : getTarjetasCliente
}