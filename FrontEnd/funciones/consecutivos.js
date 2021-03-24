var axios = require('axios')

async function mostrarConsec(){
        
        await axios.get(consecutivosUrl).then( response=>{
            response.data.forEach(element => {
                $('#consecutivosBody').append(`<tr> <td>`+element.ConsecutivoID+`</td> <td>`+element.DescConsecutivo+`</td> 
                    <td>`+element.ValorConsecutivo+`</td> <td>
                    <button class="btn btn-warning" onclick="enviarInfo('`+element.ConsecutivoID+`')">Editar</button>
                    <button class="btn btn-danger" onclick="borrarConsec('`+element.ConsecutivoID+`')">Borrar</button>
                    </td> </tr>`)
            })
        })
}

async function borrarConsec(value){
    const config = {
        method: 'delete',
        url: consecutivosUrl,
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

async function enviarInfo(value){
    
    document.cookie = "consecutivo="+value+";"
    window.location.replace('../frontend/Editar_Consecutivos.html')
    
}