import Anuncio_Auto from "./anuncio_auto.js";

import { createTable } from "./tabLa.js";

let anuncios = leeStorage() || [];

const frm = document.forms[0];
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar =  document.getElementById("btnEliminar");
const btnCancelar =  document.getElementById("btnCancelar");

window.addEventListener("DOMContentLoaded", () => {
  handlerLoadTable();
  frm.addEventListener("submit", handlersubmit);
  btnEliminar.addEventListener("click",handlreEliminarAnuncio);
  btnCancelar.addEventListener("click",handlerCancelar);
  document.addEventListener("click",handlerClick);
});

function handlerClick(e){

  if(e.target.matches("td"))
  {
    let id = e.target.parentNode.dataset.id;
    const anuncio =  anuncios.filter(p=> p.id === parseInt(id))[0]; 
    cargarFormulario(frm, id, anuncio.titulo, anuncio.transaccion, anuncio.descripcion, anuncio.precio, anuncio.puertas, anuncio.kms,anuncio.potencia); 
    modificarFuncionBoton(e.target);
  }
  else if (!e.target.matches("input")){
    modificarFuncionBoton(e.target);
    limpiaFormulario(frm);
  }
}

function handlerCancelar(e)
{
  modificarFuncionBoton(e.target);
  limpiaFormulario(frm);
}


function modificarFuncionBoton(target)
{
  if(target.matches("td"))
  {
    btnGuardar.setAttribute("class","oculto");
    btnEliminar.removeAttribute("class");
    btnCancelar.removeAttribute("class");

  }
  else{
    btnGuardar.removeAttribute("class");
    btnEliminar.setAttribute("class","oculto");
    btnCancelar.setAttribute("class","oculto");
  }  
}



function cargarFormulario(formulario,...datos){ 
  formulario.id.value =  datos[0];
  formulario.titulo.value =  datos[1];
  formulario.transaccion.value =  datos[2];
  formulario.descripcion.value =  datos[3];
  formulario.precio.value =  datos[4];
  formulario.puertas.value =  datos[5];
  formulario.kms.value =  datos[6];
  formulario.potencia.value =  datos[7];
}



function handlersubmit(e) {
  e.preventDefault();
  const frm = e.target;
  const nuevoAnuncio = new Anuncio_Auto(
    Date.now(),
    frm.titulo.value,
    frm.transaccion.value,
    frm.descripcion.value,
    frm.precio.value,
    frm.puertas.value,
    frm.kms.value,
    frm.potencia.value
  );
  console.log("Dando de Alta");
  console.log(nuevoAnuncio);
  altaAnuncio(nuevoAnuncio);
}

function altaAnuncio(anuncio) {
  inyectarSpinner();
  setTimeout(() => {
    anuncios.push(anuncio);
    handlerLoadTable();
    guardarStorage(anuncios);
    removerSpinner();
    limpiaFormulario(frm)
  }, 2000);
}


function handlreEliminarAnuncio(e)
{
  if(confirm("Confirma la Eliminacion"))
  {
  inyectarSpinner();
  setTimeout(()=>{
    let id = parseInt(frm.id.value);
    let anuncioAux =  anuncios.filter(p=>p.id != id);
    anuncios =  anuncioAux;
    guardarStorage(anuncios); 
    removerSpinner();
    handlerLoadTable();
    limpiaFormulario(frm);
  },3000);
  }
}


function limpiaFormulario(formulario)
{
  const frmArray =  [...formulario];
  frmArray.forEach((element)=>{
    let tipo = element.type;
    if(tipo == "text")
    {
      element.value="";
    }  
  });
}

function inyectarSpinner() {
  const spinner = document.createElement("img");
  const contenedor = document.getElementById("spinner-container");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");
  spinner.setAttribute("height","64px");
  spinner.setAttribute("width","64px");
  contenedor.appendChild(spinner);
}
function removerSpinner() {
  const contenedor = document.getElementById("spinner-container");
  contenedor.removeChild(contenedor.firstChild);
}

function guardarStorage(datos) {
  localStorage.setItem("anuncios", JSON.stringify(datos));
}

function leeStorage() {
  return JSON.parse(localStorage.getItem("anuncios"));
}

function handlerLoadTable(e) {
  renderizarTable(createTable(anuncios), document.getElementById("divTabla"));
}

function renderizarTable(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

