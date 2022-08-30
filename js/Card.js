import { updateListTitle } from "./updateListTitle.js";
import { fetchPhoto } from "./fetchPhoto.js";

export class Card {
  constructor() {
    this.cardTitleElement;
    this.cardSubtitleElement;
    this.imgElement;
    this.cardDescriptionElement;
  }

  createCardEl(destination, location, photo, description) {
    
    this.imgElement  = document.createElement('img');
    this.imgElement.className = "card-img-top";
    this.imgElement.src = photo;
    fetchPhoto(destination, location).then(result => this.imgElement.src = result);
        
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
    card.className = 'card';
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
    deleteBtn.addEventListener('click', () => this.removeCard(card)); 
    buttonGroup.append(editBtn, deleteBtn);
  
    return card
  }

  async updateCard(card){
    const newDestination = prompt('Enter new name');
    const newLocation = prompt('Enter new location');

    if(newDestination) card.cardTitleElement.textContent = newDestination;
    if(newLocation) card.cardSubtitleElement.textContent = newLocation;
    if(newDestination && newLocation) {
      card.imgElement.src = "../img/Loading_icon.gif";
      card.imgElement.src = await fetchPhoto(newDestination, newLocation);
    }
  }  
    
  removeCard(card){
    card.remove();
    updateListTitle();
  }
}