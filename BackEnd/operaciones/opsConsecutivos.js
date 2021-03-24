var config = require('../dbconfig.js')
const sql = require('mssql')
const { get } = require('http')

async function getConsecutivos(){
    try {

        let conn = await sql.connect(config)
        let consecutivos = await conn.request()
            .query('select * from Consecutivos')
        return consecutivos.recordsets

    } catch (error) {
        console.log(error)
    }
}

async function getConsecutivo(id){
    try {
        
        let conn = await sql.connect(config)
        let consecutivo = await conn.request()
            .input('id', sql.NVarChar, id)
            .query('select * from consecutivos where ConsecutivoID = @id')
        return consecutivo.recordset

    } catch (error) {
        console.log(error)
    }
}

async function agregarConsecutivo(consecutivo){
    try {
        
        let conn = await sql.connect(config)
        let consecutivoAgregado = await conn.request()
            .input('DescConsecutivo', sql.NVarChar, consecutivo.DescConsecutivo)
            .input('ValorConsecutivo', sql.Int, consecutivo.ValorConsecutivo)
            .input('PoseePrefijo', sql.Bit, consecutivo.PoseePrefijo)
            .input('PrefijoDesc', sql.NVarChar, consecutivo.PrefijoDesc)
            .input('PoseeRango', sql.Bit, consecutivo.PoseeRango)
            .input('RangoInicial', sql.Int, consecutivo.RangoInicial)
            .input('RangoFinal', sql.Int, consecutivo.RangoFinal)
            .query('Insert into Consecutivos values (@DescConsecutivo, @ValorConsecutivo, @PoseePrefijo, @PrefijoDesc, @PoseeRango, @RangoInicial, @RangoFinal)')
        return consecutivoAgregado.recordsets

    } catch (error) {
        console.log(error)
        return 400
    }
}

async function actualizarConsec(consecutivo){
    try {
        let conn = await sql.connect(config)
        let consecUpdated = await conn.request()
        .input('id', sql.Int, consecutivo.ConsecutivoID)
        .input('DescConsecutivo', sql.NVarChar, consecutivo.DescConsecutivo)
        .input('ValorConsecutivo', sql.Int, consecutivo.ValorConsecutivo)
        .input('PoseePrefijo', sql.Bit, consecutivo.PoseePrefijo)
        .input('PrefijoDesc', sql.NVarChar, consecutivo.PrefijoDesc)
        .input('PoseeRango', sql.Bit, consecutivo.PoseeRango)
        .input('RangoInicial', sql.Int, consecutivo.RangoInicial)
        .input('RangoFinal', sql.Int, consecutivo.RangoFinal)
        .query('update consecutivos set DescConsecutivo=@DescConsecutivo, ValorConsecutivo=@ValorConsecutivo, PoseePrefijo=@PoseePrefijo, PrefijoDesc=@PrefijoDesc, PoseeRango=@PoseeRango, RangoInicial=@RangoInicial, RangoFinal=@RangoFinal where ConsecutivoID = @id')
        return consecUpdated.recordset

    } catch (error) {
        console.log(error)
    }
}

async function borrarConsecutivo(id){
    try {
        let conn = await sql.connect(config)
        let borrado = await conn.request()
            .input('id', sql.Int, id)
            .query('delete from Consecutivos where ConsecutivoID = @id')
        return borrado.recordset, 200
    } catch (error) {
        console.log(error)
        return 400
    }

}

module.exports = {
    getConsecutivos : getConsecutivos,
    getConsecutivo : getConsecutivo,
    agregarConsecutivo : agregarConsecutivo,
    actualizarConsec : actualizarConsec,
    borrarConsecutivo : borrarConsecutivo
}