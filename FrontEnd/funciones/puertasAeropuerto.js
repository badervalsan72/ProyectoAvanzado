async function mostrarPuertas(){
        
    await axios.get(puertasUrl).then( response=>{
        response.data.forEach(element => {
            $('#bodyPuertas').append(`<tr> <td>`+element.PuertaID+`</td> <td>`+element.NumeroPuerta+`</td> 
                <td>`+element.DetallePuerta+`</td>  </tr>`)
        })
    })

    
}