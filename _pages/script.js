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
	searchResults.innerHTML = '';

	if (data && data.artists && data.artists.items.length > 0) {
		data.artists.items.forEach(artist => {
			const artistName = artist.name;
			const artistImage = artist.image;
			const artistElement = document.createElement('div');
			artistElement.innerHTML = `<img src="${artistImage}" alt="${artistName}">
				<p>${artistName}</p>`;
			searchResults.appendChild(artistElement);
		});
	} else {
		searchResults.innerHTML = 'No artists found';
	}
}

