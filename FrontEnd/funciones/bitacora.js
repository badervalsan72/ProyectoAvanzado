async function cargaBitacora(){
    await axios.get(bitacoraUrl).then(resul =>{
        resul.data.forEach(element => {
            //console.log(element)
            let fecha = new Date(parseInt(element.FechaHora))
            //console.log(fecha.toDateString())
            $('#bodyBitacora').append(`<tr> <td>`+fecha.toDateString()+`</td> <td>`+fecha.toLocaleTimeString()+`</td> 
               <td>`+element.CodigoRegistro+`</td> <td>`+element.TipoRegistro+`</td> <td>`+element.Descripcion+`</td> 
               <td>`+element.RegistroDetalle+`</td>   </tr>`)
        });
    }).catch(error=>{console.log(err)})
}