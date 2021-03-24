var axios = require('axios')

async function cambioPass(){
    let passNueva = document.getElementById('passNueva').value
    let confirmarPass = document.getElementById('confirmarPass').value
    
    

    let newCookie = document.cookie.split(';')
    console.log(newCookie)
    let userName
    newCookie.forEach(element => {
        let test = element.split('=')
        console.log(test)
        if(test[0]===' usuario' || test[0]==='usuario'){
            userName= test[1]
        }
    })

    document.getElementById('usuarioDrop').innerHTML = userName
    

    let cookie = document.cookie.split('=')
    let usuarioNombre = cookie[1]
    
    let confirma = await validaPassAnterior()

    if(confirma){
        if(passNueva===confirmarPass){
            const config={
                method: 'post',
                url: cambioPassUser,
                data: {
                    usuario: userName,
                    //usuario: usuarioNombre,
                    password: passNueva
                }
            }
            await axios(config).then(value=>{
                console.log(value.data)
                alert('cambio completo')
            }).catch(err=>{console.log(err)})

            document.getElementById('confirmarPass').value = ''
            document.getElementById('passNueva').value = ''
            document.getElementById('passActual').value = ''        

        } else {
            alert('las contraseñas nuevas ingresadas no son iguales')
        }
    } else {
        alert('La contrasena actual ingresada es incorrecta o no existe para '+userName)
        return false
    }


}

async function validaPassAnterior(){
    let passActual = document.getElementById('passActual').value
    let cookie = document.cookie.split('=')
    let usuarioNombre = cookie[1]
    let confirmado

    console.log('start')
    const config ={
        method: 'post',
        url: usuariosValidacion,
        data: {
            nombre: usuarioNombre,
            password: passActual 
        }
    }

    await axios(config).then(value=>{
        //console.log('en axios', value.data[0].existe, usuarioNombre, passActual)
        if(value.data[0].existe > 0){
            confirmado = true
        } else {
            confirmado = false
        }
    })
    .catch(err=>{console.log(err)})
    
    console.log('finalizando', confirmado)
    return confirmado

}