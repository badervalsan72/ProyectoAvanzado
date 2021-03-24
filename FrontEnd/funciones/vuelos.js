
async function cargarVuelos(){
        
    await axios.get(vuelosUrl).then( response=>{

        response.data.forEach( async element => {
            let pais = await encontrarPais(element.Pais)
            let aerolinea = await encontrarAerolinea(element.Aerolinea)
            let puerta = await encontrarPuerta(element.PuertaAeropuerto)

            $('#bodyVuelos').append(`<tr> 
            <td>`+element.VueloID+`</td>
            <td>`+element.Fecha+`</td> <td>`+element.Hora+`</td> 
                <td>`+element.EstadoVuelo+`</td> 
                <td>`+pais+`</td> 
                <td>`+aerolinea+`</td> 
                <td>`+puerta+`</td> 
                <td>`+element.Precio+`</td>  
                <td>`+element.Accion+`</td>      
                <td><button class="btn btn-danger" onclick="borrarVuelo('`+element.VueloID+`')">Borrar</button>
                </td> </tr>`)
        })
    }).catch(err=>{console.log(err)})

}

async function borrarVuelo(value){
    const config = {
        method: 'delete',
        url: vuelosUrl,
        data: {
            id: value
        }
    }

    await axios(config).then(val=>{
        console.log(val.data)
        if(val.data === 200){
            alert('borrado')
            location.reload()
        }
    }).catch(err=>{
        console.log(err)
    })
}




async function encontrarPais(val){
    let pais
    await axios.get(paisesUrl).then(resul=>{
        resul.data.forEach(element => {
            if(element.PaisID === val){
                console.log(element.NombrePais)
                pais = element.NombrePais
            }
        })
    }).catch(err=>{console.log(err)})

    console.log(pais)
    return pais
}

async function encontrarAerolinea(val){
    let aerolinea
    await axios.get(aerolineasUrl).then(resul=>{
        resul.data.forEach(element => {
            if(element.AerolineaID === val){
                aerolinea = element.NombreAerolinea
            }
        })
    }).catch(err=>{console.log(err)})

    console.log(aerolinea)
    return aerolinea
}

async function encontrarPuerta(val){
    let puerta
    await axios.get(puertasUrl).then(resul=>{
        resul.data.forEach(element => {
            if(element.PuertaID === val){
                console.log(element.NumeroPuerta)
                puerta = element.NumeroPuerta
            }
        })
    }).catch(err=>{console.log(err)})

    console.log(puerta)
    return puerta
}