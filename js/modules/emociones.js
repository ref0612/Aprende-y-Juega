// js/modules/emociones.js
import GameEngine from '../core/GameEngine.js';

const datosEmociones = [
    {
        situacion: "Me regalaron un juguete nuevo",
        audioSituacion: "Me regalaron un juguete nuevo. ¿Cómo me siento?",
        opciones: [
            { emocion: "Feliz", emoji: "😄", correcto: true, color: "#C8E6C9" },
            { emocion: "Triste", emoji: "😢", correcto: false, color: "#FFCDD2" }
        ]
    },
    {
        situacion: "Se rompió mi dibujo favorito",
        audioSituacion: "Se rompió mi dibujo favorito. ¿Qué emoción siento?",
        opciones: [
            { emocion: "Enojado", emoji: "😡", correcto: false, color: "#FFCDD2" },
            { emocion: "Triste", emoji: "😢", correcto: true, color: "#C8E6C9" }
        ]
    }
];

export default class EmocionesGame extends GameEngine {
    constructor() {
        super({ lives: 3 });
        this.contenedor = document.getElementById('game-content');
        this.nivelActual = 0;
        this.init();
    }

    init() {
        if (this.nivelActual >= datosEmociones.length) {
            this.contenedor.innerHTML = `<h2 style="text-align:center; margin-top: 50px; animation: pop-in 0.5s;">¡Completaste Mis Emociones! 🌈</h2>`;
            setTimeout(() => document.getElementById('btn-back').click(), 3000);
            return;
        }
        this.renderSituacion();
    }

    renderSituacion() {
        const datos = datosEmociones[this.nivelActual];
        this.contenedor.innerHTML = `<h2 class="instruccion-titulo" style="text-align:center;">${datos.situacion}</h2>`;
        this.hablar(datos.audioSituacion);

        const areaOpciones = document.createElement('div');
        areaOpciones.className = 'game-grid';
        areaOpciones.style.marginTop = '40px';

        datos.opciones.forEach(opcion => {
            const boton = document.createElement('div');
            boton.className = 'game-card animate-pop';
            boton.style.backgroundColor = opcion.color;
            boton.innerHTML = `<span style="font-size: 5rem;">${opcion.emoji}</span><br><h3 style="margin-top: 10px;">${opcion.emocion}</h3>`;
            
            boton.onclick = () => this.verificarEmocion(opcion.correcto, boton);
            areaOpciones.appendChild(boton);
        });

        this.contenedor.appendChild(areaOpciones);
    }

    verificarEmocion(esCorrecto, botonElemento) {
        if (esCorrecto) {
            this.renderFeedback(true, botonElemento);
            this.hablar("¡Así es!");
            setTimeout(() => {
                this.nivelActual++;
                this.init();
            }, 1500);
        } else {
            this.renderFeedback(false, botonElemento);
            this.hablar("Piensa un poquito más.");
        }
    }
}