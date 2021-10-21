console.log('corriendo mensaje')


const limpiarMensaje = () => {    
    document.getElementById('messageText').value = '';      
}

const guardarMensaje = async () => {    
    const mensajeText = document.getElementById('messageText').value;  
    
    console.log(mensajeText)
    if(mensajeText==''){
        return alert('Debe ingresar ID');
    }

    const mensaje = {        
        messageText:mensajeText        
    }

    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Message/save',{
            method:'POST',   
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(mensaje) 
            })
            const res = await datos.text();
            console.log(res)
    } catch (error) {
        console.log(error)
    }
   
    
    cargarMensaje();
    limpiarMensaje();
    showToast('guardar','mensaje')
}

const cargarMensaje = async () => {
    const datos = await fetch('http://168.138.233.89:8080/api/Message/all')
    const respuesta = await datos.json();
    //console.log(respuesta)
    
    const tablaMensaje = document.getElementById('tablaMensaje');
    let stringMensaje = '';
    respuesta.forEach(element => {   
           
        stringMensaje += `
        <tr>            
            <td>${element.messageText}</td>                      
            <td onclick="eliminarMensaje(${element.idMessage})"><i class="bi bi-trash rojo pointer" name="eliminar"></i></td>
            <td><span onclick="cargarDatosModalMensaje(${element.idMessage})" class="azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModalMensaje">Ver</span> <i onclick="cargarDatosModalMensaje(${element.id})" class="bi bi-eye azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModalMensaje"></i></td>
            
         </tr> 
        `;
    });
    tablaMensaje.innerHTML = stringMensaje;
    
}

window.onload = cargarMensaje();


const eliminarMensaje = async (id) => {
    console.log(id)
    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Message/'+id,{
        method:'DELETE',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({id}) 
        })
        const res = await datos.text();
        console.log(res)
    } catch (error) {
        console.log(error)
    }
    
    cargarMensaje();
    showToast('eliminar','');
}


const actualizarMensaje = async (id) => {
    console.log(id)
    const idMensajeUpdate = document.getElementById('idMensajeUpdate').value;
    const nameMensajeUpdate = document.getElementById('nameMensajeUpdate').value;
  
    

    const mensaje = {
        idMessage:idMensajeUpdate,
        messageText:nameMensajeUpdate == null ? '' : nameMensajeUpdate,              
    }
    console.log(mensaje)

    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Message/update',{
            method:'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(mensaje) 
        });
        const res = await datos.text();
        cargarMensaje();
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
  
const cargarDatosModalMensaje = async (id) => {
    console.log(id)
    const modalBody = document.getElementById('modalBodyMensaje');
    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Message/'+id);
        const res = await datos.json();
        modalBody.innerHTML = `
        <div class="col-sm-4 mt-3">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="idMensajeUpdate" value="${res.idMessage}" placeholder="id" disabled>
            <label for="floatingInput">Id</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nameMensajeUpdate" value="${res.messageText}" placeholder="mensaje" required>
            <label for="floatingPassword">Nombre</label>
          </div>             
      </div>
        `;
        
    } catch (error) {
        console.log(error)
    }
}