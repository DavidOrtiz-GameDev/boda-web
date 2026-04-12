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

function intentarAsistencia(asistenciaElegida) {
  fetch("https://script.google.com/macros/s/AKfycbwC5ChhqePDbSXQK_M6hc4Efl7bRM0yRpcZpbbnY7pCCE5DLEkYVQ_le__nNaJrtkz-/exec?name=" + encodeURIComponent(nameGuest))
    .then(r => r.json())
    .then(info => {
      if (!info.respondio) {
        // Caso 1: primera vez
        mostrarPopupConfirmacion(asistenciaElegida);
      } else {
        if (info.asistencia === asistenciaElegida) {
          // Caso 2.1: misma respuesta
          mostrarPopupYaRespondido(info.asistencia);
        } else {
          // Caso 2.2: respuesta distinta
          mostrarPopupCambio(asistenciaElegida, info.asistencia);
        }
      }
    });
}

function mostrarPopupConfirmacion(asistencia) {
  if (confirm("¿Seguro que quieres confirmar que " + 
      (asistencia === "SI" ? "asistirás" : "no asistirás") + "?")) {
    enviarAsistencia(asistencia);
  }
}

function mostrarPopupYaRespondido(asistencia) {
  alert("Ya habías indicado que " + 
    (asistencia === "SI" ? "asistirás." : "no asistirás."));
}

function mostrarPopupCambio(nueva, anterior) {
  if (confirm("Antes indicaste que " + 
      (anterior === "SI" ? "asistirías" : "no asistirías") +
      ". ¿Quieres cambiar tu respuesta?")) {
    enviarAsistencia(nueva);
  }
}

function enviarAsistencia(asistencia, mensaje = "") {
  fetch("https://script.google.com/macros/s/AKfycbwC5ChhqePDbSXQK_M6hc4Efl7bRM0yRpcZpbbnY7pCCE5DLEkYVQ_le__nNaJrtkz-/exec", {
    method: "POST",
    body: JSON.stringify({
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
