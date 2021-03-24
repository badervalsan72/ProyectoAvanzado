async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    let name = profile.getName()
    let nombreArray= name.split(' ')

    let nombre= nombreArray[0]
    let apellido= nombreArray[1]
    let email = profile.getEmail()

    let codigo = await crearID(5)
    let usuario = nombre+codigo

    let perfil = {
        nombre: nombre,
        apellido: apellido,
        correo: email,
        usuario: usuario,
        contrasena: 'temp123'
    }

    await crearCliente(perfil)

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
}

async function crearID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
 }

async function crearCliente(perfil){
    console.log('start')
    console.log(perfil)

    let correo = perfil.correo
    let usuario = perfil.usuario

    let existeCorreo = false
    let existeUsuario = false

    const config ={
        method: 'post',
        url: clienteValCorreoClient,
        data: {
            correo : correo, 
            usuario : usuario, 
        }
    }

    await axios(config).then(value=>{
        console.log(value.data)
        if(value.data.existeCorreo > 0){
            alert('Este Correo Electrónico ya existe')
            existeCorreo = false
            return false
        } else {
            existeCorreo = true
        }
        if(value.data.existeUsuario > 0){
            alert('Este Nombre de Usuario ya existe')
            existeCorreo = false
            return false
        } else {
            existeUsuario = true
        }
        
    }).catch(err=>{console.log(err)})
        
    if(existeCorreo ===true && existeUsuario ===true){
        console.log('Cliente Creado')
        await agregarCliente(perfil).catch(err=>{console.log(err)})
        window.location.replace('./Inicio_Cliente.html')
    }
}

// Agregar un cliente a la BD
async function agregarCliente(perfil){

    let nombre = perfil.nombre
    let apellidos = perfil.apellido
    let correo = perfil.correo
    let usuario = perfil.usuario
    let pass = perfil.contrasena

    const config = {
        method: 'post',
        url: clientesUrl,
        data: {
            "NombreCliente": nombre, 
            "Apellidos": apellidos,
            "CorreoElectronico": correo,
            "Usuario": usuario,
            "Contrasena": pass,
        }
    }

    console.log(
        nombre,apellidos,correo,usuario,pass
    )

    await axios(config).then(value=>{
        console.log(value)
    }).catch(err=>{console.log(err)})

    alert("Cliente Creado")

}

async function facebook(){
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
             console.log(response)
           console.log('INgreso de : ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    })
}