    const explorarBTN = document.getElementById("explorarBTN");
    const menu = document.getElementById("menu");
    const volverBTN = document.getElementById("volverBTN");
    const regla = document.getElementById("regla");
    const body = document.body;

    let posicionScroll = 0;

    explorarBTN.addEventListener("click", function() {
        menu.style.transform = "translateX(-500px)";
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        window.scrollTo(0, posicionScroll);
        volverBTN.style.transition = "opacity 0.6s, transform 0.6s";
        volverBTN.style.opacity = "1";
        volverBTN.style.transform = "translateX(0)";
        regla.style.opacity = "1";
       
    });

    volverBTN.addEventListener("click", function() {
        menu.style.transform = "translateX(0)";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        volverBTN.style.transition = "opacity 0.6s, transform 0.6s";
        volverBTN.style.opacity = "0";
        volverBTN.style.transform = "translateX(500px)";
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        regla.style.opacity = "0";
    });