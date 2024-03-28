//Selectores
const container = document.querySelector(".container")
const modalBody = document.querySelector(".modal-body")

//Eventos 

container.addEventListener("click", (event) => {

    const btnDetalles = event.target.classList.contains("editar")

    if (btnDetalles === true) {
        const idFlightNumber = event.target.getAttribute("data-id")
        brigOne(idFlightNumber)
    }
})

async function callToApi() {
    const URL = "https://api.spacexdata.com/v3/launches"
    const response = await fetch(URL)
    const data = await response.json()
    printData(data)
}


function printData(data) {
    container.innerHTML = ""

    data.forEach(element => {

        container.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${element.links.mission_patch_small}" class="card-img-top" alt="mission_patch_small">
            <div class="card-body">
                <h5 class="card-title">${element.mission_name}</h5>
                <p class="card-text">${element.launch_year}</p>
                <button type="button" class="btn btn-primary editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${element.flight_number}">
                    Detalles
                </button>
            </div>
        </div>`

    });
}

async function brigOne(number) {
    const URL = `https://api.spacexdata.com/v3/launches/${number}`
    const response = await fetch(URL)
    const data = await response.json()

    pintarModal(data)
}



function pintarModal(data) {
    console.log(data);
    modalBody.innerHTML = ""
    modalBody.innerHTML = `
        <div class="card-body">
        <iframe width="465" height="315" src="https://www.youtube.com/embed/${data.links.youtube_id}"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>

        <table class="table table-striped-columns">
        <tr>
        <td><p>Cohete: </p></td>
        <td>${data.rocket.rocket_name}</td>
        </tr>
        
        <tr>
        <td><p>Tipo de cohete:</p></td>
        <td>${data.rocket.rocket_type}</td>
        </tr>

        <tr>
        <td><p>Exito lanzamiento:</p></td>
        <td>${data.launch_success}</td>

        </tr>

        
        </table>
        
        </div>`
}

callToApi()