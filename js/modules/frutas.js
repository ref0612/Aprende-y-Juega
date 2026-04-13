// js/modules/frutas.js — Módulo Frutas, Verduras y Alimentos
// Pedagogía: categorización es habilidad cognitiva clave en 3-5 años
// El niño distingue: fruta / verdura / otro alimento

import GameEngine from '../core/GameEngine.js';

export default class FrutasGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super();
        this.datosNivel = datosNivel;
        this.onWin      = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this._init();
    }

    _init() {
        const d = this.datosNivel;
        this.contenedor.innerHTML = `
            <h2 class="instruccion-titulo">${d.instruccion_texto}</h2>
            <div id="opciones-frutas" class="game-grid"></div>
        `;
        this.hablar(d.instruccion_texto);
        this._renderOpciones();
    }

    _renderOpciones() {
        const grid = document.getElementById('opciones-frutas');
        this.datosNivel.opciones.forEach(op => {
            const card = document.createElement('div');
            card.className = 'game-card animate-pop';
            card.style.backgroundColor = op.color || '#fff';
            card.innerHTML = `
                <span style="font-size:4.5rem; display:block; line-height:1;">${op.emoji}</span>
                <h3 style="margin:8px 0 0; font-size:1.4rem;">${op.nombre}</h3>
                ${op.categoria ? `<p style="font-size:0.85rem; opacity:0.6; margin:2px 0 0;">${op.categoria}</p>` : ''}
            `;
            card.onclick = () => this._verificar(op, card);
            grid.appendChild(card);
        });
    }

    _verificar(op, cardEl) {
        const botones = this.contenedor.querySelectorAll('.game-card');
        botones.forEach(b => b.style.pointerEvents = 'none');

        // Determinar el artículo correcto ('el', 'la', 'los', 'las')
        let articulo;
        if (op.nombre.endsWith('s')) {
            articulo = op.genero === 'femenino' ? 'las' : 'los';
        } else {
            articulo = op.genero === 'femenino' ? 'la' : 'el';
        }

        if (op.esCorrecto) {
            this.renderFeedback(true, cardEl);
            this.hablar(`¡Muy bien! ${articulo} ${op.nombre} es ${op.respuesta || 'correcto'}. ¡Excelente!`);
            setTimeout(() => this.onWin(), 2200);
        } else {
            this.renderFeedback(false, cardEl);
            this.hablar(`Ese no es. ¡Busca bien!`);
            setTimeout(() => botones.forEach(b => b.style.pointerEvents = 'auto'), 1100);
        }
    }
}
