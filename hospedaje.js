
let hotels = [];
let hotelsBackup = [];
fetch('hotels.json')
  .then(response => response.json())
  .then(data => {
    hotels = data;
    hotelsBackup = data;
    fillTemplate(hotels);
  });

let hotelsContainer = document.querySelector('#hotels');
let filterOrderBy = document.getElementsByName('orderBy');

function fillTemplate (items) {
  hotelsContainer.innerHTML = '';
  let orderType = 'precio';
  for (let x = 0; x <= items.length - 1; x++) {
    if (filterOrderBy[x].checked) {
      orderType = filterOrderBy[x].value;
      break;
    }
  }
  switch (orderType) {
    case 'type':
      items.sort((a, b) => a.type - b.type);
      break;
      case 'distance':
      items.sort((a, b) => a.distance - b.distance);
      break;
    default:
      items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }
  document.querySelector('#total').innerHTML = items.length;
  items.forEach(function (hotel) {
    let arti = document.createElement('article');
    let hotelTemplate = `
      <div class="description">
        <h2>${hotel.name}</h2>
        <ul class="desc-1">
          <li><span class="title">TIPO:</span> ${hotel.type}</li>
          <li><span class="title">ZONA:</span> ${hotel.zone}</li>
          <li><span class="title">COSTO:</span> Desde $ ${(hotel.price).toLocaleString('en-US')}</li>
          <li><span class="title">DISTANCIA:</span> A ${hotel.distance} minutos del salón</li>
          <li><span class="title">OPINIONES:</span> ${getStars(hotel.stars)}</li>
          <li><span class="title">PÁGINA:</span> <a href="${hotel.website}" target="_blank">${hotel.websiteText}</a></li>
        </ul>
        <ul class="desc-2">
          ${getBenefits(hotel.benefits)}
        </ul>
      </div>
      <div class="map">
        <p><a href="${hotel.mapLink}" target="_blank">${hotel.mapLink}</a></p>
        <button onclick="showMap(this)" data-src="${hotel.mapIframe}">Mostrar mapa</button>
        <iframe allowfullscreen="" loading="lazy"></iframe>
      </div>
    `;
    arti.innerHTML = hotelTemplate;
    hotelsContainer.appendChild(arti);
  });
}

function getStars (total) {
  let starsFill = '';
  let starsEmpty = '';
  for (let i = 1; i <= total; i++) {
    starsFill += '&#9733;';
  }
  for (let x = total; x < 5; x++) {
    starsEmpty += '&#9733;';
  }
  return `<span class="stars-fill">${starsFill}</span><span class="stars-empty">${starsEmpty}</span>`;
}

function getBenefits (benefits) {
  let html = '';
  benefits.forEach(function (benefit) {
    html += `<li>${benefit}</li>`;
  });
  return html;
}

function showMap (element) {
  let mapContainer = element.parentElement;
  let gmap = mapContainer.querySelector('iframe');
  gmap.setAttribute('src', element.dataset.src);
  gmap.style.display = 'block';
  element.style.display = 'none';
}

function filterResults () {
  let typeField = document.querySelector('#typeFilter');
  let priceField = document.querySelector('#priceFilter');
  let search1 = [];
  let search2 = [];
  switch (typeField.value) {
    case 'Hotel':
      search1 = hotelsBackup.filter(function (item) {
        return item.type === 'Hotel';
      });
      break;
    case 'AirBnB':
      search1 = hotelsBackup.filter(function (item) {
        return item.type === 'AirBnB';
      });
      break;
    default:
      search1 = hotelsBackup;
  }
  search2 = search1.filter(function (item) {
    return parseInt(item.price) <= parseInt(priceField.value);
  });
  fillTemplate(search2);
}

function setSliderVal () {
  document.querySelector('.slider-value').innerHTML = '$' + (parseInt(document.querySelector('#priceFilter').value)).toLocaleString('en-US');
}