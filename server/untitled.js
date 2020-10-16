//write a function to retrieve a blob of json
//make an ajax request! use the 'fetch' function.

// https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')   //fetch returns a promise
    .then(res => res.json())
    .then(json => console.log(json));
}

async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');   //fetch returns a promise
  const json = await res.json();                   //returns the second promise
  console.log(json);
}

const fetchAlbums = async() => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');   //fetch returns a promise
  const json = await res.json();                   //returns the second promise
  console.log(json);
}

fetchAlbums();
