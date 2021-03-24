async function agregarPais(){

    var formData = new FormData()

    formData.append('nombrePais', document.getElementById('nombrePais').value)
    formData.append('pic', document.getElementById('pic').files[0])

    const config = {
        method: 'post',
        url: paisesUrl,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
    }

    if(document.getElementById('nombrePais').value === ''){
        alert('el nombre pais esta vacio')
    } else {
        await axios(config).then(resul=>{
            console.log(resul.data)
            if(resul.data===200){
                alert('agregado')
                window.location.replace('../frontend/Paises.html')
            } else {
                alert('error al agregar')
            }
        }).catch(err=>{
            console.log(err)
            alert('hay un error')
        })
    }

}

async function agregarABitacoraPaises(){
    let codigo1 = document.getElementById('pic').value;
    var tipo = "Agregar"; 
    var des = "Insertó pais";
    let prefijo = document.getElementById('nombrePais').value;
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
            //"CodigoRegistro": codigo,
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