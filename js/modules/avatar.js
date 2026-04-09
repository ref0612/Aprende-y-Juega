// js/modules/avatar.js — Avatar 100% SVG, sin emojis PNG
import GameEngine from '../core/GameEngine.js';

export default class AvatarGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super();
        this.datosNivel = datosNivel;
        this.onWin      = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this._init();
    }

    _init() {
        this.contenedor.innerHTML = `
            <h2 class="instruccion-titulo">${this.datosNivel.instruccion_texto}</h2>
            <div id="avatar-container">
                ${this.datosNivel.vista_avatar === 'cara' ? this._svgCara() : this._svgCuerpo()}
            </div>
            <style>
                .parte { cursor:pointer; transition:filter 0.2s, transform 0.2s; transform-origin:center; }
                .parte:hover { filter:brightness(1.12) drop-shadow(0 0 10px rgba(255,210,0,0.7)); }
                .parte:active { transform:scale(0.92); }
                .parte-ok    { filter:drop-shadow(0 0 20px #8BC34A) brightness(1.1) !important; transform:scale(1.2) !important; z-index:10; position:relative; }
                .parte-error { animation:sacudir 0.5s ease-in-out !important; filter:drop-shadow(0 0 14px #F44336) !important; }
                @keyframes sacudir {
                    0%,100% { transform:translateX(0) rotate(0); }
                    20%     { transform:translateX(-10px) rotate(-4deg); }
                    60%     { transform:translateX(10px) rotate(4deg); }
                }
            </style>
        `;
        this.hablar(this.datosNivel.instruccion_texto);
        this._activarInteraccion();
    }

    // ═══════════════════════════════════════════════════
    //  SVG CARA — niña/niño caricaturesca, todo dibujado
    // ═══════════════════════════════════════════════════
    _svgCara() {
        return `
        <svg viewBox="0 0 280 310" xmlns="http://www.w3.org/2000/svg" width="280" style="overflow:visible">

          <!-- ── PELO (fondo, detrás de la cara) -->
          <ellipse cx="140" cy="108" rx="105" ry="95" fill="#E8A020"/>

          <!-- ── CARA BASE -->
          <ellipse cx="140" cy="168" rx="97" ry="110" fill="#FDDAB0"/>
          <!-- Sombra sutil bajo mejillas -->
          <ellipse cx="140" cy="240" rx="90" ry="40" fill="rgba(0,0,0,0.04)"/>

          <!-- ── OREJAS — data-id="oreja" -->
          <g class="parte" data-id="oreja">
            <!-- oreja izquierda -->
            <ellipse cx="40"  cy="180" rx="18" ry="24" fill="#FDDAB0"/>
            <ellipse cx="40"  cy="180" rx="11" ry="16" fill="#F4B885"/>
            <!-- oreja derecha -->
            <ellipse cx="240" cy="180" rx="18" ry="24" fill="#FDDAB0"/>
            <ellipse cx="240" cy="180" rx="11" ry="16" fill="#F4B885"/>
          </g>

          <!-- ── PELO (frente, cubre frente y orejas arriba) -->
          <g class="parte" data-id="pelo">
            <ellipse cx="140" cy="80"  rx="105" ry="78"  fill="#E8A020"/>
            <path d="M 38 115 Q 55 55 140 50 Q 225 55 242 115" fill="#E8A020"/>
            <ellipse cx="110" cy="65" rx="28" ry="11" fill="rgba(255,255,255,0.18)" transform="rotate(-18,110,65)"/>
          </g>

          <!-- ── CEJAS -->
          <path d="M 78 140 Q 98 129 118 140" fill="none" stroke="#8B5A18" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M 162 140 Q 182 129 202 140" fill="none" stroke="#8B5A18" stroke-width="3.5" stroke-linecap="round"/>

          <!-- ── OJOS — data-id="ojo" -->
          <g class="parte" data-id="ojo">
            <!-- esclerótica izquierda -->
            <ellipse cx="98"  cy="164" rx="21" ry="20" fill="white"/>
            <!-- iris izq -->
            <circle  cx="98"  cy="165" r="13"  fill="#4A7FC1"/>
            <!-- pupila izq -->
            <circle  cx="98"  cy="165" r="7.5" fill="#1a1a2e"/>
            <!-- brillo izq -->
            <circle  cx="104" cy="159" r="3.5" fill="white"/>
            <circle  cx="95"  cy="169" r="1.8" fill="white"/>
            <!-- pestaña izq -->
            <path d="M 78 152 Q 76 143 80 138" fill="none" stroke="#3a2a10" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M 89 149 Q 89 140 93 136" fill="none" stroke="#3a2a10" stroke-width="2.2" stroke-linecap="round"/>

            <!-- esclerótica derecha -->
            <ellipse cx="182" cy="164" rx="21" ry="20" fill="white"/>
            <!-- iris der -->
            <circle  cx="182" cy="165" r="13"  fill="#4A7FC1"/>
            <!-- pupila der -->
            <circle  cx="182" cy="165" r="7.5" fill="#1a1a2e"/>
            <!-- brillo der -->
            <circle  cx="188" cy="159" r="3.5" fill="white"/>
            <circle  cx="179" cy="169" r="1.8" fill="white"/>
            <!-- pestaña der -->
            <path d="M 171 149 Q 171 140 175 136" fill="none" stroke="#3a2a10" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M 184 152 Q 186 143 190 138" fill="none" stroke="#3a2a10" stroke-width="2.2" stroke-linecap="round"/>
          </g>

          <!-- ── NARIZ — data-id="nariz" -->
          <g class="parte" data-id="nariz">
            <path d="M 130 200 Q 140 218 150 200" fill="none" stroke="#D4956A" stroke-width="3" stroke-linecap="round"/>
            <!-- fosas nasales -->
            <ellipse cx="128" cy="207" rx="6" ry="4.5" fill="rgba(0,0,0,0.09)"/>
            <ellipse cx="152" cy="207" rx="6" ry="4.5" fill="rgba(0,0,0,0.09)"/>
          </g>

          <!-- ── MEJILLAS rosadas -->
          <ellipse cx="72"  cy="222" rx="26" ry="18" fill="rgba(255,110,110,0.22)"/>
          <ellipse cx="208" cy="222" rx="26" ry="18" fill="rgba(255,110,110,0.22)"/>

          <!-- ── BOCA — data-id="boca" -->
          <g class="parte" data-id="boca">
            <!-- sonrisa -->
            <path d="M 106 244 Q 140 278 174 244" fill="none" stroke="#C04A2A" stroke-width="4.5" stroke-linecap="round"/>
            <!-- relleno blanco (dientes) -->
            <path d="M 110 247 Q 140 268 170 247" fill="white"/>
            <!-- línea entre dientes -->
            <line x1="140" y1="247" x2="140" y2="266" stroke="#E0DDD8" stroke-width="1.5"/>
            <!-- labio inferior -->
            <path d="M 108 252 Q 140 280 172 252" fill="rgba(180,80,50,0.12)"/>
          </g>

        </svg>`;
    }

    // ═══════════════════════════════════════════════════
    //  SVG CUERPO — personaje completo de pie
    // ═══════════════════════════════════════════════════
    _svgCuerpo() {
        return `
        <svg viewBox="0 0 280 400" xmlns="http://www.w3.org/2000/svg" width="260" style="overflow:visible">

          <!-- ── CABEZA — data-id="cabeza" -->
          <g class="parte" data-id="pelo">
            <ellipse cx="140" cy="50"  rx="56" ry="50" fill="#E8A020"/>
          </g>

          <g class="parte" data-id="cabeza">
            <ellipse cx="140" cy="64"  rx="50" ry="56" fill="#FDDAB0"/>
            <ellipse cx="122" cy="62" rx="10" ry="10" fill="white"/>
            <circle  cx="122" cy="62" r="6"  fill="#1a1a2e"/>
            <circle  cx="126" cy="58" r="2.5"fill="white"/>
            <ellipse cx="158" cy="62" rx="10" ry="10" fill="white"/>
            <circle  cx="158" cy="62" r="6"  fill="#1a1a2e"/>
            <circle  cx="162" cy="58" r="2.5"fill="white"/>
            <path d="M 133 76 Q 140 84 147 76" fill="none" stroke="#D4956A" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 124 92 Q 140 108 156 92" fill="none" stroke="#C04A2A" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M 126 94 Q 140 106 154 94" fill="white"/>
            <ellipse cx="108" cy="80" rx="14" ry="9" fill="rgba(255,110,110,0.22)"/>
            <ellipse cx="172" cy="80" rx="14" ry="9" fill="rgba(255,110,110,0.22)"/>
          </g>

          <g class="parte" data-id="pelo">
            <ellipse cx="140" cy="22"  rx="56" ry="38" fill="#E8A020"/>
          </g>

          <!-- ── CUELLO -->
          <rect x="128" y="115" width="24" height="20" rx="8" fill="#FDDAB0"/>

          <!-- ── TORSO / CAMISETA -->
          <rect x="84"  y="132" width="112" height="106" rx="26" fill="#5BC8F5"/>
          <!-- cuello camiseta V -->
          <path d="M 128 132 Q 140 148 152 132" fill="none" stroke="#29B6F6" stroke-width="2.5"/>
          <!-- pliegue central -->
          <line x1="140" y1="148" x2="140" y2="234" stroke="rgba(0,0,0,0.06)" stroke-width="2"/>

          <!-- ── BRAZO IZQUIERDO (fondo, detrás del torso) -->
          <rect x="50" y="140" width="36" height="80" rx="18" fill="#FDDAB0" transform="rotate(10,68,180)"/>
          <!-- ── BRAZO DERECHO -->
          <rect x="194" y="140" width="36" height="80" rx="18" fill="#FDDAB0" transform="rotate(-10,212,180)"/>

          <!-- ── MANOS — data-id="mano" -->
          <g class="parte" data-id="mano">
            <!-- palma izquierda -->
            <circle cx="48"  cy="228" r="20" fill="#FDDAB0"/>
            <!-- dedos izquierda (4 óvalos) -->
            <ellipse cx="30" cy="215" rx="8" ry="12" fill="#FDDAB0" transform="rotate(-20,30,215)"/>
            <ellipse cx="36" cy="208" rx="8" ry="12" fill="#FDDAB0" transform="rotate(-8,36,208)"/>
            <ellipse cx="46" cy="206" rx="8" ry="12" fill="#FDDAB0" transform="rotate(4,46,206)"/>
            <ellipse cx="56" cy="208" rx="8" ry="12" fill="#FDDAB0" transform="rotate(12,56,208)"/>
            <!-- uñitas izq -->
            <ellipse cx="30" cy="206" rx="5" ry="3" fill="#F4B885" transform="rotate(-20,30,206)"/>
            <ellipse cx="36" cy="199" rx="5" ry="3" fill="#F4B885" transform="rotate(-8,36,199)"/>
            <ellipse cx="46" cy="197" rx="5" ry="3" fill="#F4B885"/>
            <ellipse cx="56" cy="199" rx="5" ry="3" fill="#F4B885" transform="rotate(12,56,199)"/>

            <!-- palma derecha -->
            <circle cx="232" cy="228" r="20" fill="#FDDAB0"/>
            <!-- dedos derecha -->
            <ellipse cx="224" cy="208" rx="8" ry="12" fill="#FDDAB0" transform="rotate(-12,224,208)"/>
            <ellipse cx="234" cy="206" rx="8" ry="12" fill="#FDDAB0" transform="rotate(-4,234,206)"/>
            <ellipse cx="244" cy="208" rx="8" ry="12" fill="#FDDAB0" transform="rotate(8,244,208)"/>
            <ellipse cx="250" cy="215" rx="8" ry="12" fill="#FDDAB0" transform="rotate(20,250,215)"/>
            <!-- uñitas der -->
            <ellipse cx="224" cy="199" rx="5" ry="3" fill="#F4B885" transform="rotate(-12,224,199)"/>
            <ellipse cx="234" cy="197" rx="5" ry="3" fill="#F4B885"/>
            <ellipse cx="244" cy="199" rx="5" ry="3" fill="#F4B885" transform="rotate(8,244,199)"/>
            <ellipse cx="250" cy="206" rx="5" ry="3" fill="#F4B885" transform="rotate(20,250,206)"/>
          </g>

          <!-- ── PANTALÓN / SHORTS -->
          <rect x="86"  y="232" width="108" height="62" rx="14" fill="#1E6FC5"/>
          <!-- costuras -->
          <line x1="140" y1="232" x2="140" y2="294" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>

          <!-- ── PIERNA IZQUIERDA -->
          <rect x="88"  y="280" width="46" height="88" rx="22" fill="#FDDAB0"/>
          <!-- ── PIERNA DERECHA -->
          <rect x="146" y="280" width="46" height="88" rx="22" fill="#FDDAB0"/>

          <!-- ── PIES — data-id="pie" -->
          <g class="parte" data-id="pie">
            <!-- pie izquierdo — zapatilla -->
            <ellipse cx="106" cy="374" rx="30" ry="17" fill="#E53935"/>
            <ellipse cx="96"  cy="370" rx="20" ry="13" fill="#EF5350"/>
            <!-- suela -->
            <ellipse cx="106" cy="377" rx="30" ry="8"  fill="#B71C1C" opacity="0.4"/>
            <!-- agujetas decorativas -->
            <line x1="96" y1="368" x2="116" y2="368" stroke="white" stroke-width="1.5" stroke-dasharray="3 2"/>
            <line x1="96" y1="372" x2="116" y2="372" stroke="white" stroke-width="1.5" stroke-dasharray="3 2"/>

            <!-- pie derecho -->
            <ellipse cx="174" cy="374" rx="30" ry="17" fill="#E53935"/>
            <ellipse cx="184" cy="370" rx="20" ry="13" fill="#EF5350"/>
            <ellipse cx="174" cy="377" rx="30" ry="8"  fill="#B71C1C" opacity="0.4"/>
            <line x1="164" y1="368" x2="184" y2="368" stroke="white" stroke-width="1.5" stroke-dasharray="3 2"/>
            <line x1="164" y1="372" x2="184" y2="372" stroke="white" stroke-width="1.5" stroke-dasharray="3 2"/>
          </g>

        </svg>`;
    }

    // ═══════════════════════════════════════════════════
    _activarInteraccion() {
        const partes     = this.contenedor.querySelectorAll('.parte[data-id]');
        const objetivoId = this.datosNivel.pieza.id;

        partes.forEach(parte => {
            parte.addEventListener('click', e => {
                e.stopPropagation();
                const esCorrecto = parte.getAttribute('data-id') === objetivoId;
                this._feedback(esCorrecto, parte);
            });
        });
    }

    _feedback(esCorrecto, el) {
        // Bloquear todos mientras se anima
        this.contenedor.querySelectorAll('.parte').forEach(p => p.style.pointerEvents = 'none');

        if (esCorrecto) {
            this.reproducirSonido(this.SOUNDS.SUCCESS);
            this.lanzarConfeti();
            GameEngine.addScore(10);
            el.classList.add('parte-ok');
            this.hablar(`¡Muy bien! Eso es ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}.`);
            setTimeout(() => this.onWin(), 2200);
        } else {
            this.reproducirSonido(this.SOUNDS.ERROR);
            GameEngine.loseLife();
            el.classList.add('parte-error');
            this.hablar(`Esa no es ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}. ¡Busca bien!`);
            setTimeout(() => {
                el.classList.remove('parte-error');
                this.contenedor.querySelectorAll('.parte').forEach(p => p.style.pointerEvents = 'auto');
            }, 700);
        }
    }
}