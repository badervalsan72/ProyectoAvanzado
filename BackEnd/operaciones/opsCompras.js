var config = require('../dbconfig.js')
const sql = require('mssql')

async function insertarCompra(compra){
    
    try {
        let conn = await sql.connect(config)
        let newCompra = await conn.request()
            .input('codigo', sql.NVarChar, compra.codigoCompra)
            .input('codigoResul', sql.Int, compra.codigoResul)
            .input('cliente', sql.Int, compra.cliente)
            .input('monto', sql.Int, compra.monto)
            .query('insert into Compras (CompraID, CodigoResul, Cliente, Monto) values (@codigo, @codigoResul, @cliente, @monto)')
        return 200
    } catch (error) {
        console.log(error)
        console.log('error de compras')
    }
}

module.exports = {
    insertarCompra : insertarCompra
}