console.log('corriendo disfraz')


const limpiarDisfraz = () => {    
    document.getElementById('nameDisfraz').value = '';
    document.getElementById('brandDisfraz').value = '';
    document.getElementById('descriptionDisfraz').value = '';
    document.getElementById('yearDisfraz').value = '';
}

const guardarDisfraz = async () => {  
    const nameDisfraz = document.getElementById('nameDisfraz').value;
    const brandDisfraz = document.getElementById('brandDisfraz').value;
    const descriptionDisfraz = document.getElementById('descriptionDisfraz').value;    
    const yearDisfraz = document.getElementById('yearDisfraz').value;
    
    if(nameDisfraz==''){
        return alert('Debe ingresar ID');
    }

    const disfraz = {        
        brand:brandDisfraz,
        year:yearDisfraz,
        description:descriptionDisfraz,        
        name:nameDisfraz
    }

    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Costume/save',{
            method:'POST',   
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(disfraz) 
            })
            const res = await datos.text();
            console.log(res)
    } catch (error) {
        console.log(error)
    }
   
    
    cargarDisfraz();
    limpiarDisfraz();
    showToast('guardar',nameDisfraz)
}

const cargarDisfraz = async () => {
    const datos = await fetch('http://168.138.233.89:8080/api/Costume/all')
    const respuesta = await datos.json();
    
    const tablaDisfraz = document.getElementById('tablaDisfraz');
    let stringDisfraz = '';
    respuesta.forEach(element => {        
        stringDisfraz += `
        <tr>            
            <td>${element.name}</td>
            <td>${element.brand}</td>
            <td>${element.description}</td>
            <td>${element.year}</td>
            <td onclick="eliminarDisfraz(${element.id})"><i class="bi bi-trash rojo pointer" name="eliminar"></i></td>
            <td><span onclick="cargarDatosModal(${element.id})" class="azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver</span> <i onclick="cargarDatosModal(${element.id})" class="bi bi-eye azul pointer" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
            
         </tr> 
        `;
    });
    tablaDisfraz.innerHTML = stringDisfraz;
    
}

window.onload = cargarDisfraz();


const eliminarDisfraz = async (id) => {
    console.log(id)
    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Costume/'+id,{
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
    
    cargarDisfraz();
    showToast('eliminar','');
}

const showToast = (metodo,name) => {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBody = document.getElementById('toastBody');
    if(metodo == 'eliminar'){
        toastLiveExample.classList.remove('bg-success');
        toastLiveExample.classList.add('bg-danger');
        toastBody.innerHTML = `Se elimino ${name} correctamente`;
    }
    if(metodo == 'guardar'){
        toastLiveExample.classList.remove('bg-danger');
        toastLiveExample.classList.add('bg-success');
        toastBody.innerHTML = `Se guardo ${name} correctamente`;
    }
    
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

const actualizarDisfraz = async () => {    
    const idDisfrazUpdate = document.getElementById('idDisfrazUpdate').value;
    const nameDisfrazUpdate = document.getElementById('nameDisfrazUpdate').value;
    const brandDisfrazUpdate = document.getElementById('brandDisfrazUpdate').value;
    const descriptionDisfrazUpdate = document.getElementById('descriptionDisfrazUpdate').value;
    

    const disfraz = {
        id:idDisfrazUpdate,
        brand:brandDisfrazUpdate == null ? '' : brandDisfrazUpdate,       
        description: descriptionDisfrazUpdate,
        name:nameDisfrazUpdate == null ? '' : nameDisfrazUpdate
    }
    console.log(disfraz)

    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Costume/update',{
            method:'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(disfraz) 
        });
        const res = await datos.text();
        cargarDisfraz();
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
  
const cargarDatosModal = async (id) => {
    console.log(id)
    const modalBody = document.getElementById('modalBody');
    try {
        const datos = await fetch('http://168.138.233.89:8080/api/Costume/'+id);
        const res = await datos.json();
        console.log(res)
        modalBody.innerHTML = `
        <div class="col-sm-4 mt-3">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="idDisfrazUpdate" value="${res.id}" placeholder="id"  disabled>
            <label for="floatingInput">Id</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nameDisfrazUpdate" value="${res.name}" placeholder="name" required>
            <label for="floatingPassword">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="brandDisfrazUpdate" value="${res.brand}" placeholder="brand">
            <label for="floatingPassword">Marca</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="descriptionDisfrazUpdate" value="${res.description}" placeholder="modelo">
            <label for="floatingPassword">Modelo</label>
          </div>          
      </div>
        `;
        
    } catch (error) {
        console.log(error)
    }
}