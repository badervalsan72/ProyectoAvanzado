var axios = require('axios')
const { get } = require('https');

// Crear Cliente

var nombre = document.getElementById('nombre').value;
var apellido1 = document.getElementById('apellido1').value;
var apellido2 = document.getElementById('apellido2').value;
var email = document.getElementById('email').value;
var username = document.getElementById('username').value;
var passwd = document.getElementById('passwd').value;
var rol = 5;

async function crearCliente_Normal() {
    console.log('creando cliente')

    const config = {
        method: 'post',
        url: clienteValUsuarioRegistro,
        data: {
            "correo": email,
            "usuario": username
        }
    }

    console.log('creando cliente')
    var existeCorreo;
    var existeUsuario;
    console.log('creando cliente')
    await axios(config).then(value => {
        console.log(value.data)
        if (value.data.existeCorreo > 0) {
            alert('Este Correo Electrónico ya existe')
            console.log('creando cliente')
            existeCorreo = true
            return true
        } else {
            existeCorreo = false
        }
        if (value.data.existeUsuario > 0) {
            alert('Este Nombre de Usuario ya existe')
            console.log('creando cliente')
            existeCorreo = true
            return true
        } else {
            existeUsuario = false
        }
        console.log('creando cliente')
    }).catch(err => { console.log(err) })
    console.log('creando cliente')
    if (existeCorreo === false && existeUsuario === false) {
        console.log('Cliente Creado')
        await agregarCliente().catch(err => { console.log(err) })
        window.location.replace('../index.html')
    }
    console.log('creando cliente')
}


// Agregar un cliente a la BD
async function agregarCliente() {

    Console.log("agregando cliente...");

    const config = {
        method: 'post',
        url: clientesUrl,
        data: {
            "NombreCliente": nombre,
            "Apellidos": apellido1 + apellido2,
            "CorreoElectronico": email,
            "Usuario": usuario,
            "Contrasena": passwd,
        }
    }

    console.log(
        nombre, apellido1, apellido2, email, usuario, passwd
    )

    await axios(config).then(value => {
        console.log(value)
    }).catch(err => { console.log(err) })


    console.log("Cliente Creado")

    alert("Cliente Creado")

}