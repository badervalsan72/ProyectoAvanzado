//dependencies
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const sql = require('mssql')
var app = express()
var router = express.Router()
const fileUpload = require('express-fileupload')

//references & models
//var Db = require('./operaciones/opsRoles')
var Rol = require('./models/rol')
var Usuario = require('./models/usuario')
var Consecutivo = require('./models/consecutivo')
var PuertaAeropuerto = require('./models/Puerta')
var Pais = require('./models/aerolinea')
var Vuelo = require('./models/vuelo')
var Cliente = require('./models/cliente')

//variables
const opsRoles = require('./operaciones/opsRoles')
const opsUsuarios = require('./operaciones/opsUsuarios')
const opsConsecutivos = require('./operaciones/opsConsecutivos')
const opsPuertas = require('./operaciones/opsPuertas')
const opsPais = require('./operaciones/opsPais')
const opsAerolinea = require('./operaciones/opsAerolinea')
const opsBitacora = require('./operaciones/opsBitacora')
const opsVuelo = require('./operaciones/opsVuelo')
const opsCliente = require('./operaciones/opsCliente')
const opsTarjetaCliente = require('./operaciones/opsTarjetaCliente')
const opsReserva = require('./operaciones/opsReserva')
const opsBoletos = require('./operaciones/opsBoletos')
const opsCompras = require('./operaciones/opsCompras')



//app setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())
app.use(cors())
app.use('/api', router)

//app listening on specific port
app.use(express.static(__dirname))
var server = app.listen(3001, () => {
    console.log('server is listening on port ', server.address().port)
})

//seting up routes
router.use((request, response, next) => {
    //console.log('middleware')
    next()
})

////////////////////////////////////////////////////////////////
/////////////////////////////ROLES//////////////////////////////
////////////////////////////////////////////////////////////////

//get todos los roles
router.route('/roles').get((request, response) => {

    opsRoles.getRoles().then(result => {
        response.json(result[0])

    }).catch((err) => { console.log(err) })
})

//get rol especifico por id
router.route('/roles/:id').get((request, response) => {

    opsRoles.getRol(request.params.id).then(result => {
        response.json(result[0])

    }).catch((err) => { console.log(err) })
})

//post rol
router.route('/roles').post((request, response) => {

    let rol = {...request.body }

    opsRoles.agregaRol(rol).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log(err) })
})

//delete rol
router.route('/roles/:id').delete((request, response) => {

    //let rol = {...request.body}

    opsRoles.borrarRol(request.params.id).then(result => {
        response.status(200).json(result)

    }).catch((err) => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////USUARIOS/////////////////////////////
//////////////////////////////////////////////////////////////////

//get todos los usuarios
router.route('/usuarios').get((request, response) => {

    opsUsuarios.getUsuarios().then(result => {
        response.json(result[0])

    }).catch((err) => { console.log(err) })
})

//get rol especifico por id
router.route('/usuarios/:id').get((request, response) => {

    opsUsuarios.getUsuario(request.params.id).then(result => {
        response.json(result[0])

    }).catch((err) => { console.log(err) })
})

//post usuario
router.route('/usuarios').post((request, response) => {

    let usuario = {...request.body }

    opsUsuarios.agregarUsuario(usuario).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log(err) })
})

//post usuario/validacion
router.route('/usuarios/validar').post((request, response) => {

    console.log(request.body)

    opsUsuarios.validarUsuario(request.body.nombre, request.body.password).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})

//post usuario/validacionCorreo
router.route('/usuarios/validarCorreoUsuario').post((request, response) => {

    //console.log(request.body)

    opsUsuarios.validarCorreoUsuario(request.body.correo, request.body.usuario).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})


router.route('/usuarios/validarUsuarioRegistro').post((request, response) => {

    //console.log(request.body)

    opsUsuarios.validarUsuarioRegistro(request.body.correo, request.body.usuario).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})

//endpoint para cambio de pass
router.route('/usuarios/cambioPass').post((request, response) => {

    opsUsuarios.updatePass(request.body.usuario, request.body.password).then(result => {
        response.status(201).json(result)

    }).catch(err => { console.log(err) })

})

router.route('/usuarios/cambioRol').post((request, response) => {

    opsUsuarios.updateRol(request.body.usuario, request.body.rol).then(result => {
        response.status(201).json(result)

    }).catch(err => { console.log(err) })

})

//delete usuario
router.route('/usuarios/:id').delete((request, response) => {

    //let rol = {...request.body}

    opsRoles.borrarRol(request.params.id).then(result => {
        response.status(200).json(result)

    }).catch((err) => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////CONSECUTIVOS/////////////////////////
//////////////////////////////////////////////////////////////////

//get todos los roles
router.route('/consecutivos').get((request, response) => {

    opsConsecutivos.getConsecutivos().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//get un consecutivo por id
router.route('/consecutivos/:id').get((request, response) => {

    opsConsecutivos.getConsecutivo(request.params.id).then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//post(agregar) un consecutivo
router.route('/consecutivos').post((request, response) => {

    let consecutivo = {...request.body }

    opsConsecutivos.agregarConsecutivo(consecutivo).then(result => {
        response.status(201).json(result)

    }).catch((err) => {
        console.log({ err })
        response.status(400)
    })

})

router.route('/consecutivos').put((request, response) => {
    let consecutivo = {...request.body }

    opsConsecutivos.actualizarConsec(consecutivo).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log({ err }) })
})

router.route('/consecutivos').delete((request, response) => {
    opsConsecutivos.borrarConsecutivo(request.body.id).then(result => {

        console.log('borrado')
        response.status(200).json(result)

    }).catch(err => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////PuertasAeropuerto////////////////////
//////////////////////////////////////////////////////////////////

//get todos los roles
router.route('/puertasAeropuerto').get((request, response) => {

    opsPuertas.getPuertas().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//get un consecutivo por id
router.route('/puertasAeropuerto/:id').get((request, response) => {

    opsPuertas.getPuerta(request.params.id).then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

router.route('/puertasAeropuerto').post((request, response) => {
    console.log(request.body)
    opsPuertas.insertPuerta(request.body.numero, request.body.detalle).then(result => {
        response.status(201).json(result)

    }).catch(err => {
        console.log(err)
        response.status(400)
    })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////Pais////////////////////////////////
/////////////////////////////////////////////////////////////////

//get todos los pais
router.route('/paises').get((request, response) => {

    opsPais.getPaises().then(async result => {
        //
        await result.forEach(element => {
            element.forEach(ele => {
                //console.log(ele.ImagenPais)

                const b64 = Buffer.from(ele.ImagenPais).toString('base64');
                // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
                const mimeType = 'image/png'; // e.g., image/png
                ele['imagen'] = `<img src="data:${mimeType};base64,${b64}" style="width: 50px; height: 50px;"/>`
            })
        })

        response.json(result[0])


        //console.log(result)
    }).catch((err) => { console.log(err) })

})

//get un pais por id
router.route('/paises/:id').get((request, response) => {

    opsPais.getPais(request.params.id).then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

router.route('/paises').post((request, response) => {

    const { name, data } = request.files.pic

    opsPais.insertPais(request.body.nombrePais, data, name).then(result => {
        response.status(201).json(result)

    }).catch(err => {
        console.log(err)
        response.send(400)
    })

})


router.route('/paises').delete((request, response) => {
    opsPais.borrarPaises(request.body.id).then(result => {

        console.log('borrado')
        response.status(200).json(result)

    }).catch(err => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////Aerolinea///////////////////////////
/////////////////////////////////////////////////////////////////

//get todas las Aerolineas
router.route('/aerolineas').get((request, response) => {

    opsAerolinea.getAerolineas().then(async result => {
        //
        await result.forEach(element => {
            element.forEach(ele => {
                //console.log(ele.ImagenPais)

                const b64 = Buffer.from(ele.ImagenAerolinea).toString('base64');
                // se cambia el tipo de imagen
                const mimeType = 'image/png';
                ele['imagen'] = `<img src="data:${mimeType};base64,${b64}" style="width: 50px; height: 50px;"/>`
            })
        })

        response.json(result[0])


        //console.log(result)
    }).catch((err) => { console.log(err) })

})

//get una Aerolinea por id
router.route('/aerolineas/:id').get((request, response) => {

    opsAerolinea.getAerolinea(request.params.id).then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

router.route('/aerolineas').post((request, response) => {

    const { name, data } = request.files.pic
    console.log(request.body.pais)

    opsAerolinea.insertAerolinea(request.body.nombreAerolinea, data, request.body.pais).then(result => {
        response.sendStatus(201)

    }).catch(err => {
        console.log(err)
        response.sendStatus(400)
    })

})


router.route('/aerolineas').delete((request, response) => {
    opsAerolinea.borrarAerolinea(request.body.id).then(result => {

        console.log('borrado')
        response.status(200).json(result)

    }).catch(err => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////BITACORA/////////////////////////
//////////////////////////////////////////////////////////////////

router.route('/bitacora').get((request, response) => {

    opsBitacora.getBitacoras().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//post(agregar) un registro a bitacora
router.route('/bitacora').post((request, response) => {

    let registro = {...request.body }

    opsBitacora.agregarRegistro(registro).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log({ err }) })

})


//////////////////////////////////////////////////////////////////
/////////////////////////////PuertasActivas////////////////////
//////////////////////////////////////////////////////////////////

//get PuertasActivas
router.route('/puertasActivas').get((request, response) => {
    opsPuertas.getPuertas_Activas().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})


//////////////////////////////////////////////////////////////////
/////////////////////////////Vuelos///////////////////////////////
//////////////////////////////////////////////////////////////////

//get vuelos
router.route('/vuelos').get((request, response) => {

    opsVuelo.getVuelos().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

router.route('/vuelos/:id').get((request, response) => {

    opsVuelo.getVuelo(request.params.id).then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

router.route('/vuelos').post((request, response) => {

    let vuelo = {...request.body }

    opsVuelo.insertarVuelo(vuelo).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log(err) })

})

router.route('/vuelos').put((request, response) => {
    let vuelo = {...request.body }

    opsVuelo.actualizarVuelo(vuelo).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log({ err }) })
})

router.route('/vuelos').delete((request, response) => {
    opsVuelo.borrarVuelo(request.body.id).then(result => {

        console.log('borrado')
        response.status(200).json(result)

    }).catch(err => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////LLegadaVuelos////////////////////
//////////////////////////////////////////////////////////////////

//get LLegadaVuelos
router.route('/llegadavuelos').get((request, response) => {
    opsVuelo.getLlegadaVuelos().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////SALIDAVuelos////////////////////
//////////////////////////////////////////////////////////////////

//get salidaVuelos
router.route('/salidavuelos').get((request, response) => {
    opsVuelo.getSalidaVuelos().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////Clientes/////////////////////////////
//////////////////////////////////////////////////////////////////

//get clientes

router.route('/clientes').get((request, response) => {
    opsCliente.getClientes().then(result => {
        response.json(result[0])
    }).catch((err) => { console.log(err) })
})

//post cliente
router.route('/clientes').post((request, response) => {

    let cliente = {...request.body }

    opsCliente.agregarCliente(cliente).then(result => {
        response.status(201).json(result)

    }).catch((err) => { console.log(err) })
})

//post cliente/validacion
router.route('/cliente/validar').post((request, response) => {

    console.log(request.body)

    opsCliente.validarCliente(request.body.usuario, request.body.contrasena).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})

//post cliente/validacionCorreo
router.route('/cliente/validarCorreoCliente').post((request, response) => {

    //console.log(request.body)

    opsCliente.validarCorreoCliente(request.body.correo, request.body.usuario).then(result => {

        response.json(result)

    }).catch((err) => { console.log(err) })
})

//////////////////////////////////////////////////////////////////
/////////////////////////////Tarjetas del cliente/////////////////
//////////////////////////////////////////////////////////////////

//existe tarjetas

router.route('/tarjetas/existe/:id').get((request, response) => {

    opsTarjetaCliente.existeTarjetas(request.params.id).then(result => {
        console.log(result)
        response.json(result)
    }).catch((err) => { console.log(err) })


})

router.route('/tarjetas/cliente/:id').get((request, response) => {

    opsTarjetaCliente.getTarjetasCliente(request.params.id).then(result => {
        console.log(result)
        response.json(result)
    }).catch((err) => { console.log(err) })

})

router.route('/tarjetas').post((request, response) => {

    let tarjeta = {...request.body }
    console.log(tarjeta)

    opsTarjetaCliente.insertaTarjeta(tarjeta).then(result => {
        response.status(201).json(result)
    }).catch(err => { console.log(err) })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////Reserva//////////////////////////////
//////////////////////////////////////////////////////////////////

router.route('/reserva').post((request, response) => {

    let reserva = {...request.body }
        //console.log(tarjeta)

    opsReserva.insertReserva(reserva).then(result => {
        console.log(result)
        response.sendStatus(201)
    }).catch(err => {
        console.log(err)
        console.log('error en server.js')
    })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////Boletos//////////////////////////////
//////////////////////////////////////////////////////////////////

router.route('/boletos').post((request, response) => {

    let boleto = {...request.body }
        //console.log(tarjeta)

    opsBoletos.insertarBoleto(boleto).then(result => {
        console.log(result)
        response.sendStatus(201)
    }).catch(err => {
        console.log(err)
        console.log('error en server.js')
    })

})

//////////////////////////////////////////////////////////////////
/////////////////////////////Compras//////////////////////////////
//////////////////////////////////////////////////////////////////

router.route('/compras').post((request, response) => {

    let compra = {...request.body }
    console.log(compra)

    opsCompras.insertarCompra(compra).then(result => {
        console.log(result)
        response.sendStatus(201)
    }).catch(err => {
        console.log(err)
        console.log('error en server.js')
    })

})