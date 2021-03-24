var axios = require('axios')
const { get } = require('https')

async function crearUsuario(){
    let correo = document.getElementById('email').value
    let usuario = document.getElementById('usuario').value
    console.log('start')

    let existeCorreo = false
    let existeUsuario = false
    let camposVacios = await validarVacios()
    if(camposVacios){
        console.log({camposVacios})
        alert('hay campos vacios')
        return false
    }

    const config={
        method: 'post',
        url: usuarioValCorreoUser,
        data: {
            correo: correo,
            usuario: usuario
        }
    }

    await axios(config).then(value=>{
        console.log(value.data)
        if(value.data.existeCorreo > 0){
            alert('correo ya existe')
        } else {
            existeCorreo = true
        }
        if(value.data.existeUsuario > 0){
            alert('usuario ya existe')
        } else {
            existeUsuario = true
        }
        
    }).catch(err=>{console.log(err)})
        
    if(existeCorreo && existeUsuario){
        console.log('creado')
        await agregarUsuario().catch(err=>{console.log(err)})
        window.location.replace('./PaginaPrincipal_Usuario.html')
    }
}

async function validarVacios(){
    let usuario = document.getElementById('usuario').value
    let pass = document.getElementById('contrasena').value
    let correo = document.getElementById('email').value
    let pregunta = document.getElementById('pregunta_seguridad').value
    let respuesta = document.getElementById('respuesta_seguridad').value

    if(usuario == '' || pass == '' || correo == '' || pregunta == '' || respuesta == '' ){
        return true
    }
}

async function agregarUsuario(){
    let usuario = document.getElementById('usuario').value
    let pass = document.getElementById('contrasena').value
    let correo = document.getElementById('email').value
    let pregunta = document.getElementById('pregunta_seguridad').value
    let respuesta = document.getElementById('respuesta_seguridad').value

    const config = {
        method: 'post',
        url: usuariosUrl,
        data: {
            "NombreUsuario": usuario,
            "Password": pass,
            "CorreoElec": correo,
            "PregSeguridad": pregunta,
            "RespSeguridad": respuesta,
        }
    }

    console.log(
        usuario,pass,correo,pregunta,respuesta
    )

    await axios(config).then(value=>{
        console.log(value)
    }).catch(err=>{console.log(err)})



}