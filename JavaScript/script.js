let cards = document.getElementById('cards');
let siwtchTheme = document.querySelector('#siwtch-theme');

//function to fetch data from api
async function getData() {
    const data = await fetch('https://ayoubmk-dev.github.io/API/countries.json').then((res) => res.json());
    return data;
}

// function to display fetched data as cards
async function displayData() {
    const data = await getData();
    let html = "";
    for (let i = 0; i < 15; i++) {
        html += `
        <div class="scale card px-0 col-md-3 shadow" style="width: 15rem; cursor: pointer;border:none;" title='${data[i].name}'>
            <div style="min-height:25%;">
                <img class="card-img-top m-0" style="height:150px;" src="${data[i].flags.png}"  alt="Card image cap">
            </div>
            <div class="card-body">
                    <h5 class="card-text fw-bold">${data[i].name}<h5>
                <div class="country-info">
                    <p><span>Population:</span> ${data[i].population.toLocaleString()}</p>
                    <p><span>Region:</span> ${data[i].region}</p>
                    <p><span>Capital:</span> ${data[i].capital || "unknown"}</p>
                </div>
            </div>
        </div>
        `;
    }
    cards.innerHTML = html;
};


displayData();


