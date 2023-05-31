const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

const apiKey = '429049e20amsh168c822ee8b3e75p1d8e72jsncf75688bb197';
const apiHost = 'spotify23.p.rapidapi.com';

async function fetchArtistName(artistId) {
  const url = `https://${apiHost}/artists/${artistId}`;
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
    return data.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function loadInitialArtists() {
    const artistIds = '2w9zwq3AktTeYYMuhMjju8';
    const url = `https://${apiHost}/artists/?ids=${artistIds}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const artists = data.artists.items;
  
      for (const artist of artists) {
        const artistId = artist.id;
        const artistName = await fetchArtistName(artistId);
        const likes = countArtistLikes(artistName);
        const dislikes = countArtistDislikes(artistName);
        artist.likes = likes;
        artist.dislikes = dislikes;
      }
  
      displayResults(data);
    } catch (error) {
      console.error(error);
    }
  }  

loadInitialArtists();

searchButton.addEventListener('click', searchArtists);

async function searchArtists() {
  const artistName = searchInput.value.trim();
  if (artistName === '') {
    alert('Please enter an artist name');
    return;
  }

  const url = `https://${apiHost}/search/?q=${artistName}&type=artist`;
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
    displayResults(data);
  } catch (error) {
    console.error(error);
  }
}

// Initialize the liked artists with an empty array
let likedArtists = [];

// Load liked artists from localStorage if available
if (localStorage.getItem('likedArtists')) {
  likedArtists = JSON.parse(localStorage.getItem('likedArtists'));
}

// ...

function displayResults(data) {
    const tableBody = searchResults.querySelector('tbody');
    tableBody.innerHTML = '';
  
    if (data && data.artists && data.artists.items.length > 0) {
      data.artists.items.forEach((artist) => {
        const artistName = artist.name;
        const likes = countArtistLikes(artistName);
        const dislikes = countArtistDislikes(artistName);
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${artistName}</td>
          <td>${likes}</td>
          <td>${dislikes}</td>
          <td>
            <button class="like-button" onclick="likeArtist('${artist.id}')">Like</button>
          </td>
          <td>
            <button class="dislike-button" onclick="dislikeArtist('${artist.id}')">Dislike</button>
          </td>
        `;
  
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = '<tr><td colspan="5">No artists found</td></tr>';
    }
  }
  

function likeArtist(artistId) {
  const likedArtists = getLikedArtists();
  if (!likedArtists.includes(artistId)) {
    likedArtists.push(artistId);
    saveLikedArtists(likedArtists);
  }
  sortArtistsByLikes();
}

function dislikeArtist(artistId) {
  const likedArtists = getLikedArtists();
  const index = likedArtists.indexOf(artistId);
  if (index > -1) {
    likedArtists.splice(index, 1);
    saveLikedArtists(likedArtists);
  }
  sortArtistsByLikes();
}

function getLikedArtists() {
  const likedArtistsJson = localStorage.getItem('likedArtists');
  return likedArtistsJson ? JSON.parse(likedArtistsJson) : [];
}

function saveLikedArtists(likedArtists) {
  localStorage.setItem('likedArtists', JSON.stringify(likedArtists));
}

function sortArtistsByLikes() {
  const rows = Array.from(searchResults.querySelectorAll('tbody tr'));
  rows.sort((a, b) => {
    const artistA = a.querySelector('td:first-child').textContent;
    const artistB = b.querySelector('td:first-child').textContent;
    const likesA = countArtistLikes(artistA);
    const likesB = countArtistLikes(artistB);
    return likesB - likesA;
  });
  searchResults.querySelector('tbody').innerHTML = '';
  rows.forEach(row => {
    searchResults.querySelector('tbody').appendChild(row);
  });
}

function countArtistLikes(artistName) {
  const likedArtists = getLikedArtists();
  let count = 0;
  likedArtists.forEach(artistId => {
    if (getArtistNameById(artistId) === artistName) {
      count++;
    }
  });
  return count;
}

function getArtistNameById(artistId) {
  return artistId;
}