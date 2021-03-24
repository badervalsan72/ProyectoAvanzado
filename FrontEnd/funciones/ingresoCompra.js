function mostrarUsuario(){
    document.getElementById('usuarioDiv').style.display = "block"
    document.getElementById('correoDiv').style.display = "none"
    document.getElementById('dropdownMenuButton').innerHTML = 'usuario'
}

function mostrarCorreo(){
    document.getElementById('correoDiv').style.display = "block"
    document.getElementById('usuarioDiv').style.display = "none"
    document.getElementById('dropdownMenuButton').innerHTML = 'correo'
}

function onSubmit(token) {
    document.getElementById("demo-form").submit();
}

async function validar(){
    let opcion = document.getElementById('dropdownMenuButton').innerHTML
    let pass = document.getElementById('pass').value
    let response = await axios.get(clientesUrl).catch(err=>{console.log(err)})
    console.log(response.data)
    let captcha = await grecaptcha.getResponse()
    //console.log(captcha)

    if(captcha === ''){
        alert('no olvide captcha')
        return false
    } else {
        if(opcion === 'usuario'){
            let usuario = document.getElementById('usuario').value
            response.data.forEach(element => {
                if(usuario === element.Usuario && pass === element.Contrasena){
                    alert('verificado')
                    sessionStorage.setItem('usuario', usuario)
                    window.location.replace('../frontend/CompraBoletos.html')
                } 
            })
        } else if (opcion === 'correo') {
            let correo = document.getElementById('correo').value
            response.data.forEach(element => {
                if(correo === element.CorreoElectronico && pass === element.Contrasena){
                    alert('verificado')
                    sessionStorage.setItem('correo', correo)
                    window.location.replace('../frontend/CompraBoletos.html')
                }
            })
        } else {
            alert('verifique la info')
        }
    }
}

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

}

async function ingresarGmail(){

    let response = await axios.get(clientesUrl).catch(err=>{console.log(err)})
    let captcha = await grecaptcha.getResponse()
    
    let resul

    var auth2 = await gapi.auth2.getAuthInstance();

    if(auth2.isSignedIn.get()){
        var profile = auth2.currentUser.get().getBasicProfile()
        let email = profile.getEmail()

        if(captcha === ''){
            alert('no olvide captcha')
            return false
        } else {
            response.data.forEach(cliente => {
                if(cliente.CorreoElectronico === email){
                    alert('verificado')
                    sessionStorage.setItem('correo', email)
                    window.location.replace('../frontend/CompraBoletos.html')
                } else {
                    resul = false
                }
            })
        }
    
        if(resul === false){
            alert('no existe cuenta asociada de gmail')
        }
    }
    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
}
