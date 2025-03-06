document.addEventListener("DOMContentLoaded", () => {
    const bgMontain = document.getElementById("backgroundMontain");
    const metatron = document.getElementById("metatron");
    const title = document.getElementById("Title");
    const footer = document.getElementById("footer");
    const container = document.querySelector(".container");

    const baseBrightness = 0.05;
    const increment = 0.01;

    function handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        // Debug
        // footer.innerText = scrollY;

        // 1. Gérer la luminosité
        const tranche = Math.floor(scrollY / 75);
        const brightnessValue = baseBrightness + (tranche * increment);
        bgMontain.style.filter = `brightness(${brightnessValue})`;

        // 2. Gérer l’animation du background
        // On bascule entre start-animation et end-animation
        const isOver200 = (scrollY > 500);
        bgMontain.classList.toggle("start-animation", isOver200);
        bgMontain.classList.toggle("end-animation", !isOver200);

        // 3. Gérer Metatron (rotation + changement de classe)
        metatron.style.transform = `rotate(${scrollY / 10}deg)`;
        const isOver150 = (scrollY > 1500);
        metatron.classList.toggle("startMetatron", !isOver150);
        metatron.classList.toggle("endMetatron", isOver150);

        // 4. Gérer l’opacité du titre
        title.style.opacity = isOver150 ? "0" : "1";
        title.style.position = isOver150 ? "relative" : "fixed";

        // 5. Gérer la position du container (exemple)
        // (Penser à une formule plus lissée ou adaptative)
        if (scrollY > 2000 && scrollY < 3000) {
            container.style.top = (scrollY - 1900) + "px";
        }
        else if (scrollY > 4500 && scrollY < 5500) {
            container.style.top = (scrollY - 1900) + "px";
        }
    }

    window.addEventListener("scroll", handleScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach((audio) => {
        audio.addEventListener("play", () => {

            // Pour chaque élément audio...
            audioElements.forEach((otherAudio) => {
                // ...si ce n'est pas celui qui vient de se lancer,
                // on le met en pause et on remet son temps à zéro.
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach((audio) => {
        audio.addEventListener("play", () => {
            // Pour chaque élément audio...
            audioElements.forEach((otherAudio) => {
                // ...si ce n'est pas celui qui vient de se lancer,
                // on le met en pause et on remet son temps à zéro.
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    otherAudio.classList.remove("invert-colors");
                }
            });
            // Ajouter la classe d'inversion de couleurs à l'audio en lecture
            audio.classList.add("invert-colors");
        });

        audio.addEventListener("pause", () => {
            // Retirer la classe d'inversion de couleurs lorsque l'audio est en pause
            audio.classList.remove("invert-colors");
        });

        audio.addEventListener("ended", () => {
            // Retirer la classe d'inversion de couleurs lorsque l'audio est terminé
            audio.classList.remove("invert-colors");
        });
    });
});
