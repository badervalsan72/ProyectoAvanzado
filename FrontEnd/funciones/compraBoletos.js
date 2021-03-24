async function mostrarTarjeta(){
    document.getElementById('divPaypal').style.display = "none"

    document.getElementById('divTarjeta').style.display = "block"
    document.getElementById('guardarTarj').style.display = "block"
    document.getElementById('cvv').style.display = "block"
    document.getElementById('tipoPagoDropdown').innerHTML = "Tarjeta de Credito/Debito"

    let id = await getCliente()
    console.log({id})
    let existe = await existeTarj(id)
    console.log({existe})
    if(existe === 'true'){
        document.getElementById('existentes').style.display = "block"
        document.getElementById('mensaje').style.display = 'block'
        document.getElementById('mensaje').innerHTML = 'existen tarjeta relacionadas'
        //document.getElementById('dropdownTarjetaBody').value = ""
        $('#dropdownTarjetaBody').children().remove(); 
        await cargaTarjetas()
    } else {
        document.getElementById('mensaje').style.display = 'block'
        document.getElementById('mensaje').innerHTML = 'no existen tarjeta relacionadas'
    }

}

async function mostrarPaypal(){
    document.getElementById('divPaypal').style.display = "block"
    
    document.getElementById('divTarjeta').style.display = "none"
    document.getElementById('guardarTarj').style.display = "none"
    document.getElementById('cvv').style.display = "none"
    document.getElementById('existentes').style.display = "none"

    document.getElementById('tipoPagoDropdown').innerHTML = "Paypal"
}

function visaSelected(){
    document.getElementById('tarjetasDropdown').innerHTML = "Visa"
}
function masterCardSelected(){
    document.getElementById('tarjetasDropdown').innerHTML = "MasterCard"
}

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

async function cargaTarjetas(){
    let id = await getCliente()
    await axios.get(tarjetasUrl+'/cliente/'+id).then(val=>{
        val.data.forEach(element => {
            console.log(element)
            let tipo
            if(element.TipoTarjeta === 'V'){
                tipo = 'Visa'
            } else if(element.TipoTarjeta === 'MC'){
                tipo = 'MasterCard'
            } else {
                tipo = element.TipoTarjeta
            }
            let str = element.NumTarjeta.replace(/.(?=.{4})/g, 'X')
            //console.log(str)
            $('#dropdownTarjetaBody').append(`<a class="dropdown-item" id="aerolineaOption" onclick="seleccionTarjeta(`+element.CodigoTarjeta+`)">
            `+str+` - `+element.MesExp+`/`+element.AnnoExp+` - `+tipo+`</a>`)

        });
    }).catch(err=>{
        console.log(err)
    })

}

async function borrarInfo(){
    document.getElementById('numero').value = ''
    document.getElementById('cvvInput').value = ''
    document.getElementById('tarjetasDropdown').innerHTML = ''
    document.getElementById('mes').value = ''
    document.getElementById('anno').value = ''
}

async function seleccionTarjeta(value){
    let id = await getCliente()
    await axios.get(tarjetasUrl+'/cliente/'+id).then(val=>{
        val.data.forEach(element => {
            
            if(element.CodigoTarjeta === value){
                
                document.getElementById('numero').value = element.NumTarjeta
                document.getElementById('cvvInput').value = element.CVV
                if(element.TipoTarjeta === 'V'){
                    document.getElementById('tarjetasDropdown').innerHTML = 'Visa'
                } else if(element.TipoTarjeta === 'MC'){
                    document.getElementById('tarjetasDropdown').innerHTML = 'MasterCard'
                } else {
                    document.getElementById('tarjetasDropdown').innerHTML = element.TipoTarjeta
                }
                document.getElementById('mes').value = element.MesExp
                document.getElementById('anno').value = element.AnnoExp
            }

            /*
                AnnoExp: 23
                CVV: 123
                Cliente: 2
                CodigoTarjeta: 1
                MesExp: 12
                NumTarjeta: "4111111111111111"
                TipoTarjeta: "Visa"
            */

        })
    }).catch(err=>{
        console.log(err)
    })
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

async function calcularTotal(){
    let pais = document.getElementById('vueloInput').value
    let cant = document.getElementById('cantidad').value

    await axios.get(vuelosUrl+'/'+pais).then(resul =>{

        let total = cant * resul.data.Precio
        document.getElementById('total').value = total

    }).catch(err=>{console.log(err)})

}

async function getCliente(){
    let usuario = ""
    let correo = ""
    usuario = sessionStorage.getItem('usuario')
    correo = sessionStorage.getItem('correo')
    console.log({usuario}, {correo})
    let id

    if(usuario === '' || correo === ''){
        alert('ingrese nuevamente')
        window.location.replace('../frontend/IngresoCompra_Cliente.html')
    } else if(usuario) {
        await axios.get(clientesUrl).then(val =>{
            val.data.forEach(element => {
                //console.log({element}, {usuario})
                if(element.Usuario === usuario ){
                    console.log(element.ClienteID)
                    id = element.ClienteID
                }
            })
        }).catch(err=>{console.log(err)})

    } else if(correo){
        //console.log('test')
        await axios.get(clientesUrl).then(val =>{
            val.data.forEach(element => {
                if(element.CorreoElectronico === correo ){
                    id = element.ClienteID
                }
            })
        }).catch(err=>{console.log(err)})

    }
    console.log(id)
    return id
}


async function existeTarj(val){
    let resul

    const config = {
        method: 'get',
        url: existeTarjeta+'/'+val,
    }

    await axios(config).then(value =>{
        console.log(value.data)
        resul = value.data
    }).catch(err=>{console.log(err)})

    return resul
}

async function camposVacios(){
    let id = await getCliente()
    let numero = document.getElementById('numero').value
    let cvv = document.getElementById('cvvInput').value
    let tipo = document.getElementById('tarjetasDropdown').innerHTML

    if(id && numero && cvv && tipo){
        return false
    } else {
        return true
    }
}

async function guardarTarj(){
    let id = await getCliente()
    let numero = document.getElementById('numero').value
    let cvv = document.getElementById('cvvInput').value
    let tipo = document.getElementById('tarjetasDropdown').innerHTML

    let mes = document.getElementById('mes')
    let anno = document.getElementById('anno')
    let mesSelec = mes.options[mes.selectedIndex].value
    let annoSelec = anno.options[anno.selectedIndex].value

    let date = new Date()

    if(parseInt(annoSelec) < parseInt(date.getFullYear().toString().substr(-2))){
        alert('año menor que el actual')
        return false
    } else if(parseInt(annoSelec) === parseInt(date.getFullYear().toString().substr(-2)) && parseInt(mesSelec) < date.getMonth()+1){
        alert('el mes es menor que el mes actual')
        return false
    }

    let vacio = await camposVacios()

    if(vacio){
        alert('hay campos vacios')
        return false
    }

    if(tipo === 'Seleccione'){
        alert('seleccione un tipo de CC')
        return false
    }
    
    let tipoF
    if(tipo === 'Visa'){
        tipoF = 'V'
    } else if(tipo ==='MasterCard'){
        tipoF = 'MC'
    }

    const config = {
        method: 'post',
        url: tarjetasUrl,
        data: {
            NumTarjeta: parseInt(numero),
            MesExp: parseInt(mesSelec),
            AnnoExp: parseInt(annoSelec),
            Cvv: parseInt(cvv),
            TipoTarjeta: tipoF,
            Cliente: id
        }
    }

    //console.log(config)
    await axios(config).then(resul =>{
        console.log(resul.data)
        alert('guardado')
        window.reload()
    }).catch(err=>{err})
}

async function hacerPagoTarjeta(){

    let usuario = sessionStorage.getItem('usuario')
    let correo = sessionStorage.getItem('correo')
    
    let monto = document.getElementById('total').value
    let numero = document.getElementById('numero').value
    let cvv = document.getElementById('cvvInput').value
    let tipo = document.getElementById('tarjetasDropdown').innerHTML

    let mes = document.getElementById('mes')
    let anno = document.getElementById('anno')
    let mesSelec = mes.options[mes.selectedIndex].value
    let annoSelec = anno.options[anno.selectedIndex].value

    let date = new Date()

    if(parseInt(annoSelec) < parseInt(date.getFullYear().toString().substr(-2))){
        alert('año menor que el actual')
        return false
    } else if(parseInt(annoSelec) === parseInt(date.getFullYear().toString().substr(-2)) && parseInt(mesSelec) < date.getMonth()+1){
        alert('el mes es menor que el mes actual')
        return false
    }

    let vacio = await camposVacios()

    if(vacio){
        alert('hay campos vacios')
        return false
    }

    if(tipo === 'Seleccione'){
        alert('seleccione un tipo de CC')
        return false
    }
    
    let tipoF
    if(tipo === 'Visa'){
        tipoF = 'V'
    } else if(tipo ==='MasterCard'){
        tipoF = 'MC'
    }

    let token
    if(usuario || correo){
        const configToken= {
            method: 'post',
            url: loginApiPagos,
            data: {
                auth: true
            }
        }
        token = await axios(configToken).catch(err=>{console.log(err)})
    } else {
        alert('ingrese nuevamente')
        window.location.replace('../frontend/IngresoCompra_Cliente.html')
    }

    const config = {
        method: 'post',
        url: pagosApiPagos,
        headers: {
            'Authorization': 'Bearer '+token.data.token
        },
        data: {
            numero: parseInt(numero),
            mes: parseInt(mesSelec),
            anno: parseInt(annoSelec),
            cvv: parseInt(cvv),
            tipo: tipoF,
            monto: monto
        }
    }

    //console.log(config)
    await axios(config).then(async resul =>{
        alert(resul.data.mensaje)

        let codigoCompra = await crearID(5)
        let cant = document.getElementById('cantidad').value
        let cliente = await getCliente()
        let vuelo = document.getElementById('vueloInput').value

        const configCompras = {
            method: 'post',
            url: comprasUrl,
            data: {
                codigoCompra: codigoCompra,
                codigoResul: parseInt(resul.data.codigo),
                cliente: parseInt(cliente),
                monto: parseInt(monto)
            }
        }
        console.log(configCompras)
        await axios(configCompras).then(val =>{
            console.log(val.data, 'insert en compras')
        }).catch(err=>{
            console.log(err)
        })
        
        if(resul.data.codigo === 0){
            const configBoletos = {
                method: 'post',
                url: boletosUrl,
                data: {
                    cant: parseInt(cant),
                    codigoCompra: codigoCompra,
                    cliente: parseInt(cliente),
                    descripcion: 'compra de '+cant+' para el cliente: '+cliente,
                    vuelo: parseInt(vuelo)
                }
            }
            
            await axios(configBoletos).then(val =>{
                console.log(val.data, 'test')
            }).catch(err=>{
                console.log(err)
            })
            
            window.location.replace('../frontend/Inicio_Cliente.html')
        }
    }).catch(err=>{
        console.log(err)
    })

}

async function compraPaypal(){
    let total = document.getElementById('total').value
    if(total){
        const config = {
            method: 'post',
            url: 'http://localhost:5000/api/pay',
            data: {
                monto: total
            }
        }
        await axios(config).then(val=>{
            if(val.status === 200){
                console.log(val.data)
                window.location = val.data.forwardLink
            } else {
                alert('issue')
            }
        }).catch(err=>{
            console.log(err)
        })
    } else {
        alert('no hay cantidad seleccionada')
        return false
    }
}

async function crearID(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
 }