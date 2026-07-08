/*
==========================================
   Favoriten Seite
==========================================
*/


const favoriteContainer =
document.getElementById("favoriteContainer");



/*
   Favoriten anzeigen
*/

function renderFavorites(){


    const favoriteIDs =
    getFavorites();



    const favoriteCheats =
    cheats.filter(
        cheat =>
        favoriteIDs.includes(cheat.id)
    );



    favoriteContainer.innerHTML = "";



    if(favoriteCheats.length === 0){


        favoriteContainer.innerHTML = `


        <div class="cheat-card">


        <h3 class="cheat-title">

        Keine Favoriten vorhanden

        </h3>


        <p class="cheat-description">

        Klicke auf ❤️ bei einem Cheat,
        um ihn hier zu speichern.

        </p>


        </div>


        `;


        updateFavoriteCount();


        return;

    }



    favoriteCheats.forEach(
    cheat=>{


        const card =
        document.createElement("div");


        card.className =
        "cheat-card";



        card.innerHTML = `


        <div class="cheat-category">

        ${cheat.category}

        </div>



        <h3 class="cheat-title">

        ${cheat.name}

        </h3>



        <p class="cheat-description">

        ${cheat.description}

        </p>



        <div class="cheat-code">

        ⌨️ ${cheat.keyboard}

        <br><br>

        📞 ${cheat.phone}

        </div>



        <div class="cheat-actions">


        <button 
        class="copy-btn"
        onclick="copyCheat('${cheat.keyboard}', this)"
        >

        📋 Kopieren

        </button>



        <button
        class="like-btn active"
        onclick="removeFavoriteCard(${cheat.id})"
        >

        ❤️

        </button>


        </div>


        `;



        favoriteContainer.appendChild(card);



    });


    updateFavoriteCount();


}



/*
   Favorit entfernen
*/

function removeFavoriteCard(id){


    removeFavorite(id);


    showToast(
    "Aus Favoriten entfernt"
    );


    renderFavorites();


}



/*
   Anzahl aktualisieren
*/

function updateFavoriteCount(){


    const count =
    document.getElementById(
    "favoriteCount"
    );



    if(count){

        count.innerHTML =
        favoriteCount();

    }

}



/*
   Start
*/

document.addEventListener(
"DOMContentLoaded",
()=>{


    renderFavorites();


});
