// js/modules/math.js
import GameEngine from '../core/GameEngine.js';

export default class MathGame extends GameEngine {
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
        const grid = document.createElement('div');
        grid.className = 'game-grid';
        
        this.datosNivel.opciones.forEach(opcion => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'game-card animate-pop';
            tarjeta.style.backgroundColor = '#FFF3E0'; 
            
            // Renderizamos los emojis multiplicados
            let emojisHTML = '';
            for(let i=0; i < opcion.cantidad; i++) {
                emojisHTML += `<span style="font-size: 3.5rem; margin: 5px; display: inline-block; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2));">${opcion.item.emoji}</span>`;
            }

            tarjeta.innerHTML = `<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; min-height: 150px;">${emojisHTML}</div>`;
            
            tarjeta.onclick = () => this.verificarSeleccion(opcion.esCorrecto, tarjeta);
            grid.appendChild(tarjeta);
        });

        this.contenedor.appendChild(grid);
    }

    verificarSeleccion(esCorrecto, elementoBoton) {
        const botones = this.contenedor.querySelectorAll('.game-card');
        botones.forEach(b => b.style.pointerEvents = 'none');

        if (esCorrecto) {
            this.renderFeedback(true, elementoBoton);
            this.hablar("¡Muy bien contado!");
            setTimeout(() => this.onWin(), 2000);
        } else {
            this.renderFeedback(false, elementoBoton);
            this.hablar("Mmm... contemos otra vez.");
            setTimeout(() => {
                botones.forEach(b => b.style.pointerEvents = 'auto');
            }, 1000);
        }
    }
}