    const explorarBTN = document.getElementById("explorarBTN");
    const menu = document.getElementById("menu");
    const volverBTN = document.getElementById("volverBTN");

    explorarBTN.addEventListener("click", function() {
        menu.style.transform = "translateX(-500px)";
        volverBTN.style.transition = "opacity 0.6s, transform 0.6s";
        volverBTN.style.opacity = "1";
        volverBTN.style.transform = "translateX(0)";
       
    });

    volverBTN.addEventListener("click", function() {
        menu.style.transform = "translateX(0)";
        volverBTN.style.transition = "opacity 0.6s, transform 0.6s";
        volverBTN.style.opacity = "0";
        volverBTN.style.transform = "translateX(500px)";
        
    });