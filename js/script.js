import { cardsContainer, inputForm, spinnerGif } from "./selectors.js";
import { Card } from "./Card.js";
import { updateListTitle } from "./updateListTitle.js";

inputForm.addEventListener('submit', (e) => addCard(e, cardsContainer));

async function addCard(e, container) {
  e.preventDefault();
  let destination = e.target.destination.value;
  let location = e.target.location.value;
  let photo = "../img/Loading_icon.gif";
  let description = e.target.description.value;

  e.target.reset();
  let newCard = new Card().createCardEl(destination, location, photo, description);

  container.append(newCard);
  updateListTitle();
}
