async function agregaPuerta(){
    let test = document.getElementById('Detalle')
    let selected = test.options[test.selectedIndex].text
    let numero = document.getElementById('numeroPuerta').value
    let nuevoNum = parseInt(numero)
    console.log(nuevoNum)

    const config = {
        method: 'post',
        url: puertasUrl,
        data: {
            numero: nuevoNum,
            detalle: selected
        }
    }

    await axios(config).then(value=>{
        console.log(value.data)
        if(value.data===400){
            alert('error al agregar. revise que exista un consecutivo y que los campos esten completos')
        } else {
            alert('agregado')
        }
    }).catch(err=>{
        console.log(err)
        
    })
}