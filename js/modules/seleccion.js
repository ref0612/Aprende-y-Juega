// js/modules/seleccion.js
import GameEngine from '../core/GameEngine.js';

export default class SeleccionGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super({ lives: 3 });
        this.datosNivel = datosNivel;
        this.onWin = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this.init();
    }

    init() {
        this.contenedor.innerHTML = `<h2 class="instruccion-titulo" style="text-align:center;">${this.datosNivel.instruccion_texto}</h2>`;
        this.hablar(this.datosNivel.instruccion_texto);
        this.renderOpciones();
    }

    renderOpciones() {
        this.contenedor.innerHTML += `<div id="opciones-grid" class="game-grid"></div>`;
        const grid = document.getElementById('opciones-grid');

        this.datosNivel.opciones.forEach(opcion => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'game-card animate-pop'; 
            tarjeta.style.backgroundColor = opcion.color || '#ffffff';

            if (opcion.img) {
                tarjeta.innerHTML = `
                    <div class="wrapper-render">
                        <img src="${opcion.img}" 
                             alt="${opcion.nombre || 'imagen'}" 
                             style="width: 130px; height: 130px; object-fit: contain; filter: drop-shadow(0px 10px 10px rgba(0,0,0,0.15)); animation: respirar 3s ease-in-out infinite;" 
                             loading="lazy"
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=&quot;font-size: 5rem;&quot;>✨</span>';">
                    </div>
                `;
            } else {
                tarjeta.innerHTML = `<span class="emoji-grande">${opcion.emoji || '❓'}</span>`;
            }

            tarjeta.onclick = () => this.verificarSeleccion(opcion, tarjeta);
            grid.appendChild(tarjeta);
        });
    }

    verificarSeleccion(opcion, elementoBoton) {
        const botones = this.contenedor.querySelectorAll('.game-card');
        botones.forEach(b => b.style.pointerEvents = 'none'); // Bloqueo anti-spam

        if (opcion.esCorrecto) {
            this.renderFeedback(true, elementoBoton);
            
            // Lógica inteligente: Si tiene descripción, es del cuerpo y la leemos
            if (opcion.descripcion && opcion.articulo) {
                this.hablar(`¡Muy bien! ¡Usamos ${opcion.articulo} ${opcion.nombre} ${opcion.descripcion}!`);
            } else {
                this.hablar("¡Muy bien! ¡Lo lograste!");
            }

            setTimeout(() => this.onWin(), 1800);
        } else {
            this.renderFeedback(false, elementoBoton);
            this.hablar("¡Casi! Intenta otra vez.");

            setTimeout(() => {
                botones.forEach(b => b.style.pointerEvents = 'auto');
            }, 1000);
        }
    }
}