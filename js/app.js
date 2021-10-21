console.log("runing...")


const contenedor = document.getElementById('contenedor');


const navbar = ancla => {
    if(ancla == 'disfraz'){
        console.log(1)
        contenedor.innerHTML = `
        <div class="row">
            <div class="col-sm-4 mt-3">            
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="nameDisfraz" placeholder="name">
                  <label for="floatingPassword">Nombre</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="brandDisfraz" placeholder="brand">
                  <label for="floatingPassword">Marca</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="descriptionDisfraz" placeholder="descripcion">
                  <label for="floatingPassword">Descripcion</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="yearDisfraz" placeholder="año">
                  <label for="floatingPassword">Año</label>
                </div>
                <div class="form-floating mb-3 d-grid gap-2">
                  <button type="button" onclick="guardarDisfraz()" class="btn btn-outline-success liveToastBtn" name="guardar">Guardar</button>
                </div>
                

            </div>

            <div class="col-sm-1" id="toast"></div>


            <div class="col-sm-7">
              <table class="table table-striped table-hover">
                  <thead>
                    <tr>                      
                      <th scope="col">Nombre</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Year</th>
                      <th scope="col">Eliminar</th>
                      <th scope="col">Detalle</th>                      
                    </tr>
                  </thead>
                  <tbody id="tablaDisfraz">
                                      
                  </tbody>
                </table>
            </div>
        </div>
        `;
        cargarDisfraz();
    }
    if(ancla == 'cliente'){
        console.log(2)
        contenedor.innerHTML = `
        <div class="row">
        <div class="col-sm-4 mt-3">
          
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="nameClient" placeholder="name">
              <label for="floatingPassword">Nombre</label>
            </div>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="emailClient" placeholder="email">
              <label for="floatingPassword">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="ageClient" placeholder="age">
              <label for="floatingPassword">Edad</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="passwordClient" placeholder="password">
              <label for="floatingPassword">Password</label>
            </div>            
            <div class="form-floating mb-3 d-grid gap-2">
              <button type="button" onclick="guardarCliente()" class="btn btn-outline-success">Guardar</button>
            </div>
            

        </div>

        <div class="col-sm-1"></div>


        <div class="col-sm-7">
          <table class="table table-striped table-hover">
              <thead>
                <tr>                 
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Eliminar</th>
                  <th scope="col">Detalle</th> 
                </tr>
              </thead>
              <tbody id="tablaCliente">
                
              </tbody>
            </table>
        </div>
    </div>
        `;
        cargarCliente();
    }
    if(ancla == 'mensaje'){
        console.log(3)
        contenedor.innerHTML = `
        <div class="row">
        <div class="col-sm-4 mt-3">        
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="messageText" placeholder="mensaje">
              <label for="floatingPassword">Mensaje</label>
            </div>
           
            <div class="form-floating mb-3 d-grid gap-2">
              <button type="button" onclick="guardarMensaje()" class="btn btn-outline-success">Guardar</button>
            </div>
            

        </div>

        <div class="col-sm-1"></div>


        <div class="col-sm-7">
          <table class="table table-striped table-hover">
              <thead>
                <tr>                  
                  <th scope="col">Mensaje</th>
                  <th scope="col">Eliminar</th>
                  <th scope="col">Detalle</th> 
                </tr>
              </thead>
              <tbody id="tablaMensaje">
               
              </tbody>
            </table>
        </div>
    </div>
        `;
        cargarMensaje();
    }
    
}

