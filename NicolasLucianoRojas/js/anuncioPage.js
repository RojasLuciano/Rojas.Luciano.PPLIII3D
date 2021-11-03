import { crearArticulo } from "./tabla.js";

//le pego a la tabla nueva
const $divTabla = document.getElementById("divTabla");

//busco el local storage
const autos = JSON.parse(localStorage.getItem("anuncios")) || [];

if(autos.length != 0){
    crearArticulo(autos);
}