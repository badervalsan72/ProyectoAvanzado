var config = require('../dbconfig.js')
const sql = require('mssql')

async function insertarBoleto(boleto){
    let conn = await sql.connect(config)
    
    if(boleto.codigoCompra){
        try {
            let newBoleto = await conn.request()
                .input('cant', sql.Int, boleto.cant)
                .input('codigo', sql.NVarChar, boleto.codigoCompra)
                .input('cliente', sql.Int, boleto.cliente)
                .input('desc', sql.NVarChar, boleto.descripcion)
                .input('vuelo', sql.Int, boleto.vuelo)
                .query('insert into Boletos (CantidadBoleto, CodigoCompra, Cliente, Descripcion, Vuelo) values (@cant, @codigo, @cliente, @desc, @vuelo)')
            return 200
        } catch (error) {
            console.log(error)
            console.log('error de boletos')
        }
    } else if(boleto.codigoReserva) {
        try {
            let newBoleto = await conn.request()
                .input('cant', sql.Int, boleto.cant)
                .input('codigo', sql.NVarChar, boleto.codigoReserva)
                .input('cliente', sql.Int, boleto.cliente)
                .input('desc', sql.NVarChar, boleto.descripcion)
                .input('vuelo', sql.Int, boleto.vuelo)
                .query('insert into Boletos (CantidadBoleto, CodigoReserva, Cliente, Descripcion, Vuelo) values (@cant, @codigo, @cliente, @desc, @vuelo)')
            return 200    
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    insertarBoleto : insertarBoleto
}