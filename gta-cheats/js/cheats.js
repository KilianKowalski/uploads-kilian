/*
==========================================
   Cheat Karten Generator
==========================================
*/


const cheatContainer = document.getElementById("cheatContainer");



/*
   Alle Cheats anzeigen
*/

function renderCheats(list = cheats){


    cheatContainer.innerHTML = "";


    list.forEach((cheat)=>{


        const favorite = isFavorite(cheat.id);


        const card = document.createElement("div");

        card.className = "cheat-card";

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
            class="like-btn ${favorite ? "active":""}"
            onclick="toggleFavorite(${cheat.id}, this)"
            >

            ❤️

            </button>


        </div>


        `;


        cheatContainer.appendChild(card);


    });


    updateStats();

}



/*
   Favorit umschalten
*/

function toggleFavorite(id, button){


    if(isFavorite(id)){


        removeFavorite(id);

        button.classList.remove("active");


        showToast(
            "Aus Favoriten entfernt"
        );


    }else{


        addFavorite(id);

        button.classList.add("active");


        showToast(
            "Zu Favoriten hinzugefügt ❤️"
        );


    }


    updateStats();


}



/*
   Cheat kopieren
*/

function copyCheat(code, button){


    navigator.clipboard.writeText(code);


    button.classList.add("copied");


    button.innerHTML =
    "✔ Kopiert";


    showToast(
        "Cheat kopiert"
    );


    setTimeout(()=>{


        button.classList.remove("copied");

        button.innerHTML =
        "📋 Kopieren";


    },1500);


}



/*
   Statistik aktualisieren
*/

function updateStats(){


    const cheatCount =
    document.getElementById("cheatCount");


    const favorite =
    document.getElementById("favoriteCount");



    if(cheatCount){

        cheatCount.innerHTML =
        cheats.length;

    }



    if(favorite){

        favorite.innerHTML =
        favoriteCount();

    }

}
