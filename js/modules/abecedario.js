// js/modules/abecedario.js — Módulo nuevo: aprender letras A-Z y Ñ
import GameEngine from '../core/GameEngine.js';

export default class AbecedarioGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super();
        this.datosNivel = datosNivel;
        this.onWin      = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this._init();
    }

    _init() {
        const { item, instruccion_texto, opciones } = this.datosNivel;

        this.contenedor.innerHTML = `
            <div class="item-display-top">
                <div class="emoji-display" style="font-size:6rem; line-height:1;">${item.emoji}</div>
                <p class="palabra-display" style="font-size:2.2rem; font-weight:900; color:#2c3e50; margin:8px 0 0;">${item.palabra}</p>
            </div>

            <p class="instruccion-titulo" style="font-size:1.6rem;">${instruccion_texto}</p>

            <div id="letras-grid" class="game-grid" style="margin-top:4px; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));"></div>
        `;

        // Leer: "Avión... ¿Con qué letra empieza?"
        setTimeout(() => {
            this.hablar(`${item.palabra}... ¿Con qué letra empieza ${item.palabra}?`);
        }, 400);

        this._renderLetras(opciones);
    }

    _renderLetras(opciones) {
        const grid = document.getElementById('letras-grid');

        opciones.forEach(opcion => {
            const card = document.createElement('div');
            card.className = 'game-card animate-pop';
            card.style.backgroundColor = opcion.color || '#ECEFF1';
            card.style.minHeight = '120px';

            card.innerHTML = `
                <span class="letra-grande-card" style="
                    font-size: 5.5rem;
                    font-weight: 900;
                    line-height: 1;
                    color: #2c3e50;
                    text-shadow: 3px 3px 0 rgba(0,0,0,0.08);
                    display: block;
                ">${opcion.nombre}</span>
            `;

            card.onclick = () => this._verificar(opcion, card);
            grid.appendChild(card);
        });
    }

    _verificar(opcion, cardEl) {
        const botones = this.contenedor.querySelectorAll('.game-card');
        botones.forEach(b => b.style.pointerEvents = 'none');

        if (opcion.esCorrecto) {
            this.renderFeedback(true, cardEl);
            const { item } = this.datosNivel;
            this.hablar(`¡Muy bien! ${item.palabra} empieza con la letra ${opcion.nombre}.`);
            setTimeout(() => this.onWin(), 2200);
        } else {
            this.renderFeedback(false, cardEl);
            const { item } = this.datosNivel;
            this.hablar(`Esa no es. ${item.palabra} empieza con... ¡busca bien!`);
            setTimeout(() => {
                botones.forEach(b => b.style.pointerEvents = 'auto');
            }, 1100);
        }
    }
}
