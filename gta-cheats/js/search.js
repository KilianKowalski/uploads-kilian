/*
==========================================
   Suche & Kategorien Filter
==========================================
*/


const searchInput = document.getElementById("searchInput");

const categoryButtons = document.querySelectorAll(".category");



let currentCategory = "Alle";



/*
   Suche überwachen
*/

if(searchInput){


searchInput.addEventListener(
"input",
()=>{


    filterCheats();


});


}



/*
   Kategorie Buttons
*/

categoryButtons.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{


        categoryButtons.forEach(btn=>{

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
        button.dataset.category;


        filterCheats();


    });


});



/*
   Filter Funktion
*/

function filterCheats(){


    let result = cheats;



    /*
       Kategorie Filter
    */

    if(currentCategory !== "Alle"){


        result = result.filter(
            cheat =>
            cheat.category === currentCategory
        );


    }




    /*
       Such Filter
    */

    const search =
    searchInput.value.toLowerCase();



    if(search){


        result = result.filter(
            cheat =>


            cheat.name
            .toLowerCase()
            .includes(search)


            ||


            cheat.description
            .toLowerCase()
            .includes(search)


            ||


            cheat.keyboard
            .toLowerCase()
            .includes(search)


        );


    }



    renderCheats(result);


}
