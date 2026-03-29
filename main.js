window.onload = function(){
  document.querySelector(".preloader").style.display = "none";
}

let b64 = window.location.search.substr(3);
let total = b64.substr(0, 1);
let nameGuest = decodeURIComponent(escape(window.atob( b64.substr(1) )));
if (nameGuest === '') {
  nameGuest = 'Fam. Garduño Zuñiga'
}
document.querySelector(".guest").innerHTML = nameGuest;

let file;
switch (parseInt(total)) {
  case 2:
    file = '2';
    break;
  case 3:
    file = '3';
    break;
  case 4:
    file = '4';
    break;
  case 5:
    file = '5';
    break;
  default:
    file = '1';
}
document.querySelector(".right-back img").setAttribute("src", "images/paper-two-" + file + ".jpg");

document.querySelector("button").addEventListener("click", function () {
  document.querySelector(".guest").classList.add("out");
  setTimeout(function(){
    document.querySelector(".folder").classList.remove("closed");
    document.querySelector("button").classList.add("opened");
  }, 2000);
  setTimeout(function(){
    document.querySelector(".right-front").style.display = "none";
  }, 2800);
  setTimeout(function(){
    document.querySelector(".right-back").classList.add("slided");
  }, 5000);
});