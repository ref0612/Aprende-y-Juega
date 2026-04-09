// js/modules/opuestos.js — Módulo Opuestos / Contrarios
// Pedagogía: los opuestos son el primer paso del pensamiento lógico-relacional
// Los niños de 3-5 años son capaces de comprender y usar opuestos

import GameEngine from '../core/GameEngine.js';

// ── PARES DE OPUESTOS CON SVG VISUAL ─────────────────────────────────────────
const OPUESTOS = [
    {
        id: 'grande_pequeno',
        concepto: 'grande / pequeño',
        pregunta: '¿Cuál es el GRANDE?',
        audio: '¿Cuál es el grande?',
        opciones: [
            { label: 'Grande', correcto: true,  svg: _svgGrande('#EF5350') },
            { label: 'Pequeño', correcto: false, svg: _svgPequeno('#90CAF9') },
        ],
    },
    {
        id: 'arriba_abajo',
        concepto: 'arriba / abajo',
        pregunta: '¿El sol está ARRIBA o ABAJO?',
        audio: '¿El sol está arriba o abajo?',
        opciones: [
            { label: 'Arriba ☀️', correcto: true,  svg: _svgArriba() },
            { label: 'Abajo 🌱', correcto: false,  svg: _svgAbajo() },
        ],
    },
    {
        id: 'rapido_lento',
        concepto: 'rápido / lento',
        pregunta: '¿El conejo es RÁPIDO o LENTO?',
        audio: '¿El conejo es rápido o la tortuga?',
        opciones: [
            { label: 'Rápido 🐇', correcto: true,  svg: _svgRapido() },
            { label: 'Lento 🐢',  correcto: false,  svg: _svgLento() },
        ],
    },
    {
        id: 'caliente_frio',
        concepto: 'caliente / frío',
        pregunta: '¿El fuego es CALIENTE o FRÍO?',
        audio: '¿El fuego es caliente o frío?',
        opciones: [
            { label: 'Caliente 🔥', correcto: true,  svg: _svgCaliente() },
            { label: 'Frío ❄️',     correcto: false,  svg: _svgFrio() },
        ],
    },
    {
        id: 'dia_noche',
        concepto: 'día / noche',
        pregunta: '¿En cuál hay sol?',
        audio: '¿En cuál imagen hay sol? ¿Es de día o de noche?',
        opciones: [
            { label: 'Día ☀️',    correcto: true,  svg: _svgDia() },
            { label: 'Noche 🌙',  correcto: false, svg: _svgNoche() },
        ],
    },
    {
        id: 'mucho_poco',
        concepto: 'mucho / poco',
        pregunta: '¿Cuál tiene MUCHAS estrellas?',
        audio: '¿Cuál tiene muchas estrellas?',
        opciones: [
            { label: 'Mucho ⭐⭐⭐', correcto: true,  svg: _svgMucho() },
            { label: 'Poco ⭐',      correcto: false, svg: _svgPoco() },
        ],
    },
    {
        id: 'abierto_cerrado',
        concepto: 'abierto / cerrado',
        pregunta: '¿Cuál está ABIERTO?',
        audio: '¿Cuál está abierto?',
        opciones: [
            { label: 'Abierto', correcto: true,  svg: _svgAbierto() },
            { label: 'Cerrado', correcto: false, svg: _svgCerrado() },
        ],
    },
    {
        id: 'mojado_seco',
        concepto: 'mojado / seco',
        pregunta: '¿Cuál está MOJADO?',
        audio: '¿Cuál está mojado y cuál está seco?',
        opciones: [
            { label: 'Mojado 💧', correcto: true,  svg: _svgMojado() },
            { label: 'Seco ☀️',   correcto: false, svg: _svgSeco() },
        ],
    },
];

// ── GENERADORES SVG ───────────────────────────────────────────────────────────
function _svgWrap(content, bg='#f5f5f5') {
    return `<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" width="130" height="110">
        <rect width="140" height="120" rx="18" fill="${bg}"/>${content}
    </svg>`;
}

function _svgGrande(fill) {
    return _svgWrap(`<circle cx="70" cy="60" r="48" fill="${fill}" opacity="0.9"/>
        <text x="70" y="68" font-size="44" text-anchor="middle" font-family="sans-serif" fill="white" font-weight="bold">A</text>`, '#FFEBEE');
}
function _svgPequeno(fill) {
    return _svgWrap(`<circle cx="70" cy="70" r="22" fill="${fill}" opacity="0.9"/>
        <text x="70" y="78" font-size="18" text-anchor="middle" font-family="sans-serif" fill="white" font-weight="bold">a</text>`, '#E3F2FD');
}
function _svgArriba() {
    return _svgWrap(`<circle cx="70" cy="28" r="22" fill="#FFD93D"/>
        <line x1="70" y1="50" x2="70" y2="95" stroke="#B0BEC5" stroke-width="3"/>
        <text x="70" y="62" font-size="30" text-anchor="middle">☀️</text>`, '#E3F2FD');
}
function _svgAbajo() {
    return _svgWrap(`<rect x="10" y="10" width="120" height="60" rx="8" fill="#64B5F6" opacity="0.5"/>
        <text x="70" y="90" font-size="30" text-anchor="middle">🌱</text>`, '#E8F5E9');
}
function _svgRapido() {
    return _svgWrap(`<text x="20" y="72" font-size="52">🐇</text>
        <line x1="90" y1="60" x2="128" y2="50" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>
        <line x1="90" y1="65" x2="130" y2="65" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>
        <line x1="90" y1="70" x2="128" y2="80" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>`, '#FFF3E0');
}
function _svgLento() {
    return _svgWrap(`<text x="30" y="78" font-size="52">🐢</text>
        <text x="100" y="50" font-size="20" fill="#90A4AE">z</text>
        <text x="112" y="35" font-size="14" fill="#90A4AE">z</text>`, '#E8F5E9');
}
function _svgCaliente() {
    return _svgWrap(`<text x="25" y="82" font-size="56">🔥</text>
        <path d="M95 80 Q100 60 95 40 Q105 60 110 40 Q115 60 110 80" fill="#FF8F00" opacity="0.7"/>`, '#FFF3E0');
}
function _svgFrio() {
    return _svgWrap(`<text x="25" y="82" font-size="56">❄️</text>
        <circle cx="105" cy="40" r="14" fill="#90CAF9"/>
        <circle cx="105" cy="40" r="9"  fill="white"/>
        <circle cx="105" cy="40" r="5"  fill="#64B5F6"/>`, '#E3F2FD');
}
function _svgDia() {
    return _svgWrap(`<rect x="5" y="5" width="130" height="110" rx="14" fill="#87CEEB"/>
        <circle cx="70" cy="45" r="28" fill="#FFD93D"/>
        <line x1="70" y1="10" x2="70" y2="2"  stroke="#FFD93D" stroke-width="3"/>
        <line x1="104" y1="17" x2="110" y2="11" stroke="#FFD93D" stroke-width="3"/>
        <line x1="108" y1="45" x2="116" y2="45" stroke="#FFD93D" stroke-width="3"/>
        <rect x="15" y="82" width="110" height="30" rx="8" fill="#81C784"/>`, '#E3F2FD');
}
function _svgNoche() {
    return _svgWrap(`<rect x="5" y="5" width="130" height="110" rx="14" fill="#1A237E"/>
        <path d="M75 18 A28 28 0 1 0 75 74 A18 18 0 1 1 75 18Z" fill="#FFF9C4"/>
        <circle cx="30" cy="25" r="3" fill="white"/>
        <circle cx="110" cy="40" r="4" fill="white"/>
        <circle cx="50" cy="90" r="3" fill="white"/>
        <circle cx="90" cy="85" r="2" fill="white"/>`, '#E8EAF6');
}
function _svgMucho() {
    return _svgWrap(`<text x="18" y="48" font-size="24">⭐</text>
        <text x="54" y="48" font-size="24">⭐</text>
        <text x="90" y="48" font-size="24">⭐</text>
        <text x="18" y="88" font-size="24">⭐</text>
        <text x="54" y="88" font-size="24">⭐</text>
        <text x="90" y="88" font-size="24">⭐</text>`, '#FFF9C4');
}
function _svgPoco() {
    return _svgWrap(`<text x="44" y="72" font-size="40">⭐</text>`, '#FFF3E0');
}
function _svgAbierto() {
    return _svgWrap(`<rect x="20" y="20" width="44" height="80" rx="6" fill="#8D6E63"/>
        <rect x="76" y="50" width="44" height="60" rx="6" fill="#8D6E63"/>
        <circle cx="68" cy="62" r="5" fill="#FFD93D"/>
        <path d="M30 20 L30 5" stroke="#6D4C41" stroke-width="3"/>
        <path d="M54 20 L54 5" stroke="#6D4C41" stroke-width="3"/>`, '#EFEBE9');
}
function _svgCerrado() {
    return _svgWrap(`<rect x="20" y="20" width="100" height="80" rx="6" fill="#8D6E63"/>
        <rect x="30" y="30" width="36" height="60" rx="4" fill="#A1887F"/>
        <rect x="74" y="30" width="36" height="60" rx="4" fill="#A1887F"/>
        <ellipse cx="70" cy="62" rx="6" ry="5" fill="#FFD93D"/>`, '#EFEBE9');
}
function _svgMojado() {
    return _svgWrap(`<text x="20" y="72" font-size="50">👕</text>
        <text x="80" y="48" font-size="22">💧</text>
        <text x="92" y="70" font-size="18">💧</text>
        <text x="72" y="90" font-size="16">💧</text>`, '#E3F2FD');
}
function _svgSeco() {
    return _svgWrap(`<text x="20" y="72" font-size="50">👕</text>
        <circle cx="108" cy="38" r="18" fill="#FFD93D"/>`, '#FFF9C4');
}

// ── GAME CLASS ────────────────────────────────────────────────────────────────
export default class OpuestosGame extends GameEngine {
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
            <h2 class="instruccion-titulo">${d.pregunta}</h2>
            <div id="opciones-opuestos" style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap; padding:14px 10px;"></div>
        `;
        this.hablar(d.audio);
        this._renderOpciones();
    }

    _renderOpciones() {
        const area = document.getElementById('opciones-opuestos');
        this.datosNivel.opciones.forEach(op => {
            const wrap = document.createElement('div');
            wrap.style.cssText = `
                display:flex; flex-direction:column; align-items:center; gap:8px;
                cursor:pointer; transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
                background:rgba(255,255,255,0.5); border-radius:20px; padding:12px 14px;
                border:4px solid rgba(255,255,255,0.7);
                box-shadow:0 8px 14px rgba(0,0,0,0.1);
            `;
            wrap.innerHTML = `
                ${op.svg}
                <span style="font-size:1.15rem; font-weight:900; color:#2c3e50; text-align:center;">${op.label}</span>
            `;
            wrap.onmouseenter = () => wrap.style.transform = 'scale(1.07) translateY(-4px)';
            wrap.onmouseleave = () => wrap.style.transform = '';
            wrap.onclick = () => this._verificar(op.correcto, wrap, op.label);
            area.appendChild(wrap);
        });
    }

    _verificar(correcto, el, label) {
        document.getElementById('opciones-opuestos')
            .querySelectorAll('div').forEach(d => d.style.pointerEvents = 'none');

        if (correcto) {
            this.renderFeedback(true, el);
            this.hablar(`¡Exacto! Eso es ${label}. ¡Muy bien!`);
            setTimeout(() => this.onWin(), 2000);
        } else {
            this.renderFeedback(false, el);
            this.hablar(`No, eso no es. ¡Piensa bien!`);
            setTimeout(() => {
                document.getElementById('opciones-opuestos')
                    .querySelectorAll('div').forEach(d => d.style.pointerEvents = 'auto');
            }, 1100);
        }
    }
}

export { OPUESTOS };
