import { cardsContainer } from "./selectors.js";
import { listTitle } from "./selectors.js";

export function updateListTitle(){
  listTitle.textContent = cardsContainer.children.length > 0 ? "My WishList" : "Enter destination details";
}
