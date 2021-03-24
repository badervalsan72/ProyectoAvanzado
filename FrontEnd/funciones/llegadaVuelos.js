async function mostrarllegadaVuelos(){

await axios.get(llegadavuelosUrl).then( response=>{
    response.data.forEach(element => {
     
            if(element.Accion==='Llegada'){
                $('#bodyLlegaVuelos').append(`<tr>
                <td>`+element.VueloID+`</td>
                <td>`+element.Aerolinea+`</td> 
                <td>`+element.Pais+`</td> 
                <td>`+element.Fecha+`</td>
                <td>`+element.Hora+`</td> 
                <td>`+element.EstadoVuelo+`</td> 
                <td>`+element.PuertaAeropuerto+`</td> 
                <td>`+element.Accion+`</td>      
                 </tr>`)

            }
    })
})

}