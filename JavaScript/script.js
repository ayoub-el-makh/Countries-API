let cards = document.getElementById('cards');
let siwtchTheme = document.querySelector('#siwtch-theme');
let scrollUp = document.getElementById('scroll');
let searchIcon = document.querySelector('.fa-search');
let searchInput = document.querySelector('#searchInput');
let speekIcon = document.querySelector('.fa-microphone');
let FilterRegion = document.querySelector('#region');
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
        scrollImg: "images/computer-mouse-light.png",
        footerbg: "background-color: var(--Dark-Blue)!important;color: white;",
        github: "color: white;",
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
        scrollImg: "images/computer-mouse-dark.png",
        footerbg: "background-color: white!important;color: black;",
        github: "color: black;",
    }
};
// function to fetch data from api
async function getData() {
    const data = await fetch('https://ayoubmk-dev.github.io/API/countries.json').then((res) => res.json());
    return data;
};

function countries20(data) {
    let html = "";
    for (let i = 0; i < 20; i++) {
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
}

// function to display fetched data as cards
async function displayData() {
    const data = await getData();
    const region = data.map((el) => el.region).filter((el, index, arr) => arr.indexOf(el) === index);
    displayRegion(region);
    countries20(data);
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
    };
    scrollUp.setAttribute('src', change.scrollImg);
    document.querySelector('footer').style.cssText = change.footerbg;
    document.querySelector('.github a').style.cssText = change.github;
}

siwtchTheme.addEventListener('click', () => {
    teme = !teme;
    changeColor();
    localStorage.setItem('mode', JSON.stringify(teme));
});

//Scroll back
scrollUp.addEventListener('click', function () {
    scroll({ top: 0 });
});

//Searching by Country name and Adding the microphone feature to search and creating footer section
searchIcon.addEventListener('click', () => {
    searchInput.focus();
});

speekIcon.addEventListener('click', () => {
    let recognization = new webkitSpeechRecognition('');
    recognization.onresult = (e) => {
        let transcript = e.results[0][0].transcript;
        searchInput.value = transcript;
        search(transcript);
    }
    recognization.onstart = () => {
        searchInput.placeholder = "Listening...";
    }
    recognization.onspeechend = () => {
        searchInput.placeholder = 'Search for a country...';
    }
    recognization.start();
});

async function search(e) {
    const data = await getData();
    let value;
    if (typeof e === "object") {
        value = e.target.value;
    } else {
        value = e;
    }
    let country;
    if (value === '') {
        countries20(data);
    } else {
        country = data.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()));
        let html = "";
        for (let i of country) {
            html += `
        <div class="scale card px-0 col-md-3 shadow" style="width: 15rem; cursor: pointer;border:none;" title='${i.name}'>
            <div style="min-height:25%;">
                <img class="card-img-top m-0" style="height:150px;" src="${i.flags.png}"  alt="Card image cap">
            </div>
            <div class="card-body">
                    <h5 class="card-text fw-bold">${i.name}<h5>
                <div class="country-info">
                    <p><span>Population:</span> ${i.population.toLocaleString()}</p>
                    <p><span>Region:</span> ${i.region}</p>
                    <p><span>Capital:</span> ${i.capital || "unknown"}</p>
                </div>
            </div>
        </div>
        `;
        }
        cards.innerHTML = html;
    }
    getTeme();
};
searchInput.addEventListener('input', search);

// add dateCopyright;

document.querySelector('#Copyright').innerHTML = `Copyright &copy; <br/ >${new Date().getFullYear()}`;

if (window.innerWidth == 375) {
    document.querySelector('.filter').classList.add('mt-3');
    document.querySelector('h1').style.fontSize = "1rem";
    document.querySelector('header').classList.remove('px-5');
}

// add filter by region

async function filterByRegion(e) {
    const data = await getData();
    if (e.target.value === "") {
        countries20(data);
    }else{
        const filterData = data.filter((el) => el.region === e.target.value);
        let html = "";
        for (let i of filterData) {
            html += `
        <div class="scale card px-0 col-md-3 shadow" style="width: 15rem; cursor: pointer;border:none;" title='${i.name}'>
            <div style="min-height:25%;">
                <img class="card-img-top m-0" style="height:150px;" src="${i.flags.png}"  alt="Card image cap">
            </div>
            <div class="card-body">
                    <h5 class="card-text fw-bold">${i.name}<h5>
                <div class="country-info">
                    <p><span>Population:</span> ${i.population.toLocaleString()}</p>
                    <p><span>Region:</span> ${i.region}</p>
                    <p><span>Capital:</span> ${i.capital || "unknown"}</p>
                </div>
            </div>
        </div>
        `;
        }
        cards.innerHTML = html;
    }
    getTeme();
}

FilterRegion.addEventListener('change', filterByRegion);