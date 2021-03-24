var axios = require('axios')

async function agregarLista(){
    console.log('start')
    console.log(usuariosUrl)
    await axios.get(usuariosUrl)
        .then(value=>{
            value.data.forEach(element => {
                //console.log(element.Rol)
                $('#listaUsuarios').append(`<option onclick="marcarRoles(this.innerHTML, `+element.Rol+`)">`+element.NombreUsuario+`</option>`)
            })
        })
        .catch(err=>{
            console.log(err)
        })
}

async function marcarRoles(nombre, rol){
    
    let resul = mapeo.get(rol)

    document.getElementById('administrador').checked = false
    document.getElementById('seguridad').checked = false
    document.getElementById('mantenimiento').checked = false
    document.getElementById('consultas').checked = false

    document.getElementById(resul).checked = true
    usuarioSeleccionado = nombre
    
    console.log(nombre)
}

async function actualizarRoles(){
    if(usuarioSeleccionado===""){
        alert('no hay nada seleccionado')
        return false
    } else {

        let nuevo = await verRolActualSelec()
        let rolSeleccionado = mapeoInverso.get(nuevo)
        console.log(usuarioSeleccionado, rolSeleccionado)

        const config={
            method: 'post',
            url: cambioRolUser,
            data: {
                usuario: usuarioSeleccionado,
                rol: rolSeleccionado
            }
        }

        axios(config).then(value=>{
            console.log('success', value)
            location.reload()
        }).catch(err=>{console.log(err)})
    }
}

async function verRolActualSelec(){
    let administrador = document.getElementById('administrador').checked
    let seguridad = document.getElementById('seguridad').checked
    let mantenimiento = document.getElementById('mantenimiento').checked
    let consultas = document.getElementById('consultas').checked

    let seleccionado
    let count =0

    if(administrador){
        seleccionado = 'administrador'
    } else {
        if(seguridad){
            seleccionado='seguridad'
        } else {
            if(mantenimiento){
                seleccionado = 'mantenimiento'
            } else {
                if(consultas){
                    seleccionado = 'consultas'
                } else {
                    alert('no se ha seleccionado')
                }
            }
        }
    }

    return seleccionado
    

}