export {Karta, Spil, KockarskiSto, StatistikaIgre, Ulog, InfoIgre};

    /* 
    pozdrav: 'Dobrodošli u Ivanov ajnc!',
    novaIgra: 'Započnite novu igru',
    novaKarta: 'Zatražite novu kartu',
    pobedaIgraca: 'Čestitamo. Osvojili ste:',
    pobedaBankera: 'Na žalost izgubili ste:',
    podela: 'Izvukli ste dve identične karte. Ako želite podelu kliknite "Podela"',
    osiguranje: 'Kompjuter ima šansu za ajnc. Ako zelite osiguranje kliknite na "Osiguranje',
    dupliranje: 'Dupliranje'
     */


class Karta {
    constructor (brojKarte, simbol) { 
        this.simbol = simbol;
        this.brojKarte = brojKarte;
    }

    get nazivKarte () {
        return this.brojKarte + ' ' + this.simbol;
    }

    get slikaKarte () {
        return this.brojKarte + '_' + this.simbol + '.png';
    }

    odrediVrednostKarte (tekuciZbir) {
        
        let vrednostKarte = 0;
        
        switch (this.brojKarte) {
            case 'Dvojka':
                vrednostKarte = 2;
                break;
            case 'Trojka':
                vrednostKarte = 3;
                break;
                case 'Četvorka':
                vrednostKarte = 4;
                break;
            case 'Petica':
                vrednostKarte = 5;
                break;
            case 'Šestica':
                vrednostKarte = 6;
                break;
            case 'Sedmica':
                vrednostKarte = 7;
                break;
            case 'Osmica':
                vrednostKarte = 8;
                break;
            case 'Devetka':
                vrednostKarte = 9;
                break;
            case 'Desetka':
                vrednostKarte = 10;
                break;
            case 'Kec':
                if (tekuciZbir <= 10) {
                    vrednostKarte = 11;
                } 
                else if (tekuciZbir === 11) {
                    vrednostKarte = 10;
                }
                else if (tekuciZbir > 11) {
                    vrednostKarte = 1;
                }
                break;
            default:
                vrednostKarte = 10;
        }
        return vrednostKarte;
    }
}

class Spil {
    constructor () {
        
        this.karte = (function () {
            let karte = new Array ();
            let simbolKarte = new Array ('Pik', 'Tref', 'Srce', 'Karo');
            let brojKarte = new Array ('Dvojka', 'Trojka', 'Četvorka', 'Petica', 'Šestica', 'Sedmica',
                                'Osmica', 'Devetka', 'Desetka', 'Kec', 'Žandar', 'Dama', 'Pop');
            
            for (let simbolIdx = 0; simbolIdx < simbolKarte.length; simbolIdx++) { 
                for (let brojKarteIdx = 0; brojKarteIdx < brojKarte.length; brojKarteIdx++) {
                    let karta = new Karta (brojKarte[brojKarteIdx], simbolKarte[simbolIdx]); 
                    
                    karte.push (karta); // objekat karta dodat u niz Spil
                }
            }
            return karte; // niz spil koji sadrži sve karte za igranje
        })();

        this.promesajMe();
    }

    promesajMe() {
        let promesanSpil = new Array ();
        
        for (let spilIdx = this.karte.length; spilIdx > 0; spilIdx-- ) {
          let slucajnoIzvucenaKarta = Math.floor(Math.random() * spilIdx);
          promesanSpil.push (this.karte[slucajnoIzvucenaKarta]);
          this.karte.splice(slucajnoIzvucenaKarta,1);
        }
        this.karte = promesanSpil;
        
        return this.spil
    }

    izvuciKartu () {
        let karta = this.karte.pop();
        return karta;
    }
}

class KockarskiSto {
    constructor () {
    }

    /* let pElement = document.createElement ('p');
    let nadredjeni = document.getElementById (idNadredjenog);
    
    if (skrivenaKarta) {
      let pElementNode = document.createTextNode ('\u00A0' + '>' + '\u00A0' + 'SKRIVENA KARTA');
      let tezinaSkriveneKarte = odrediTezinuKarte (karta.brojKarte, zbirKomp);
      pElement.appendChild(pElementNode);
      pElement.setAttribute ('id', 'skrivenaKarta');
      pElement.setAttribute ('class', 'obrisime');
      pElement.setAttribute ('data-nazivkarte', nazivKarte);
      pElement.setAttribute ('data-tezinakarte', tezinaSkriveneKarte); */
    
      promeniTekstPElementa (pElement, tekst) {
        pElement.innerText = tekst;
    }

}

class Dugme {
    constructor () {
        
    }
}

class StatistikaIgre extends KockarskiSto {
    constructor (brPobedaKomp, osvojenIznosKomp, brPobedaIgrac, osvojenIZnosIgrac) {
        super();
        
        this._pBrPobedaKomp      = () => {return document.getElementById ('pBrPobedaKomp')};
        this._pOsvojenIznosKomp  = () => {return document.getElementById ('pOsvojenIznosKomp')};
        this._pBrPobedaIgrac     = () => {return document.getElementById ('pBrPobedaIgrac')};
        this._pOsvojenIznosIgrac = () => {return document.getElementById ('pOsvojenIznosIgrac')};

        this.brPobedaKomp = brPobedaKomp;
        this.osvojenIznosKomp = osvojenIznosKomp;
        this.brPobedaIgrac = brPobedaIgrac;
        this.osvojenIZnosIgrac = osvojenIZnosIgrac;

        super.promeniTekstPElementa (this._pBrPobedaKomp(), this.brPobedaKomp);
        super.promeniTekstPElementa (this._pOsvojenIznosKomp(), this.osvojenIznosKomp);
        super.promeniTekstPElementa (this._pBrPobedaIgrac(), this.brPobedaIgrac);
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac(), this.osvojenIZnosIgrac);
    }

    upisiBrPobedaKomp () {
        this.brPobedaKomp++;
        super.promeniTekstPElementa (this._pBrPobedaKomp(), this.brPobedaKomp);
    }

    upisiOsvojenIznosKomp (osvojenIznosUPartijiKomp) {
        this.osvojenIznosKomp = this.osvojenIznosKomp + osvojenIznosUPartijiKomp;
        super.promeniTekstPElementa (this._pOsvojenIznosKomp(), this.osvojenIznosKomp);
    }

    upisiPobeduIgrac () {
        this.brPobedaIgrac++;
        super.promeniTekstPElementa (this._pBrPobedaIgrac(), this.brPobedaIgrac);
    }

    upisiOsvojenIznosIgrac (osvojenIznosUPartijiIgrac) {
        this.osvojenIznosIgrac = this.osvojenIznosIgrac + osvojenIznosUPartijiIgrac;
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac(), this.osvojenIznosIgrac);
    }

    upisiUmanjeniIznosIgrac (vrednostZetona) {
        this.osvojenIznosIgrac = this.osvojenIZnosIgrac - vrednostZetona;
        super.promeniTekstPElementa (this._pOsvojenIZnosIgrac,this.osvojenIznosIgrac);
    }
}

class InfoIgre extends KockarskiSto {
    constructor () {
        super();
        this._pInfoIgre = () => {return document.getElementById ('pInfoIgre')};
        this.prikaziPoruku ('Započnite novu igru!');
    }

    prikaziPoruku (poruka) {
        super.promeniTekstPElementa (this._pInfoIgre(), poruka);
    }
}

class Talon extends KockarskiSto {
    constructor () {
        super();

    }

    centrirajKarte (karte = {}) {

    }
}

class TalonKompjuter extends Talon {
    constructor () {
        super();
        this._dStoKomp               = document.getElementById ('dStoKomp');
        this._pZbirKomp              = document.getElementById ('pZbirKomp');
    }
}

class TalonIgrac extends Talon {
    constructor () {
        super();
        this._dStoSplit1             = document.getElementById ('dStoSplit1');
        this._pZbirSplit1            = document.getElementById ('pZbirSplit1');
        this._dStoSplit2             = document.getElementById ('dStoSplit2');
        this._pZbirSplit2            = document.getElementById ('pZbirSplit2');
    }
}

class Ulog extends KockarskiSto {
    constructor () {
        super ();
        
        this._iznosUloga = 0;
        this._zetoniAktivni = true;

        this._dIznosUloga            = document.getElementById ('dIznosUloga');
        this._pIznosUloga            = document.getElementById ('pIznosUloga');

        this._dugmici = document.getElementsByClassName ('zeton');
        this._omoguciZetone ();
    }

    _uloziZeton (vrednostZetona) {
        if (this._zetoniAktivni === true) {
            this._iznosUloga = this._iznosUloga + vrednostZetona;
            super.promeniTekstPElementa (this._pIznosUloga, this._iznosUloga);
        }
    }
    
    _ponistiUlog () {
        if (this._zetoniAktivni === true) {
            this._iznosUloga = 0;
            super.promeniTekstPElementa (this._pIznosUloga, this._iznosUloga);
        }
    }
    
    _omoguciZetone () {

        Array.from (this._dugmici).forEach (dugme => {
            
            switch (dugme.id) {
                case 'but1':
                    dugme.addEventListener ('click', () => {this._uloziZeton (1);});
                    break;
                case 'but10':
                    dugme.addEventListener ('click', () => {this._uloziZeton (10);});
                    break;
                case 'but50':
                    dugme.addEventListener ('click', () => {this._uloziZeton (50);});
                    break;
                case 'but100':
                    dugme.addEventListener ('click', () => {this._uloziZeton (100);});
                    break;
                case 'but0':
                    dugme.addEventListener ('click', () => {this._ponistiUlog ();});
                    break;
            }
        });
    }

    deaktivirajZetone () {
        this._zetoniAktivni = false;
    }

    aktivirajZetone () {
        this._zetoniAktivni = true;
    }
}

