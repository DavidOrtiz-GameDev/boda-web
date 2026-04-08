window.onload = function(){
  document.querySelector(".preloader").style.display = "none";
}

let b64 = window.location.search.substr(2);
let total = b64.substr(0, 1);
let nameGuest = decodeURIComponent(escape(window.atob( b64.substr(1) )));
if (nameGuest === '') {
  nameGuest = 'Para un invitado especial';
}
document.querySelector(".guest").innerHTML = nameGuest;

function enviarAsistencia(asistencia, mensaje = "") {
  fetch("https://script.google.com/macros/s/AKfycbw1ZtkIddMQ7HWPjk_Sms_ZK9TdCePe65XmUwoqMqjvC8f6VQiVZyym7Kg7_3dBSHJp/exec", {
    method: "POST",
    body: JSON.stringify({
      nameGuest: nameGuest,
      asistencia: asistencia,
      mensaje: mensaje
    })
  })
  .then(r => r.json())
  .then(res => {
    alert("¡Gracias por confirmar!");
  });
}

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
