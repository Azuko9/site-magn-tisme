document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments
    const bgMontain = document.getElementById("backgroundMontain");
    const metatron = document.getElementById("metatron");
    const title = document.getElementById("Title");
    const footer = document.getElementById("footer");
    const container = document.querySelector(".container");
    const header = document.getElementById("corps");
    const audioElements = document.querySelectorAll("audio");
    const scroll = document.getElementById("scroll");

    // Constantes pour la gestion de la luminosité
    const baseBrightness = 0.05;
    const increment = 0.01;

    function handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        //  Gestion de la luminosité de bgMontain
        const tranche = Math.floor(scrollY / 130);
        let brightnessValue = baseBrightness + (tranche * increment);
        if (brightnessValue > 1) brightnessValue = 1;
        bgMontain.style.filter = `brightness(${brightnessValue})`;

        // Synchronisation de l'opacité du header avec la luminosité
        header.style.opacity = (brightnessValue * 2);

        // Gestion de l'animation du background
        const isOver200 = scrollY > 50;
        bgMontain.classList.toggle("start-animation", isOver200);
        bgMontain.classList.toggle("end-animation", !isOver200);



        // Gestion de la rotation et du changement de classe de Metatron
        metatron.style.transform = `rotate(${scrollY / 10}deg)`;
        const isOver150 = scrollY > 900;
        metatron.classList.toggle("startMetatron", !isOver150);
        metatron.classList.toggle("endMetatron", isOver150);

        //  Gestion de l'opacité et de la position du titre
        title.style.opacity = isOver150 ? "0" : "1";
        // Gestion du gif pour scroller
        scroll.style.opacity = isOver150 ? "0" : "1";

        // // 5. Gestion de la position du container sauf sur iPad/iPhone

    }

    window.addEventListener("scroll", handleScroll);

    // Gestion des audios : lecture exclusive et inversion des couleurs
    audioElements.forEach((audio) => {
        audio.addEventListener("play", () => {
            audioElements.forEach((otherAudio) => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    otherAudio.classList.remove("invert-colors");
                }
            });
            audio.classList.add("invert-colors");
        });

        audio.addEventListener("pause", () => {
            audio.classList.remove("invert-colors");
        });

        audio.addEventListener("ended", () => {
            audio.classList.remove("invert-colors");
        });
    });
});

