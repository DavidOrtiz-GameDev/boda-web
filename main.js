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
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbBywUnSyjB9r2ujHkQziUY8VoGszXwxy06a-FTts87Ni6RGBwR8Xmp78Sqjlu_7SK/exec";

function desactivarBotones() {
  document.getElementById("btnSi").disabled = true;
  document.getElementById("btnNo").disabled = true;
}

function activarBotones() {
  document.getElementById("btnSi").disabled = false;
  document.getElementById("btnNo").disabled = false;
}

function showPopup(html) {
  document.getElementById("popup-content").innerHTML = html;
  document.getElementById("popup").classList.remove("hidden");
}

function hidePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function confirmar(asistencia) {
  const mensaje = document.getElementById("msg")?.value || "";
  showPopup("<p>Actualizando datos...</p>");
  enviarAsistencia(asistencia, mensaje);
  activarBotones();
}

function cancelar() {
  hidePopup();
  activarBotones();
}

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
  desactivarBotones();
  showPopup("<p>Revisando la lista de invitados...</p>");
  
  consultarEstadoInvitado().then(info => {
    // Caso 1: primera vez
    if (!info.respondio) {
      showPopup(`
        <p>¿Seguro que quieres confirmar que ${asistenciaElegida === "SI" ? "asistirás" : "no asistirás"}?</p>
        <p>Si quieres, ¡puedes enviarnos un mensaje! ❤️</p>
        <textarea id="msg"></textarea>
        <button onclick="confirmar('${asistenciaElegida}')">Confirmar</button>
        <button onclick="cancelar()">Cancelar</button>
      `);
      return;
    }
    // Caso 2.1: ya respondió y pulsa la misma opción
    if (info.asistencia === asistenciaElegida) {
      showPopup(`
        <p>Ya habías indicado que ${asistenciaElegida === "SI" ? "asistirás" : "no asistirás"},</p>
        <p>¡pero puedes mandarnos otro mensaje si quieres! ❤️</p>
        <textarea id="msg"></textarea>
        <button onclick="confirmar('${asistenciaElegida}')">Añadir mensaje</button>
        <button onclick="cancelar()">Cerrar</button>
      `);
      return;
    }
    // Caso 2.2: ya respondió pero ahora elige lo contrario
    showPopup(`
      <p>Anteriormente indicaste que ${info.asistencia === "SI" ? "asistirías" : "no asistirías"}.</p>
      <p>¿Quieres cambiar tu respuesta?</p>
      <p>Puedes añadir otro mensaje si quieres. ❤️</p>
      <textarea id="msg"></textarea>
      <button onclick="confirmar('${asistenciaElegida}')">Cambiar</button>
      <button onclick="cancelar()">Cancelar</button>
    `);
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
    showPopup(`
        <p>¡Gracias!</p>
        <button onclick="cancelar()">Aceptar</button>
      `);
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

let currentView = "center"; // estado inicial
const navLeft = document.getElementById("nav-left");
const navRight = document.getElementById("nav-right");
const content = document.querySelector(".content");

function updateView() {
  if (currentView === "center") {
    content.style.transform = "translateX(-100vw)";
    navLeft.classList.remove("hidden");
    navRight.classList.remove("hidden");
  }
  if (currentView === "left") {
    content.style.transform = "translateX(0)";
    navLeft.classList.add("hidden");
    navRight.classList.remove("hidden");
  }
  if (currentView === "right") {
    content.style.transform = "translateX(-200vw)";
    navRight.classList.add("hidden");
    navLeft.classList.remove("hidden");
  }
}
// Eventos de flechas
navLeft.onclick = () => {
  if (currentView === "center") currentView = "left";
  else if (currentView === "right") currentView = "center";
  updateView();
};
navRight.onclick = () => {
  if (currentView === "center") currentView = "right";
  else if (currentView === "left") currentView = "center";
  updateView();
};

document.getElementById("openEnvelope").addEventListener("click", function () {
  document.querySelector(".guest").classList.add("out");
  setTimeout(function(){
    document.querySelector(".folder").classList.remove("closed");
    document.getElementById("openEnvelope").classList.add("opened");
    document.querySelector(".footer").style.width = "300vw";
    document.querySelector(".guest").style.display = "none";
  }, 2000);
  setTimeout(function(){
    document.querySelector(".right-front").style.display = "none";
  }, 2800);
  setTimeout(function(){
    document.querySelector(".right-back").classList.add("slided");
  }, 5000);
  setTimeout(() => {
    content.style.transform = "translateX(-100vw)";
    navLeft.classList.remove("hidden");
    navRight.classList.remove("hidden");
  }, 5200);
});
