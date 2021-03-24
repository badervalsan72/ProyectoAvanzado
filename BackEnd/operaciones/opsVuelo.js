var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getVuelos(){
    try {
        let conn = await sql.connect(config)
        let vuelos = await conn.request()
            .query('select * from vuelos')
        return vuelos.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getVuelo(id){
    try {
        let conn = await sql.connect(config)
        let vuelo = await conn.request()
            .input('id', sql.Int, id)
            .query('select * from vuelos where VueloId = @id')
        return vuelo.recordset

    } catch (error) {
        console.log(error)
    }
}


async function insertarVuelo(vuelo){
    try {
        let conn = await sql.connect(config)
        let insertado = await conn.request()
            .input('fecha', sql.NVarChar, vuelo.Fecha)
            .input('hora', sql.NVarChar, vuelo.Hora)
            .input('estado', sql.NVarChar, vuelo.EstadoVuelo)
            .input('pais', sql.NVarChar, vuelo.Pais)
            .input('aerolinea', sql.NVarChar, vuelo.Aerolinea)
            .input('puerta', sql.NVarChar, vuelo.PuertaAeropuerto)
            .input('precio', sql.Int, vuelo.Precio)
            .input('accion', sql.NVarChar, vuelo.Accion)
            .query('insert into Vuelos values (@fecha, @hora, @estado, @pais, @aerolinea, @puerta, @precio, @accion)')
        return insertado.recordsets
    } catch (error) {
        console.log(error)
    }
}


async function actualizarVuelo(vuelo){
    try {
        let conn = await sql.connect(config)
        let vueloUpdated = await conn.request()
        .input('id', sql.Int, vuelo.VueloID)
        .input('fecha', sql.NVarChar, vuelo.Fecha)
        .input('hora', sql.NVarChar, vuelo.Hora)
        .input('estado', sql.NVarChar, vuelo.EstadoVuelo)
        .input('pais', sql.NVarChar, vuelo.Pais)
        .input('aerolinea', sql.NVarChar, vuelo.Aerolinea)
        .input('puerta', sql.NVarChar, vuelo.PuertaAeropuerto)
        .input('precio', sql.Int, vuelo.Precio)
        .input('accion', sql.NVarChar, vuelo.Accion)
        .query('update vuelos set fecha=@fecha, hora=@hora, estado=@estado, pais=@pais, aerolinea=@aerolinea, puerta=@puerta, precio@precio, accion=@accion where VueloID = @id')
        return vueloUpdated.recordset

    } catch (error) {
        console.log(error)
    }
}


async function borrarVuelo(id){
    try {
        let conn = await sql.connect(config)
        let borrado = await conn.request()
            .input('id', sql.Int, id)
            .query('delete from vuelos where VueloID = @id')
        return borrado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }

}


async function getLlegadaVuelos(){
    try {
        let conn = await sql.connect(config)
        let llegada_vuelos = await conn.request()
            .query('select * from Vuelos')
        return llegada_vuelos.recordsets
    } catch (error) {
        console.log(error)
    }
}



async function getSalidaVuelos(){
    try {
        let conn = await sql.connect(config)
        let salida_vuelos = await conn.request()
            .query('select * from Vuelos')
        return salida_vuelos.recordsets
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getVuelos : getVuelos,
    getVuelo : getVuelo,
    insertarVuelo : insertarVuelo,
    actualizarVuelo : actualizarVuelo,
    borrarVuelo : borrarVuelo,
    getLlegadaVuelos : getLlegadaVuelos,
    getSalidaVuelos : getSalidaVuelos

}