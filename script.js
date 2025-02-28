document.addEventListener("DOMContentLoaded", function () {
    const bgMontain = document.getElementById("backgroundMontain");
    const baseBrightness = 0.05; // valeur initiale
    const increment = 0.01;
    const metatron = document.getElementById("metatron");
    const title = document.getElementById("Title");
    const scroll = document.getElementById("footer");
    const container = document.querySelector(".container");

    function handleScroll() {
        // Récupération de la position verticale du scroll
        let scrollY = window.scrollY || document.documentElement.scrollTop;
        console.log("Valeur de scroll vertical :", scrollY);

        scroll.innerText = scrollY;

        let tranche = Math.floor(scrollY / 500);
        // Nouvelle valeur de brightness = valeur de base + (nombre de tranches * incrément)
        let brightnessValue = baseBrightness + (tranche * increment);
        console.log("Valeur de brightness :", brightnessValue);


        // Appliquer le nouveau filtre directement sur l'élément

        metatron.style.transform = `rotate(${scrollY / 10}deg)`;




        // Ajouter la classe si scrollY > 100, sinon la retirer
        if (scrollY > 200) {
            bgMontain.classList.add("start-animation");
            bgMontain.classList.remove("end-animation");
            bgMontain.style.filter = `brightness(${brightnessValue})`;



        }
        else {
            bgMontain.classList.remove("start-animation");
            bgMontain.classList.add("end-animation");
            title.style.position = "fixed";
        }

        if (scrollY > 1500) {
            title.style.opacity = "0";
            metatron.classList.remove("startMetatron")
            metatron.classList.add("endMetatron")
        }
        else {
            title.style.opacity = "1";
            metatron.classList.add("startMetatron")
            metatron.classList.remove("endMetatron")

        }


    }


    // Attacher l'événement de scroll à la fenêtre
    window.addEventListener("scroll", handleScroll);


}
);
