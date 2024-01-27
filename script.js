const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const gridContainer = document.getElementById("grid-container");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    fetch(`http://localhost:3000/artists`)
        .then((response) => response.json())
        .then((results) => {
        const filteredResults = results.filter((artist) => regex.test(artist.name));
        displayResults(filteredResults);
    });
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    gridContainer.innerHTML = "";

    result.forEach(element => {
        console.log("teste")
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-img");

        const artistImage = document.createElement("img");
        artistImage.classList.add("artist-img");
        artistImage.id = "artist-img";
        artistImage.src = element.urlImg;

        const playButton = document.createElement("div");
        playButton.classList.add("play");
        playButton.innerHTML = '<span class="fa fa-solid fa-play"></span>';

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const artistName = document.createElement("span");
        artistName.classList.add("artist-name");
        artistName.id = "artist-name";
        artistName.innerText = element.name;

        const artistCategorie = document.createElement("span");
        artistCategorie.classList.add("artist-categorie");
        artistCategorie.innerText = "Artista";
        
        gridContainer.appendChild(artistCard);
        artistCard.appendChild(cardImage);
        artistCard.appendChild(cardText);
        cardImage.appendChild(artistImage);
        cardImage.appendChild(playButton);
        cardText.appendChild(artistName);
        cardText.appendChild(artistCategorie);
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value;
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})
