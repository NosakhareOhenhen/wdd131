// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-761720-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-1218663-wallpaper.jpg"
    },
    {
        templeName: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 5200,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-exterior-1073708-wallpaper.jpg"
    }
];

// Function to create temple cards
function displayTemples(filteredTemples = temples) {
    const templeCardsContainer = document.getElementById('temple-cards');
    templeCardsContainer.innerHTML = ''; 

    filteredTemples.forEach(temple => {
        const card = document.createElement('div');
        card.className = 'temple-card';

        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'temple-info';

        const name = document.createElement('h2');
        name.textContent = temple.templeName;

        const location = document.createElement('p');
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const dedicated = document.createElement('p');
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        const area = document.createElement('p');
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        info.appendChild(name);
        info.appendChild(location);
        info.appendChild(dedicated);
        info.appendChild(area);

        card.appendChild(img);
        card.appendChild(info);

        templeCardsContainer.appendChild(card);
    });
}

// Filter functions
function filterOldTemples() {
    const oldTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
    displayTemples(oldTemples);
}

function filterNewTemples() {
    const newTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
    });
    displayTemples(newTemples);
}

function filterLargeTemples() {
    const largeTemples = temples.filter(temple => temple.area > 90000);
    displayTemples(largeTemples);
}

function filterSmallTemples() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    displayTemples(smallTemples);
}

// Event listeners
document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    displayTemples();
});
document.getElementById('old').addEventListener('click', (e) => {
    e.preventDefault();
    filterOldTemples();
});
document.getElementById('new').addEventListener('click', (e) => {
    e.preventDefault();
    filterNewTemples();
});
document.getElementById('large').addEventListener('click', (e) => {
    e.preventDefault();
    filterLargeTemples();
});
document.getElementById('small').addEventListener('click', (e) => {
    e.preventDefault();
    filterSmallTemples();
});

// Footer date information
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = document.lastModified;

// Initial display
displayTemples();