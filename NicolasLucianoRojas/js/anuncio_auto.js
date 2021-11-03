import Anuncio from "./anuncio.js";


export default class Anuncio_Auto extends Anuncio{

    constructor(id,titulo, transaccion, descripcion, precio, puertas, kms, potencia)
    {
        super(id,titulo, transaccion, descripcion, precio);
        this.kms =  kms;
        this.puertas =  puertas;
        this.potencia = potencia;

    }

}