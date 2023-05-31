const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const tableBody = document.getElementById('table-body');
const sortButton = document.getElementById('sort-button');

const apiKey = '429049e20amsh168c822ee8b3e75p1d8e72jsncf75688bb197';
const apiHost = 'theaudiodb.p.rapidapi.com';

let artists = [];

searchButton.addEventListener('click', searchArtists);
clearButton.addEventListener('click', clearSearch);
sortButton.addEventListener('click', sortArtistsByLikes);

async function fetchArtist(artistId) {
  const url = `https://${apiHost}/artist.php?i=${artistId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.artists[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

function displayArtists() {
  tableBody.innerHTML = '';

  artists.forEach(artist => {
    const { idArtist, strArtist, intLikes, intDislikes } = artist;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${strArtist}</td>
      <td>${intLikes}</td>
      <td>${intDislikes}</td>
      <td><button class="like-button" onclick="likeArtist(${idArtist})">Like</button></td>
      <td><button class="dislike-button" onclick="dislikeArtist(${idArtist})">Dislike</button></td>`;
    tableBody.appendChild(row);
  });
}

async function searchArtists() {
  const artistName = searchInput.value.trim();
  if (artistName === '') {
    alert('Please enter an artist name');
    return;
  }

  const url = `https://${apiHost}/search.php?s=${artistName}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    artists = data.artists;
    displayArtists();
  } catch (error) {
    console.error(error);
  }
}

function clearSearch() {
  searchInput.value = '';
  artists = [];
  displayArtists();
}

function likeArtist(artistId) {
  const artist = artists.find(a => a.idArtist === artistId);
  if (artist) {
    artist.intLikes++;
    displayArtists();
  }
}

function dislikeArtist(artistId) {
  const artist = artists.find(a => a.idArtist === artistId);
  if (artist) {
    artist.intDislikes++;
    displayArtists();
  }
}

function sortArtistsByLikes() {
  artists.sort((a, b) => b.intLikes - a.intLikes || b.intDislikes - a.intDislikes);
  displayArtists();
}
