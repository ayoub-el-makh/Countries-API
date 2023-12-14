let cards = document.getElementById('cards');
let siwtchTheme = document.querySelector('#siwtch-theme');
const darkMode = {
    true:
    {
        icon: '<span><i class="fa-regular fa-moon"></i> Dark Mode</span>',
        bodyColor: "background-color: var(--Very-Dark-Blue-bg)!important;",
        headerColor: "background-color: var(--Dark-Blue)!important;color: white;",
        cardColor: "background-color:var(--Dark-Blue);color:white; width: 15rem; cursor: pointer;border:none",
        select: "background-color: var(--Dark-Blue);color:white",
        i: "color:white",
        selectOption: "background-color: var(--Dark-Blue);",
        input: "background-color:var(--Dark-Blue);color:white;",
    },
    false: {
        icon: '<span><i class="fa-regular fa-sun"></i> Light Mode</span>',
        bodyColor: "background-color:white!important;",
        headerColor: "background-color: white!important;color: black;",
        cardColor: "background-color:white;color:black;width: 15rem; cursor: pointer;border:none",
        select: "background-color: white;color:black",
        i: "color:black;",
        selectOption: "background-color: white;",
        input: "color:black;",
    }
};
// function to fetch data from api
async function getData() {
    const data = await fetch('https://ayoubmk-dev.github.io/API/countries.json').then((res) => res.json());
    return data;
};

// function to display fetched data as cards
async function displayData() {
    const data = await getData();
    const region = data.map((el) => el.region).filter((el, index, arr) => arr.indexOf(el) === index);
    console.log(region);
    displayRegion(region);
    let html = "";
    for (let i = 0; i < 50; i++) {
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
    getTeme();
};

displayData();
function displayRegion(region) {
    region.forEach(element => {
        document.querySelector('#region').innerHTML +=
            `<option value="${element}">${element}</option>`;
    });
}
//Dark mode and light mode toggle
let teme;
function getTeme() {
    if (localStorage.getItem('mode') !== null) {
        teme = JSON.parse(localStorage.getItem('mode'));
        changeColor();
        console.log(JSON.parse(localStorage.getItem('mode')));
    } else {
        teme = true;
    }
}

function changeColor() {
    let change = darkMode[teme];
    siwtchTheme.innerHTML = change.icon;
    let card = document.querySelectorAll('.card');
    let iconSelect = document.querySelectorAll('i.fa.fa');
    for (let el of iconSelect) {
        el.style.cssText = change.i;
    }
    document.body.style.cssText = change.bodyColor;
    document.querySelector('header').style.cssText = change.headerColor;
    for (let el of card) {
        el.style.cssText = change.cardColor;
    };
    document.querySelector('select').style.cssText = change.select;
    document.querySelector('input').style.cssText = change.input;
    if (document.querySelector('input').style.color === "black") {
        document.querySelector('input').classList.remove('input');
    } else {
        document.querySelector('input').classList.add('input');
    }
    if (document.querySelector('select').style.backgroundColor === "white") {
        document.querySelector('select').classList.remove('selectOption');
    } else {
        document.querySelector('select').classList.add('selectOption');
    }
}

siwtchTheme.addEventListener('click', () => {
    teme = !teme;
    changeColor();
    localStorage.setItem('mode', JSON.stringify(teme));
});
