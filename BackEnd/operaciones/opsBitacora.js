var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getBitacoras(){
    try {
        let conn = await sql.connect(config)
        let bitacoras = await conn.request()
            .query('Select * from Bitacora')
        return bitacoras.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function agregarRegistro(registro){

    try {
        let conn = await sql.connect(config)
        let agregar = await conn.request()
            .input('DateTime', sql.BigInt, registro.DateTime)
            .input('CodigoRegistro', sql.Int, registro.CodigoRegistro)
            .input('TipoRegistro', sql.NVarChar, registro.TipoRegistro)
            .input('Descripcion', sql.NVarChar, registro.Descripcion)
            .input('RegistroDetalle', sql.NVarChar, registro.RegistroDetalle)
            .query('Insert into Bitacora values (@DateTime, @CodigoRegistro, @TipoRegistro, @Descripcion, @RegistroDetalle)')
        return agregar.recordsets;

    } catch(err) {
        console.log(err)
    }

}


module.exports = {
    agregarRegistro : agregarRegistro,
    getBitacoras : getBitacoras
}