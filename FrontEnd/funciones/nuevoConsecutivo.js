
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

async function nuevoConsecutivo(){
    let tipoConsec = document.getElementById('dropdownTipoConsecutivo').innerHTML
    let valorConsec = document.getElementById('valorConsecutivo').value
    let poseePrefijo = document.getElementById('poseePrefijo').checked
    let prefijoDesc = document.getElementById('prefijoDesc').value
    let poseeRango = document.getElementById('poseeRango').checked
    let rangoInicial = document.getElementById('rangoInicial').value
    let rangoFinal = document.getElementById('rangoFinal').value

    console.log('start')

    const config = {
        method: 'post',
        url: consecutivosUrl,
        data: {
            "DescConsecutivo": tipoConsec,
            "ValorConsecutivo": valorConsec,
            "PoseePrefijo": poseePrefijo,
            "PrefijoDesc": prefijoDesc,
            "PoseeRango": poseeRango,
            "RangoInicial": rangoInicial,
            "RangoFinal": rangoFinal
        }
    }

    let vacio = await camposVacios()
    if(vacio){
        alert('hay campos vacios')
    } else {

        await axios(config)
        .then(value=>{
            
            if(value.data === 400){
                alert('falta informacion o hay un error')
            } else {
                console.log('done', value.data)
                alert('consecutivo agregado')
                window.location.replace('./Consecutivos.html')
            }

        })
        .catch(err=>{console.log({err})})
    }
    
}

async function camposVacios(){
    let tipoConsec = document.getElementById('dropdownTipoConsecutivo').innerHTML
    let valorConsec = document.getElementById('valorConsecutivo').value
    let poseePrefijo = document.getElementById('poseePrefijo').checked
    let prefijoDesc = document.getElementById('prefijoDesc').value
    let poseeRango = document.getElementById('poseeRango').checked
    let rangoInicial = document.getElementById('rangoInicial').value
    let rangoFinal = document.getElementById('rangoFinal').value
    
    let vacio = false
    
    if (tipoConsec === ''){
        vacio = true
    } else {
        if(valorConsec === ''){
            vacio = true
        } else {
            if(poseePrefijo && prefijoDesc === ''){
                vacio = true
            } else {
                if(poseeRango && (rangoInicial === '' || rangoFinal === '')){
                        vacio = true
                }
            }
        }
    }
    
    console.log(vacio)
    return vacio
}

async function agregarABitacora(){
    let codigo = document.getElementById('valorConsecutivo').value;
    var tipo = "Agregar"; 
    var des = "Insertó consecutivo";
    let prefijo = document.getElementById('prefijoDesc').value;
    let d = + new Date();
    console.log(d);
    //let d2 = new Date(d)
    //console.log(d2);

    console.log('Start adding registro to bitacora')

    const config = {
        method: 'post',
        url: bitacoraUrl,
        data: {  
            "DateTime": d,
            "CodigoRegistro": codigo,
            "TipoRegistro": tipo,
            "Descripcion": des,
            "RegistroDetalle": prefijo
        }
    }

    await axios(config)
    .then(value=>{
        console.log('done', value)
        alert('Registro agregado a bitacora')
    })
    .catch(err=>{console.log({err})})
}
    