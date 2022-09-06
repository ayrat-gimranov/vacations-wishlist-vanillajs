import { updateListTitle } from "./updateListTitle.js";
import { spinnerGif } from "./selectors.js";
import { Card } from "./Card.js";
import SERVER from './serverURL.js';

export default async function handleSubmit(e, container) {
  e.preventDefault();
  let destination = e.target.destination.value;
  let location = e.target.location.value;
  let photo = spinnerGif;
  let description = e.target.description.value;

  e.target.reset();

  let cardObject = new Card();
  let newCard = cardObject.createCardEl(destination, location, photo, description, null);
  container.append(newCard);
  updateListTitle();

  try {
    let response = await fetch(`${SERVER}/destinations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        destination,
        location,
        description
      })
    })

    const result = await response.json();
    cardObject.imgElement.src = result.finalPhoto;
    cardObject._id = result._id;
  } catch (error) {
    console.log("oh no!", error.message);
    newCard.remove();
    updateListTitle();
  }
}