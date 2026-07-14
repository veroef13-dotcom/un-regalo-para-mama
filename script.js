const hero = document.getElementById("hero");
const pausa = document.getElementById("pausa");
const carta = document.getElementById("carta");
const regalo = document.getElementById("regalo");
const mensajeOculto = document.getElementById("mensajeOculto");

const abrir = document.getElementById("abrir");
const continuar = document.getElementById("continuar");
const botonCorazon = document.getElementById("botonCorazon");

const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("botonMusica");
let sonando = false;

abrir.addEventListener("click", () => {
    hero.classList.add("oculto");
    pausa.classList.remove("oculto");
    iniciarLluvia("lluviaPausa");

    musica.currentTime = 0;
    musica.play();
    sonando = true;
    botonMusica.textContent = "🔊";

    setTimeout(() => {
    transicionSuave(pausa, carta, () => {
        iniciarCarta();
        iniciarLluvia("lluvia");
    },1600);
}, 8000);
});

continuar.addEventListener("click", () => {
    carta.classList.add("oculto");
    regalo.classList.remove("oculto");
    cargarGaleria();
    iniciarLluvia("lluvia2");
});

botonCorazon.addEventListener("click", () => {
    regalo.classList.add("oculto");
    mensajeOculto.classList.remove("oculto");
    iniciarLluvia("lluvia3");
});

function iniciarCarta(){
    const parrafos = document.querySelectorAll(".carta p");
    const firma = document.querySelector(".carta h3");
    const boton = document.querySelector(".carta button");
    const tiempoVisible = 6000;
    let index = 0;

    function mostrarSiguiente(){
        if(index > 0){
            parrafos[index-1].classList.remove("activo");
        }
        if(index < parrafos.length){
            parrafos[index].classList.add("activo");
            index++;
            setTimeout(mostrarSiguiente, tiempoVisible);
        } else {
            firma.classList.add("activo");
            setTimeout(() => {
                boton.classList.add("activo");
            }, 1500);
        }
    }

    mostrarSiguiente();
}

function iniciarLluvia(idContenedor){
    const contenedor = document.getElementById(idContenedor);
    if(!contenedor || contenedor.childElementCount > 0) return;

    const simbolos = ["✨","⭐", "🌟", "🌸"];
    const cantidad = 30;

    for(let i = 0; i < cantidad; i++){
        const p = document.createElement("span");
        p.classList.add("particula");
        p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        p.style.left = Math.random() * 100 + "%";
        p.style.fontSize = (14 + Math.random() * 14) + "px";
        p.style.animationDuration = (6 + Math.random() * 6) + "s";
        p.style.animationDelay = (Math.random() * 8) + "s";
        contenedor.appendChild(p);
    }
}

function cargarGaleria(){
    const galeria = document.getElementById("galeria");
    if(galeria.childElementCount > 0) return;

    for(let i = 1; i <= 14; i++){
        const img = document.createElement("img");
        img.src = `img/${i}.jpg`;
        img.alt = `Foto ${i} Termas Hotel San Gerónimo`;
        img.style.opacity = 0;
        img.style.animation = "aparecerInfo .8s ease forwards";
        img.style.animationDelay = (4.5 + i * 0.15) + "s";
        img.addEventListener("click", () => abrirLightbox(img.src));
        galeria.appendChild(img);
    }
}

function abrirLightbox(src){
    const lb = document.createElement("div");
    lb.classList.add("lightbox");
    lb.innerHTML = `<img src="${src}">`;
    lb.addEventListener("click", () => lb.remove());
    document.body.appendChild(lb);
}

botonMusica.addEventListener("click", () => {
    if(sonando){
        musica.pause();
        botonMusica.textContent = "🔇";
    } else {
        musica.play();
        botonMusica.textContent = "🔊";
    }
    sonando = !sonando;
});
function transicionSuave(saliente, entrante, callback, duracion = 800){
    saliente.style.opacity = 0;

    setTimeout(() => {
        saliente.classList.add("oculto");
        saliente.style.opacity = "";

        entrante.classList.remove("oculto");
        entrante.style.opacity = 0;

        requestAnimationFrame(() => {
            entrante.style.opacity = 1;
        });

        if(callback) callback();
    }, duracion);
}