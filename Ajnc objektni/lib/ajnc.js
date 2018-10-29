"use strict";

import { Karta, Spil, KockarskiSto, StatistikaIgre, 
         InfoIgre, Ulog} from '/lib/model/ajncklase.js';
import {Deljenje, Igrac, Split, Banker} from '/lib/controler/igraklase.js';

var kockarskiSto    = new KockarskiSto ();
var karta           = new Karta ();
var spil            = new Spil ();
var infoIgre        = new InfoIgre();
var statistikaIgre  = new StatistikaIgre (0,10000,0,500);
var ulog            = new Ulog();
var deljenje        = {};
var igrac           = {};
var banker          = {};
var split1          = {};
var split2          = {};

(function () {
    let dugmici = document.getElementsByClassName ('dugme');
    Array.from (dugmici).forEach (dugme => {
        dugme.addEventListener ('click', (e) => {pokreniAkciju(e.target.id) });
    });
    
})();

function pokreniAkciju (idDugmeta) {
        
    switch (idDugmeta) {
    
        case 'butNovaIgra': 
            console.log ('Nova igra');
            novaIgra ();
            break;
        case 'butDajKartu':
            console.log ('Daj kartu');
            infoIgre.prikaziPoruku('Zdravo živo');
            break;
        case 'butStani':
            console.log ('Stani');
            break;
        case 'butPodeli':
            console.log ('Podeli');
            break;
        case 'butDupliraj':
            console.log ('Dupliraj');
            break;
        case 'butOsiguraj':
            console.log ('Osiguraj');
            break;
    }
}

function novaIgra () {
    console.log(spil);
}

console.log(spil);

console.log ('Ispitivanje klase Karta----------------')

/* console.log(karta1);
console.log(karta1.simbol);
console.log(karta1.brojKarte);
console.log(karta1.nazivKarte);
console.log(karta1.odrediVrednostKarte(10));
console.log(karta1.slikaKarte); */

console.log ('Ispitivanje klase Spil-----------------')

spil.promesajMe();
console.log(spil);
console.log (spil.karte[1].slikaKarte);

console.log ('Ispitivanje klase Kockarski sto---------')



console.log ('Ispitivanje klase Statistika igre-------')
statistikaIgre.upisiBrPobedaKomp ();
statistikaIgre.upisiBrPobedaKomp ();
console.log(statistikaIgre.osvojenIznosKomp);
console.log(statistikaIgre.brPobedaKomp);



console.log ('Ispitivanje klase Ulog-------------------');


/* ulog.deaktivirajZetone(); */
console.log ('Ispitivanje klase InfoIgre---------')

console.log(spil.izvuciKartu());