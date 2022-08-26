import { Card } from "./Card.js";
import { updateListTitle } from "./updateListTitle.js";
import { cardsContainer } from "./selectors.js";
import { inputForm } from "./selectors.js";

const defaultPhotoUrl = "https://c.pxhere.com/photos/a7/e3/red_rock_jeep_canoe_transport_vehicle-1392511.jpg!d"

inputForm.addEventListener('submit', (e) => addCard(e, cardsContainer));

function addCard(e, container) {
  e.preventDefault();
  let destination = e.target.destination.value;
  let location = e.target.location.value;
  let photo = e.target.photo.value ? e.target.photo.value : defaultPhotoUrl;
  let description = e.target.description.value;
  e.target.reset();
  let newCard = new Card().createCardEl(destination, location, photo, description);  

  container.append(newCard);
  updateListTitle();
}
