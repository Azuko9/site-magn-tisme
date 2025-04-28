document.addEventListener("DOMContentLoaded", () => {
    // Sélection unique des éléments pour éviter répétitions
    const elements = {
        bgMontain: document.getElementById("backgroundMontain"),
        metatron: document.getElementById("metatron"),
        title: document.getElementById("Title"),
        footer: document.getElementById("footer"),
        header: document.getElementById("corps"),
        scroll: document.getElementById("scroll"),
        boxList: document.querySelectorAll(".box"),
        audioList: document.querySelectorAll("audio")
    };

    // Optimiser les constantes
    const baseBrightness = 0.05;
    const increment = 0.01;

    // Handler de scroll optimisé avec requestAnimationFrame
    let ticking = false;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Luminosité optimisée
        const tranche = Math.floor(scrollY / 100);
        const brightnessValue = Math.min(baseBrightness + tranche * increment, 1);
        elements.bgMontain.style.filter = `brightness(${brightnessValue})`;

        // Synchronisation opacité header
        elements.header.style.opacity = Math.min(brightnessValue * 2, 1);

        // Gestion classes animation
        const isOver200 = scrollY > 50;
        elements.bgMontain.classList.toggle("start-animation", isOver200);
        elements.bgMontain.classList.toggle("end-animation", !isOver200);

        // Rotation et classes Metatron
        elements.metatron.style.transform = `rotate(${scrollY / 10}deg)`;
        const isOver150 = scrollY > 900;
        elements.metatron.classList.toggle("startMetatron", !isOver150);
        elements.metatron.classList.toggle("endMetatron", isOver150);

        // Opacité titre et scroll gif
        elements.title.style.opacity = elements.scroll.style.opacity = isOver150 ? "0" : "1";

        // Vérification des positions (regroupée dans le même listener pour éviter répétition)
        checkPosition();

        ticking = false;
    };

    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    };

    window.addEventListener("scroll", requestTick);

    // Gestion audio (éviter boucles imbriquées inutiles)
    elements.audioList.forEach(audio => {
        audio.addEventListener("play", () => {
            elements.audioList.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    otherAudio.classList.remove("invert-colors");
                }
            });
            audio.classList.add("invert-colors");
        });

        const removeInvertColors = () => audio.classList.remove("invert-colors");

        audio.addEventListener("pause", removeInvertColors);
        audio.addEventListener("ended", removeInvertColors);
    });

    // Vérification optimisée des positions
    function checkPosition() {
        const footerTop = elements.footer.getBoundingClientRect().top;

        elements.boxList.forEach(box => {
            const backgroundText = box.querySelector(".backgroundtext");
            if (!backgroundText) return;

            const backgroundRectBottom = backgroundText.getBoundingClientRect().bottom;
            box.classList.toggle("show-backgroundtext", backgroundRectBottom < footerTop);
        });
    }

    // Vérification initiale au chargement
    checkPosition();
});