const resultsTable = document.getElementById('resultsTable');
const allBtn = document.getElementById('allBtn');
const bedroomBtn = document.getElementById('bedroomBtn');
const bathroomBtn = document.getElementById('bathroomBtn');
const priceBtn = document.getElementById('priceBtn');
const communityBtns = document.querySelectorAll('.btn-secondary .btn');


async function fetchData(url) {
    console.log(`fetching data from: ${url}`)

    const response = await fetch(url);
    const data = await response.json();
    console.log('data received: ', data);

    updateTable(data);

};

function updateTable(data){
    resultsTable.innerHTML = "";
    data.forEach(house => {
        resultsTable.innerHTML += 
        `   <tr>
                <td>
                    <img 
                        src = "${house.img}" 
                        class= "img-fluid rounded" 
                        style = "width: 800px; height: auto">
                    </img>
                </td>
                <td>${house.address}</td>
                <td>${house.community}</td>
                <td>${house.price.toLocaleString()}</td>
                <td>${house.bedrooms}</td>
                <td>${house.bathrooms}</td>
                <td>${house.description}</td>
            </tr>
        `;
    });
};

function searchByCommunity(community){
    fetchData(`/community_search?community=${encodeURIComponent(community)}`)
};

document.addEventListener('DOMContentLoaded', () => fetchData('/all'));
allBtn.addEventListener('click', () => fetchData('/all'));

communityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.textContent);
        searchByCommunity(btn.textContent);
    });
});

// http://localhost:3000/bed_search?bedrooms=4
bedroomBtn.addEventListener('click', () => {
    const bedrooms = document.getElementById("bedroomSelect").value;
    if (!bedrooms){
        alert('Please select Bedrooms, first!');
        return;
    }
    fetchData(`http://localhost:3000/bed_search?bedrooms=${bedrooms}`)

});

// http://localhost:3000/bathroom_search?bathrooms=4
bathroomBtn.addEventListener('click', () => {
    const bathrooms = document.getElementById("bathroomSelect").value;
    if(!bathrooms){
        alert('Please select number of bathrooms.');
        return;
    }
    fetchData(`http://localhost:3000/bathroom_search?bathrooms=${bathrooms}`)
});

// http://localhost:3000/price_search?min=850000&max=4000000
priceBtn.addEventListener('click', () => {
    const min = document.getElementById('minPrice').value;
    const max = document.getElementById('maxPrice').value;

    if (min && max){
        fetchData(`http://localhost:3000/price_search?min=${min}&max=${max}`)
    }
});