"use strict"
var promesanSpil = [];
var zbirKomp = 0;
var zbirIgrac = 0;
let butNovaIgra = document.getElementById ('butNovaIgra');
let flexSto = document.getElementById ('flexSto');
let butPovuciKartu = document.getElementById ('butPovuciKartu');
let butStani = document.getElementById ('butStani');

flexSto.style.display = 'none';
butPovuciKartu.style.display = 'none';
butStani.style.display = 'none';


butNovaIgra.addEventListener ('click', function () {
    novaIgra();
  })

butPovuciKartu.addEventListener ('click', function () {
  povuciKartu();
})

butStani.addEventListener ('click', function () {
  stani();
})