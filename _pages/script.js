const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

const apiKey = '429049e20amsh168c822ee8b3e75p1d8e72jsncf75688bb197';
const apiHost = 'spotify23.p.rapidapi.com';

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

function displayResults(data) {
	searchResults.querySelector('tbody').innerHTML = '';

	if (data && data.artists && data.artists.items.length > 0) {
		data.artists.items.forEach(artist => {
			const artistName = artist.name;
			const artistId = artist.id;
			const row = document.createElement('tr');
			row.innerHTML = `<td>${artistName}</td>
				<td><button class="like-button" onclick="likeArtist('${artistId}')">Like</button></td>
				<td><button class="dislike-button" onclick="dislikeArtist('${artistId}')">Dislike</button></td>`;
			searchResults.querySelector('tbody').appendChild(row);
		});
	} else {
		searchResults.innerHTML = 'No artists found';
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
	// You might need to implement an additional API request
	// to get the artist name by the ID if it's not available in the search results
	// This will depend on the specific behavior of the Spotify API you are using
	// and the data it provides.
	// For the sake of simplicity in this example, let's assume the artist ID and name are the same.
	return artistId;
}


