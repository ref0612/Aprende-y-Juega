// js/modules/avatar.js
import GameEngine from '../core/GameEngine.js';

export default class AvatarGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super({ lives: 3 });
        this.datosNivel = datosNivel;
        this.onWin = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this.init();
    }

    init() {
        this.contenedor.innerHTML = `
            <h2 class="instruccion-titulo" style="text-align:center;">${this.datosNivel.instruccion_texto}</h2>
            <div id="avatar-container" class="animate-pop" style="width: 100%; max-width: 400px; margin: 20px auto; display: flex; justify-content: center;">
                ${this.getAvatarHTML()}
            </div>
            
            <style>
                .interactive-part {
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    /* Esto permite que la pieza destaque sobre las demás al animarse */
                    position: absolute; 
                }
                .interactive-part:active {
                    transform: scale(0.9) !important;
                }
                /* Efecto Premium de Acierto */
                .part-highlight {
                    filter: drop-shadow(0 0 25px #8BC34A) brightness(1.1) !important;
                    transform: scale(1.2) !important;
                    z-index: 100 !important;
                }
                /* Efecto de Error */
                .part-error {
                    filter: drop-shadow(0 0 15px #F44336) brightness(0.9) !important;
                    animation: shake-part 0.5s ease-in-out !important;
                }
                @keyframes shake-part {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px) rotate(-5deg); }
                    75% { transform: translateX(8px) rotate(5deg); }
                }
            </style>
        `;
        this.hablar(this.datosNivel.instruccion_texto);
        this.activarInteraccion();
    }

    getAvatarHTML() {
        const esCara = this.datosNivel.vista_avatar === "cara";
        
        // Usamos los MISMOS renders 3D premium de los diccionarios
        const urls = {
            ojo: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Eye/3D/eye_3d.png",
            oreja: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ear/Default/3D/ear_3d_default.png",
            nariz: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Nose/Default/3D/nose_3d_default.png",
            boca: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mouth/3D/mouth_3d.png",
            brazo: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flexed%20biceps/Default/3D/flexed_biceps_3d_default.png",
            pierna: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Leg/Default/3D/leg_3d_default.png",
            cabeza: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Child/Default/3D/child_3d_default.png"
        };

        if (esCara) {
            // 📸 ENSAMBLAJE DE LA CARA (Mr. Potato Head Style)
            return `
            <div style="position: relative; width: 300px; height: 350px; filter: drop-shadow(0 20px 20px rgba(0,0,0,0.15));">
                <div class="interactive-part" data-id="cabeza" style="top: 50px; left: 25px; width: 250px; height: 280px; background: linear-gradient(135deg, #FFDAB9, #FFCCBC); border-radius: 120px 120px 100px 100px; box-shadow: inset 0 -15px 20px rgba(0,0,0,0.1);"></div>
                
                <div class="interactive-part" data-id="cabeza" style="top: 15px; left: 20px; width: 260px; height: 100px; background: #FFCA28; border-radius: 120px 120px 40px 40px; box-shadow: inset 0 -10px 15px rgba(0,0,0,0.15);"></div>
                
                <img class="interactive-part" data-id="oreja" src="${urls.oreja}" style="top: 150px; left: -15px; width: 75px; transform: scaleX(-1);">
                <img class="interactive-part" data-id="oreja" src="${urls.oreja}" style="top: 150px; right: -15px; width: 75px;">
                
                <img class="interactive-part" data-id="ojo" src="${urls.ojo}" style="top: 125px; left: 55px; width: 80px;">
                <img class="interactive-part" data-id="ojo" src="${urls.ojo}" style="top: 125px; right: 55px; width: 80px;">
                
                <img class="interactive-part" data-id="nariz" src="${urls.nariz}" style="top: 185px; left: 110px; width: 80px;">
                
                <img class="interactive-part" data-id="boca" src="${urls.boca}" style="top: 245px; left: 105px; width: 90px;">
            </div>
            `;
        } else {
            // 🧍 ENSAMBLAJE DEL CUERPO ENTERO
            return `
            <div style="position: relative; width: 300px; height: 420px; filter: drop-shadow(0 20px 20px rgba(0,0,0,0.15));">
                <div class="interactive-part" data-id="torso" style="top: 130px; left: 85px; width: 130px; height: 150px; background: #4FC3F7; border-radius: 40px; box-shadow: inset 0 -15px 20px rgba(0,0,0,0.2);"></div>
                
                <img class="interactive-part" data-id="brazo" src="${urls.brazo}" style="top: 125px; left: -25px; width: 130px; transform: scaleX(-1) rotate(-15deg);">
                <img class="interactive-part" data-id="brazo" src="${urls.brazo}" style="top: 125px; right: -25px; width: 130px; transform: rotate(-15deg);">
                
                <img class="interactive-part" data-id="pierna" src="${urls.pierna}" style="top: 260px; left: 75px; width: 85px;">
                <img class="interactive-part" data-id="pierna" src="${urls.pierna}" style="top: 260px; right: 75px; width: 85px; transform: scaleX(-1);">

                <img class="interactive-part" data-id="cabeza" src="${urls.cabeza}" style="top: 0px; left: 80px; width: 140px; z-index: 5;">
            </div>
            `;
        }
    }

    activarInteraccion() {
        const partes = this.contenedor.querySelectorAll('.interactive-part');
        const objetivoId = this.datosNivel.pieza.id;

        partes.forEach(parte => {
            parte.onclick = (e) => {
                e.stopPropagation();
                // Verificamos usando el data-attribute
                const esCorrecto = (parte.getAttribute('data-id') === objetivoId);
                this.feedbackVisual(esCorrecto, parte);
            };
        });
    }

    feedbackVisual(esCorrecto, elemento) {
        // Bloqueamos clics dobles mientras se anima
        elemento.style.pointerEvents = 'none';

        if (esCorrecto) {
            this.reproducirSonido('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); 
            elemento.classList.add('part-highlight');
            this.hablar(`¡Ahí está! Usamos ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}.`);
            
            setTimeout(() => this.onWin(), 2500);
        } else {
            this.reproducirSonido('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
            elemento.classList.add('part-error');
            this.hablar(`Esa no es ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}. ¡Busca bien!`);
            
            setTimeout(() => {
                elemento.classList.remove('part-error');
                elemento.style.pointerEvents = 'auto'; // Liberamos el clic
            }, 600);
        }
    }
}