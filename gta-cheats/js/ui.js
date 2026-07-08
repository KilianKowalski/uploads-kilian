/*
==========================================
   UI Funktionen
==========================================
*/


/*
   Toast Nachricht anzeigen
*/

function showToast(message){


    const toast =
    document.getElementById("toast");


    if(!toast) return;



    toast.innerHTML = message;


    toast.classList.add("show");



    setTimeout(()=>{


        toast.classList.remove("show");


    },2500);


}



/*
   Scroll Button
*/

const scrollButton =
document.getElementById("scrollTop");



window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 500){


        scrollButton.classList.add(
        "visible"
        );


    }else{


        scrollButton.classList.remove(
        "visible"
        );


    }


});



if(scrollButton){


scrollButton.addEventListener(
"click",
()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});


}



/*
   Navbar Schatten beim Scrollen
*/

const navbar =
document.querySelector(".navbar");



window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 30){


        navbar.classList.add(
        "scrolled"
        );


    }else{


        navbar.classList.remove(
        "scrolled"
        );


    }


});



/*
   Karten Animation beim Laden
*/

function animateCards(){


    const cards =
    document.querySelectorAll(
    ".cheat-card"
    );


    cards.forEach(
    (card,index)=>{


        card.style.animationDelay =
        `${index * 0.05}s`;


    });


}
