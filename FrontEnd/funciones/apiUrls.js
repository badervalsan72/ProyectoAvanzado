var url = 'http://localhost:3001/api'
var usuariosUrl = url + '/usuarios'
var usuariosValidacion = url + '/usuarios/validar'
var usuarioValCorreoUser = url + '/usuarios/validarCorreoUsuario'
var cambioRolUser = url + '/usuarios/cambioRol'
var cambioPassUser = url + '/usuarios/cambioPass'
var consecutivosUrl = url + '/consecutivos'
var rolesUrl = url + '/roles'
var puertasUrl = url + '/puertasAeropuerto'
var paisesUrl = url + '/paises'
var aerolineasUrl = url + '/aerolineas'
var puertas_activasUrl = url + '/puertasActivas'
var aerolineas_paisUrl = url + '/aerolineas_pais'
var bitacoraUrl = url + '/bitacora'
var vuelosUrl = url + '/vuelos'
var reservasUrl = url + '/reserva'
var boletosUrl = url + '/boletos'
var comprasUrl = url + '/compras'



//clientes
var clientesUrl = url + '/clientes'
var existeTarjeta = url + '/tarjetas/existe'
var tarjetasUrl = url + '/tarjetas'

var clienteValUsuarioRegistro = url + '/usuarios/validarUsuarioRegistro'
var clienteValCorreoClient = url + '/cliente/validarCorreoCliente'
var clienteValidacion = url + '/cliente/validar'

var llegadavuelosUrl = url + '/llegadavuelos'
var salidavuelosUrl = url + '/salidavuelos'

//api pagos
let urlPagos = 'http://localhost:5000/api'
let loginApiPagos = urlPagos + '/login'
let pagosApiPagos = urlPagos + '/pagoTarjeta'


var mapeo = new Map()
mapeo.set(4, 'administrador')
mapeo.set(5, 'seguridad')
mapeo.set(6, 'mantenimiento')
mapeo.set(7, 'consultas')

var mapeoInverso = new Map()
mapeoInverso.set('administrador', 4)
mapeoInverso.set('seguridad', 5)
mapeoInverso.set('mantenimiento', 6)
mapeoInverso.set('consultas', 7)

module.exports = {

    usuariosUrl,
    consecutivosUrl,
    rolesUrl,
    usuarioValCorreoUser,
    usuariosValidacion,
    cambioPassUser,
    mapeo,
    cambioRolUser,
    puertasUrl,
    paisesUrl,
    aerolineasUrl,
    puertas_activasUrl,
    aerolineas_paisUrl,
    bitacoraUrl,
    vuelosUrl,
    clientesUrl,
    existeTarjeta,
    tarjetasUrl,
    llegadavuelosUrl,
    salidavuelosUrl,
    loginApiPagos,
    pagosApiPagos,
    clienteValCorreoClient,
    clienteValidacion,
    reservasUrl,
    boletosUrl,
    comprasUrl,
    clienteValUsuarioRegistro
}