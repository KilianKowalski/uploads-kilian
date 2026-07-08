/*
==========================================
   Local Storage Verwaltung
==========================================
*/


const STORAGE_KEY = "gta5_favorite_cheats";



/*
   Favoriten laden
*/

function getFavorites(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(!saved){

        return [];

    }

    return JSON.parse(saved);

}



/*
   Favoriten speichern
*/

function saveFavorites(favorites){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
    );

}



/*
   Cheat als Favorit markieren
*/

function addFavorite(id){

    let favorites = getFavorites();


    if(!favorites.includes(id)){

        favorites.push(id);

        saveFavorites(favorites);

    }

}



/*
   Cheat aus Favoriten entfernen
*/

function removeFavorite(id){

    let favorites = getFavorites();


    favorites = favorites.filter(
        favorite => favorite !== id
    );


    saveFavorites(favorites);

}



/*
   Prüfen ob Cheat geliked wurde
*/

function isFavorite(id){

    const favorites = getFavorites();


    return favorites.includes(id);

}



/*
   Anzahl Favoriten
*/

function favoriteCount(){

    return getFavorites().length;

}
