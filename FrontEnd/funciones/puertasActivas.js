async function mostrarPuertasActivas(){
       
    await axios.get(puertas_activasUrl).then( response=>{
        response.data.forEach(element => {
                if(element.DetallePuerta==='Abierta'){
                    $('#bodyPuertasActivas').append(`<tr> <td>`+element.PuertaID+`</td> <td>`+element.NumeroPuerta+`</td> 
                    <td>`+element.DetallePuerta+`</td>  </tr>`)

                }
        })
    })
    
}