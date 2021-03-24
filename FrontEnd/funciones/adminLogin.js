var axios = require('axios')

async function validarUsuarios(){
    let usuario = document.getElementById('usuario').value
    let pass = document.getElementById('password').value
    document.cookie = "usuario="+usuario+"; path=/"
    console.log(document.cookie)
     

    const config = {
        method: 'post',
        url: usuariosValidacion,
        data: {
            nombre: usuario,
            password: pass
        }
    }

    await axios(config)
        .then(value=>{
            //console.log(value.data)
            if(value.data[0].existe>0){
                alert('existe')
                window.location.replace('./PaginaPrincipal_Usuario.html')
            } else {
                alert('el usuario no existe')
            }
        })
        .catch(err=>{console.log(err)})
    
}