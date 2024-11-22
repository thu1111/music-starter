const COHORT = "REPLACE_ME!";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

//1.State 

const state = {
  artists: [],
};

//2. Get Data -  Updates state with artists from API
async function getArtists() {
  // TODO
  try {
    const response = await fetch (API_URL);
    const json = await response.json();
    state.artists = json.data;
  } catch (error) {
    console.log(error);    
  }
}

//3. Render
function renderArtists() {
  // TODO
  const artistList = document.querySelector("#artists"); //DOM link with ul

  if (!state.artists.length) {
    recipesList.innerHTML = "<li>No artists.</li>";
    return;
  }

  const artistCards = state.artists.map((artist)=>{
    const card = document.createElement("li");
    card.innerHTML=`
      <h2>${artist.name}</h2>
      <img src="${artist.imageUrl}" alt="${artist.name}"/>
      <p></p>
    `;
    return card;
  });

  artistList.replaceChildren(...artistCards);
}

/** Syncs state with the API and rerender */
async function render() {
  await getArtists();
  renderArtists();
}
render();

//4. Add and Create
/** Asks the API to create a new artist based on the given `artist` */
async function addArtist(artist) {
  // TODO
  try {
    const response = await fetch(API_URL,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artist),
    });
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error.message);
    }

    render();
  } catch (error) {
    console.log(error);    
  }
}

// TODO: Add artist with form data when the form is submitted
const form = document.querySelector("form");
form.addEventListener("submit", async(event)=>{
  event.preventDefault();

  const artist = {
    name: form.artistName.value,
    description: form.description.value,
    imageUrl: form.imageUrl.value,
  }

  await addArtist(artist);
  // render();
});

