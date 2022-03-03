let HTML = [];


function destroy($id) {
    console.log('You are destroying 1 element :', $id);

    $elementErase = $id

    fetch(`http://vpujiula.randion.es/ApiRestLaravelRandion/public/api/game/${$elementErase}/delete`, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },

        })
        .catch((error) => {
            console.error('Error:', error);
        });

    window.location.reload();

}


function edit($id) {
    let $ID;
    $ID = $id;
    console.log('Ill prepare the edit operation :', $ID);


    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let available = document.getElementById("available").value;

    const data = { name: `${name}`, description: `${description}`, price: `${price}`, available: `${available}` };

    fetch(`http://vpujiula.randion.es/ApiRestLaravelRandion/public/api/game/${$ID}/update`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    window.location.reload();



}

//-------------------------------------------------------------------
//Funcion de retorno de datos (JSON-api-endpoint)
async function getData(url) {
    const response = await fetch(url);
    const Data = await response.json();

    console.log(Data);

    Items = Data;
    //Cambiar products por el item en cuestion que retorna el fetch 
    content = Items.games;

    content.forEach(element => {
        HTML += ` <tr>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td>${element.available}</td>
        <td><button id='${element.id}' class="btn btn-warning" onclick="destroy(this.id)">Delete</button></td>
        <td><button id='${element.id}' class="btn btn-warning" onclick="renderFormularioEditar(${element.id})">Edit</button></td>
        </tr>`
    });




    document.getElementById('response').innerHTML = HTML;



}
let myUrl = 'http://vpujiula.randion.es/ApiRestLaravelRandion/public/api/games'
Content = getData(myUrl);

//-------------------------------------------------------------------

function NewRecord() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let available = document.getElementById("available").value;

    const data = { name: `${name}`, description: `${description}`, price: `${price}`, available: `${available}` };
    fetch('http://vpujiula.randion.es/ApiRestLaravelRandion/public/api/game/add', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    window.location.reload();
}



function renderFormularioCrear() {
    document.getElementById('formulario').innerHTML = `<div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" value="">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">description</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price">
                </div>
                
                <div class="mb-3">
                    <label for="available" class="form-label">Available</label>
                    <input type="checkbox" checked value="1" id="available" />
                </div>
                <button type="submit" onclick="NewRecord()" class="btn btn-primary"> Crear </button>
               
                `;
}

function renderFormularioEditar($id) {
    let EditID = $id
    document.getElementById('formulario').innerHTML = `<div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" value="">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">description</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price">
                </div>
                
                <div class="mb-3">
                    <label for="available" class="form-label">Available</label>
                    <input type="checkbox" checked value="1" id="available" />
                </div>
                <button type="submit" onclick="edit(${EditID})" class="btn btn-success"> Editar </button>
               
                `;
}