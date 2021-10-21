console.log('corriendo Cliente')


const limpiarCliente = () => {
    document.getElementById('idClient').value = '';
    document.getElementById('nameClient').value = '';
    document.getElementById('emailClient').value = '';
    document.getElementById('ageClient').value = '';    
}

const guardarCliente = async () => {
    const idClient = document.getElementById('idClient').value;
    const nameClient = document.getElementById('nameClient').value;
    const emailClient = document.getElementById('emailClient').value;
    const ageClient = document.getElementById('ageClient').value;
    
    console.log(idClient)
    if(idClient==''){
        return alert('Debe ingresar ID');
    }

    const cliente = {
        id:idClient,
        name:nameClient,
        email:emailClient,
        age:ageClient        
    }

    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',{
            method:'POST',   
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(cliente) 
            })
            const res = await datos.text();
            console.log(res)
    } catch (error) {
        console.log(error)
    }
   
    
    cargarCliente();
    limpiarCliente();
    showToast('guardar',nameClient)
}

const cargarCliente = async () => {
    const datos = await fetch('http://168.138.233.89:8080/api/Client/all')
    const respuesta = await datos.json();
    //console.log(respuesta)
    
    const tablaCliente = document.getElementById('tablaCliente');
    let stringCliente = '';
    respuesta.forEach(element => {   
        //console.log(element)     
        stringCliente += `
        <tr>
            <th scope="row">${element.idClient}</th>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>            
            <td onclick="eliminarCliente(${element.idClient})"><i class="bi bi-trash rojo pointer" name="eliminar"></i></td>
            <td><span onclick="cargarDatosModalCliente(${element.idClient})" class="azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModalCliente">Ver</span> <i onclick="cargarDatosModalCliente(${element.id})" class="bi bi-eye azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModalCliente"></i></td>
            
         </tr> 
        `;
    });
    tablaCliente.innerHTML = stringCliente;
    
}

window.onload = cargarCliente();


const eliminarCliente = async (id) => {
    console.log(id)
    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',{
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
    
    cargarCliente();
    showToast('eliminar','');
}


const actualizarCliente = async (id) => {
    console.log(id)
    const idClienteUpdate = document.getElementById('idClienteUpdate').value;
    const nameClienteUpdate = document.getElementById('nameClienteUpdate').value;
    const emailClienteUpdate = document.getElementById('emailClienteUpdate').value;
    const ageClienteUpdate = document.getElementById('ageClienteUpdate').value;
    

    const cliente = {
        id:idClienteUpdate,
        name:nameClienteUpdate == null ? '' : nameClienteUpdate,
        email:emailClienteUpdate == null ? '' : emailClienteUpdate,
        age:ageClienteUpdate == null ? '' : ageClienteUpdate,        
    }
    console.log(cliente)

    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',{
            method:'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(cliente) 
        });
        const res = await datos.text();
        cargarCliente();
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
  
const cargarDatosModalCliente = async (id) => {
    console.log(id)
    const modalBody = document.getElementById('modalBodyCliente');
    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+id);
        const res = await datos.json();
        modalBody.innerHTML = `
        <div class="col-sm-4 mt-3">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="idClienteUpdate" value="${res.items[0].id}" placeholder="id" disabled>
            <label for="floatingInput">Id</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nameClienteUpdate" value="${res.items[0].name}" placeholder="name" required>
            <label for="floatingPassword">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="emailClienteUpdate" value="${res.items[0].email}" placeholder="email">
            <label for="floatingPassword">Marca</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="ageClienteUpdate" value="${res.items[0].age}" placeholder="edad">
            <label for="floatingPassword">Modelo</label>
          </div>      
      </div>
        `;
        console.log(res.items[0])
    } catch (error) {
        console.log(error)
    }
}