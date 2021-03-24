async function mostrarAerolineas(){
        
    await axios.get(aerolineasUrl).then(response=>{
        response.data.forEach(element => {
            //var img = document.createElement('img')
            //img.src = 'data:image/jpeg;base64,'+ btoa(element.ImagenPais)
            //console.log(element.imagen)
            $('#bodyAerolinea').append(`<tr> <td>`+element.AerolineaID+`</td> <td>`+element.imagen+`</td> 
                <td>`+element.NombreAerolinea+`</td>   <td>
                <button class="btn btn-danger" onclick="borrarAeroli('`+element.AerolineaID+`')">Borrar</button>
                </td> </tr>`)
        })
    })
}

async function borrarAeroli(value){
    const config = {
        method: 'delete',
        url: aerolineasUrl,
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