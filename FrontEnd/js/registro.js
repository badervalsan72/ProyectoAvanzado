var axios = require('axios')
const { get } = require('https')

const postUsuario = function(TheUrl, nombreUsuario) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var contenido = JSON.stringify({
        "username": nombreUsuario
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: contenido,

    };

    fetch(TheUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

async function registrarse() {
    let nombre = document.getElementById('nombre').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let passwd = document.getElementById('passwd').value;
    let rol = 5;

    console.log('REGISTRO');

    const config = {
        method: 'post',
        url: 'http://localhost:8090/api/Usuarios/validarUsuario',
        //url: validarUsuariosUrl,
        data: {
            username: username
        }
    }

    console.log("username: " + username);

    console.log("config: " + config);

    //REVISAR POR QUE ES COMO SI LA CONSULTA DE AXIOS(CONFIG) NUNCA SE COMPLETARA

    /*await axios(config).then(value => {
        console.log('REGISTRO00000000000000000000000');
        console.log(value.data);
        if (value.data.cantusers > 0) {

            console.log("Usuario ya existente");

        } else {
            console.log("Usuario nuevo");
            alert('Nuevo usuario!');
        }
    }).catch(err => { console.log(err) })*/

    postUsuario(validarUsuariosUrl, username);
}