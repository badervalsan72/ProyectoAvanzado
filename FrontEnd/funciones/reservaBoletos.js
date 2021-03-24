async function cargaVuelos(){
    await axios.get(vuelosUrl).then(value =>{
        value.data.forEach( async element => {
            let pais = await getNombrePais(element.Pais)
            //console.log(element)
            
            if(element.Accion === 'Salida'){
                $('#dropdownVueloBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionVuelo(`+element.VueloID+`)">`+pais+`</a>`)
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}

async function seleccionVuelo(value){

    document.getElementById('vueloInput').value = value
    //console.log(value)

    document.getElementById('cantidad').value = ''
    document.getElementById('total').value = ''

    let res= await axios.get(vuelosUrl+'/'+value).catch(err=>{console.log(err)})
    let pais = await axios.get(paisesUrl+'/'+res.data.Pais).catch(err=>{console.log(err)})
    
    //console.log(pais.data)
    document.getElementById('dropdownVuelo').innerHTML = pais.data.NombrePais
}

async function getNombrePais(val){
    let resul = await axios.get(paisesUrl).catch(err=>{console.log(err)})
    let nombrePais

    resul.data.forEach(element => {
        if(element.PaisID === val){
            nombrePais = element.NombrePais
        }
    })

    return nombrePais
}

async function camposVacios(){
    let cant = document.getElementById('cantidad').value
    let booking = document.getElementById('booking').value
    let total = document.getElementById('total').value
    let mensaje = document.getElementById('mensaje').value
    let destino = document.getElementById('vueloInput').value

    if(cant && booking && total && mensaje && destino){
        return false
    } else {
        return true
    }

}

async function reservar(){
    let cant = document.getElementById('cantidad').value
    let booking = document.getElementById('booking').value
    let total = document.getElementById('total').value
    let mensaje = document.getElementById('mensaje').value
    let destino = document.getElementById('vueloInput').value

    let vacio = await camposVacios()

    if(vacio === false){
        console.log(cant, booking, total, mensaje, destino)
        const config={
            method: 'post',
            url: reservasUrl,
            data: {
                ReservaID: booking,
                cant: cant,
                total: total,
                mensaje: mensaje,
                pais: destino
            }
        }
        
        await axios(config).then(val=>{
            if(val.data === 'Created'){
                alert('creada la reserva. apunte su BookingID que es: '+ booking)
            } else {
                alert('error')
            }
        }).catch(err=>{
            console.log(err)
        })
    } else {
        alert('campos vacios')
    }
}

async function calcularTotal(){
    let pais = document.getElementById('vueloInput').value
    let cant = document.getElementById('cantidad').value

    await axios.get(vuelosUrl+'/'+pais).then(resul =>{

        let total = cant * resul.data.Precio
        document.getElementById('total').value = total

    }).catch(err=>{console.log(err)})

}

async function crearID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById('booking').value = result;
 }