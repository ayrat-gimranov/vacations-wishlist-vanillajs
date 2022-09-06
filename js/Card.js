import { updateListTitle } from "./updateListTitle.js";
import { spinnerGif } from "./selectors.js";
import SERVER from './serverURL.js';

export class Card {
  constructor() {
    this.cardTitleElement;
    this.cardSubtitleElement;
    this.imgElement;
    this.cardDescriptionElement;
    this._id;
  }

  createCardEl(destination, location, photo, description, id) {
    this._id = id;

    this.imgElement = document.createElement('img');
    this.imgElement.className = "card-img-top";
    this.imgElement.src = photo;

    this.cardTitleElement = document.createElement('h5');
    this.cardTitleElement.className = 'card-title';
    this.cardTitleElement.textContent = destination;

    this.cardSubtitleElement = document.createElement('h6');
    this.cardSubtitleElement.className = "card-subtitle mb-2 text-muted";
    this.cardSubtitleElement.textContent = location;

    this.cardDescriptionElement = document.createElement('p');
    this.cardDescriptionElement.className = "card-text";
    this.cardDescriptionElement.textContent = description;

    let buttonGroup = document.createElement('div');
    buttonGroup.id = "button_group";
    buttonGroup.className = "card_body";

    let card = document.createElement('div');
    card.className = 'card shadow-sm bg-light';
    card.style.width = '15rem';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    card.append(this.imgElement, cardBody);
    cardBody.append(this.cardTitleElement, this.cardSubtitleElement, this.cardDescriptionElement, buttonGroup);

    let editBtn = document.createElement('button')
    editBtn.type = "button";
    editBtn.className = "btn btn-warning";
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => this.updateCard(this));

    let deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-danger";
    deleteBtn.type = "button";
    deleteBtn.textContent = 'Remove';
    deleteBtn.addEventListener('click', () => this.removeCard(card, this._id));
    buttonGroup.append(editBtn, deleteBtn);

    return card
  }

  async updateCard(card) {

    const oldDestination = card.cardTitleElement.textContent;
    const oldLocation = card.cardSubtitleElement.textContent;
    const oldImage = card.imgElement.src;
    const newDestination = prompt('Enter new name');
    const newLocation = prompt('Enter new location');

    let body = { destination: oldDestination, location: oldLocation };

    if (newDestination) {
      card.cardTitleElement.textContent = newDestination;
      body.destination = newDestination;
    }
    if (newLocation) {
      card.cardSubtitleElement.textContent = newLocation;
      body.location = newLocation;
    }
    if (newDestination || newLocation) {
      body.id = card._id;
      card.imgElement.src = spinnerGif;
      try{
        const response = await fetch(`${SERVER}/destinations`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify(body)
        })
        card.imgElement.src = await response.json()
      } catch(error){
        card.cardTitleElement.textContent = oldDestination;
        card.cardSubtitleElement.textContent = oldLocation;
        card.imgElement.src = oldImage;
        alert("Error: Unable to update the card!")
      }
    }
  }

  async removeCard(card, id) {
    const originalDisplayMode = card.style.display; 
    card.style.display = 'none';
    updateListTitle();
    try {
      let response = await fetch(`${SERVER}/destinations`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          id
        })
      })
      card.remove();
      updateListTitle();
    } catch (error) {
      console.log(error)
      alert("Error: Could not delete the card!");
      card.style.display = originalDisplayMode;
      updateListTitle()
    }
  }
}