import { Spil } from "/lib/model/ajncklase.js";

export {Deljenje, Igrac, Banker, Split};

class Igrac {
    constructor (ime, iznosNovcaZaIgru) {
        this.ime = ime;
        this.iznosNovcaZaIgru = iznosNovcaZaIgru;
        
    }

    set setIznosNovcaZaIgru (noviIznosNovcaZaIgru) { 
        this.iznosNovcaZaIgru = noviIznosNovcaZaIgru;
    }

    set dodajKartuIgracu (karta) {
        this.karteIgraca.push (karta);
    }

}
class Split extends Igrac {
    constructor (ime) {
        super(ime);
        this.karteIgraca = [];
    }

    /* set karteIgraca (karta) {
        this._karteIgraca.push (karta);
    } */

    get tekuciZbir () {
        return this._tekuciZbir;
    }

    ponistiKarteIgraca () {
        this.karteIgraca.length = 0;
    }
}

class Banker {
    constructor (ime, iznosNovcaZaIgru) {
        this.ime = ime;
        this.iznosNovcaZaIgru = iznosNovcaZaIgru;
        
    }

    set setIznosNovcaZaIgru (noviIznosNovcaZaIgru) {
        this.iznosNovcaZaIgru = noviIznosNovcaZaIgru;
    }
    
    
}

class Deljenje {
    constructor (redniBrojDeljenja, opcijeIgre) {
        this.redniBrDeljenja = redniBrojDeljenja;
        this.opcijeIgre = opcijeIgre;
        this.karteBankera = [];
    }
    novoDeljenje () {
        this.redniBrDeljenja++;
    }
    set dodajKartuBankeru (karta) {
        this.karteBankera.push (karta);
    }

    ponistiKarteBankera () {
        this.karteBankera.length = 0;
    }

    kontrolaZbira (tekuciZbirKomp, tekuciZbirIgrac) {

        let proglasiPobedu = '';

        if (tekuciZbirIgrac > tekuciZbirKomp && tekuciZbirIgrac <= 21 && tekuciZbirKomp <=21) {
            proglasiPobedu = 'Igrac';
          } 
          else if (tekuciZbirIgrac < tekuciZbirKomp && tekuciZbirIgrac <= 21 && tekuciZbirKomp <=21) {
            proglasiPobedu = 'Komp';
          }
          else if (tekuciZbirKomp> 21) {
            proglasiPobedu = 'Igrac';
        }
        else if (tekuciZbirIgrac > 21) {
            proglasiPobedu = 'Komp'
        }
          else if (tekuciZbirIgrac === tekuciZbirKomp && tekuciZbirIgrac <= 21 && tekuciZbirKomp <=21) {
              proglasiPobedu = 'Nerešeno';
          }
        return proglasiPobedu;
    }

    obracunDobitka (pobednik, iznosUloga, opcijaIgre, zbirKarata) {

        let obracun = {dobitakIgrac: 0, dobitakKomp:0, poruka: ''};
        let netoDobitak = 0;
        let bj = 1;
        
        if (zbirKarata === 21) {
            bj = 1.5;
        } 

        if (pobednik === 'Igrac') {
            switch (opcijaIgre) {
                case 'Standard':
                    obracun.dobitakIgrac = bj * iznosUloga + iznosUloga;
                    obracun.dobitakKomp = -(bj * iznosUloga);
                    netoDobitak = bj * iznosUloga; // dobitak bez uloženog novca ili gubitak
                    break;
                case 'Dupliranje':
                    obracun.dobitakIgrac = bj * iznosUloga + iznosUloga;
                    obracun.dobitakKomp = -(bj * iznosUloga);
                    netoDobitak = bj * iznosUloga;
                    break;
                case 'Osiguranje':
                    obracun.dobitakIgrac = bj * iznosUloga + iznosUloga; 
                    obracun.dobitakKomp = -(bj * iznosUloga) + 0.5 * iznosUloga;
                    netoDobitak = bj * iznosUloga - 0.5 * iznosUloga;
                    break;
                case 'Podela':

                    break;
            }
            obracun.poruka = 'Čestitamo pobedili ste kompjuter i osvojili ' + netoDobitak + '€';
            return obracun;
        }
        else if (pobednik === 'Komp') {
            switch (opcijaIgre) {
                case 'Standard':
                    obracun.dobitakKomp = iznosUloga;
                    obracun.dobitakIgrac = 0;
                    netoDobitak = iznosUloga;
                    obracun.poruka = 'Pobedio je kompjuter! Izgubili ste ulog od ' + netoDobitak + '€';
                    break;
                case 'Dupliranje':
                    obracun.dobitakKomp = iznosUloga;
                    obracun.dobitakIgrac = 0;
                    netoDobitak = iznosUloga;
                    obracun.poruka = 'Pobedio je kompjuter! Izgubili ste dvostruki iznos uloga od ' + netoDobitak + '€';
                    break;
                case 'Osiguranje':
                    if (zbirKarata === 21) {
                        obracun.dobitakIgrac = 1.5 * iznosUloga;
                        obracun.dobitakKomp = 0;
                        netoDobitak = 0
                        obracun.poruka = 'Dobili ste opkladu! Izgubili ste ulog od ' + iznosUloga + '€' + ' i dobili osiguranje u visini od ' + obracun.dobitakIgrac + '€';
                    }
                    else {
                        obracun.dobitakKomp = 1.5 * iznosUloga;
                        obracun.dobitakIgrac = 0;
                        netoDobitak = 1.5 * iznosUloga;
                        obracun.poruka = 'Pobedio je kompjuter! Izgubili ste ulog ' + iznosUloga + '€' + ' i osiguranje od ' + 0.5 * iznosUloga + '€';
                    }
                    break;
                case 'Podela':

                    break;
                case 'Predaja':
                    obracun.dobitakKomp = 0.5 * iznosUloga;
                    obracun.dobitakIgrac = 0.5 * iznosUloga;
                    netoDobitak = 0.5 * iznosUloga;
                    obracun.poruka = 'Pobedio je kompjuter! Izgubili ste polovinu uloga: ' + netoDobitak + '€';
                    break;
            }
            
            return obracun;
        }
        else if (pobednik === 'Nerešeno') {
            obracun.dobitakIgrac = iznosUloga;
            if (opcijaIgre === 'Osiguranje') {
                obracun.dobitakKomp = 0.5 * iznosUloga;
                obracun.poruka = 'Rezultat je nerešen. Gubite osiguranje od ' + 0.5 * iznosUloga + '€';
            }
            else {
                obracun.dobitakKomp = 0;
                obracun.poruka = 'Rezultat je nerešen. Zadržavate svoj ulog';
            }
            return obracun;
        }

    }
}