document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments
    const bgMontain = document.getElementById("backgroundMontain");
    const metatron = document.getElementById("metatron");
    const title = document.getElementById("Title");
    const footer = document.getElementById("footer");
    const container = document.querySelector(".container");
    const header = document.querySelector("header");
    const audioElements = document.querySelectorAll("audio");

    // Constantes pour la gestion de la luminosité
    const baseBrightness = 0.05;
    const increment = 0.01;

    function handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // 1. Gestion de la luminosité de bgMontain
        const tranche = Math.floor(scrollY / 75);
        let brightnessValue = baseBrightness + (tranche * increment);
        if (brightnessValue > 1) brightnessValue = 1;
        bgMontain.style.filter = `brightness(${brightnessValue})`;

        // Synchronisation de l'opacité du header avec la luminosité
        header.style.opacity = 1 - (brightnessValue * 1.5);

        // 2. Gestion de l'animation du background
        const isOver200 = scrollY > 200;
        bgMontain.classList.toggle("start-animation", isOver200);
        bgMontain.classList.toggle("end-animation", !isOver200);

        // 3. Gestion de la rotation et du changement de classe de Metatron
        metatron.style.transform = `rotate(${scrollY / 10}deg)`;
        const isOver150 = scrollY > 1500;
        metatron.classList.toggle("startMetatron", !isOver150);
        metatron.classList.toggle("endMetatron", isOver150);

        // 4. Gestion de l'opacité et de la position du titre
        title.style.opacity = isOver150 ? "0" : "1";
        title.style.position = isOver150 ? "relative" : "fixed";

        // 5. Gestion de la position du container sauf sur iPad/iPhone
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (window.innerWidth > 768 && !isIOS) {
            if (scrollY > 2000 && scrollY < 3500) {
                container.style.top = (scrollY - 1950) + "px";
            } else {
                container.style.top = "auto";
            }
        } else {
            container.style.top = "auto";
        }
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

