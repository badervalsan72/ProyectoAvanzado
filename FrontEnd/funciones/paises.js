var axios = require('axios')

async function mostrarPaises(){ 
    await axios.get(paisesUrl).then(response=>{
        response.data.forEach(element => {
            //var img = document.createElement('img')
            //img.src = 'data:image/jpeg;base64,'+ btoa(element.ImagenPais)
            //console.log(element.imagen)
            $('#bodyPaises').append(`<tr> <td>`+element.PaisID+`</td> <td>`+element.NombrePais+`</td> 
                <td>`+element.imagen+`</td>  <td> 
                <button class="btn btn-danger" onclick="borrarPais('`+element.PaisID+`')">Borrar</button>
                </td> </tr>`)
        })
    })
}

async function borrarPais(value){
    const config = {
        method: 'delete',
        url: paisesUrl,
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


