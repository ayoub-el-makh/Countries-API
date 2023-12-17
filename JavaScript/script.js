let cards = document.getElementById('cards');
let siwtchTheme = document.querySelector('#siwtch-theme');
let scrollUp = document.getElementById('scroll');
let searchIcon = document.querySelector('.fa-search');
let searchInput = document.querySelector('#searchInput');
let speekIcon = document.querySelector('.fa-microphone');
let FilterRegion = document.querySelector('#region');
let contryInfo = document.querySelector('#contry-info');
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
        closeInfoCountry : '<i class="fa-solid fa-circle-xmark"></i>'
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
        closeInfoCountry : '<i class="fa-regular fa-circle-xmark"></i>'
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
        <div class="scale card px-0 col-md-3 shadow" data-name="${data[i].name}" style="width: 15rem; cursor: pointer;border:none;" title='${data[i].name}'>
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
    init(data);
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
    let iconInput = document.querySelectorAll('i.fa');
    for (let el of iconInput) {
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
    document.querySelector('#close-icon').innerHTML = change.closeInfoCountry;
    if(teme){
        document.querySelector('#contry-info').classList.remove("light");
        document.querySelector('#contry-info').classList.add("dark");
    }else{
        document.querySelector('#contry-info').classList.remove("dark");
        document.querySelector('#contry-info').classList.add("light");
    }
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
        document.querySelector('i.fa-microphone').classList.remove("record");
    }
    recognization.onstart = () => {
        searchInput.placeholder = "Listening...";
        document.querySelector('i.fa-microphone').classList.add("record");
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
        <div class="scale card px-0 col-md-3 shadow" data-name="${i.name}" style="width: 15rem; cursor: pointer;border:none;" title='${i.name}'>
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
    init(data);
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
    } else {
        const filterData = data.filter((el) => el.region === e.target.value);
        let html = "";
        for (let i of filterData) {
            html += `
        <div class="scale card px-0 col-md-3 shadow" data-name="${i.name}" style="width: 15rem; cursor: pointer;border:none;" title='${i.name}'>
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
    init(data);
}

FilterRegion.addEventListener('change', filterByRegion);

// add country Info

function init(data) {
    let cardDiv = document.querySelectorAll('.scale');
    let contryInfo_1 = document.querySelector('#contry-info-1');
    cardDiv.forEach((el) => {
        el.addEventListener('click', (e) => {
            const countryClicked = data.find((el) => el.name === e.currentTarget.dataset.name);
            contryInfo.style.cssText =`
            scale: 1;
            top: ${scrollY + 150}px;
            `;
            contryInfo_1.innerHTML = `
            <div class="alert-image shadow d-flex justify-content-between align-items-center">
                <img style="width:100%;" src="${countryClicked.flags.png}"  alt="Card image cap">
            </div>
            <div class="p-3">
                <h5 class="card-text fw-bold">${countryClicked.name}</h5>
                <div class="row">
                    <div class="col-sm-6">
                        <p><span class="fw-bold">Native Name:</span> ${countryClicked.nativeName.toLocaleString()}</p>
                        <p><span class="fw-bold">Population:</span> ${countryClicked.population.toLocaleString()}</p>
                        <p><span class="fw-bold">Region:</span> ${countryClicked.region}</p>
                        <p><span class="fw-bold">Sub Region: </span>${countryClicked.subregion}</p>
                        <p><span class="fw-bold">Capital:</span> ${countryClicked.capital || "unknown"}</p>
                    </div>
                    <div class="col-sm-6">
                        <p><span class="fw-bold">Top Level Domain: </span> ${countryClicked.topLevelDomain.toLocaleString()}</p>
                        <p><span class="fw-bold">Currencies: </span> ${countryClicked.currencies ? countryClicked.currencies[0].name : "unknown"}</p>
                        <p><span class="fw-bold">Languages:</span> ${countryClicked.languages.map((el) => el.name).join(", ")}</p>
                    </div>
                    <div class="mt-5  d-flex w-100">
                        <div class="d-flex align-items-center"><span class="fw-bold">Border Countries:</span><div class="bordres-country"><div class="p-2">${countryClicked.borders ? countryClicked.borders.join("</div><div class='p-2'>") : "unknown"}</div></div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('#close-icon').addEventListener('click', ()=>{
                contryInfo.style.cssText = 'scale:0;'
            })
            if (window.innerWidth == 375) {
                document.querySelector('.alert-image').style.cssText = `
                flex-basis: 100%;
                margin:0 0 1rem;
                margin-right: 0px;
                `;
                contryInfo_1.style.cssText += `
                display: flex;
                flex-direction: column;
                `;
            }
            
        });
    });
}