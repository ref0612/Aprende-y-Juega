// js/modules/emociones.js — Rediseño pedagógico completo
// Investigación: los niños aprenden emociones por CARAS, no por textos.
// Dos modos:
//   'cara_a_nombre' → ve una cara grande, elige el nombre entre 3 opciones
//   'situacion_a_cara' → escucha/lee la situación, elige la cara correcta
import GameEngine from '../core/GameEngine.js';

// ── PALETA DE EMOCIONES ───────────────────────────────────────────────────────
// Cada emoción tiene: cara SVG, color de fondo, nombre, situación pedagógica
const EMOCIONES = {
    feliz: {
        nombre: 'feliz',
        fondo:  '#FFD93D',
        situacion: 'Me regalaron un juguete nuevo',
        audio_sit:  '¡Me regalaron un juguete nuevo! ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#FFD93D', {
            ojos:    'alegre',
            cejas:   'normal',
            boca:    'sonrisa-grande',
            extras:  ['mejillas'],
        }),
    },
    triste: {
        nombre: 'triste',
        fondo:  '#90CAF9',
        situacion: 'Se rompió mi dibujo favorito',
        audio_sit:  'Se rompió mi dibujo favorito. ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#90CAF9', {
            ojos:    'triste',
            cejas:   'triste',
            boca:    'frown',
            extras:  ['lagrimas'],
        }),
    },
    enojado: {
        nombre: 'enojado',
        fondo:  '#EF9A9A',
        situacion: 'Mi amigo me quitó mi juguete',
        audio_sit:  'Mi amigo me quitó mi juguete. ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#EF9A9A', {
            ojos:    'enojado',
            cejas:   'enojado',
            boca:    'frown-apretado',
            extras:  ['rojo-mejillas'],
        }),
    },
    asustado: {
        nombre: 'asustado',
        fondo:  '#F5F5F5',
        situacion: 'Escuché un ruido muy fuerte',
        audio_sit:  'Escuché un ruido muy fuerte. ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#E0E0E0', {
            ojos:    'asustado',
            cejas:   'asustado',
            boca:    'O-grande',
            extras:  ['sudor'],
        }),
    },
    sorprendido: {
        nombre: 'sorprendido',
        fondo:  '#A5D6A7',
        situacion: 'Vi un arcoíris enorme',
        audio_sit:  '¡Vi un arcoíris enorme! ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#A5D6A7', {
            ojos:    'sorprendido',
            cejas:   'asustado',
            boca:    'O-chico',
            extras:  [],
        }),
    },
    orgulloso: {
        nombre: 'orgulloso',
        fondo:  '#CE93D8',
        situacion: 'Aprendí a atar mis zapatos solo',
        audio_sit:  '¡Aprendí a atar mis zapatos solo! ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#CE93D8', {
            ojos:    'confiado',
            cejas:   'una-arriba',
            boca:    'sonrisa-media',
            extras:  [],
        }),
    },
    cansado: {
        nombre: 'cansado',
        fondo:  '#B0BEC5',
        situacion: 'Jugué todo el día en el parque',
        audio_sit:  'Jugué todo el día. ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#B0BEC5', {
            ojos:    'cansado',
            cejas:   'normal',
            boca:    'bostezo',
            extras:  ['zzz'],
        }),
    },
    amor: {
        nombre: 'con amor',
        fondo:  '#F48FB1',
        situacion: 'Mi mamá me dio un abrazo enorme',
        audio_sit:  '¡Mi mamá me dio un abrazo! ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#F48FB1', {
            ojos:    'corazon',
            cejas:   'normal',
            boca:    'sonrisa-grande',
            extras:  ['corazones'],
        }),
    },
    curioso: {
        nombre: 'curioso',
        fondo:  '#FFCC80',
        situacion: 'Encontré un bicho que nunca había visto',
        audio_sit:  'Encontré un bicho raro. ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#FFCC80', {
            ojos:    'curioso',
            cejas:   'una-arriba',
            boca:    'sonrisa-media',
            extras:  ['interrogacion'],
        }),
    },
    emocionado: {
        nombre: 'emocionado',
        fondo:  '#FFF176',
        situacion: 'Mañana vamos a la fiesta de cumpleaños',
        audio_sit:  '¡Mañana hay fiesta! ¿Qué cara pongo?',
        svg: (sz) => _cara(sz, '#FFF176', {
            ojos:    'emocionado',
            cejas:   'asustado',
            boca:    'sonrisa-enorme',
            extras:  ['estrellas'],
        }),
    },
};

// ── GENERADOR SVG DE CARAS ────────────────────────────────────────────────────
function _cara(sz, fondo, cfg) {
    const r = sz / 2;
    const cx = sz / 2, cy = sz / 2;
    const esc = sz / 120; // escalar todo relativo a 120

    // helpers escalados
    const s = (v) => v * esc;

    // ── OJOS ──────────────────────────────────────────────────────────────────
    const tiposOjo = {
        'alegre':      `<path d="M ${cx-s(28)} ${cy-s(5)} Q ${cx-s(18)} ${cy-s(18)} ${cx-s(8)} ${cy-s(5)}" fill="none" stroke="#333" stroke-width="${s(5)}" stroke-linecap="round"/>
                        <path d="M ${cx+s(8)} ${cy-s(5)} Q ${cx+s(18)} ${cy-s(18)} ${cx+s(28)} ${cy-s(5)}" fill="none" stroke="#333" stroke-width="${s(5)}" stroke-linecap="round"/>`,
        'triste':      `<circle cx="${cx-s(18)}" cy="${cy-s(2)}" r="${s(9)}" fill="#546E7A"/>
                        <circle cx="${cx+s(18)}" cy="${cy-s(2)}" r="${s(9)}" fill="#546E7A"/>
                        <circle cx="${cx-s(15)}" cy="${cy-s(5)}" r="${s(4)}" fill="white"/>
                        <circle cx="${cx+s(15)}" cy="${cy-s(5)}" r="${s(4)}" fill="white"/>
                        <path d="M ${cx-s(26)} ${cy+s(6)} Q ${cx-s(18)} ${cy+s(12)} ${cx-s(10)} ${cy+s(6)}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="${s(3)}" stroke-linecap="round"/>
                        <path d="M ${cx+s(10)} ${cy+s(6)} Q ${cx+s(18)} ${cy+s(12)} ${cx+s(26)} ${cy+s(6)}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="${s(3)}" stroke-linecap="round"/>`,
        'enojado':     `<path d="M ${cx-s(28)} ${cy-s(2)} Q ${cx-s(18)} ${cy-s(12)} ${cx-s(8)} ${cy-s(2)}" fill="none" stroke="#333" stroke-width="${s(4)}" stroke-linecap="round"/>
                        <path d="M ${cx+s(8)} ${cy-s(2)} Q ${cx+s(18)} ${cy-s(12)} ${cx+s(28)} ${cy-s(2)}" fill="none" stroke="#333" stroke-width="${s(4)}" stroke-linecap="round"/>
                        <ellipse cx="${cx-s(18)}" cy="${cy+s(6)}" rx="${s(9)}" ry="${s(7)}" fill="#37474F"/>
                        <ellipse cx="${cx+s(18)}" cy="${cy+s(6)}" rx="${s(9)}" ry="${s(7)}" fill="#37474F"/>`,
        'asustado':    `<circle cx="${cx-s(18)}" cy="${cy}" r="${s(12)}" fill="white"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(12)}" fill="white"/>
                        <circle cx="${cx-s(18)}" cy="${cy}" r="${s(7)}" fill="#1a1a2e"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(7)}" fill="#1a1a2e"/>
                        <circle cx="${cx-s(14)}" cy="${cy-s(4)}" r="${s(3)}" fill="white"/>
                        <circle cx="${cx+s(14)}" cy="${cy-s(4)}" r="${s(3)}" fill="white"/>`,
        'sorprendido': `<circle cx="${cx-s(18)}" cy="${cy}" r="${s(11)}" fill="white"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(11)}" fill="white"/>
                        <circle cx="${cx-s(18)}" cy="${cy}" r="${s(6)}" fill="#2c3e50"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(6)}" fill="#2c3e50"/>
                        <circle cx="${cx-s(15)}" cy="${cy-s(3)}" r="${s(2.5)}" fill="white"/>
                        <circle cx="${cx+s(15)}" cy="${cy-s(3)}" r="${s(2.5)}" fill="white"/>`,
        'confiado':    `<path d="M ${cx-s(27)} ${cy} Q ${cx-s(18)} ${cy-s(10)} ${cx-s(9)} ${cy}" fill="none" stroke="#333" stroke-width="${s(5)}" stroke-linecap="round"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(9)}" fill="#333"/>
                        <circle cx="${cx+s(15)}" cy="${cy-s(3)}" r="${s(3.5)}" fill="white"/>`,
        'cansado':     `<path d="M ${cx-s(28)} ${cy-s(4)} Q ${cx-s(18)} ${cy+s(2)} ${cx-s(8)} ${cy-s(4)}" fill="none" stroke="#333" stroke-width="${s(5)}" stroke-linecap="round"/>
                        <path d="M ${cx+s(8)} ${cy-s(4)} Q ${cx+s(18)} ${cy+s(2)} ${cx+s(28)} ${cy-s(4)}" fill="none" stroke="#333" stroke-width="${s(5)}" stroke-linecap="round"/>
                        <path d="M ${cx-s(28)} ${cy-s(10)} Q ${cx-s(18)} ${cy+s(6)} ${cx-s(8)} ${cy-s(10)}" fill="${fondo}" stroke="none"/>
                        <path d="M ${cx+s(8)} ${cy-s(10)} Q ${cx+s(18)} ${cy+s(6)} ${cx+s(28)} ${cy-s(10)}" fill="${fondo}" stroke="none"/>`,
        'corazon':     `<text x="${cx-s(22)}" y="${cy+s(6)}" font-size="${s(20)}" text-anchor="middle">🩷</text>
                        <text x="${cx+s(22)}" y="${cy+s(6)}" font-size="${s(20)}" text-anchor="middle">🩷</text>`,
        'curioso':     `<circle cx="${cx-s(18)}" cy="${cy}" r="${s(10)}" fill="white"/>
                        <circle cx="${cx+s(18)}" cy="${cy-s(2)}" r="${s(12)}" fill="white"/>
                        <circle cx="${cx-s(18)}" cy="${cy}" r="${s(6)}" fill="#2c3e50"/>
                        <circle cx="${cx+s(18)}" cy="${cy-s(2)}" r="${s(7)}" fill="#2c3e50"/>
                        <circle cx="${cx-s(15)}" cy="${cy-s(3)}" r="${s(2.5)}" fill="white"/>
                        <circle cx="${cx+s(15)}" cy="${cy-s(5)}" r="${s(3)}" fill="white"/>`,
        'emocionado':  `<circle cx="${cx-s(18)}" cy="${cy}" r="${s(12)}" fill="white" stroke="#FFB300" stroke-width="${s(2)}"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(12)}" fill="white" stroke="#FFB300" stroke-width="${s(2)}"/>
                        <circle cx="${cx-s(18)}" cy="${cy}" r="${s(7)}" fill="#1a1a2e"/>
                        <circle cx="${cx+s(18)}" cy="${cy}" r="${s(7)}" fill="#1a1a2e"/>
                        <circle cx="${cx-s(14)}" cy="${cy-s(4)}" r="${s(3.5)}" fill="white"/>
                        <circle cx="${cx+s(14)}" cy="${cy-s(4)}" r="${s(3.5)}" fill="white"/>`,
    };

    // ── CEJAS ─────────────────────────────────────────────────────────────────
    const tiposCeja = {
        'normal':    `<path d="M ${cx-s(28)} ${cy-s(22)} Q ${cx-s(18)} ${cy-s(28)} ${cx-s(8)} ${cy-s(22)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>
                      <path d="M ${cx+s(8)} ${cy-s(22)} Q ${cx+s(18)} ${cy-s(28)} ${cx+s(28)} ${cy-s(22)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>`,
        'triste':    `<path d="M ${cx-s(28)} ${cy-s(18)} Q ${cx-s(18)} ${cy-s(28)} ${cx-s(8)} ${cy-s(22)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>
                      <path d="M ${cx+s(8)} ${cy-s(22)} Q ${cx+s(18)} ${cy-s(28)} ${cx+s(28)} ${cy-s(18)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>`,
        'enojado':   `<path d="M ${cx-s(28)} ${cy-s(25)} Q ${cx-s(18)} ${cy-s(18)} ${cx-s(8)} ${cy-s(25)}" fill="none" stroke="#5D4037" stroke-width="${s(5)}" stroke-linecap="round"/>
                      <path d="M ${cx+s(8)} ${cy-s(25)} Q ${cx+s(18)} ${cy-s(18)} ${cx+s(28)} ${cy-s(25)}" fill="none" stroke="#5D4037" stroke-width="${s(5)}" stroke-linecap="round"/>`,
        'asustado':  `<path d="M ${cx-s(28)} ${cy-s(28)} Q ${cx-s(18)} ${cy-s(36)} ${cx-s(8)} ${cy-s(28)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>
                      <path d="M ${cx+s(8)} ${cy-s(28)} Q ${cx+s(18)} ${cy-s(36)} ${cx+s(28)} ${cy-s(28)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>`,
        'una-arriba':`<path d="M ${cx-s(28)} ${cy-s(22)} Q ${cx-s(18)} ${cy-s(28)} ${cx-s(8)} ${cy-s(22)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>
                      <path d="M ${cx+s(8)} ${cy-s(28)} Q ${cx+s(18)} ${cy-s(36)} ${cx+s(28)} ${cy-s(22)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>`,
    };

    // ── BOCAS ─────────────────────────────────────────────────────────────────
    const tiposBoca = {
        'sonrisa-grande':  `<path d="M ${cx-s(28)} ${cy+s(22)} Q ${cx} ${cy+s(46)} ${cx+s(28)} ${cy+s(22)}" fill="white" stroke="#C04A2A" stroke-width="${s(4)}" stroke-linecap="round"/>
                            <path d="M ${cx-s(28)} ${cy+s(22)} Q ${cx} ${cy+s(46)} ${cx+s(28)} ${cy+s(22)}" fill="none" stroke="#C04A2A" stroke-width="${s(4)}" stroke-linecap="round"/>
                            <line x1="${cx}" y1="${cy+s(22)}" x2="${cx}" y2="${cy+s(42)}" stroke="#E8D5D0" stroke-width="${s(2)}"/>`,
        'sonrisa-media':   `<path d="M ${cx-s(20)} ${cy+s(26)} Q ${cx} ${cy+s(38)} ${cx+s(20)} ${cy+s(26)}" fill="none" stroke="#C04A2A" stroke-width="${s(4)}" stroke-linecap="round"/>`,
        'sonrisa-enorme':  `<path d="M ${cx-s(32)} ${cy+s(18)} Q ${cx} ${cy+s(52)} ${cx+s(32)} ${cy+s(18)}" fill="white" stroke="#C04A2A" stroke-width="${s(4)}" stroke-linecap="round"/>
                            <line x1="${cx-s(10)}" y1="${cy+s(24)}" x2="${cx-s(10)}" y2="${cy+s(48)}" stroke="#E8D5D0" stroke-width="${s(2)}"/>
                            <line x1="${cx+s(10)}" y1="${cy+s(24)}" x2="${cx+s(10)}" y2="${cy+s(48)}" stroke="#E8D5D0" stroke-width="${s(2)}"/>`,
        'frown':           `<path d="M ${cx-s(24)} ${cy+s(36)} Q ${cx} ${cy+s(24)} ${cx+s(24)} ${cy+s(36)}" fill="none" stroke="#5D4037" stroke-width="${s(4)}" stroke-linecap="round"/>`,
        'frown-apretado':  `<path d="M ${cx-s(20)} ${cy+s(34)} Q ${cx} ${cy+s(24)} ${cx+s(20)} ${cy+s(34)}" fill="none" stroke="#5D4037" stroke-width="${s(5)}" stroke-linecap="round"/>`,
        'O-grande':        `<ellipse cx="${cx}" cy="${cy+s(32)}" rx="${s(14)}" ry="${s(16)}" fill="#333" stroke="none"/>
                            <ellipse cx="${cx}" cy="${cy+s(32)}" rx="${s(9)}" ry="${s(11)}" fill="#1a0000" stroke="none"/>`,
        'O-chico':         `<ellipse cx="${cx}" cy="${cy+s(30)}" rx="${s(10)}" ry="${s(11)}" fill="#444" stroke="none"/>`,
        'bostezo':         `<path d="M ${cx-s(18)} ${cy+s(26)} Q ${cx} ${cy+s(46)} ${cx+s(18)} ${cy+s(26)}" fill="#555" stroke="#5D4037" stroke-width="${s(3)}" stroke-linecap="round"/>`,
    };

    // ── EXTRAS ────────────────────────────────────────────────────────────────
    const extrasMap = {
        'mejillas':       `<ellipse cx="${cx-s(34)}" cy="${cy+s(16)}" rx="${s(14)}" ry="${s(9)}" fill="rgba(255,120,120,0.3)"/>
                           <ellipse cx="${cx+s(34)}" cy="${cy+s(16)}" rx="${s(14)}" ry="${s(9)}" fill="rgba(255,120,120,0.3)"/>`,
        'lagrimas':       `<ellipse cx="${cx-s(20)}" cy="${cy+s(18)}" rx="${s(4)}" ry="${s(7)}" fill="#64B5F6" opacity="0.8"/>
                           <ellipse cx="${cx+s(20)}" cy="${cy+s(18)}" rx="${s(4)}" ry="${s(7)}" fill="#64B5F6" opacity="0.8"/>`,
        'rojo-mejillas':  `<ellipse cx="${cx-s(36)}" cy="${cy+s(14)}" rx="${s(14)}" ry="${s(9)}" fill="rgba(229,57,53,0.35)"/>
                           <ellipse cx="${cx+s(36)}" cy="${cy+s(14)}" rx="${s(14)}" ry="${s(9)}" fill="rgba(229,57,53,0.35)"/>`,
        'sudor':          `<ellipse cx="${cx+s(40)}" cy="${cy-s(28)}" rx="${s(6)}" ry="${s(9)}" fill="#64B5F6" opacity="0.7"/>`,
        'zzz':            `<text x="${cx+s(42)}" y="${cy-s(18)}" font-size="${s(16)}" fill="#78909C" font-weight="bold" opacity="0.8">z</text>
                           <text x="${cx+s(50)}" y="${cy-s(28)}" font-size="${s(12)}" fill="#78909C" font-weight="bold" opacity="0.6">z</text>`,
        'corazones':      `<text x="${cx-s(44)}" y="${cy-s(30)}" font-size="${s(14)}">🩷</text>
                           <text x="${cx+s(32)}" y="${cy-s(36)}" font-size="${s(12)}">🩷</text>`,
        'interrogacion':  `<text x="${cx+s(42)}" y="${cy-s(20)}" font-size="${s(20)}" fill="#F57C00" font-weight="bold">?</text>`,
        'estrellas':      `<text x="${cx-s(44)}" y="${cy-s(32)}" font-size="${s(14)}">✨</text>
                           <text x="${cx+s(32)}" y="${cy-s(36)}" font-size="${s(12)}">⭐</text>`,
    };

    const ojosHTML   = tiposOjo[cfg.ojos]   || tiposOjo['alegre'];
    const cejasHTML  = tiposCeja[cfg.cejas]  || tiposCeja['normal'];
    const bocaHTML   = tiposBoca[cfg.boca]   || tiposBoca['sonrisa-media'];
    const extrasHTML = (cfg.extras || []).map(e => extrasMap[e] || '').join('');

    return `
    <svg viewBox="0 0 ${sz} ${sz}" xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" style="overflow:visible">
      <!-- sombra cara -->
      <ellipse cx="${cx}" cy="${cy+s(4)}" rx="${r-s(4)}" ry="${r-s(4)}" fill="rgba(0,0,0,0.10)"/>
      <!-- cara base -->
      <circle cx="${cx}" cy="${cy}" r="${r-s(4)}" fill="${fondo}" stroke="rgba(0,0,0,0.1)" stroke-width="${s(2)}"/>
      <!-- nariz -->
      <ellipse cx="${cx}" cy="${cy+s(8)}" rx="${s(6)}" ry="${s(4)}" fill="rgba(0,0,0,0.08)"/>
      <!-- extras (detrás de ojos/boca) -->
      ${extrasHTML}
      <!-- cejas -->
      ${cejasHTML}
      <!-- ojos -->
      ${ojosHTML}
      <!-- boca -->
      ${bocaHTML}
    </svg>`;
}

// ── MÓDULO PRINCIPAL ──────────────────────────────────────────────────────────
export default class EmocionesGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super();
        this.datosNivel = datosNivel;
        this.onWin      = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this._init();
    }

    _init() {
        // Elegir modo de juego alternando
        const modo = this.datosNivel.modo_emociones || 'situacion_a_cara';
        if (modo === 'cara_a_nombre') {
            this._modoCara();
        } else {
            this._modoSituacion();
        }
    }

    // ── MODO 1: VER CARA → ELEGIR NOMBRE ─────────────────────────────────────
    _modoCara() {
        const correcto = EMOCIONES[this.datosNivel.emocionCorrecta];
        if (!correcto) { this.onWin(); return; }

        this.contenedor.innerHTML = `
            <h2 class="instruccion-titulo">¿Cómo se llama esta emoción?</h2>
            <div style="text-align:center; margin:8px 0 16px; animation:pop-in 0.4s ease-out;">
                ${correcto.svg(180)}
            </div>
            <div id="opciones-emociones" class="game-grid" style="margin-top:8px; grid-template-columns:repeat(auto-fit,minmax(150px,1fr));"></div>
        `;

        this.hablar(`¿Cómo se llama esta emoción?`);
        this._renderOpcionesNombre();
    }

    _renderOpcionesNombre() {
        const grid = document.getElementById('opciones-emociones');
        this.datosNivel.opciones.forEach(op => {
            const emocion = EMOCIONES[op.id];
            if (!emocion) return;
            const card = document.createElement('div');
            card.className = 'game-card animate-pop';
            card.style.cssText = `background-color:${emocion.fondo}; padding:16px 12px;`;
            card.innerHTML = `
                <h3 style="font-size:1.6rem; margin:0; color:#2c3e50;">${emocion.nombre}</h3>
            `;
            card.onclick = () => this._verificar(op.esCorrecto, card, emocion.nombre);
            grid.appendChild(card);
        });
    }

    // ── MODO 2: VER SITUACIÓN → ELEGIR CARA ──────────────────────────────────
    _modoSituacion() {
        const correcto = EMOCIONES[this.datosNivel.emocionCorrecta];
        if (!correcto) { this.onWin(); return; }

        this.contenedor.innerHTML = `
            <div style="text-align:center; background:rgba(255,255,255,0.6); border-radius:20px; padding:16px; margin:12px 16px 4px; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
                <p style="font-size:1.5rem; font-weight:900; color:#2c3e50; margin:0 0 4px;">"${correcto.situacion}"</p>
                <p style="font-size:1.1rem; color:#666; margin:0; font-weight:700;">¿Qué cara pongo?</p>
            </div>
            <div id="opciones-emociones" style="display:flex; flex-wrap:wrap; gap:14px; justify-content:center; padding:14px 10px;"></div>
        `;

        this.hablar(correcto.audio_sit);
        this._renderOpcionesCaras();
    }

    _renderOpcionesCaras() {
        const grid = document.getElementById('opciones-emociones');
        this.datosNivel.opciones.forEach(op => {
            const emocion = EMOCIONES[op.id];
            if (!emocion) return;

            const wrap = document.createElement('div');
            wrap.style.cssText = `
                display:flex; flex-direction:column; align-items:center; gap:6px;
                cursor:pointer; transition:transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
            `;
            wrap.innerHTML = `
                <div style="filter:drop-shadow(0 6px 10px rgba(0,0,0,0.15));">
                    ${emocion.svg(120)}
                </div>
                <span style="font-size:1rem; font-weight:900; color:#2c3e50;">${emocion.nombre}</span>
            `;

            wrap.onmouseenter = () => { wrap.style.transform = 'scale(1.1)'; };
            wrap.onmouseleave = () => { wrap.style.transform = ''; };
            wrap.onclick      = () => {
                const svgEl = wrap.querySelector('svg');
                this._verificar(op.esCorrecto, svgEl || wrap, emocion.nombre);
            };
            grid.appendChild(wrap);
        });
    }

    // ── VERIFICACIÓN ──────────────────────────────────────────────────────────
    _verificar(esCorrecto, el, nombre) {
        // Bloquear todos
        document.getElementById('opciones-emociones')
            .querySelectorAll('div[style*="cursor"]').forEach(d => d.style.pointerEvents = 'none');

        if (esCorrecto) {
            this.renderFeedback(true, el);
            this.hablar(`¡Muy bien! Eso es la cara de ${nombre}. ¡Excelente!`);
            setTimeout(() => this.onWin(), 2200);
        } else {
            this.renderFeedback(false, el);
            this.hablar(`Mmm, esa no es. ¡Busca la cara correcta!`);
            setTimeout(() => {
                document.getElementById('opciones-emociones')
                    .querySelectorAll('div[style*="cursor"]').forEach(d => d.style.pointerEvents = 'auto');
            }, 1100);
        }
    }
}

// Exportar también el catálogo para que niveles.js lo use
export { EMOCIONES };