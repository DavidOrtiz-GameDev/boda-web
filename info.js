let now = new Date();
let partyDate = new Date(2021,6,17);
let diffTime = partyDate.getTime() - now.getTime();
let days = Math.trunc(diffTime / (1000 * 3600 * 24)) + 1;
let textRemainingTime;
if (days >= 0) {
  textRemainingTime = `${days} días para el evento`;
} else {
  textRemainingTime = `hace ${Math.abs(days)} días del evento`;
}
document.querySelector('#remainingDays').innerHTML = textRemainingTime;

function openMap (elem) {
  let mapLink = elem.dataset.link;
  event.preventDefault();
  if( (navigator.platform.indexOf('iPhone') != -1) 
    || (navigator.platform.indexOf('iPod') != -1)
    || (navigator.platform.indexOf('iPad') != -1)
    || (navigator.platform.indexOf('Android') != -1)
    || (navigator.platform.indexOf('Linux') != -1)) {
      window.open('geo:' + mapLink);
  } else {
    window.open('https://maps.google.com/maps?q=' + mapLink);
  }
}