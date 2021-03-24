
async function mostrarAerolineas_Pais(){
        
    await axios.get(aerolineasUrl).then(response=>{
        response.data.forEach(element => {
            
            $('#bodyAerolinea_Pais').append(`<tr> <td>`+element.AerolineaID+`</td> <td>`+element.imagen+`</td> 
                <td>`+element.NombreAerolinea+`</td>  </tr>`)
        
        })
    })
}

async function cargaPaises(){
    await axios.get(paisesUrl).then(value =>{
        value.data.forEach(element => {
            //console.log(element.NombrePais)
            $('#dropdownPaisBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionPais(this.innerHTML)">`+element.NombrePais+`</a>`)
        })
    }).catch(err=>{
        console.log(err)
    })
}

async function seleccionPais(val){
    let table = document.getElementById('bodyAerolinea_Pais')
    table.innerHTML = ""

    let paisSeleccionado 

    await axios.get(paisesUrl).then(res =>{
        res.data.forEach(element => {
            if(element.NombrePais === val){
                paisSeleccionado = element.PaisID
                console.log(paisSeleccionado)
            }
        });
    }).catch(err=>{console.log(err)})

    await axios.get(aerolineasUrl).then(response=>{
        response.data.forEach(element => {
            //console.log(element)
            if(paisSeleccionado === element.Pais){
                $('#bodyAerolinea_Pais').append(`<tr> <td>`+element.AerolineaID+`</td> <td>`+element.imagen+`</td> 
                <td>`+element.NombreAerolinea+`</td>  </tr>`)
            } 
        
        })
    }).catch(err=>{console.log(err)})
}