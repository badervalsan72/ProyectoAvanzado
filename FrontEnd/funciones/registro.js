var axios = require('axios')
const { get } = require('https')

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
        url: clienteValCorreoClient,
        data: {
            "username": username
        }
    }

    var existeCorreo;
    var existeUsuario;

    await axios(config).then(value => {
        console.log(value.data)
        if (value.data.existeCorreo > 0) {
            alert('Este Correo Electrónico ya existe')
            existeCorreo = true
            return true
        } else {
            existeCorreo = false
        }
        if (value.data.existeUsuario > 0) {
            alert('Este Nombre de Usuario ya existe')
            existeCorreo = true
            return true
        } else {
            existeUsuario = false
        }

    }).catch(err => { console.log(err) })

    if (existeCorreo === false && existeUsuario === false) {
        console.log('Cliente Creado')
        await agregarCliente().catch(err => { console.log(err) })
        window.location.replace('../index.html')
    }
}


// Agregar un cliente a la BD
async function agregarCliente() {

    Console.log("agregando cliente...");

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
        nombre, apellidos, correo, usuario, pass
    )

    await axios(config).then(value => {
        console.log(value)
    }).catch(err => { console.log(err) })


    console.log("Cliente Creado")

    alert("Cliente Creado")

}