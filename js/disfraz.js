console.log('corriendo disfraz')


const limpiarDisfraz = () => {
    const idDisfraz = document.getElementById('idDisfraz').value = '';
    const nameDisfraz = document.getElementById('nameDisfraz').value = '';
    const brandDisfraz = document.getElementById('brandDisfraz').value = '';
    const modelDisfraz = document.getElementById('modelDisfraz').value = '';
    const category_idDisfraz = document.getElementById('category_idDisfraz').value = '';
}

const guardarDisfraz = async () => {
    const idDisfraz = document.getElementById('idDisfraz').value;
    const nameDisfraz = document.getElementById('nameDisfraz').value;
    const brandDisfraz = document.getElementById('brandDisfraz').value;
    const modelDisfraz = document.getElementById('modelDisfraz').value;
    const category_idDisfraz = document.getElementById('category_idDisfraz').value;
    console.log(idDisfraz)
    if(idDisfraz==''){
        return alert('Debe ingresar ID');
    }

    const disfraz = {
        id:idDisfraz,
        brand:brandDisfraz,
        model:modelDisfraz,
        category_id:category_idDisfraz,
        name:nameDisfraz
    }

    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',{
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
    const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume')
    const respuesta = await datos.json();
    
    const tablaDisfraz = document.getElementById('tablaDisfraz');
    let stringDisfraz = '';
    respuesta.items.forEach(element => {        
        stringDisfraz += `
        <tr>
            <th scope="row">${element.id}</th>
            <td>${element.name}</td>
            <td>${element.brand}</td>
            <td>${element.model}</td>
            <td>${element.category_id}</td>
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
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',{
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

const actualizarDisfraz = async (id) => {
    console.log(id)
    const idDisfrazUpdate = document.getElementById('idDisfrazUpdate').value;
    const nameDisfrazUpdate = document.getElementById('nameDisfrazUpdate').value;
    const brandDisfrazUpdate = document.getElementById('brandDisfrazUpdate').value;
    const modelDisfrazUpdate = document.getElementById('modelDisfrazUpdate').value;
    const category_idDisfrazUpdate = document.getElementById('category_idDisfrazUpdate').value;

    const disfraz = {
        id:idDisfrazUpdate,
        brand:brandDisfrazUpdate == null ? '' : brandDisfrazUpdate,
        model:modelDisfrazUpdate == null ? '' : modelDisfrazUpdate,
        category_id:category_idDisfrazUpdate == null ? '' : category_idDisfrazUpdate,
        name:nameDisfrazUpdate == null ? '' : nameDisfrazUpdate
    }
    console.log(disfraz)

    try {
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',{
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
        const datos = await fetch('https://g611e17c3e9988a-dbreto2.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume/'+id);
        const res = await datos.json();
        modalBody.innerHTML = `
        <div class="col-sm-4 mt-3">
        <div class="form-floating mb-3">
            <input type="number" class="form-control" id="idDisfrazUpdate" value="${res.items[0].id}" placeholder="id"  disabled>
            <label for="floatingInput">Id</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nameDisfrazUpdate" value="${res.items[0].name}" placeholder="name" required>
            <label for="floatingPassword">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="brandDisfrazUpdate" value="${res.items[0].brand}" placeholder="brand">
            <label for="floatingPassword">Marca</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="modelDisfrazUpdate" value="${res.items[0].model}" placeholder="modelo">
            <label for="floatingPassword">Modelo</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="category_idDisfrazUpdate" value="${res.items[0].category_id}" placeholder="category id">
            <label for="floatingPassword">Category Id</label>
          </div>
      </div>
        `;
        console.log(res.items[0])
    } catch (error) {
        console.log(error)
    }
}