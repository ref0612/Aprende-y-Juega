// js/modules/higiene.js
import GameEngine from '../core/GameEngine.js';

export default class HigieneGame extends GameEngine {
    constructor() {
        super({ lives: 1 });
        this.contenedor = document.getElementById('game-content');
        this.init();
    }

    init() {
        this.contenedor.innerHTML = `
            <h2 class="instruccion-titulo" style="text-align:center;">¡Hora de estar limpios!</h2>
            <p style="text-align:center; font-size: 1.5rem; color: #666;">Toca lo que necesitamos para bañarnos.</p>
            <div id="area-higiene" class="game-grid" style="margin-top: 40px;">
                <div class="game-card objeto-higiene animate-pop" data-correcto="true" style="background-color: #E3F2FD;">
                    <div class="card-icon" style="font-size: 5rem;">🧼</div>
                    <h3>Jabón</h3>
                </div>
                <div class="game-card objeto-higiene animate-pop" data-correcto="false" style="background-color: #FFEBEE;">
                    <div class="card-icon" style="font-size: 5rem;">⚽</div>
                    <h3>Pelota</h3>
                </div>
                <div class="game-card objeto-higiene animate-pop" data-correcto="true" style="background-color: #E3F2FD;">
                    <div class="card-icon" style="font-size: 5rem;">🛁</div>
                    <h3>Bañera</h3>
                </div>
            </div>
        `;
        
        this.hablar("¡Hora de estar limpios! Toca lo que necesitamos para bañarnos.");
        this.activarInteracciones();
    }

    activarInteracciones() {
        const objetos = this.contenedor.querySelectorAll('.objeto-higiene');
        let aciertos = 0;

        objetos.forEach(obj => {
            obj.onclick = () => {
                if (obj.classList.contains('resuelto')) return;

                const esCorrecto = obj.dataset.correcto === "true";
                
                if (esCorrecto) {
                    this.renderFeedback(true, obj);
                    obj.classList.add('resuelto');
                    obj.style.opacity = '0.5';
                    obj.style.transform = 'scale(0.95)';
                    aciertos++;
                    
                    if (aciertos === 2) { 
                        setTimeout(() => {
                            this.contenedor.innerHTML = `<h2 style="text-align:center; margin-top:50px; animation: pop-in 0.5s;">¡Muy bien! Estamos muy limpios. ✨</h2>`;
                            this.hablar("¡Muy bien! Estamos muy limpios.");
                            setTimeout(() => document.getElementById('btn-back').click(), 3000);
                        }, 1000);
                    }
                } else {
                    this.renderFeedback(false, obj);
                    this.hablar("Eso no nos sirve para bañarnos.");
                }
            };
        });
    }
}