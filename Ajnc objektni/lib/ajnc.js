"use strict";

import { PozdravniEkran, Karta, Spil, KockarskiSto, StatistikaIgre, 
         InfoIgre, Talon, Dugme} from '/lib/model/ajncklase.js';
import {Deljenje, Igrac, Split, Banker} from '/lib/controler/igraklase.js';





function zatvoriDeljenje (iznosUloga, pobednik ) {
    let zbirKarata = 0;
    let obracun = {};

    if (pobednik === 'Komp') {
        statistikaIgre.upisiBrPobedaKomp();
        zbirKarata = talon.zbirKarataKomp;
    } 
    else if (pobednik === 'Igrac') {
        statistikaIgre.upisiBrPobedaIgrac();
        zbirKarata = talon.zbirKarataSplit1;
        
    }

    obracun = deljenje.obracunDobitka (pobednik, iznosUloga, deljenje.opcijeIgre, zbirKarata);

    statistikaIgre.upisiOsvojenIznosKomp (obracun.dobitakKomp);
    statistikaIgre.upisiOsvojenIznosIgrac (obracun.dobitakIgrac);
    infoIgre.prikaziPoruku (obracun.poruka);

    bDajKartu.sakrijDugme();
    bStani.sakrijDugme();
    bPredaj.sakrijDugme();
    bOsiguraj.sakrijDugme();
    bNovaIgra.otkrijDugme();
    bHelp.otkrijDugme();

    deljenje.opcijeIgre = 'Standard'
    deljenje.ponistiKarteBankera();
    split1.ponistiKarteIgraca ();
    talon.resetujZbirKarata();

    statistikaIgre.resetujUlog();
    statistikaIgre.aktivirajZetone();
}

function podeliKarte () {
    
    let skrivenaKarta = {};

    split1.dodajKartuIgracu = spil.izvuciKartu();
    talon.dodajKartuNaTalon('IgracSplit1', split1.karteIgraca);

    skrivenaKarta = spil.izvuciKartu();
    skrivenaKarta.sakrijOtkrijKartu();
    deljenje.dodajKartuBankeru = skrivenaKarta;
    talon.dodajKartuNaTalon('Komp', deljenje.karteBankera);

    split1.dodajKartuIgracu = spil.izvuciKartu();
    talon.dodajKartuNaTalon('IgracSplit1', split1.karteIgraca);

    deljenje.dodajKartuBankeru = spil.izvuciKartu();
    talon.dodajKartuNaTalon('Komp', deljenje.karteBankera);


    if (talon.zbirKarataSplit1 >= 9 && talon.zbirKarataSplit1 <= 11) {
        bDupliraj.otkrijDugme();
        infoIgre.prikaziPoruku ('Možete da duplirate svoj ulog jer je vaš zbir karata ' + talon.zbirKarataSplit1);
    }
    else if (split1.karteIgraca[0].brojKarte === split1.karteIgraca[1].brojKarte) {
        infoIgre.prikaziPoruku ('Možete da podelite svoje karte na dva splita');
    }
    else if (deljenje.karteBankera[1].odrediVrednostKarte(1) === 11) {
        bOsiguraj.otkrijDugme();
        infoIgre.prikaziPoruku ('Možete da kupite osiguranje u visini polovine svog uloga');
    }
    
}

var fHelp = function () {
    kockarskiSto.sakrijOtkrijHelp();
    talon.obrisiTalon();
}

var fDajKartu = function () {

    let pobednik = '';

    infoIgre.prikaziPoruku('Izvucite kartu');

    bPredaj.sakrijDugme();
    bOsiguraj.sakrijDugme();
    bDupliraj.sakrijDugme();
    
    split1.dodajKartuIgracu = spil.izvuciKartu();
    talon.dodajKartuNaTalon('IgracSplit1', split1.karteIgraca);

     
    if (talon.zbirKarataSplit1 >=21) {
        pobednik = deljenje.kontrolaZbira (talon.zbirKarataKomp, talon.zbirKarataSplit1);
        talon.otkrijSkrivenuKartu (deljenje.karteBankera);
        zatvoriDeljenje(statistikaIgre.iznosUloga, pobednik);
    }
}

var fStani = function () {
    
    let pobednik = '';

    bNovaIgra.sakrijDugme();
    bPredaj.sakrijDugme();
    bOsiguraj.sakrijDugme();
    bDupliraj.sakrijDugme();

    while (talon.zbirKarataKomp <= 16) {
        deljenje.dodajKartuBankeru = spil.izvuciKartu();
        talon.dodajKartuNaTalon('Komp', deljenje.karteBankera);
        
    }
    pobednik = deljenje.kontrolaZbira (talon.zbirKarataKomp, talon.zbirKarataSplit1);
    talon.otkrijSkrivenuKartu (deljenje.karteBankera);
    zatvoriDeljenje(statistikaIgre.iznosUloga, pobednik);
}

var fOsiguraj = function () {
    
    
    deljenje.opcijeIgre = 'Osiguranje';

    infoIgre.prikaziPoruku ('Kupili ste osiguranje u visini ' + 0.5 * statistikaIgre.iznosUloga + '€');
    statistikaIgre.korigujUlogZbogOsiguranja ()

    bOsiguraj.sakrijDugme();
    bDajKartu.sakrijDugme();
    bStani.sakrijDugme();
    bPredaj.sakrijDugme();
    bOtkrijSKartu.otkrijDugme();
}

var fOtkrijSKartu = function () {

    let pobednik = '';

    bOtkrijSKartu.sakrijDugme();

    infoIgre.prikaziPoruku ('Otkrijte kartu i proverite da li ste dobili opkladu');
    
    pobednik = deljenje.kontrolaZbira (talon.zbirKarataKomp, talon.zbirKarataSplit1);
    talon.otkrijSkrivenuKartu (deljenje.karteBankera);
    zatvoriDeljenje(statistikaIgre.iznosUloga, pobednik);
}

var fDupliraj = function () {
    
    let pobednik = '';

    bDupliraj.sakrijDugme();

    statistikaIgre.duplirajUlog();

    deljenje.opcijeIgre = 'Dupliranje';
    split1.dodajKartuIgracu = spil.izvuciKartu();
    talon.dodajKartuNaTalon('IgracSplit1', split1.karteIgraca);
    
    while (talon.zbirKarataKomp <= 16) {
        deljenje.dodajKartuBankeru = spil.izvuciKartu();
        talon.dodajKartuNaTalon('Komp', deljenje.karteBankera);
        
    }
    
    pobednik = deljenje.kontrolaZbira (talon.zbirKarataKomp, talon.zbirKarataSplit1);
    talon.otkrijSkrivenuKartu (deljenje.karteBankera);
    zatvoriDeljenje(statistikaIgre.iznosUloga, pobednik);
}

var fPodeli = function ()  {

}

var fPredaj = function () {
    deljenje.opcijeIgre = 'Predaja';
    zatvoriDeljenje (statistikaIgre.iznosUloga, 'Komp');
}

var fNovaIgra = function () {

    let pobednik = '';

    
    
    if (statistikaIgre.iznosUloga === 0) {
        infoIgre.prikaziPoruku('Uložite žetone!');
    }
    else {
        bNovaIgra.sakrijDugme();
        bDajKartu.otkrijDugme();
        bStani.otkrijDugme();
        bPredaj.otkrijDugme();
        bHelp.sakrijDugme();
        kockarskiSto.sakrijHelp();
        
        infoIgre.prikaziPoruku('Izvucite kartu');
        
        statistikaIgre.deaktivirajZetone();
        talon.obrisiTalon();
        deljenje.novoDeljenje();

        spil = new Spil();

        podeliKarte();

        if (talon.zbirKarataSplit1 >=21) {
            pobednik = deljenje.kontrolaZbira (talon.zbirKarataKomp, talon.zbirKarataSplit1);
            talon.otkrijSkrivenuKartu (deljenje.karteBankera);
            zatvoriDeljenje(statistikaIgre.iznosUloga, pobednik);
        }
    }
}

var fProveriUnos = function () {
    
    var pozdravniEkran  = new PozdravniEkran ();

    let imeIgraca = pozdravniEkran.imeIgraca;
    let iznosUlogaIgrac = pozdravniEkran.iznosUlogaIgrac;
    let iznosUlogaKomp = pozdravniEkran.iznosUlogaKomp;

    pozdravniEkran.prikaziGreskuIme ("\u00A0");
    pozdravniEkran.prikaziGreskuUlogIgrac ("\u00A0");
    pozdravniEkran.prikaziGreskuUlogKomp ("\u00A0");

    if (imeIgraca === "") {
        pozdravniEkran.prikaziGreskuIme ('Morate uneti ime igrača!');
        pozdravniEkran.getFokus('Ime');
        }
    else if (imeIgraca.includes(' ')) {
        pozdravniEkran.prikaziGreskuIme ('Bez razmaka molim!');
        pozdravniEkran.getFokus('Ime');
    }
    else if (imeIgraca.length === 1) {
        pozdravniEkran.prikaziGreskuIme ('Unesite bar inicijale!');
        pozdravniEkran.getFokus('Ime');
    }
    else if (!imeIgraca.match(/^[a-zA-Z]+$/)) {
        pozdravniEkran.prikaziGreskuIme ('Ime mora da sadrži samo slova!');
        pozdravniEkran.getFokus('Ime');
    }
    else if (iznosUlogaIgrac <= 0) {
        pozdravniEkran.prikaziGreskuUlogIgrac ('Unesite pozitivan ceo broj!');
        pozdravniEkran.getFokus('ulogIgrac');
    }
    else if (iznosUlogaKomp <= 0) {
        pozdravniEkran.prikaziGreskuUlogKomp ('Unesite pozitivan ceo broj!');
        pozdravniEkran.getFokus('ulogKomp');
    }
    else if (iznosUlogaIgrac > 1000000) {
        pozdravniEkran.prikaziGreskuUlogIgrac ('Ne više od 1 000 000!');
        pozdravniEkran.getFokus('ulogIgrac');
    }
    else if (iznosUlogaKomp > 1000000) {
        pozdravniEkran.prikaziGreskuUlogKomp ('Ne više od 1 000 000!');
        pozdravniEkran.getFokus('ulogKomp');
    }
    else if (isNaN(iznosUlogaIgrac)) {
        pozdravniEkran.prikaziGreskuUlogIgrac ('Morate uneti ceo broj!');
        pozdravniEkran.getFokus('ulogIgrac');
    }
    else if (isNaN(iznosUlogaKomp > 1000000)) {
        pozdravniEkran.prikaziGreskuUlogKomp ('Morate uneti ceo broj!');
        pozdravniEkran.getFokus('ulogKomp');
    }
    else {
        zapocniIgru (imeIgraca, iznosUlogaIgrac, iznosUlogaKomp);
    }
    
    
}

function zapocniIgru (imeIgraca, iznosUlogaIgrac, iznosUlogaKomp) {
    
    igrac.ime = imeIgraca;
    infoIgre.prikaziPoruku(igrac.ime + ' je novi igrač. Neka igra počne!')
    statistikaIgre.upisiIgraca(igrac.ime);
    
    statistikaIgre.upisiOsvojenIznosKomp (iznosUlogaKomp);
    statistikaIgre.upisiOsvojenIznosIgrac (iznosUlogaIgrac);

    igrac.setIznosNovcaZaIgru = iznosUlogaIgrac;
    banker.setIznosNovcaZaIgru = iznosUlogaKomp;
    
    kockarskiSto.sakrijPozdravniEkran();
    kockarskiSto.otkrijIgru();
}



var kockarskiSto    = new KockarskiSto ();
var spil            = new Spil ();
var infoIgre        = new InfoIgre();
var statistikaIgre  = new StatistikaIgre (0, 0, 0, 0, 0, '');
var talon           = new Talon(0 ,0, 0);
var igrac           = new Igrac ('', 0);
var banker          = new Banker ('Komp', 0);
var deljenje        = new Deljenje (0, 'Standard');
var split1          = new Split ();


var bZapocniIgru = new Dugme ('Započni igru', fProveriUnos);
var bDajKartu = new Dugme ('Daj kartu', fDajKartu);
var bStani = new Dugme ('Stani', fStani);
var bOsiguraj = new Dugme ('Osiguraj', fOsiguraj);
var bDupliraj = new Dugme ('Dupliraj', fDupliraj);
var bPredaj = new Dugme ('Predaj', fPredaj);
var bOtkrijSKartu = new Dugme ('Otkrij kartu', fOtkrijSKartu);

var bNovaIgra = new Dugme ('Nova igra', fNovaIgra);
var bHelp = new Dugme ('Pravila igre', fHelp);

bDajKartu.sakrijDugme();
bStani.sakrijDugme();
bOsiguraj.sakrijDugme();
bDupliraj.sakrijDugme();
bPredaj.sakrijDugme();
bOtkrijSKartu.sakrijDugme()

