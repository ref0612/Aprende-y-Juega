// js/modules/memoria.js
import GameEngine from '../core/GameEngine.js';

export default class MemoriaGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) { 
        super({ lives: 3 }); 
        this.datosNivel = datosNivel; 
        this.onWin = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        
        this.carta1 = null;
        this.carta2 = null;
        this.bloqueado = false;
        this.paresEncontrados = 0;

        this.init();
    }

    init() {
        this.contenedor.innerHTML = `<h2 style="text-align:center;" class="instruccion-titulo">${this.datosNivel.instruccion_texto}</h2>`;
        this.hablar(this.datosNivel.instruccion_texto);
        this.renderTablero();
    }

    renderTablero() {
        const divMemoria = document.createElement('div');
        divMemoria.className = 'memoria-grid'; // Nueva clase CSS compacta

        // Creamos los pares
        let cartas = [];
        this.datosNivel.parejas.forEach(p => { 
            cartas.push({...p}); 
            cartas.push({...p}); 
        });

        // Barajado Profesional (Fisher-Yates) para que sea realmente aleatorio
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
        }

        cartas.forEach((cartaData) => {
            const cartaBtn = document.createElement('div');
            cartaBtn.className = 'memoria-card'; 
            cartaBtn.setAttribute('data-id', cartaData.id);
            
            // Estructura 3D: Contenedor interno, Frente (❓) y Dorso (Imagen)
            cartaBtn.innerHTML = `
                <div class="memoria-inner">
                    <div class="memoria-front">❓</div>
                    <div class="memoria-back" style="background-color: ${cartaData.color || '#E3F2FD'};">
                        ${cartaData.img 
                            ? `<img src="${cartaData.img}" style="width: 70%; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2));" onerror="this.style.display='none'; this.parentElement.innerHTML='✨';">` 
                            : `<span style="font-size: 3rem;">${cartaData.emoji || '✨'}</span>`}
                    </div>
                </div>
            `;

            cartaBtn.onclick = () => this.manejarClicCarta(cartaBtn, cartaData);
            divMemoria.appendChild(cartaBtn);
        });

        this.contenedor.appendChild(divMemoria);
    }

    manejarClicCarta(cartaElemento) {
        // Bloqueo estricto: Si la mesa está bloqueada, o la carta ya se volteó/resolvió, no hacemos nada.
        if (this.bloqueado || cartaElemento.classList.contains('resuelta') || cartaElemento.classList.contains('volteada')) {
            return;
        }

        // Volteamos la carta físicamente
        cartaElemento.classList.add('volteada');
        this.reproducirSonido('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Sonido de clic suave

        if (!this.carta1) {
            this.carta1 = cartaElemento;
        } else {
            this.carta2 = cartaElemento;
            this.verificarPareja();
        }
    }

    verificarPareja() {
        this.bloqueado = true; // Bloqueamos la mesa inmediatamente
        const esPareja = this.carta1.getAttribute('data-id') === this.carta2.getAttribute('data-id');

        if (esPareja) {
            this.paresEncontrados++;
            this.carta1.classList.add('resuelta');
            this.carta2.classList.add('resuelta');
            
            this.renderFeedback(true, this.carta1);
            this.renderFeedback(true, this.carta2);

            if (this.paresEncontrados === this.datosNivel.parejas.length) {
                setTimeout(() => {
                    this.hablar("¡Excelente memoria!");
                    this.onWin();
                }, 1500);
            }
            this.resetTurno();
        } else {
            this.renderFeedback(false, this.carta1);
            this.renderFeedback(false, this.carta2);
            
            // Le damos 1.2 segundos al niño para memorizar antes de volver a girar
            setTimeout(() => {
                this.carta1.classList.remove('volteada');
                this.carta2.classList.remove('volteada');
                this.resetTurno();
            }, 1200);
        }
    }

    resetTurno() {
        this.carta1 = null; 
        this.carta2 = null; 
        this.bloqueado = false; // Liberamos la mesa
    }
}