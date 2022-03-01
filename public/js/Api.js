let HTML = [];

function destroy($id) {
    console.log('You are destroying 1 element :', $id);

    $elementErase = $id

    fetch(`vpujiula.randion.es/ApiRestLaravelRandion/public/api/game/${$elementErase}/delete`, {
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
//-------------------------------------------------------------------
//Funcion de retorno de datos (JSON-api-endpoint)
async function getData(url) {
    const response = await fetch(url);
    const Data = await response.json();

    console.log(Data);

    Items = Data;
    //Cambiar products por el item en cuestion que retorna el fetch 
    content = Items.products;

    content.forEach(element => {
        HTML += ` <tr>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>${element.price}</td>
        <td>${element.qty}</td>
        <td><button id='${element.id}' class="btn btn-warning" onclick="destroy(this.id)">Delete</button></td>
      </tr>`
    });




    document.getElementById('response').innerHTML = HTML;



}
let myUrl = 'vpujiula.randion.es/ApiRestLaravelRandion/public/api/games'
Content = getData(myUrl);
//-------------------------------------------------------------------

function NewRecord() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let qty = document.getElementById("available").value;

    const data = { name: `${name}`, description: `${description}`, price: `${price}`, available: `${available}` };
    fetch('vpujiula.randion,es/ApiRestLaravelRandion/public/api/game/add', {
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
                    <input type="float" class="form-control" id="price">
                </div>
                
                <div class="mb-3">
                    <label for="available" class="form-label">Available</label>
                    <input type="checkbox" checked="true" id="available" />
                </div>
                <button type="submit" onclick="NewRecord()" class="btn btn-primary"> Crear </button>`;
}