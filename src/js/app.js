import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from './store/favorites';



document.addEventListener('DOMContentLoaded', (е)=> {
  const form = formUI.form;
  const ticketsDiv = ticketsUI.container;
  const favoritesDiv = favoritesUI.container;


  // Events
  initApp();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });
  ticketsDiv.addEventListener('click', onTicketsDivHandler);
  favoritesDiv.addEventListener('click', onFavoritesDeleteHandler);


  //Handlers

  function onFavoritesDeleteHandler({ target }) {
    if (target.classList.contains('delete-favorite')) {
      const parent = target.closest('.favorite-item');
      favoritesUI.deleteFavorite(parent);
      parent.remove();
    };
  }


  function onTicketsDivHandler({ target }) {
    if (target.classList.contains('add-favorite')) {
      const parent = target.closest('.ticket-card');
      favoritesUI.renderFavorites(parent);
      const btn = target.closest('.add-favorite');
      btn.remove();
    };
  }

  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    // CODE, CODE, 2021-06, 2021-07, RUB
    
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    // console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }
});


