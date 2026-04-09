// js/modules/emociones.js — Pedagogía sin texto, sin color-trampa
// Los niños aprenden emociones leyendo CARAS, no palabras ni colores de fondo.
// Modos disponibles:
//   'escucha_y_encuentra' → instrucción oral "¡Encuentra la cara FELIZ!" + caras SVG
//   'situacion_a_cara'    → situación narrada + caras SVG para elegir la reacción
//   (el antiguo 'cara_a_nombre' con botones de texto fue eliminado)
import GameEngine from '../core/GameEngine.js';

// Color neutro compartido para todos los contenedores de opciones.
// No guía la respuesta; obliga al niño a leer la expresión de la cara.
const FONDO_BTN  = '#FFFDE7';
const PERSONAJES = ['humano', 'gato', 'oso', 'conejo'];

// ── PALETA DE EMOCIONES ───────────────────────────────────────────────────────
// NOTA: 'fondo' es el color de la CARA SVG (parte del dibujo), no del botón.
// Los botones siempre usan FONDO_BTN para no dar pistas de color al niño.
const EMOCIONES = {
    feliz: {
        nombre: 'feliz',
        fondo:  '#FFD93D',
        situaciones: [
            { texto: 'Me regalaron un juguete nuevo',           audio: '¡Me regalaron un juguete nuevo! ¿Qué cara pongo?' },
            { texto: 'Hoy es mi cumpleaños',                    audio: '¡Hoy es mi cumpleaños! ¿Qué cara pongo?' },
            { texto: 'Mamá me hizo mi comida favorita',         audio: '¡Mamá me hizo mi comida favorita! ¿Qué cara pongo?' },
            { texto: 'Fui al parque a jugar con mis amigos',    audio: 'Fui al parque a jugar con mis amigos. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#FFD93D', {
            ojos: 'alegre', cejas: 'normal', boca: 'sonrisa-grande', extras: ['mejillas'], personaje,
        }),
    },
    triste: {
        nombre: 'triste',
        fondo:  '#90CAF9',
        situaciones: [
            { texto: 'Se rompió mi dibujo favorito',            audio: 'Se rompió mi dibujo favorito. ¿Qué cara pongo?' },
            { texto: 'Mi amigo no quiso jugar conmigo',         audio: 'Mi amigo no quiso jugar conmigo. ¿Qué cara pongo?' },
            { texto: 'Perdí mi juguete preferido',              audio: 'Perdí mi juguete preferido. ¿Qué cara pongo?' },
            { texto: 'Llovió y no pude salir al jardín',        audio: 'Llovió y no pude salir al jardín. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#90CAF9', {
            ojos: 'triste', cejas: 'triste', boca: 'frown', extras: ['lagrimas'], personaje,
        }),
    },
    enojado: {
        nombre: 'enojado',
        fondo:  '#EF9A9A',
        situaciones: [
            { texto: 'Mi amigo me quitó mi juguete',            audio: 'Mi amigo me quitó mi juguete. ¿Qué cara pongo?' },
            { texto: 'Me pusieron a dormir la siesta',          audio: 'Me pusieron a dormir la siesta. ¿Qué cara pongo?' },
            { texto: 'No me dejaron comer más helado',          audio: 'No me dejaron comer más helado. ¿Qué cara pongo?' },
            { texto: 'Me pegaron sin querer en el juego',       audio: 'Me pegaron sin querer en el juego. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#EF9A9A', {
            ojos: 'enojado', cejas: 'enojado', boca: 'frown-apretado', extras: ['rojo-mejillas'], personaje,
        }),
    },
    asustado: {
        nombre: 'asustado',
        fondo:  '#E0E0E0',
        situaciones: [
            { texto: 'Escuché un ruido muy fuerte',             audio: 'Escuché un ruido muy fuerte. ¿Qué cara pongo?' },
            { texto: 'Vi una araña enorme en la pared',         audio: 'Vi una araña enorme en la pared. ¿Qué cara pongo?' },
            { texto: 'Se apagaron todas las luces de noche',    audio: 'Se apagaron todas las luces de noche. ¿Qué cara pongo?' },
            { texto: 'Un perro grande me ladró de cerca',       audio: 'Un perro grande me ladró de cerca. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#E0E0E0', {
            ojos: 'asustado', cejas: 'asustado', boca: 'O-grande', extras: ['sudor'], personaje,
        }),
    },
    sorprendido: {
        nombre: 'sorprendido',
        fondo:  '#A5D6A7',
        situaciones: [
            { texto: 'Vi un arcoíris enorme',                   audio: '¡Vi un arcoíris enorme! ¿Qué cara pongo?' },
            { texto: 'Encontré un regalo debajo de la cama',    audio: '¡Encontré un regalo debajo de la cama! ¿Qué cara pongo?' },
            { texto: 'Me hicieron una fiesta sorpresa',         audio: '¡Me hicieron una fiesta sorpresa! ¿Qué cara pongo?' },
            { texto: 'Un pájaro se metió por la ventana',       audio: '¡Un pájaro se metió por la ventana! ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#A5D6A7', {
            ojos: 'sorprendido', cejas: 'asustado', boca: 'O-chico', extras: [], personaje,
        }),
    },
    orgulloso: {
        nombre: 'orgulloso',
        fondo:  '#CE93D8',
        situaciones: [
            { texto: 'Aprendí a atar mis zapatos solo',         audio: '¡Aprendí a atar mis zapatos solo! ¿Qué cara pongo?' },
            { texto: 'Dibujé un cuadro muy bonito',             audio: '¡Dibujé un cuadro muy bonito! ¿Qué cara pongo?' },
            { texto: 'Ayudé a ordenar mi cuarto',               audio: '¡Ayudé a ordenar mi cuarto! ¿Qué cara pongo?' },
            { texto: 'Leí mi primer libro solo',                audio: '¡Leí mi primer libro solo! ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#CE93D8', {
            ojos: 'confiado', cejas: 'una-arriba', boca: 'sonrisa-media', extras: [], personaje,
        }),
    },
    cansado: {
        nombre: 'cansado',
        fondo:  '#B0BEC5',
        situaciones: [
            { texto: 'Jugué todo el día en el parque',          audio: 'Jugué todo el día en el parque. ¿Qué cara pongo?' },
            { texto: 'No dormí bien anoche',                    audio: 'No dormí bien anoche. ¿Qué cara pongo?' },
            { texto: 'Caminé mucho y me duelen los pies',       audio: 'Caminé mucho y me duelen los pies. ¿Qué cara pongo?' },
            { texto: 'Nadé en la piscina toda la tarde',        audio: 'Nadé en la piscina toda la tarde. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#B0BEC5', {
            ojos: 'cansado', cejas: 'normal', boca: 'bostezo', extras: ['zzz'], personaje,
        }),
    },
    amor: {
        nombre: 'con amor',
        fondo:  '#F48FB1',
        situaciones: [
            { texto: 'Mi mamá me dio un abrazo enorme',         audio: '¡Mi mamá me dio un abrazo enorme! ¿Qué cara pongo?' },
            { texto: 'Mi abuela me hizo una torta',             audio: '¡Mi abuela me hizo una torta! ¿Qué cara pongo?' },
            { texto: 'Mi perrito me lamió la cara',             audio: '¡Mi perrito me lamió la cara! ¿Qué cara pongo?' },
            { texto: 'Me dieron un beso de buenas noches',      audio: '¡Me dieron un beso de buenas noches! ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#F48FB1', {
            ojos: 'corazon', cejas: 'normal', boca: 'sonrisa-grande', extras: ['corazones'], personaje,
        }),
    },
    curioso: {
        nombre: 'curioso',
        fondo:  '#FFCC80',
        situaciones: [
            { texto: 'Encontré un bicho que nunca había visto', audio: 'Encontré un bicho que nunca había visto. ¿Qué cara pongo?' },
            { texto: 'Vi una máquina rara en la calle',         audio: 'Vi una máquina rara en la calle. ¿Qué cara pongo?' },
            { texto: 'Encontré una caja misteriosa',            audio: 'Encontré una caja misteriosa. ¿Qué cara pongo?' },
            { texto: 'Papá me preguntó si quería aprender magia', audio: 'Papá me preguntó si quería aprender magia. ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#FFCC80', {
            ojos: 'curioso', cejas: 'una-arriba', boca: 'sonrisa-media', extras: ['interrogacion'], personaje,
        }),
    },
    emocionado: {
        nombre: 'emocionado',
        fondo:  '#FFF176',
        situaciones: [
            { texto: 'Mañana vamos a la fiesta de cumpleaños',  audio: '¡Mañana vamos a la fiesta de cumpleaños! ¿Qué cara pongo?' },
            { texto: 'Me van a llevar al zoológico',            audio: '¡Me van a llevar al zoológico! ¿Qué cara pongo?' },
            { texto: 'Vi que nevó por primera vez',             audio: '¡Vi que nevó por primera vez! ¿Qué cara pongo?' },
            { texto: 'Mañana empiezan las vacaciones',          audio: '¡Mañana empiezan las vacaciones! ¿Qué cara pongo?' },
        ],
        svg: (sz, personaje = 'humano') => _cara(sz, '#FFF176', {
            ojos: 'emocionado', cejas: 'asustado', boca: 'sonrisa-enorme', extras: ['estrellas'], personaje,
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

    // cfg.ojos/boca pueden ser null en el Laboratorio (cara en blanco)
    const ojosHTML   = cfg.ojos  != null ? (tiposOjo[cfg.ojos]   || '') : '';
    const cejasHTML  = cfg.cejas != null ? (tiposCeja[cfg.cejas]  || tiposCeja['normal']) : '';
    const bocaHTML   = cfg.boca  != null ? (tiposBoca[cfg.boca]   || '') : '';
    const extrasHTML = (cfg.extras || []).map(e => extrasMap[e] || '').join('');

    // ── OREJAS (dibujadas antes de la cara para quedar detrás de ella) ────────
    let orejasHTML = '';
    switch (cfg.personaje || 'humano') {
        case 'gato':
            orejasHTML = [
                `<polygon points="${cx-s(38)},${cy-s(26)} ${cx-s(22)},${cy-s(58)} ${cx-s(6)},${cy-s(26)}"  fill="${fondo}" stroke="rgba(0,0,0,0.15)" stroke-width="${s(2)}"/>`,
                `<polygon points="${cx+s(6)},${cy-s(26)}  ${cx+s(22)},${cy-s(58)} ${cx+s(38)},${cy-s(26)}" fill="${fondo}" stroke="rgba(0,0,0,0.15)" stroke-width="${s(2)}"/>`,
                `<polygon points="${cx-s(34)},${cy-s(30)} ${cx-s(22)},${cy-s(52)} ${cx-s(10)},${cy-s(30)}" fill="rgba(255,182,193,0.65)"/>`,
                `<polygon points="${cx+s(10)},${cy-s(30)} ${cx+s(22)},${cy-s(52)} ${cx+s(34)},${cy-s(30)}" fill="rgba(255,182,193,0.65)"/>`,
            ].join('');
            break;
        case 'oso':
            orejasHTML = [
                `<circle cx="${cx-s(32)}" cy="${cy-s(36)}" r="${s(17)}" fill="${fondo}" stroke="rgba(0,0,0,0.12)" stroke-width="${s(2)}"/>`,
                `<circle cx="${cx+s(32)}" cy="${cy-s(36)}" r="${s(17)}" fill="${fondo}" stroke="rgba(0,0,0,0.12)" stroke-width="${s(2)}"/>`,
                `<circle cx="${cx-s(32)}" cy="${cy-s(36)}" r="${s(10)}" fill="rgba(0,0,0,0.12)"/>`,
                `<circle cx="${cx+s(32)}" cy="${cy-s(36)}" r="${s(10)}" fill="rgba(0,0,0,0.12)"/>`,
            ].join('');
            break;
        case 'conejo':
            orejasHTML = [
                `<ellipse cx="${cx-s(22)}" cy="${cy-s(60)}" rx="${s(10)}" ry="${s(28)}" fill="${fondo}" stroke="rgba(0,0,0,0.12)" stroke-width="${s(2)}"/>`,
                `<ellipse cx="${cx+s(22)}" cy="${cy-s(60)}" rx="${s(10)}" ry="${s(28)}" fill="${fondo}" stroke="rgba(0,0,0,0.12)" stroke-width="${s(2)}"/>`,
                `<ellipse cx="${cx-s(22)}" cy="${cy-s(62)}" rx="${s(5)}" ry="${s(20)}" fill="rgba(255,182,193,0.6)"/>`,
                `<ellipse cx="${cx+s(22)}" cy="${cy-s(62)}" rx="${s(5)}" ry="${s(20)}" fill="rgba(255,182,193,0.6)"/>`,
            ].join('');
            break;
        default: // humano — pequeños bultos laterales
            orejasHTML = [
                `<ellipse cx="${cx-s(46)}" cy="${cy-s(6)}" rx="${s(9)}" ry="${s(14)}" fill="${fondo}" stroke="rgba(0,0,0,0.10)" stroke-width="${s(2)}"/>`,
                `<ellipse cx="${cx+s(46)}" cy="${cy-s(6)}" rx="${s(9)}" ry="${s(14)}" fill="${fondo}" stroke="rgba(0,0,0,0.10)" stroke-width="${s(2)}"/>`,
            ].join('');
    }

    return `
    <svg viewBox="0 0 ${sz} ${sz}" xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" style="overflow:visible">
      <!-- sombra cara -->
      <ellipse cx="${cx}" cy="${cy+s(4)}" rx="${r-s(4)}" ry="${r-s(4)}" fill="rgba(0,0,0,0.10)"/>
      <!-- orejas -->
      ${orejasHTML}
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

// Mapa de componentes por emoción — necesario para el Laboratorio
const PIEZAS = {
    feliz:       { ojos: 'alegre',      boca: 'sonrisa-grande'  },
    triste:      { ojos: 'triste',      boca: 'frown'           },
    enojado:     { ojos: 'enojado',     boca: 'frown-apretado'  },
    asustado:    { ojos: 'asustado',    boca: 'O-grande'        },
    sorprendido: { ojos: 'sorprendido', boca: 'O-chico'         },
    orgulloso:   { ojos: 'confiado',    boca: 'sonrisa-media'   },
    cansado:     { ojos: 'cansado',     boca: 'bostezo'         },
    amor:        { ojos: 'corazon',     boca: 'sonrisa-grande'  },
    curioso:     { ojos: 'curioso',     boca: 'sonrisa-media'   },
    emocionado:  { ojos: 'emocionado',  boca: 'sonrisa-enorme'  },
};

// ── UTILIDADES ───────────────────────────────────────────────────────────────
/** Devuelve un elemento aleatorio de un array. */
function _azar(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
/** Fisher-Yates shuffle — devuelve una copia mezclada del array. */
function _mezclar(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
        const modo = this.datosNivel.modo_emociones || 'situacion_a_cara';
        if (modo === 'escucha_y_encuentra' || modo === 'cara_a_nombre') {
            this._modoEscuchaYEncuentra();
        } else if (modo === 'modo_laboratorio') {
            this._modoLaboratorio();
        } else {
            this._modoSituacion();
        }
    }

    // ── MODO 1: ESCUCHA LA EMOCIÓN → ENCUENTRA LA CARA ───────────────────────
    // Instrucción directa: "¡Encuentra la cara FELIZ!" Las opciones son solo caras SVG.
    // Sin palabras en los botones, sin colores que delaten la respuesta.
    _modoEscuchaYEncuentra() {
        const correctaId = this.datosNivel.emocionCorrecta;
        const correcta   = EMOCIONES[correctaId];
        if (!correcta) { this.onWin(); return; }

        const nombreEnMayuscula = correcta.nombre.toUpperCase();
        const instruccion = `¡Encuentra la cara ${nombreEnMayuscula}!`;

        this.contenedor.innerHTML = `
            <div style="
                text-align:center;
                background:rgba(255,255,255,0.75);
                border-radius:22px;
                padding:18px 20px 12px;
                margin:10px 16px 6px;
                box-shadow:0 4px 14px rgba(0,0,0,0.07);
            ">
                <p style="
                    font-size:clamp(1.4rem, 5vw, 2rem);
                    font-weight:900;
                    color:#2c3e50;
                    margin:0 0 4px;
                    line-height:1.2;
                ">¿Dónde está la cara <span style="color:#E65100;">${correcta.nombre}</span>?</p>
                <p style="font-size:1rem; color:#888; margin:0; font-weight:600;">
                    Toca la cara correcta 👇
                </p>
            </div>
            <div id="opciones-emociones" style="
                display:flex;
                flex-wrap:wrap;
                gap:16px;
                justify-content:center;
                padding:16px 12px;
            "></div>
        `;

        this.hablar(instruccion);
        this._renderOpcionesCaras();
    }

    // ── MODO 2: VER SITUACIÓN → ELEGIR CARA ──────────────────────────────────
    // El niño escucha la situación y elige la reacción emocional correcta.
    // Label de la emoción se muestra muy pequeño solo como referencia para padres.
    _modoSituacion() {
        const correcta = EMOCIONES[this.datosNivel.emocionCorrecta];
        if (!correcta) { this.onWin(); return; }
        // Situación aleatoria — variabilidad infinita entre rondas
        const sit = _azar(correcta.situaciones);

        this.contenedor.innerHTML = `
            <div style="
                text-align:center;
                background:rgba(255,255,255,0.75);
                border-radius:22px;
                padding:18px 20px 12px;
                margin:10px 16px 6px;
                box-shadow:0 4px 14px rgba(0,0,0,0.07);
            ">
                <p style="
                    font-size:clamp(1.3rem, 4.5vw, 1.8rem);
                    font-weight:900;
                    color:#2c3e50;
                    margin:0 0 6px;
                    line-height:1.3;
                ">${sit.texto}"</p>
                <p style="font-size:1rem; color:#888; margin:0; font-weight:600;">
                    ¿Qué cara pondría? 👇
                </p>
            </div>
            <div id="opciones-emociones" style="
                display:flex;
                flex-wrap:wrap;
                gap:16px;
                justify-content:center;
                padding:16px 12px;
            "></div>
        `;

        this.hablar(sit.audio);
        this._renderOpcionesCaras();
    }

    // ── RENDERIZADO DE OPCIONES (caras SVG, fondo neutro, sin pistas de color) ─
    _renderOpcionesCaras() {
        const grid = document.getElementById('opciones-emociones');
        this.datosNivel.opciones.forEach(op => {
            const emocion = EMOCIONES[op.id];
            if (!emocion) return;

            const btn = document.createElement('button');
            btn.type      = 'button';
            btn.className = 'emo-opcion';
            btn.setAttribute('aria-label', emocion.nombre);
            btn.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                background: ${FONDO_BTN};
                border: 3px solid rgba(0,0,0,0.08);
                border-radius: 22px;
                padding: 14px 18px 10px;
                cursor: pointer;
                transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
                            box-shadow 0.18s ease,
                            border-color 0.18s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                min-width: 110px;
                max-width: 150px;
                flex: 1 1 110px;
            `;

            // Cara SVG — usa su propio color (es arte, no pista de interfaz)
            const svgWrap = document.createElement('div');
            svgWrap.style.cssText = 'filter:drop-shadow(0 4px 8px rgba(0,0,0,0.14)); pointer-events:none;';
            svgWrap.innerHTML = emocion.svg(110, _azar(PERSONAJES));

            // Nombre en letra muy pequeña — solo referencia para padres, invisible como pista
            const label = document.createElement('span');
            label.textContent = emocion.nombre;
            label.style.cssText = `
                font-size: 0.65rem;
                font-weight: 500;
                color: #bbb;
                letter-spacing: 0.02em;
                pointer-events: none;
                user-select: none;
            `;

            btn.appendChild(svgWrap);
            btn.appendChild(label);

            btn.onmouseenter = () => {
                btn.style.transform    = 'scale(1.1) translateY(-3px)';
                btn.style.boxShadow    = '0 10px 24px rgba(0,0,0,0.15)';
                btn.style.borderColor  = 'rgba(0,0,0,0.2)';
            };
            btn.onmouseleave = () => {
                btn.style.transform    = '';
                btn.style.boxShadow    = '0 4px 12px rgba(0,0,0,0.08)';
                btn.style.borderColor  = 'rgba(0,0,0,0.08)';
            };
            btn.onclick = () => this._verificar(op.esCorrecto, btn, emocion.nombre);

            grid.appendChild(btn);
        });
    }

    // ── MODO 3: LABORATORIO — ARMA LA CARA ───────────────────────────────────
    // El niño toca piezas del inventario para equiparlas en la cara en blanco.
    _modoLaboratorio() {
        const correctaId = this.datosNivel.emocionCorrecta;
        const correcta   = EMOCIONES[correctaId];
        if (!correcta) { this.onWin(); return; }

        this._labPersonaje = _azar(PERSONAJES);
        this._labTarget    = PIEZAS[correctaId];
        this._labFondo     = correcta.fondo;
        this.ojosActuales  = null;
        this.bocaActual    = null;
        this._labBloqueado = false;

        this.contenedor.innerHTML = `
            <div style="text-align:center; padding:10px 16px 2px;">
                <p style="
                    font-size:clamp(1.2rem,5vw,1.8rem);
                    font-weight:900;
                    color:#2c3e50;
                    margin:0;
                    line-height:1.3;
                ">¡Armemos una cara <span style="color:#E65100;">${correcta.nombre}</span>!</p>
                <p style="font-size:0.9rem; color:#888; margin:4px 0 0; font-weight:600;">
                    Toca los ojos y la boca 👇
                </p>
            </div>
            <div id="lab-cara" style="
                display:flex;
                justify-content:center;
                align-items:center;
                margin:6px 0 4px;
            "></div>
            <div id="lab-inventario" style="padding:4px 12px 14px;"></div>
        `;

        this._actualizarCaraLaboratorio();
        this._renderInventario(correctaId);
        this.hablar(`¡Armemos una cara ${correcta.nombre}! Elige los ojos y la boca.`);
    }

    /** Re-renderiza la cara grande con el estado actual de piezas. */
    _actualizarCaraLaboratorio() {
        const el = document.getElementById('lab-cara');
        if (!el) return;
        el.innerHTML = `
            <div id="lab-cara-inner" style="
                filter:drop-shadow(0 8px 22px rgba(0,0,0,0.18));
                transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                           filter 0.35s ease;
            ">
                ${_cara(180, this._labFondo, {
                    ojos:      this.ojosActuales,
                    cejas:     this.ojosActuales ? 'normal' : null,
                    boca:      this.bocaActual,
                    extras:    [],
                    personaje: this._labPersonaje,
                })}
            </div>
        `;
    }

    /** Construye las dos filas del inventario (ojos y bocas). */
    _renderInventario(correctaId) {
        const el = document.getElementById('lab-inventario');
        if (!el) return;

        const meta  = PIEZAS[correctaId];
        const fondo = EMOCIONES[correctaId].fondo;

        // 4 distractores distintos al objetivo
        const otrosIds = _mezclar(Object.keys(PIEZAS).filter(id => id !== correctaId));
        const [dA, dB, dC, dD] = otrosIds;

        const opcionesOjos  = _mezclar([
            { key: meta.ojos,         correcto: true  },
            { key: PIEZAS[dA].ojos,   correcto: false },
            { key: PIEZAS[dB].ojos,   correcto: false },
        ]);
        const opcionesBocas = _mezclar([
            { key: meta.boca,         correcto: true  },
            { key: PIEZAS[dC].boca,   correcto: false },
            { key: PIEZAS[dD].boca,   correcto: false },
        ]);

        el.innerHTML = '';
        el.appendChild(this._seccionInventario('👀 Ojos',  opcionesOjos,  'ojos', fondo));
        el.appendChild(this._seccionInventario('👄 Boca',  opcionesBocas, 'boca', fondo));
    }

    /** Crea una fila de piezas (ojos o boca) con su título. */
    _seccionInventario(titulo, opciones, tipo, fondo) {
        const sec = document.createElement('div');
        sec.style.cssText = 'margin-bottom:10px;';
        sec.innerHTML = `<p style="
            font-size:0.95rem; font-weight:800; color:#5D4037; margin:0 0 6px 2px;
        ">${titulo}</p>`;

        const row = document.createElement('div');
        row.style.cssText = 'display:flex; gap:12px; justify-content:center; flex-wrap:wrap;';

        opciones.forEach(op => {
            const btn = document.createElement('button');
            btn.type           = 'button';
            btn.dataset.key    = op.key;
            btn.dataset.tipo   = tipo;
            btn.dataset.ok     = op.correcto;
            btn.style.cssText  = `
                background: ${FONDO_BTN};
                border: 3px solid rgba(0,0,0,0.08);
                border-radius: 18px;
                padding: 8px;
                cursor: pointer;
                transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
                            box-shadow 0.18s ease,
                            border-color 0.2s ease,
                            background 0.2s ease;
                box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            `;
            // Mini-cara que muestra solo esa pieza
            btn.innerHTML = `<div style="pointer-events:none;">${
                _cara(76, fondo, {
                    ojos:      tipo === 'ojos' ? op.key : null,
                    cejas:     tipo === 'ojos' ? 'normal' : null,
                    boca:      tipo === 'boca' ? op.key : null,
                    extras:    [],
                    personaje: this._labPersonaje,
                })
            }</div>`;

            btn.onmouseenter = () => {
                btn.style.transform  = 'scale(1.12) translateY(-2px)';
                btn.style.boxShadow  = '0 8px 20px rgba(0,0,0,0.14)';
            };
            btn.onmouseleave = () => {
                btn.style.transform  = '';
                btn.style.boxShadow  = '0 3px 10px rgba(0,0,0,0.08)';
            };
            btn.onclick = () => this._equiparPieza(tipo, op.key, op.correcto, btn);

            row.appendChild(btn);
        });

        sec.appendChild(row);
        return sec;
    }

    /**
     * Equipa una pieza en la cara grande.
     * - Correcto → borde verde
     * - Incorrecto → sonido boing, borde naranja, sigue intentando (sin penalización)
     */
    _equiparPieza(tipo, key, correcto, btnEl) {
        if (this._labBloqueado) return;

        if (tipo === 'ojos') this.ojosActuales = key;
        else                 this.bocaActual   = key;

        // Resaltar selección dentro de la fila
        const fila = btnEl.closest('div[style*="display:flex"]');
        fila?.querySelectorAll('button').forEach(b => {
            b.style.borderColor = 'rgba(0,0,0,0.08)';
            b.style.background  = FONDO_BTN;
        });
        btnEl.style.borderColor = correcto ? '#4CAF50' : '#FF7043';
        btnEl.style.background  = correcto ? '#F1F8E9'  : '#FFF3E0';

        this._actualizarCaraLaboratorio();

        if (!correcto) this._boing();

        this._verificarLaboratorio();
    }

    /** Comprueba si ambas piezas coinciden con la emoción objetivo. */
    _verificarLaboratorio() {
        if (!this.ojosActuales || !this.bocaActual) return;
        if (this._labBloqueado) return;

        const { ojos, boca } = this._labTarget;
        if (this.ojosActuales !== ojos || this.bocaActual !== boca) return;

        // ¡Éxito!
        this._labBloqueado = true;
        const nombre = EMOCIONES[this.datosNivel.emocionCorrecta].nombre;

        const inner = document.getElementById('lab-cara-inner');
        if (inner) {
            inner.style.transform = 'scale(1.18)';
            inner.style.filter    = 'drop-shadow(0 12px 32px rgba(255,200,0,0.55))';
        }

        this.renderFeedback(true, inner || document.getElementById('lab-cara'));
        this.hablar(`¡Lo lograste! ¡Es una cara ${nombre}!`);
        setTimeout(() => this.onWin(), 2500);
    }

    /** Efecto de sonido gracioso para piezas incorrectas (TTS como proxy). */
    _boing() {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u    = new SpeechSynthesisUtterance('boing');
        u.pitch    = 2;
        u.rate     = 1.9;
        u.volume   = 0.35;
        window.speechSynthesis.speak(u);
    }

    // ── VERIFICACIÓN (modos 1 y 2) ────────────────────────────────────────────
    _verificar(esCorrecto, el, nombre) {
        // Bloquear todos los botones para evitar doble toque
        document.getElementById('opciones-emociones')
            .querySelectorAll('button').forEach(b => { b.style.pointerEvents = 'none'; });

        if (esCorrecto) {
            this.renderFeedback(true, el);
            this.hablar(`¡Muy bien! Eso es la cara de ${nombre}. ¡Excelente!`);
            setTimeout(() => this.onWin(), 2200);
        } else {
            this.renderFeedback(false, el);
            this.hablar(`Mmm, esa no es. ¡Busca la cara correcta!`);
            setTimeout(() => {
                document.getElementById('opciones-emociones')
                    ?.querySelectorAll('button')
                    .forEach(b => { b.style.pointerEvents = 'auto'; });
            }, 1100);
        }
    }
}

// Exportar también el catálogo para que niveles.js lo use
export { EMOCIONES };