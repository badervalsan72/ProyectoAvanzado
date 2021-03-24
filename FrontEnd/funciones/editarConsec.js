
async function seleccionAerolinea(){
    document.getElementById('dropdownTipoConsecutivo').innerHTML = "Aerolinea"
}

async function seleccionVuelos(){
    document.getElementById('dropdownTipoConsecutivo').innerHTML = "Vuelos"
}

async function seleccionPuertas(){
    document.getElementById('dropdownTipoConsecutivo').innerHTML = "Puertas de Aeropuerto"
}

async function seleccionPaises(){
    document.getElementById('dropdownTipoConsecutivo').innerHTML = "Pais"
}

let id
let usuario

async function cargarEditar(){

    let newCookie = document.cookie.split(';')
    console.log(newCookie)
    newCookie.forEach(element => {
        let test = element.split('=')
        console.log(test)
        if(test[0]==='consecutivo'){
            id = test[1]
        }
        if(test[0]===' usuario'){
            usuario= test[1]
        }
    })

    await axios.get(consecutivosUrl+'/'+id).then(val =>{
        
        console.log(val.data)

        if(val.data.DescConsecutivo === 'Aerolinea'){
            seleccionAerolinea()
        } else {
            if (val.data.DescConsecutivo === 'Vuelos') {
                seleccionVuelos()
            } else {
                if(val.data.DescConsecutivo === 'Puertas de Aeropuerto'){
                    seleccionPuertas()
                } else {
                    if(val.data.DescConsecutivo === 'Pais'){
                        seleccionPaises()
                    } else {
                        alert('no hay desc seleccionada')
                    }
                }
            }
        }
                
        document.getElementById('valorConsecutivo').value = val.data.ValorConsecutivo
        document.getElementById('poseePrefijo').checked = val.data.PoseePrefijo
        document.getElementById('prefijoDesc').value = val.data.PrefijoDesc
        document.getElementById('poseeRango').checked = val.data.PoseeRango
        document.getElementById('rangoInicial').value = val.data.RangoInicial
        document.getElementById('rangoFinal').value = val.data.RangoFinal
        
    }).catch(err=>{console.log(err)})

}

async function actualizarConsec(){
    
    let tipoConsec = document.getElementById('dropdownTipoConsecutivo').innerHTML
    let valorConsecutivo = document.getElementById('valorConsecutivo').value
    let poseePref = document.getElementById('poseePrefijo').checked 
    let prefijoDesc = document.getElementById('prefijoDesc').value
    let poseeRango = document.getElementById('poseeRango').checked
    let rangoInicial = document.getElementById('rangoInicial').value 
    let rangoFinal = document.getElementById('rangoFinal').value 

    const config = {
        method: 'put',
        url: consecutivosUrl,
        data: {
            "ConsecutivoID":  id,
            "DescConsecutivo": tipoConsec,
            "ValorConsecutivo": valorConsecutivo,
            "PoseePrefijo": poseePref,
            "PrefijoDesc": prefijoDesc,
            "PoseeRango": poseeRango,
            "RangoInicial": rangoInicial,
            "RangoFinal": rangoFinal
        }
    }

    await axios(config).then(resul =>{
        console.log(resul.status)
        if(resul.status === 201){
            alert('modificado')
            console.log(usuario)
        }
    }).catch(err=>{console.log(err)})
}