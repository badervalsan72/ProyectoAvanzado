async function seleccionLlegada(){
    document.getElementById('dropdownAccion').innerHTML = "Llegada"
}
async function seleccionSalida(){
    document.getElementById('dropdownAccion').innerHTML = "Salida"
}

async function seleccionSalio(){
    document.getElementById('dropdownEstado').innerHTML = "Salio"
}

async function seleccionArribo(){
    document.getElementById('dropdownEstado').innerHTML = "Arribo"
}

async function seleccionDemorado(){
    document.getElementById('dropdownEstado').innerHTML = "Demorado"
}

async function seleccionConfirmado(){
    document.getElementById('dropdownEstado').innerHTML = "Confirmado"
}

async function seleccionAtiempo(){
    document.getElementById('dropdownEstado').innerHTML = "A Tiempo"
}



async function cargaPaises(){
    await axios.get(paisesUrl).then(value =>{
        value.data.forEach(element => {
            console.log(element.NombrePais)
            $('#dropdownPaisBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionPais(this.innerHTML)">`+element.NombrePais+`</a>`)
        })
    }).catch(err=>{
        console.log(err)
    })
}

async function cargaAerolineas(){
    await axios.get(aerolineasUrl).then(value =>{
        value.data.forEach(element => {
            console.log(element.NombreAerolinea)
            $('#dropdownAerolineaBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionAerolinea(this.innerHTML)">`+element.NombreAerolinea+`</a>`)
        })
    }).catch(err=>{
        console.log(err)
    })
}

async function cargaPuertas(){
    await axios.get(puertasUrl).then(value =>{
        value.data.forEach(element => {
            console.log(element.NumeroPuerta)
            $('#dropdownPuertaBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionPuerta(this.innerHTML)">`+element.NumeroPuerta+`</a>`)
        })
    }).catch(err=>{
        console.log(err)
    })
}

async function seleccionPais(value){
    console.log(value)
    document.getElementById('dropdownPais').innerHTML = value
    let id

    await axios.get(paisesUrl).then(resul =>{
        resul.data.forEach(element => {
            if(element.NombrePais === value){
                id = element.PaisID
                console.log(id)
            }
        })
    }).catch(err=>{
        console.log(err)
    })

    console.log(id)
    document.getElementById('paisInput').value = id
}

async function seleccionAerolinea(value){
    console.log(value)
    document.getElementById('dropdownAerolinea').innerHTML = value
    let id

    await axios.get(aerolineasUrl).then(resul =>{
        resul.data.forEach(element => {
            if(element.NombreAerolinea === value){
                id = element.AerolineaID
                console.log(id)
            }
        })
    }).catch(err=>{
        console.log(err)
    })

    console.log(id)
    document.getElementById('aerolineaInput').value = id
}

async function seleccionPuerta(value){
    console.log(value)
    document.getElementById('dropdownPuerta').innerHTML = value
    let id

    await axios.get(puertasUrl).then(resul =>{
        resul.data.forEach(element => {
            //console.log(element)
            if(element.NumeroPuerta === parseInt(value)){
                id = element.PuertaID
                console.log(id)
            }
        })
    }).catch(err=>{
        console.log(err)
    })

    console.log(id)
    document.getElementById('puertaInput').value = id
}

async function agregarVuelo(){
    
    
        let fecha = document.getElementById('fecha').value
        let hora = document.getElementById('hora').value
        let estadoVuelo = document.getElementById('dropdownEstado').innerHTML
        let precio = document.getElementById('precio').value
        let accion = document.getElementById('dropdownAccion').innerHTML
        let aerolinea = document.getElementById('aerolineaInput').value
        let pais = document.getElementById('paisInput').value
        let puerta = document.getElementById('puertaInput').value

    const config = {
        method: 'post',
        url: vuelosUrl,
        data: {
            Fecha: fecha,
            Hora: hora,
            EstadoVuelo: estadoVuelo,
            Precio: precio,
            Aerolinea: aerolinea,
            Pais: pais,
            PuertaAeropuerto: puerta,
            Accion: accion
        }
    }

    await axios(config).then(resul=>{
        console.log(resul.data)
    }).catch(err=>{console.log(err)})


}