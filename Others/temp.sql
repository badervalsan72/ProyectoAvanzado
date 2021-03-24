CREATE TABLE AEROLINEAS (

    AerolineaID varchar(100), 
    NombreAeroLinea varchar(100), 
    ImagenAeroLinea varchar(100), 
    Pais varchar(100)

)


CREATE TABLE BITACORA (

    BitacoraID varchar(100),
    FechaHora varchar(100),
    FechaHora varchar(100),
    CodigoRegistro varchar(100),
    TipoRegistro varchar(100),
    Descripcion varchar(100),
    RegistroDetalle varchar(100)

)

CREATE TABLE CLIENTES (

    ClienteID varchar(100),
    NombreCliente varchar(100),
    Apellidos varchar(100),
    CorreoElectronico varchar(100),
    Usuario varchar(100),
    Contrasena varchar(100)

)

CREATE TABLE CONSECUTIVOS (

    ConsecutivoID varchar(100),
    DescConsecutivo varchar(100),
    ValorConsecutivo varchar(100),
    PoseePrefijo varchar(100),
    PrefijoDesc varchar(100),
    PoseeRango varchar(100),
    RangoInicial varchar(100),
    RangoFinal varchar(100)
)

CREATE TABLE PAISES (

    PaisID varchar(100),
    NombrePais varchar(100),
    ImagenPais varchar(100),
    NombreImagen varchar(100)
)

CREATE TABLE PUERTAS (
    
    PuertaID varchar(100),
    NumeroPuerta varchar(100),
    DetallePuerta varchar(100)
)

CREATE TABLE ROLES (

    RolID varchar(100),
    NombreRol varchar(100),
    DescripcionRol varchar(100)
)

CREATE TABLE USUARIOS (

    NombreUsuario varchar(100),
	Nombre varchar(100), 
    Password varchar(100),
    PrimerApellido varchar(50), 
	SegundoApellido varchar(50), 
	CorreoElec varchar(100),
    Rol varchar(100)
)

CREATE TABLE VUELOS (

    VueloID varchar(100),
    Fecha varchar(100),
    Hora varchar(100),
    EstadoVuelo varchar(100),
    Pais varchar(100), 
    Aerolinea varchar(100),
    PuertaAeropuerto varchar(100),
    Precio varchar(100),
    Accion varchar(100)
)