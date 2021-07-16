import ticketsUI from '../views/tickets';
import currencyUI from '../views/currency';
import locations from "./locations";

class FavoritesUI {
  constructor(currency) {
    this.container = document.querySelector('.favorites .dropdown-content');
    this.objF = {};
    this.currencySymbol = currency.getCurrencySymbol.bind(currency);

    this.btn = `<a
    class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
    >Add to favorites</a>`;
  };

  get favorites() {
    return this.container;
  }
  

  renderFavorites(ticket) {

   let fragment = '';
   const currency = this.currencySymbol();

   locations.lastSearch.forEach(obj => {
     if (obj.id === ticket.id) {
      this.objF[obj.id] = obj;
      fragment = FavoritesUI.favoriteTemplate(obj, currency);

      // console.log(this.objF);
     }
   });

   this.container.insertAdjacentHTML('afterbegin', fragment);

  }

  deleteFavorite(ticketFav) {
    delete this.objF[ticketFav.id.split('rite-')[1]];

    locations.lastSearch.forEach(obj => {
      if (obj.id === ticketFav.id.split('rite-')[1]) {
        const ticketFavDiv = document.getElementById(obj.id);
        ticketFavDiv.insertAdjacentHTML('beforeend', this.btn);
      }
    }); 
  };
    

  static favoriteTemplate(obj, currency) {
    return `
              <li class="favorite-item  d-flex align-items-start" id="favorite-${obj.id}"> 
                <img
                  src=${obj.airline_logo}
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${obj.origin_name}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${obj.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${obj.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${obj.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${obj.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${obj.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
              </li>
    `;
  };



};

const favoritesUI = new FavoritesUI(currencyUI);

export default favoritesUI;
