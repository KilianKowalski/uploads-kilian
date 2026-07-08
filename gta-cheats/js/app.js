/*
==========================================
   GTA V Cheats - App Start
==========================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    /*
       Cheats laden
    */

    renderCheats();



    /*
       Statistik aktualisieren
    */

    updateStats();



    /*
       Karten Animation starten
    */

    setTimeout(()=>{

        animateCards();

    },100);



});
