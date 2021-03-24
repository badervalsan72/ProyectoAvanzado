var axios = require('axios')

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

async function agregarAerolinea(){
    var formData = new FormData()

    formData.append('nombreAerolinea', document.getElementById('nombreAerolinea').value)
    formData.append('pic', document.getElementById('pic').files[0])
    formData.append('pais', document.getElementById('paisInput').value)

    const config = {
        method: 'post',
        url: aerolineasUrl,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
    }

    if(document.getElementById('paisInput').value === '' || document.getElementById('nombreAerolinea')===''){
        alert('campo vacio')
    } else {
        await axios(config).then(resul =>{
            console.log(resul.data)
            window.location.replace('../frontend/Aerolineas.html')
        }).catch(err=>{
            console.log(err)
            alert('error al insertar, revise los campos')
        })
    }

}
//BITACORA
async function agregarABitacoraAerolinea(){
    let codigo = document.getElementById('').value;
    var tipo = "Agregar"; 
    var des = "Insertó nueva aerolinea";
    let prefijo = document.getElementById('nombreAerolinea').value;
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
    