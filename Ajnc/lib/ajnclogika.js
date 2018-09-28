
// Formira uređeni standardni spil karata koji se sastoji od 52 karte 
function kreirajSpil () {
    let simbol = ['Pik', 'Karo', 'Srce', 'Tref'];
    let brojKarte = [ 'Dvojka', 'Trojka','Četvorka', 'Petica', 'Šestica',
                     'Sedmica', 'Osmica', 'Devetka', 'Desetka', 'Žandar', 
                     'Dama', 'Kralj', 'Kec'];
    let spil = [];
    for (simbolIdx = 0; simbolIdx < simbol.length; simbolIdx++) { 
      for (brojKarteIdx = 0; brojKarteIdx < brojKarte.length; brojKarteIdx++) {
        let karta = {                   //objekat karta koju definiše simbol i broj
          brojKarte: brojKarte[brojKarteIdx],
          simbol: simbol[simbolIdx]
        };
        spil.push (karta); // objekat karta dodat u niz Spil
      }
    }
    return spil; // niz spil koji sadrži sve karte za igranje
  }
  

  // Menja redosled karti u kreiranom spilu na slučajan način - Mešanje karata u špilu
  function promesajSpil(spil) {
    let promesanSpil = [];
    for (let spilIdx=spil.length; spilIdx > 0; spilIdx-- ) {
      let slucajnoIzvucenaKarta = Math.floor(Math.random() * spilIdx);
      //console.log (slucajnoIzvucenaKarta, spilIdx); 
      promesanSpil.push (spil[slucajnoIzvucenaKarta]);
      spil.splice(slucajnoIzvucenaKarta,1);
    }
    return promesanSpil;
  }

// Određuje broj karte transformacijom alfanumeričke vrednosti u brojnu
function odrediTezinuKarte (brojKarte, tekuciZbir) {
  let tezinaKarte = 0;
  switch (brojKarte) {
    case 'Dvojka':
      tezinaKarte = 2;
      break;
    case 'Trojka':
      tezinaKarte = 3;
      break;
    case 'Četvorka':
      tezinaKarte = 4;
      break;
    case 'Petica':
      tezinaKarte = 5;
      break;
    case 'Šestica':
      tezinaKarte = 6;
      break;
    case 'Sedmica':
      tezinaKarte = 7;
      break;
    case 'Osmica':
      tezinaKarte = 8;
      break;
    case 'Devetka':
      tezinaKarte = 9;
      break;
    case 'Desetka':
      tezinaKarte = 10;
      break;
    case 'Kec':
      if (tekuciZbir <= 10) {
        tezinaKarte = 11;
      } 
      else if (tekuciZbir === 11) {
        tezinaKarte = 10;
      }
      else if (tekuciZbir > 11) {
        tezinaKarte = 1;
      }
      break;
    default:
      tezinaKarte = 10;
  }
  return tezinaKarte;
}

function novaIgra() {
  if (zbirIgrac > 0) {
    resetujIgru ();
  } 
  let spil = kreirajSpil();
  promesanSpil = promesajSpil(spil);
  butNovaIgra.style.display = 'none';
  butPovuciKartu.style.display = 'inline';
  butStani.style.display = 'inline';
  flexSto.style.display = 'flex';
  podeliKarte()
}

function povuciKartu() {
  let podeljenaKarta = [];
  podeljenaKarta = dajSledecuKartu ('Igrac', false);
  dodajPElement ('divKarteIgrac', podeljenaKarta, false);
  dodajPElement ('divKarteKomp', 'Prazna karta', false);
  kontrolaZbira (false);
}

function stani () {
  kontrolaZbira (true);
}

// Naizmenično deli po dve karte Kompjuteru i Igraču počev od igrača. 
// Jedna karta kompjutera je skrivena - nije okrenuta na lice.
function podeliKarte () {
  let podeljenaKarta = [];
  
  podeljenaKarta = dajSledecuKartu('Igrac', false);
  dodajPElement ('divKarteIgrac', podeljenaKarta, false);
  podeljenaKarta = dajSledecuKartu('Komp', false);
  dodajPElement ('divKarteKomp', podeljenaKarta, false);
  podeljenaKarta = dajSledecuKartu('Igrac', false);
  dodajPElement ('divKarteIgrac', podeljenaKarta, false);
  podeljenaKarta = dajSledecuKartu('Komp', true);
  dodajPElement ('divKarteKomp', podeljenaKarta, true);
  promeniTekstPElementa ('pInfoIgre', 'Povucite novu kartu ili otkrijete skrivenu (Stani)');
  kontrolaZbira (false);
}

// Pravi naziv karte kao string koji se sastoji od broja karte i simbola karte. Npr. "Sedmica Tref" 
function napraviNazivKarte (karta) {
  return karta.brojKarte + ' ' + karta.simbol;
}

// Izvlači jednu kartu sa vrha promešanog špila i dodaje u zbir karte Kompjutera odnosno Igrača
function dajSledecuKartu (koIzvlaciKartu, skrivenaKarta) {
  
  let karta = promesanSpil.pop();
  
  if (koIzvlaciKartu === 'Komp' && !skrivenaKarta) {
    zbirKomp = zbirKomp + odrediTezinuKarte(karta.brojKarte, zbirKomp);
    promeniTekstPElementa ('pZbirKomp', zbirKomp.toString()+'+');
  }
  
  else if (koIzvlaciKartu === 'Igrac' && !skrivenaKarta) {
    zbirIgrac = zbirIgrac + odrediTezinuKarte(karta.brojKarte, zbirIgrac);
    promeniTekstPElementa ('pZbirIgrac', zbirIgrac.toString());
  }
    
  return karta;
}

function kontrolaZbira (klikNaStani) {

  switch (klikNaStani) {
    
    case true:
      otkrijSkrivenuKartu();
      if (zbirIgrac > zbirKomp && zbirIgrac <= 21 && zbirKomp <21) {
        proglasiPobedu ('Igrac');
      } 
      else if (zbirIgrac < zbirKomp && zbirIgrac < 21 && zbirKomp <=21) {
        proglasiPobedu ('Komp');
      }
      else if (zbirIgrac === zbirKomp) {
        proglasiNereseno();
      }
    default: 
      if (zbirIgrac === 21 && zbirKomp === 21) {
        otkrijSkrivenuKartu ();
        proglasiNereseno ();
      }
      else if (zbirIgrac === 21 && zbirKomp < 21) {
        otkrijSkrivenuKartu ();
        proglasiPobedu('Igrac');
      }
      else if (zbirIgrac > 21) {
        otkrijSkrivenuKartu ();
        proglasiPobedu ('Komp');
      }
      else if (zbirIgrac < 21) {
        // nastavak igre
      }
      break;
    }
}

function proglasiPobedu (koJePobedio) {

  if (koJePobedio === 'Igrac'){
    promeniTekstPElementa ('pInfoIgre', 'Čestitamo! Pobedili ste kompjuter');
  }
  else if (koJePobedio === 'Komp') {
    promeniTekstPElementa ('pInfoIgre', 'Žao nam je. Kompjuter je pobedio');
  }
  
  butNovaIgra.style.display = 'inline';
  butPovuciKartu.style.display = 'none';
  butStani.style.display = 'none';
}

function proglasiNereseno () {
  promeniTekstPElementa ('pInfoIgre', 'Neverovatno! Rezultat je nerešen');
  
  butNovaIgra.style.display = 'inline';
  butPovuciKartu.style.display = 'none';
  butStani.style.display = 'none';
}

function otkrijSkrivenuKartu () {
  let nazivSkriveneKarte = '\u00A0' + '>' + '\u00A0' + document.getElementById ('skrivenaKarta').getAttribute('data-nazivkarte');
  let tezinaSkriveneKarte = document.getElementById ('skrivenaKarta').getAttribute('data-tezinakarte');
  promeniTekstPElementa ('skrivenaKarta', nazivSkriveneKarte);
  zbirKomp = zbirKomp + parseInt(tezinaSkriveneKarte);
  promeniTekstPElementa ('pZbirKomp', zbirKomp.toString());
}

// Dodaje p element koji sadrži naziv karte na deo stola za kompjuter i deo stola za Igrača u zavisnosti od vrednosti idNadredjenog
// Kada se podeli druga karta Kompjuteru ona ostaje skrivena - skrivenaKarta
function dodajPElement(idNadredjenog, karta, skrivenaKarta) {
  
  let nazivKarte = '';

  if (karta === 'Prazna karta') {
    nazivKarte = '';
  }
  else {
    nazivKarte = napraviNazivKarte(karta);
  }

  let pElement = document.createElement ('p');
  let nadredjeni = document.getElementById (idNadredjenog);
  
  if (skrivenaKarta) {
    let pElementNode = document.createTextNode ('\u00A0' + '>' + '\u00A0' + 'SKRIVENA KARTA');
    let tezinaSkriveneKarte = odrediTezinuKarte (karta.brojKarte, zbirKomp);
    pElement.appendChild(pElementNode);
    pElement.setAttribute ('id', 'skrivenaKarta');
    pElement.setAttribute ('class', 'obrisime');
    pElement.setAttribute ('data-nazivkarte', nazivKarte);
    pElement.setAttribute ('data-tezinakarte', tezinaSkriveneKarte);
  }
  else {
    let pElementNode = document.createTextNode ('\u00A0' + '>' + '\u00A0' + nazivKarte);
    pElement.appendChild(pElementNode);
    pElement.setAttribute ('class', 'obrisime');
  }
  nadredjeni.appendChild (pElement);
} 

function promeniTekstPElementa (id, tekst) {
  let pElement = document.getElementById (id);
  pElement.innerText = tekst;
}

function resetujIgru () {

  let karteZaBrisanje = document.getElementsByClassName ('obrisime');

  while (karteZaBrisanje[0]) {

    karteZaBrisanje[0].parentNode.removeChild(karteZaBrisanje[0]);

  }

  zbirIgrac = 0;
  zbirKomp = 0;

}