// js/motor.js

let mundoActivo = null;
let nivelesMundo = [];
let nivelActual = 0;
let estrellasTotales = parseInt(localStorage.getItem('estrellas')) || 0; // Guarda progreso real
let temporizadorAyuda;
const tiempoInicioApp = Date.now();

// Referencias DOM
const pInicio = document.getElementById('pantalla-inicio');
const pMundos = document.getElementById('pantalla-mundos');
const pJuego = document.getElementById('pantalla-juego');
const cOpciones = document.getElementById('contenedor-opciones');
const tInstruccion = document.getElementById('instruccion');
const contadorEstrellas = document.getElementById('contador-estrellas');
contadorEstrellas.innerText = estrellasTotales;

// Configuración de Voz
let vocesDisponibles = [];
window.speechSynthesis.onvoiceschanged = () => { vocesDisponibles = window.speechSynthesis.getVoices(); };

function hablar(texto) {
    window.speechSynthesis.cancel(); 
    const locutor = new SpeechSynthesisUtterance(texto);
    locutor.lang = 'es-MX'; locutor.rate = 0.85; locutor.pitch = 1.4;    
    if (vocesDisponibles.length === 0) vocesDisponibles = window.speechSynthesis.getVoices();
    const vozAmigable = vocesDisponibles.find(voz => voz.lang.includes('es') && (voz.name.includes('Google') || voz.name.includes('Paulina')));
    if (vozAmigable) locutor.voice = vozAmigable;
    window.speechSynthesis.speak(locutor);
}

// Magia Táctil (Chispas)
document.body.addEventListener('pointerdown', (e) => {
    if (e.target.closest('#modal-padres') || e.target.closest('#ui-superior') || e.target.closest('.boton-mundo')) return;
    const chispa = document.createElement('div');
    chispa.className = 'chispa-tactil';
    chispa.innerText = ['✨','🫧','⭐'][Math.floor(Math.random()*3)];
    chispa.style.left = e.clientX + 'px';
    chispa.style.top = e.clientY + 'px';
    document.body.appendChild(chispa);
    setTimeout(() => chispa.remove(), 600);
});

// Navegación Principal
document.getElementById('boton-empezar').onclick = () => {
    pInicio.style.display = 'none';
    pMundos.style.display = 'flex';
    let vozMuda = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(vozMuda);
    hablar("Elige un mundo para jugar");
};

document.getElementById('btn-volver').onclick = () => {
    clearTimeout(temporizadorAyuda);
    window.speechSynthesis.cancel();
    pJuego.style.display = 'none';
    pMundos.style.display = 'flex';
    hablar("Elige otro mundo");
};

window.iniciarMundo = function(idMundo) {
    mundoActivo = idMundo;
    nivelesMundo = mundosData[idMundo];
    nivelActual = 0;
    pMundos.style.display = 'none';
    pJuego.style.display = 'flex';
    pJuego.style.flexDirection = 'column';
    cargarNivel();
};

// Carga de Niveles y Enrutador
function cargarNivel() {
    clearTimeout(temporizadorAyuda);
    if (nivelActual >= nivelesMundo.length) {
        tInstruccion.innerText = "¡Mundo Completado! 🎉";
        cOpciones.innerHTML = "";
        hablar("¡Felicidades! Has terminado este mundo.");
        lanzarConfeti();
        setTimeout(() => document.getElementById('btn-volver').click(), 4000); // Vuelve al menú tras celebrar
        return;
    }

    const datosNivel = nivelesMundo[nivelActual];
    tInstruccion.innerText = datosNivel.instruccion_texto;
    document.getElementById('texto-nivel').innerText = (nivelActual + 1);
    cOpciones.innerHTML = '';
    hablar(datosNivel.instruccion_texto);

    if (datosNivel.tipo_motor === "seleccion") renderizarMotorSeleccion(datosNivel);
    else if (datosNivel.tipo_motor === "arrastre") renderizarMotorArrastre(datosNivel);
    else if (datosNivel.tipo_motor === "memoria") renderizarMotorMemoria(datosNivel);
}

// MOTOR 1: Selección
function renderizarMotorSeleccion(datosNivel) {
    cOpciones.style.flexDirection = "row";
    datosNivel.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.innerHTML = opcion.emoji;
        boton.className = 'boton-opcion';
        boton.style.backgroundColor = opcion.color;
        if (opcion.esCorrecto) boton.dataset.correcto = "true";
        boton.onclick = () => verificarSeleccion(opcion.esCorrecto, boton);
        cOpciones.appendChild(boton);
    });
    activarAyuda(5000);
}

function verificarSeleccion(esCorrecto, boton) {
    clearTimeout(temporizadorAyuda);
    const todos = document.querySelectorAll('.boton-opcion');
    todos.forEach(b => { b.disabled = true; b.classList.remove('animacion-pista'); });
    if (esCorrecto) {
        boton.classList.add('animacion-correcta');
        exitoGenerico();
    } else {
        boton.classList.add('animacion-error');
        errorGenerico(boton, todos);
    }
}

// MOTOR 2: Arrastre (Bug Arreglado)
function renderizarMotorArrastre(datosNivel) {
    cOpciones.style.flexDirection = "column";
    const cArrastre = document.createElement('div');
    cArrastre.id = 'contenedor-arrastre';
    
    const silueta = document.createElement('div');
    silueta.className = 'zona-silueta';
    silueta.innerHTML = datosNivel.silueta.emoji;

    const pieza = document.createElement('div');
    pieza.className = 'pieza-arrastrable';
    pieza.innerHTML = datosNivel.pieza.emoji;
    pieza.style.backgroundColor = datosNivel.pieza.color;

    cArrastre.appendChild(silueta); cArrastre.appendChild(pieza); cOpciones.appendChild(cArrastre);

    let iX = 0, iY = 0, aX = 0, aY = 0;
    
    pieza.onpointerdown = (e) => {
        pieza.setPointerCapture(e.pointerId);
        iX = e.clientX - aX; iY = e.clientY - aY;
        pieza.style.transition = 'none'; 
        pieza.style.animation = 'none'; // FIX BUG
        clearTimeout(temporizadorAyuda); 
        pieza.classList.remove('animacion-pista');
    };

    pieza.onpointermove = (e) => {
        if (!pieza.hasPointerCapture(e.pointerId)) return;
        aX = e.clientX - iX; aY = e.clientY - iY;
        pieza.style.transform = `translate(${aX}px, ${aY}px) scale(1.1)`;
    };

    pieza.onpointerup = (e) => {
        pieza.releasePointerCapture(e.pointerId);
        pieza.style.transition = 'transform 0.3s ease';
        pieza.style.transform = `translate(${aX}px, ${aY}px) scale(1)`;

        const rP = pieza.getBoundingClientRect(), rS = silueta.getBoundingClientRect();
        const dist = Math.sqrt(Math.pow((rP.left+rP.width/2) - (rS.left+rS.width/2), 2) + Math.pow((rP.top+rP.height/2) - (rS.top+rS.height/2), 2));

        if (dist < 70) {
            pieza.style.transform = `translate(0px, -200px)`;
            pieza.onpointerdown = null;
            silueta.style.background = "none"; silueta.style.color = "var(--texto)"; silueta.style.textShadow = "none";
            silueta.style.border = "none"; pieza.style.display = "none";
            exitoGenerico();
        } else {
            aX = 0; aY = 0; pieza.style.transform = `translate(0px, 0px)`;
            hablar("Ponlo en la sombra");
        }
    };
    activarAyuda(5000);
}

// MOTOR 3: Memoria
function renderizarMotorMemoria(datosNivel) {
    cOpciones.style.flexDirection = "row";
    const divMem = document.createElement('div'); divMem.className = 'contenedor-memoria';
    let cartas = [];
    datosNivel.parejas.forEach(p => { cartas.push({...p}); cartas.push({...p}); });
    cartas = cartas.sort(() => Math.random() - 0.5);

    let c1 = null, c2 = null, bloqueado = false, pares = 0;

    cartas.forEach(c => {
        const btn = document.createElement('div');
        btn.className = 'carta-memoria'; btn.setAttribute('data-emoji', c.emoji); btn.setAttribute('data-id', c.id);
        
        btn.onclick = () => {
            clearTimeout(temporizadorAyuda);
            if (bloqueado || btn.classList.contains('carta-volteada') || btn.classList.contains('carta-resuelta')) return;
            btn.classList.add('carta-volteada'); btn.style.backgroundColor = c.color;

            if (!c1) c1 = btn;
            else {
                c2 = btn; bloqueado = true;
                if (c1.getAttribute('data-id') === c2.getAttribute('data-id')) {
                    hablar("¡Iguales!");
                    c1.classList.replace('carta-volteada', 'carta-resuelta'); c2.classList.replace('carta-volteada', 'carta-resuelta');
                    pares++;
                    if (pares === datosNivel.parejas.length) setTimeout(() => exitoGenerico(), 1000);
                    else { c1 = null; c2 = null; bloqueado = false; activarAyuda(6000); }
                } else {
                    hablar("Ups");
                    setTimeout(() => {
                        c1.classList.remove('carta-volteada'); c1.style.backgroundColor = "";
                        c2.classList.remove('carta-volteada'); c2.style.backgroundColor = "";
                        c1 = null; c2 = null; bloqueado = false; activarAyuda(6000);
                    }, 1500);
                }
            }
        };
        divMem.appendChild(btn);
    });
    cOpciones.appendChild(divMem);
    activarAyuda(6000);
}

// Funciones Globales
function activarAyuda(tiempo) {
    temporizadorAyuda = setTimeout(() => {
        const target = document.querySelector('[data-correcto="true"]') || document.querySelector('.pieza-arrastrable');
        if (target) { target.classList.add('animacion-pista'); hablar("¡Mira aquí!"); }
        else if(document.querySelector('.carta-memoria')) hablar("Toca una carta");
    }, tiempo);
}

function exitoGenerico() {
    estrellasTotales++;
    contadorEstrellas.innerText = estrellasTotales;
    localStorage.setItem('estrellas', estrellasTotales); // Guarda estrellas localmente
    hablar("¡Muy bien hecho!"); 
    setTimeout(() => { nivelActual++; cargarNivel(); }, 2000); 
}

function errorGenerico(btn, todos) {
    hablar("Intenta otra vez");
    setTimeout(() => { btn.classList.remove('animacion-error'); todos.forEach(b => b.disabled = false); activarAyuda(4000); }, 1000);
}

function lanzarConfeti() {
    const colores = ['#FFCDD2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7'];
    for (let i = 0; i < 70; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 5000);
    }
}

// Panel Padres
document.getElementById('btn-padres-menu').onclick = () => {
    const n1 = Math.floor(Math.random() * 5) + 1, n2 = Math.floor(Math.random() * 5) + 1;
    const resp = prompt(`🔒 Solo padres: ¿Cuánto es ${n1} + ${n2}?`);
    if (parseInt(resp) === (n1 + n2)) {
        document.getElementById('stats-estrellas').innerText = estrellasTotales;
        document.getElementById('stats-tiempo').innerText = Math.floor((Date.now() - tiempoInicioApp) / 60000);
        document.getElementById('modal-padres').style.display = 'flex';
    } else if (resp !== null) alert("Respuesta incorrecta.");
};