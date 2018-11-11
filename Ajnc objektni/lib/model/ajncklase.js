export {Karta, Spil, KockarskiSto, StatistikaIgre, InfoIgre, Talon, Dugme};

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
    constructor (brojKarte, simbol, skrivenaKarta, imgElement) { 
        this.simbol = simbol;
        this.brojKarte = brojKarte;
        this.skrivenaKarta = skrivenaKarta;
        this.imgElementKarte = imgElement;
        /* this.skrivenaKarta = skrivenaKarta; */
    }

    get nazivKarte () {
        return this.brojKarte + '_' + this.simbol;
    }

    get nazivSlikeKarte () {
        return this.brojKarte + '_' + this.simbol + '.png';
    }

    set imgElement (noviImgElement) {
        this.imgElementKarte = noviImgElement;
    }

    sakrijOtkrijKartu () {
        if (this.skrivenaKarta === false) {
            this.skrivenaKarta = true;
        }
        else {
            this.skrivenaKarta = false;
        }
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
                    let karta = new Karta (brojKarte[brojKarteIdx], simbolKarte[simbolIdx], false, ''); 
                    
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

class Dugme {
    constructor (_nazivDugmeta, _funkcija) {
        
        this._htmlElement = '';
        
        switch (_nazivDugmeta) {
        
            case 'Nova igra':
                this._htmlElement = document.getElementById ('butNovaIgra');
                this._htmlElement.addEventListener ('click', _funkcija);
                break;
            case 'Daj kartu':
                this._htmlElement = document.getElementById ('butDajKartu');
                this._htmlElement.addEventListener ('click', _funkcija);
                break;
            case 'Stani':
                this._htmlElement = document.getElementById ('butStani');
                this._htmlElement.addEventListener ('click', _funkcija);
                break;
            case 'Osiguraj':
                this._htmlElement = document.getElementById ('butOsiguraj');
                this._htmlElement.addEventListener ('click', _funkcija);
            break;
            case 'Dupliraj':
                this._htmlElement = document.getElementById ('butDupliraj');
                this._htmlElement.addEventListener ('click', _funkcija);
            break;
            case 'Podeli':
                this._htmlElement = document.getElementById ('butPodeli');
                this._htmlElement.addEventListener ('click', _funkcija);
            break;
            case 'Predaj':
                this._htmlElement = document.getElementById ('butPredaj');
                this._htmlElement.addEventListener ('click', _funkcija);
                break;
            case 'Otkrij kartu':
                this._htmlElement = document.getElementById ('butOtkrijSKartu');
                this._htmlElement.addEventListener ('click', _funkcija);
            break;

        } 
        this._htmlElement.style.display = 'block';
    }

    sakrijDugme () {
        this._htmlElement.style.display = 'none';
    }
    
    otkrijDugme () {
        this._htmlElement.style.display = 'block';
    }
}

class KockarskiSto {
    constructor () {
    }

    promeniTekstPElementa (pElement, tekst) {
        pElement.innerText = tekst;
    }

}

class StatistikaIgre extends KockarskiSto {
    constructor (brPobedaKomp, osvojenIznosKomp, brPobedaIgrac, osvojenIznosIgrac, iznosUloga) {
        super();
        
        this._pBrPobedaKomp      = document.getElementById ('pBrPobedaKomp');
        this._pOsvojenIznosKomp  = document.getElementById ('pOsvojenIznosKomp');
        this._pBrPobedaIgrac     = document.getElementById ('pBrPobedaIgrac');
        this._pOsvojenIznosIgrac = document.getElementById ('pOsvojenIznosIgrac');
    
        this._dIznosUloga        = document.getElementById ('dIznosUloga');
        this._pIznosUloga        = document.getElementById ('pIznosUloga');

        this._dugmici            = document.getElementsByClassName ('zeton');
        
        this._zetoniAktivni = true;
        
        this.brPobedaKomp = brPobedaKomp;
        this.osvojenIznosKomp = osvojenIznosKomp;
        this.brPobedaIgrac = brPobedaIgrac;
        this.osvojenIznosIgrac = osvojenIznosIgrac;
        this.iznosUloga = iznosUloga;

        super.promeniTekstPElementa (this._pBrPobedaKomp, this.brPobedaKomp);
        super.promeniTekstPElementa (this._pOsvojenIznosKomp, this.osvojenIznosKomp);
        super.promeniTekstPElementa (this._pBrPobedaIgrac, this.brPobedaIgrac);
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
        this._omoguciZetone ();
    }

    
    upisiBrPobedaKomp () {
        this.brPobedaKomp++;
        super.promeniTekstPElementa (this._pBrPobedaKomp, this.brPobedaKomp);
    }

    upisiOsvojenIznosKomp (osvojenIznosUPartijiKomp) {
        this.osvojenIznosKomp = this.osvojenIznosKomp + osvojenIznosUPartijiKomp;
        super.promeniTekstPElementa (this._pOsvojenIznosKomp, this.osvojenIznosKomp);
    }

    upisiBrPobedaIgrac () {
        this.brPobedaIgrac++;
        super.promeniTekstPElementa (this._pBrPobedaIgrac, this.brPobedaIgrac);
    }

    upisiOsvojenIznosIgrac (osvojenIznosUPartijiIgrac) {
        this.osvojenIznosIgrac = this.osvojenIznosIgrac + osvojenIznosUPartijiIgrac;
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
    }

    upisiUmanjeniIznosIgrac (vrednostZetona) {
        this.osvojenIznosIgrac = this.osvojenIZnosIgrac - vrednostZetona;
        super.promeniTekstPElementa (this._pOsvojenIZnosIgrac,this.osvojenIznosIgrac);
    }

    _uloziZeton (vrednostZetona) {
        if (this._zetoniAktivni === true && this.osvojenIznosIgrac >= vrednostZetona) {
            this.iznosUloga = this.iznosUloga + vrednostZetona;
            this.osvojenIznosIgrac= this.osvojenIznosIgrac - vrednostZetona;
            super.promeniTekstPElementa (this._pIznosUloga, this.iznosUloga);
            super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
        }
    }
    
    ponistiUlog () {
        if (this._zetoniAktivni === true) {
            this.osvojenIznosIgrac = this.osvojenIznosIgrac + this.iznosUloga;
            this.iznosUloga = 0;
            super.promeniTekstPElementa (this._pIznosUloga, this.iznosUloga);
            super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
        }
    }

    duplirajUlog () {
        this.osvojenIznosIgrac = this.osvojenIznosIgrac - this.iznosUloga;
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
        this.iznosUloga = 2 * this.iznosUloga;
        super.promeniTekstPElementa (this._pIznosUloga, this.iznosUloga);
    }

    korigujUlogZbogOsiguranja () {
        this.osvojenIznosIgrac = this.osvojenIznosIgrac - 0.5 * this.iznosUloga;
        super.promeniTekstPElementa (this._pOsvojenIznosIgrac, this.osvojenIznosIgrac);
    }

    resetujUlog () {
        this.iznosUloga = 0;
        super.promeniTekstPElementa (this._pIznosUloga, this.iznosUloga);
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
                    dugme.addEventListener ('click', () => {this.ponistiUlog ();});
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

class InfoIgre extends KockarskiSto {
    constructor () {
        super();
        this._pInfoIgre = () => {return document.getElementById ('pInfoIgre')};
    }

    prikaziPoruku (poruka) {
        super.promeniTekstPElementa (this._pInfoIgre(), poruka);
    }
}

class Talon extends KockarskiSto {
    constructor (zbirKarataKomp, zbirKarataSplit1, zbirKarataSplit2) {
        super();

        this.zbirKarataKomp = zbirKarataKomp;
        this.zbirKarataSplit1 = zbirKarataSplit1;
        this.zbirKarataSplit2 = zbirKarataSplit2;

        this._dTalonKomp    = document.getElementById ('dTalonKomp');
        this._pZbirKomp     = document.getElementById ('pZbirKomp');
        this._dTalonSplit1  = document.getElementById ('dTalonSplit1');
        this._pZbirSplit1   = document.getElementById ('pZbirSplit1');
        this._dTalonSplit2  = document.getElementById ('dTalonSplit2');
        this._pZbirSplit2   = document.getElementById ('pZbirSplit2');
        
        this.sakrijOtkrijSplit();
    }
    resetujZbirKarata () {
        this.zbirKarataKomp = 0;
        this.zbirKarataSplit1 = 0;
        this.zbirKarataSplit2 = 0;
    }

    dodajKartuNaTalon (_mestoKarte, _izvuceneKarte) {

        let _tekucaKarta = _izvuceneKarte [_izvuceneKarte.length -1];
        let _slika = document.createElement ('img');
        let levaMargina = -(_izvuceneKarte.length * 30 - 30);
        let topMargina  = -205;
        
        if (_mestoKarte === 'Komp') {
            _mestoKarte = this._dTalonKomp;
            this.zbirKarataKomp = this.zbirKarataKomp + _tekucaKarta.odrediVrednostKarte (this.zbirKarataKomp);
            if (_izvuceneKarte.length <= 2) {
                super.promeniTekstPElementa(this._pZbirKomp, '?');
            }
            else {
                super.promeniTekstPElementa(this._pZbirKomp, this.zbirKarataKomp);
            }
        }
        else if (_mestoKarte === 'IgracSplit1') {
            _mestoKarte = this._dTalonSplit1;
            this.zbirKarataSplit1 = this.zbirKarataSplit1 + _tekucaKarta.odrediVrednostKarte (this.zbirKarataSplit1);
            super.promeniTekstPElementa(this._pZbirSplit1, this.zbirKarataSplit1);
        }
        else if (mestoKarte === 'IgracSplit2'){
            _mestoKarte = this._dTalonSplit2;
            this.zbirKarataSplit2 = this.zbirKarataSplit2 + _tekucaKarta.odrediVrednostKarte (this.zbirKarataSplit2);
            super.promeniTekstPElementa(this._pZbirSplit2, this.zbirKarataSplit2);
        }

        _slika.setAttribute ('id', _tekucaKarta.nazivKarte)
        _slika.setAttribute ('class', 'karta');
        
        if (_tekucaKarta.skrivenaKarta === true) {
            _slika.setAttribute ('src', '/slike/Blanko_Karta.png');
        }
        else {
            _slika.setAttribute ('src', '/slike/' + _tekucaKarta.nazivSlikeKarte);
        }

        _mestoKarte.appendChild (_slika);

        _tekucaKarta.imgElementKarte = document.getElementById (_tekucaKarta.nazivKarte);

        Array.from (_izvuceneKarte).forEach ((img, imgIdx) => {
            if (imgIdx === 0) {
                img.imgElementKarte.setAttribute ('style', 'margin-top: 0px' + ';' + ' margin-left: ' + levaMargina + 'px'); 
            }
            else {
                levaMargina = levaMargina + 60;
                img.imgElementKarte.setAttribute ('style', 'margin-top: ' + topMargina +'px' + ';' + ' margin-left: ' + levaMargina + 'px'); 
            }
        });
    }

    sakrijOtkrijSplit () {
        if (this._dTalonSplit2.style.display === 'none') {
            this._dTalonSplit2.style.display = 'block';
        }
        else {
            this._dTalonSplit2.style.display = 'none';
        }
    }

    obrisiTalon () {
        
        this._zbirKarataKomp = 0;
        this._zbirKarataSplit1 = 0;
        this._zbirKarataSplit2 = 0;

        let _karteNaTalonu = document.getElementsByClassName ('karta');
        while (_karteNaTalonu[0]) {
            _karteNaTalonu[0].parentNode.removeChild(_karteNaTalonu[0]);
        } 
    }

    otkrijSkrivenuKartu (karteBankera) {
        let skrivenaKarta = karteBankera.find( karta => karta.skrivenaKarta === true);
        let htmlElSkriveneKarte = skrivenaKarta.imgElementKarte;

        htmlElSkriveneKarte.setAttribute ('src', '/slike/' + skrivenaKarta.nazivSlikeKarte);
        super.promeniTekstPElementa(this._pZbirKomp, this.zbirKarataKomp);
    }
        
}



