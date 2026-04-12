window.onload = function(){
  document.querySelector(".preloader").style.display = "none";
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

let b64 = window.location.search.substr(2);
let total = b64.substr(0, 1);
let nameGuest = b64DecodeUnicode(b64.substr(1));
if (nameGuest === '') {
  nameGuest = 'Para un invitado especial';
}
document.querySelector(".guest").innerHTML = nameGuest;
// URL del Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzp-y1wnuY6Qcr56IhEN9OUSfb1xPM3qYLiOQoKe3t7xEv-chtKgZDRx3QcH4yCOHlA/exec";

function consultarEstadoInvitado() {
  return fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "check",
      guestCode: b64
    })
  })
  .then(r => r.json());
}

function intentarAsistencia(asistenciaElegida) {
  consultarEstadoInvitado().then(info => {
    // Caso 1: primera vez
    if (!info.respondio) {
      if (confirm(
        "¿Seguro que quieres confirmar que " +
        (asistenciaElegida === "SI" ? "asistirás" : "no asistirás") +
        "?"
      )) {
        enviarAsistencia(asistenciaElegida);
      }
      return;
    }
    // Caso 2.1: ya respondió y pulsa la misma opción
    if (info.asistencia === asistenciaElegida) {
      alert(
        "Ya habías indicado que " +
        (asistenciaElegida === "SI" ? "asistirás." : "no asistirás.")
      );
      return;
    }
    // Caso 2.2: ya respondió pero ahora elige lo contrario
    if (confirm(
      "Anteriormente indicaste que " +
      (info.asistencia === "SI" ? "asistirías" : "no asistirías") +
      ".\n¿Quieres cambiar tu respuesta?"
    )) {
      enviarAsistencia(asistenciaElegida);
    }
  });
}

function enviarAsistencia(asistencia, mensaje = "") {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "save",
      nameGuest: nameGuest,
      guestCode: b64,
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

document.getElementById("openEnvelope").addEventListener("click", function () {
  document.querySelector(".guest").classList.add("out");
  setTimeout(function(){
    document.querySelector(".folder").classList.remove("closed");
    document.getElementById("openEnvelope").classList.add("opened");
  }, 2000);
  setTimeout(function(){
    document.querySelector(".right-front").style.display = "none";
  }, 2800);
  setTimeout(function(){
    document.querySelector(".right-back").classList.add("slided");
  }, 5000);
});
