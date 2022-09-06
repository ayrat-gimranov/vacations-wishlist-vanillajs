import { cardsContainer, inputForm, listTitle } from "./selectors.js";
import { Card } from "./Card.js";
import { updateListTitle } from "./updateListTitle.js";
import handleSubmit from './handleSubmit.js';
import SERVER from './serverURL.js';

inputForm.addEventListener('submit', (e) => handleSubmit(e, cardsContainer));

listTitle.innerText = 'Loading...';
try {
  const response = await fetch(`${SERVER}/destinations`);
  const cardsArray = await response.json();  
  cardsArray.forEach(element => {
    let card = new Card().createCardEl(element.destination, element.location, element.photo, element.description, element._id);
    cardsContainer.append(card);
  });
  updateListTitle();
} catch (error) {
  listTitle.innerText = 'Error getting results!'
}


