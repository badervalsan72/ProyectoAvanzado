var config = require('../dbconfig.js')
const sql = require('mssql')


async function insertReserva(reserva){
    try {
        let conn = await sql.connect()
        let inserta = await conn.request()
            .input('ReservaID', sql.NVarChar, reserva.ReservaID)
            .input('cant', sql.Int, reserva.cant)
            .input('mensaje', sql.NVarChar, reserva.mensaje)
            .input('total', sql.Int, reserva.total)
            .input('pais', sql.Int, reserva.pais)
            .query('insert into Reservas values(@ReservaID, @cant, @mensaje, @total, @pais)')
        return 200
    } catch (error) {
        console.log(error)
        console.log('error en ops')  
    }
}

module.exports = {
    insertReserva : insertReserva
}