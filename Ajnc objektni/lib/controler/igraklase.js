import { Spil } from "/lib/model/ajncklase.js";

export {Deljenje, Igrac, Banker, Split};

class Igrac {
    constructor (ime, iznosNovcaZaIgru) {
        this.ime = ime;
        this._iznosNovcaZaIgru = iznosNovcaZaIgru;
        
    }

    set iznosNovcaZaIgru (noviIznosNovcaZaIgru) {
        this._iznosNovcaZaIgru = noviIznosNovcaZaIgru;
    }

    zapocniIgru () {

    }

    zatraziKartu () {

    }

    zatraziOsiguranje () {

    }

    zatraziPodelu () {

    }
}

class Split extends Igrac {
    constructor (tekuciZbir) {
        super();
        this._tekuciZbir = tekuciZbir;
        this._karteIgraca = {};
    }

    set karteIgraca (karta) {
        this._karteIgraca.push (karta);
    }

    get tekuciZbir () {
        return this._tekuciZbir;
    }

    set tekuciZbir (noviTekuciZbir) {
        this._tekuciZbir = noviTekuciZbir;
    }
}

class Banker {
    constructor (iznosNovcaZaIgru) {
        this._iznosNovcaZaIgru = iznosNovcaZaIgru;
        
    }

    set iznosNovcaZaIgru (noviIznosNovcaZaIgru) {
        this._iznosNovcaZaIgru = noviIznosNovcaZaIgru;
    }

    izvuciKarte () {

    }
}

class Deljenje {
    constructor (redniBrojDeljenja, fazaDeljenja, tekuciZbirBankera) {
        this.redniBrDeljenja = redniBrojDeljenja;
        this.fazaDeljenja = fazaDeljenja;
        this.tekuciZbirBankera = tekuciZbirBankera;
        this.karteBankera = {};
        
        this.podeliKarte();
    }

    podeliKarte () {
        Split.karteIgraca (Spil.izvuciKartu());
        this.karteBankera.push(Spil.izvuciKartu());
        Split.karteIgraca (Spil.izvuciKartu());
        this.karteBankera.push(Spil.izvuciKartu());
    }
}