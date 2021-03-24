const config = {
    user: 'admin',
    password: '123',
    server: '127.0.0.1',
    database: 'ServiciosWebDB',
    options: {
        trustedconnection: true,
        enableArithPort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
}

module.exports = config;