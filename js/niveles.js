// js/niveles.js — Diccionario Maestro + Generador Pedagógico v4

// ─── GENERADOR DE FORMAS SVG ──────────────────────────────────────────────────
function _svgForma(forma, hex) {
    const s = `rgba(0,0,0,0.12)`;
    let shape = '';
    switch (forma) {
        case 'circulo':    shape = `<circle cx="50" cy="50" r="44" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'cuadrado':   shape = `<rect x="5" y="5" width="90" height="90" rx="7" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'triangulo':  shape = `<polygon points="50,5 95,91 5,91" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'rectangulo': shape = `<rect x="4" y="22" width="92" height="56" rx="7" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'rombo':      shape = `<polygon points="50,4 96,50 50,96 4,50" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'estrella':   shape = `<polygon points="50,5 61,35 93,35 68,56 78,90 50,69 22,90 32,56 7,35 39,35" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'corazon':    shape = `<path d="M50,82 C10,62 5,32 50,14 C95,32 90,62 50,82Z" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'ovalo':      shape = `<ellipse cx="50" cy="50" rx="44" ry="28" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'hexagono':   shape = `<polygon points="50,6 91,28 91,72 50,94 9,72 9,28" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'luna':       shape = `<path d="M65,10 A38,38,0,1,0,65,90 A26,26,0,1,1,65,10Z" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${shape}</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Paleta de colores CON nombres y HEX, ordenados por percepción
const COLORES = [
    { id:'rojo',     hex:'#E53935', bg:'#FFEBEE', nombre:'rojo',     hue:0   },
    { id:'naranja',  hex:'#FB8C00', bg:'#FFF3E0', nombre:'naranja',  hue:30  },
    { id:'amarillo', hex:'#F9A825', bg:'#FFF9C4', nombre:'amarillo', hue:50  },
    { id:'verde',    hex:'#43A047', bg:'#E8F5E9', nombre:'verde',    hue:120 },
    { id:'celeste',  hex:'#039BE5', bg:'#E1F5FE', nombre:'celeste',  hue:200 },
    { id:'azul',     hex:'#1E88E5', bg:'#E3F2FD', nombre:'azul',     hue:220 },
    { id:'morado',   hex:'#8E24AA', bg:'#F3E5F5', nombre:'morado',   hue:280 },
    { id:'rosa',     hex:'#D81B60', bg:'#FCE4EC', nombre:'rosado',   hue:330 },
    { id:'marron',   hex:'#6D4C41', bg:'#EFEBE9', nombre:'marrón',   hue:15  },
    { id:'negro',    hex:'#37474F', bg:'#ECEFF1', nombre:'negro',    hue:200 },
];

const FORMAS = [
    { id:'circulo',    nombre:'círculo',    articulo:'el' },
    { id:'cuadrado',   nombre:'cuadrado',   articulo:'el' },
    { id:'triangulo',  nombre:'triángulo',  articulo:'el' },
    { id:'rectangulo', nombre:'rectángulo', articulo:'el' },
    { id:'rombo',      nombre:'rombo',      articulo:'el' },
    { id:'estrella',   nombre:'estrella',   articulo:'la' },
    { id:'corazon',    nombre:'corazón',    articulo:'el' },
    { id:'ovalo',      nombre:'óvalo',      articulo:'el' },
    { id:'hexagono',   nombre:'hexágono',   articulo:'el' },
    { id:'luna',       nombre:'luna',       articulo:'la' },
];

function _crearFormas() {
    const items = [];
    FORMAS.forEach(f => {
        COLORES.forEach(c => {
            items.push({
                id: `${f.id}_${c.id}`,
                formaId:  f.id,
                colorId:  c.id,
                colorHue: c.hue,
                img:      _svgForma(f.id, c.hex),
                color:    c.bg,
                nombre:   `${f.nombre} ${c.nombre}`,
                articulo: f.articulo,
            });
        });
    });
    return items;
}

// ─── DICCIONARIOS ──────────────────────────────────────────────────────────────
const diccionarios = {
    animales: [
        { id:'dog',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dog/3D/dog_3d.png',           color:'#FFECB3', nombre:'perrito',          articulo:'el', destino:'casita' },
        { id:'cat',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png',           color:'#FFECB3', nombre:'gatito',           articulo:'el', destino:'casita' },
        { id:'dolphin', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dolphin/3D/dolphin_3d.png',   color:'#E0F7FA', nombre:'delfín',           articulo:'el', destino:'mar' },
        { id:'shark',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shark/3D/shark_3d.png',       color:'#E0F7FA', nombre:'tiburón',          articulo:'el', destino:'mar' },
        { id:'monkey',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Monkey/3D/monkey_3d.png',     color:'#D7CCC8', nombre:'mono',             articulo:'el', destino:'casita' },
        { id:'pig',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Pig/3D/pig_3d.png',           color:'#FCE4EC', nombre:'cerdito',          articulo:'el', destino:'casita' },
        { id:'frog',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Frog/3D/frog_3d.png',         color:'#E8F5E9', nombre:'ranita',           articulo:'la', destino:'casita' },
        { id:'penguin', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Penguin/3D/penguin_3d.png',   color:'#E0F2F1', nombre:'pingüino',         articulo:'el', destino:'mar' },
        { id:'whale',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Whale/3D/whale_3d.png',       color:'#E3F2FD', nombre:'ballena',          articulo:'la', destino:'mar' },
        { id:'elephant',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Elephant/3D/elephant_3d.png', color:'#ECEFF1', nombre:'elefante',         articulo:'el', destino:'casita' },
        { id:'giraffe', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Giraffe/3D/giraffe_3d.png',   color:'#FFF9C4', nombre:'jirafa',           articulo:'la', destino:'casita' },
        { id:'lion',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Lion/3D/lion_3d.png',         color:'#FFF3E0', nombre:'león',             articulo:'el', destino:'casita' },
        { id:'rabbit',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rabbit/3D/rabbit_3d.png',     color:'#FCE4EC', nombre:'conejito',         articulo:'el', destino:'casita' },
        { id:'bear',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bear/3D/bear_3d.png',         color:'#D7CCC8', nombre:'osito',            articulo:'el', destino:'casita' },
        { id:'turtle',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Turtle/3D/turtle_3d.png',     color:'#E8F5E9', nombre:'tortuga',          articulo:'la', destino:'casita' },
        { id:'horse',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Horse/3D/horse_3d.png',       color:'#FFF3E0', nombre:'caballo',          articulo:'el', destino:'casita' },
        { id:'panda',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/3D/panda_3d.png',       color:'#ECEFF1', nombre:'panda',            articulo:'el', destino:'casita' },
        { id:'fox',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fox/3D/fox_3d.png',           color:'#FFF3E0', nombre:'zorrito',          articulo:'el', destino:'casita' },
    ],

    cuerpo: [
        { id:'ojo',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Eye/3D/eye_3d.png',                                           color:'#E3F2FD', nombre:'ojo',    articulo:'el', descripcion:'para ver los colores', destino:'silueta' },
        { id:'oreja',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ear/Default/3D/ear_3d_default.png',                           color:'#E3F2FD', nombre:'oreja',  articulo:'la', descripcion:'para escuchar música', destino:'silueta' },
        { id:'nariz',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Nose/Default/3D/nose_3d_default.png',                         color:'#E3F2FD', nombre:'nariz',  articulo:'la', descripcion:'para oler las flores', destino:'silueta' },
        { id:'mano',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Waving%20hand/Default/3D/waving_hand_3d_default.png',         color:'#E3F2FD', nombre:'mano',   articulo:'la', descripcion:'para aplaudir',        destino:'silueta' },
        { id:'pie',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Foot/Default/3D/foot_3d_default.png',                         color:'#E3F2FD', nombre:'pie',    articulo:'el', descripcion:'para correr y saltar', destino:'silueta' },
        { id:'boca',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mouth/3D/mouth_3d.png',                                       color:'#E3F2FD', nombre:'boca',   articulo:'la', descripcion:'para hablar y cantar', destino:'silueta' },
        { id:'lengua', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tongue/3D/tongue_3d.png',                                     color:'#E3F2FD', nombre:'lengua', articulo:'la', descripcion:'para sentir sabores',  destino:'silueta' },
        { id:'diente', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tooth/3D/tooth_3d.png',                                       color:'#E3F2FD', nombre:'diente', articulo:'el', descripcion:'para masticar',        destino:'silueta' },
        { id:'cabeza', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Child/Default/3D/child_3d_default.png',                       color:'#E3F2FD', nombre:'cabeza', articulo:'la', descripcion:'para pensar',          destino:'silueta' },
    ],

    // Emociones: el diccionario ahora vive en emociones.js (EMOCIONES)
    // Aquí solo guardamos los IDs para que niveles.js los use
    _emocionIds: ['feliz','triste','enojado','asustado','sorprendido','orgulloso','cansado','amor','curioso','emocionado'],

    colores_formas: _crearFormas(),

    vehiculos: [
        { id:'auto',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Automobile/3D/automobile_3d.png',        color:'#FFCDD2', nombre:'auto',            articulo:'el', destino:'calle' },
        { id:'bomberos',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire%20engine/3D/fire_engine_3d.png',    color:'#FFCDD2', nombre:'camión bomberos', articulo:'el', destino:'calle' },
        { id:'policia', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Police%20car/3D/police_car_3d.png',      color:'#BBDEFB', nombre:'auto de policía', articulo:'el', destino:'calle' },
        { id:'avion',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Airplane/3D/airplane_3d.png',            color:'#E1F5FE', nombre:'avión',           articulo:'el', destino:'cielo' },
        { id:'cohete',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png',               color:'#D1C4E9', nombre:'cohete',          articulo:'el', destino:'cielo' },
        { id:'barco',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ship/3D/ship_3d.png',                   color:'#B3E5FC', nombre:'barco',           articulo:'el', destino:'mar' },
        { id:'tren',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Locomotive/3D/locomotive_3d.png',        color:'#C8E6C9', nombre:'tren',            articulo:'el', destino:'calle' },
        { id:'tractor', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tractor/3D/tractor_3d.png',             color:'#DCEDC8', nombre:'tractor',         articulo:'el', destino:'calle' },
        { id:'helicop', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Helicopter/3D/helicopter_3d.png',        color:'#E1F5FE', nombre:'helicóptero',     articulo:'el', destino:'cielo' },
        { id:'bici',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bicycle/3D/bicycle_3d.png',              color:'#C8E6C9', nombre:'bicicleta',       articulo:'la', destino:'calle' },
    ],

    abecedario: [
        { id:'A', letra:'A', palabra:'Avión',      emoji:'✈️', color:'#FFEBEE' },
        { id:'B', letra:'B', palabra:'Barco',      emoji:'🚢', color:'#E3F2FD' },
        { id:'C', letra:'C', palabra:'Casa',       emoji:'🏠', color:'#E8F5E9' },
        { id:'D', letra:'D', palabra:'Dinosaurio', emoji:'🦕', color:'#FFF3E0' },
        { id:'E', letra:'E', palabra:'Estrella',   emoji:'⭐', color:'#FFF9C4' },
        { id:'F', letra:'F', palabra:'Flor',       emoji:'🌸', color:'#FCE4EC' },
        { id:'G', letra:'G', palabra:'Gato',       emoji:'🐱', color:'#F3E5F5' },
        { id:'H', letra:'H', palabra:'Helado',     emoji:'🍦', color:'#E8EAF6' },
        { id:'I', letra:'I', palabra:'Iglesia',    emoji:'⛪', color:'#E3F2FD' },
        { id:'J', letra:'J', palabra:'Jirafa',     emoji:'🦒', color:'#FFF9C4' },
        { id:'K', letra:'K', palabra:'Kiwi',       emoji:'🥝', color:'#E8F5E9' },
        { id:'L', letra:'L', palabra:'Luna',       emoji:'🌙', color:'#E8EAF6' },
        { id:'M', letra:'M', palabra:'Mono',       emoji:'🐒', color:'#FFF3E0' },
        { id:'N', letra:'N', palabra:'Nube',       emoji:'☁️', color:'#E3F2FD' },
        { id:'Ñ', letra:'Ñ', palabra:'Ñandú',     emoji:'🦚', color:'#E8F5E9' },
        { id:'O', letra:'O', palabra:'Oso',        emoji:'🐻', color:'#EFEBE9' },
        { id:'P', letra:'P', palabra:'Perro',      emoji:'🐶', color:'#FFECB3' },
        { id:'Q', letra:'Q', palabra:'Queso',      emoji:'🧀', color:'#FFF9C4' },
        { id:'R', letra:'R', palabra:'Rana',       emoji:'🐸', color:'#E8F5E9' },
        { id:'S', letra:'S', palabra:'Sol',        emoji:'☀️', color:'#FFF9C4' },
        { id:'T', letra:'T', palabra:'Tren',       emoji:'🚂', color:'#FCEEDE' },
        { id:'U', letra:'U', palabra:'Uvas',       emoji:'🍇', color:'#F3E5F5' },
        { id:'V', letra:'V', palabra:'Vaca',       emoji:'🐮', color:'#E8F5E9' },
        { id:'W', letra:'W', palabra:'Waffle',     emoji:'🧇', color:'#FFF3E0' },
        { id:'X', letra:'X', palabra:'Xilófono',  emoji:'🎵', color:'#FCE4EC' },
        { id:'Y', letra:'Y', palabra:'Yoyo',       emoji:'🪀', color:'#E8EAF6' },
        { id:'Z', letra:'Z', palabra:'Zorro',      emoji:'🦊', color:'#FFF3E0' },
    ],

    higiene: [
        { id:'bano',    situacion:'¿Qué usamos para bañarnos?',              emoji:'🛁', totalCorrectos:3,
          items:[{emoji:'🧼',nombre:'jabón',correcto:true},{emoji:'🛁',nombre:'bañera',correcto:true},{emoji:'🪥',nombre:'esponja',correcto:true},{emoji:'⚽',nombre:'pelota',correcto:false},{emoji:'🚗',nombre:'autito',correcto:false}]},
        { id:'dientes', situacion:'¿Qué usamos para lavarnos los dientes?',  emoji:'🦷', totalCorrectos:3,
          items:[{emoji:'🪥',nombre:'cepillo dental',correcto:true},{emoji:'🧴',nombre:'pasta dental',correcto:true},{emoji:'💧',nombre:'agua',correcto:true},{emoji:'🍕',nombre:'pizza',correcto:false},{emoji:'✏️',nombre:'lápiz',correcto:false}]},
        { id:'manos',   situacion:'¿Qué usamos para lavarnos las manos?',    emoji:'🤲', totalCorrectos:3,
          items:[{emoji:'🧼',nombre:'jabón',correcto:true},{emoji:'💧',nombre:'agua',correcto:true},{emoji:'🧻',nombre:'toalla',correcto:true},{emoji:'🎨',nombre:'pintura',correcto:false},{emoji:'🪆',nombre:'muñequita',correcto:false}]},
        { id:'pelo',    situacion:'¿Qué usamos para lavarnos el pelo?',      emoji:'💇', totalCorrectos:3,
          items:[{emoji:'🧴',nombre:'champú',correcto:true},{emoji:'💧',nombre:'agua',correcto:true},{emoji:'🪮',nombre:'peine',correcto:true},{emoji:'🏈',nombre:'pelota de rugby',correcto:false},{emoji:'🎮',nombre:'videojuego',correcto:false}]},
    ],

    // Frutas y Verduras — 4 tipos de pregunta
    frutas: [
        // Categorización: ¿cuál es la fruta?
        { id:'cat_frutas', tipo:'categorizar', pregunta:'¿Cuál es una FRUTA?', audio:'¿Cuál de estos es una fruta?',
          correctos:[
            {emoji:'🍎',nombre:'manzana',color:'#FFEBEE',categoria:'fruta',respuesta:'una fruta'},
            {emoji:'🍌',nombre:'plátano',color:'#FFF9C4',categoria:'fruta',respuesta:'una fruta'},
            {emoji:'🍓',nombre:'frutilla',color:'#FFEBEE',categoria:'fruta',respuesta:'una fruta'},
          ],
          incorrectos:[
            {emoji:'🥕',nombre:'zanahoria',color:'#FFF3E0',categoria:'verdura'},
            {emoji:'🥦',nombre:'brócoli',color:'#E8F5E9',categoria:'verdura'},
            {emoji:'🧅',nombre:'cebolla',color:'#FFF9C4',categoria:'verdura'},
          ]
        },
        { id:'cat_verduras', tipo:'categorizar', pregunta:'¿Cuál es una VERDURA?', audio:'¿Cuál de estos es una verdura?',
          correctos:[
            {emoji:'🥕',nombre:'zanahoria',color:'#FFF3E0',categoria:'verdura',respuesta:'una verdura'},
            {emoji:'🥦',nombre:'brócoli',color:'#E8F5E9',categoria:'verdura',respuesta:'una verdura'},
            {emoji:'🍅',nombre:'tomate',color:'#FFEBEE',categoria:'verdura',respuesta:'una verdura'},
          ],
          incorrectos:[
            {emoji:'🍎',nombre:'manzana',color:'#FFEBEE',categoria:'fruta'},
            {emoji:'🍌',nombre:'plátano',color:'#FFF9C4',categoria:'fruta'},
            {emoji:'🍊',nombre:'naranja',color:'#FFF3E0',categoria:'fruta'},
          ]
        },
        // Identificación: ¿cuál es el X?
        { id:'id_manzana', tipo:'identificar', pregunta:'¿Cuál es la manzana?', audio:'¿Cuál es la manzana?', respuesta:'una manzana',
          opciones:[
            {emoji:'🍎',nombre:'manzana',esCorrecto:true, color:'#FFEBEE'},
            {emoji:'🍊',nombre:'naranja', esCorrecto:false,color:'#FFF3E0'},
            {emoji:'🍋',nombre:'limón',   esCorrecto:false,color:'#FFF9C4'},
          ]
        },
        { id:'id_zanahoria', tipo:'identificar', pregunta:'¿Cuál es la zanahoria?', audio:'¿Cuál es la zanahoria?', respuesta:'una zanahoria',
          opciones:[
            {emoji:'🥕',nombre:'zanahoria',esCorrecto:true, color:'#FFF3E0'},
            {emoji:'🥦',nombre:'brócoli',  esCorrecto:false,color:'#E8F5E9'},
            {emoji:'🍆',nombre:'berenjena',esCorrecto:false,color:'#F3E5F5'},
          ]
        },
        { id:'id_platano', tipo:'identificar', pregunta:'¿Cuál es el plátano?', audio:'¿Cuál es el plátano?', respuesta:'un plátano',
          opciones:[
            {emoji:'🍌',nombre:'plátano',esCorrecto:true, color:'#FFF9C4'},
            {emoji:'🍇',nombre:'uvas',   esCorrecto:false,color:'#F3E5F5'},
            {emoji:'🍓',nombre:'frutilla',esCorrecto:false,color:'#FFEBEE'},
          ]
        },
        { id:'id_frutilla', tipo:'identificar', pregunta:'¿Cuál es la frutilla?', audio:'¿Cuál es la frutilla?', respuesta:'una frutilla',
          opciones:[
            {emoji:'🍓',nombre:'frutilla',esCorrecto:true, color:'#FFEBEE'},
            {emoji:'🍒',nombre:'cereza',  esCorrecto:false,color:'#FFEBEE'},
            {emoji:'🍑',nombre:'durazno', esCorrecto:false,color:'#FFF3E0'},
          ]
        },
    ],

    // Opuestos — el diccionario vive en opuestos.js, aquí solo IDs de referencia
    _opuestosIds: ['grande_pequeno','arriba_abajo','rapido_lento','caliente_frio','dia_noche','mucho_poco','abierto_cerrado','mojado_seco'],
};

// ─── CONFIGURACIÓN POR EDAD ────────────────────────────────────────────────────
const _cfgEdad = {
    bebes:    { distractores: 1, mathMax: 3,  motores: ['seleccion'] },
    pequenos: { distractores: 2, mathMax: 5,  motores: ['seleccion','arrastre','memoria'] },
    grandes:  { distractores: 3, mathMax: 10, motores: ['seleccion','arrastre','memoria'] },
};

// ─── LÓGICA ANTI-CONFUSIÓN para colores y formas ──────────────────────────────
// REGLA: los distractores deben diferir en AMBAS dimensiones (forma Y color)
// Nunca mostrar "círculo rojo" vs "círculo azul" (misma forma) ni
// "círculo rojo" vs "cuadrado rojo" (mismo color)
function _distractor_colores_formas(correcto, pool, cantidad) {
    const distráctores = pool.filter(item => {
        if (item.id === correcto.id) return false;
        // Debe diferir en forma
        const difsForma = item.formaId !== correcto.formaId;
        // Debe diferir en color (y no ser demasiado similar por HUE)
        const difColor  = item.colorId !== correcto.colorId;
        const hueDist   = Math.abs((item.colorHue || 0) - (correcto.colorHue || 0));
        const noMuySimilar = hueDist > 40 || hueDist === 0; // 0 = el mismo, >40 = diferente
        return difsForma && difColor && noMuySimilar;
    });
    return distráctores.sort(() => 0.5 - Math.random()).slice(0, cantidad);
}

// ─── GENERADOR PRINCIPAL ───────────────────────────────────────────────────────
export function generarNiveles(categoria, cantidadTotal, edad = 'pequenos') {
    const cfg = _cfgEdad[edad] || _cfgEdad.pequenos;
    const nivelesGenerados = [];

    // ── MATEMÁTICAS ──────────────────────────────────────────────────────────
    if (categoria === 'math') {
        const itemsContar = [
            {emoji:'🍎',plural:'manzanas',singular:'manzana'},
            {emoji:'🐶',plural:'perritos',singular:'perrito'},
            {emoji:'🚗',plural:'autos',singular:'auto'},
            {emoji:'🎈',plural:'globos',singular:'globo'},
            {emoji:'⭐',plural:'estrellas',singular:'estrella'},
            {emoji:'🌸',plural:'flores',singular:'flor'},
            {emoji:'🍪',plural:'galletas',singular:'galleta'},
            {emoji:'🐱',plural:'gatitos',singular:'gatito'},
        ];
        for (let i = 0; i < cantidadTotal; i++) {
            const item    = itemsContar[i % itemsContar.length];
            const maxNum  = cfg.mathMax;
            const correcto = Math.floor(Math.random() * maxNum) + 1;
            const rango   = Array.from({length:maxNum},(_,k)=>k+1);
            const distractores = rango.filter(n=>n!==correcto)
                .sort(()=>0.5-Math.random()).slice(0, cfg.distractores);
            const opciones = [
                {cantidad:correcto,          esCorrecto:true,  item},
                ...distractores.map(n=>({cantidad:n, esCorrecto:false, item})),
            ].sort(()=>0.5-Math.random());
            const nombre = correcto===1 ? item.singular : item.plural;
            nivelesGenerados.push({
                nivel:i+1, tipo_motor:'conteo',
                instruccion_texto:`¡Toca donde hay ${correcto} ${nombre}!`,
                opciones,
            });
        }
        return nivelesGenerados;
    }

    // ── EMOCIONES (dos modos alternados pedagógicamente) ─────────────────────
    if (categoria === 'emociones') {
        const ids     = diccionarios._emocionIds;
        const todosOp = ids.map(id => ({id, esCorrecto:false}));
        for (let i = 0; i < cantidadTotal; i++) {
            const correctoId = ids[i % ids.length];
            // Alternamos modos: pares→cara_a_nombre, impares→situacion_a_cara
            const modo = (i % 2 === 0) ? 'situacion_a_cara' : 'cara_a_nombre';
            const distractores = todosOp
                .filter(d => d.id !== correctoId)
                .sort(()=>0.5-Math.random()).slice(0, cfg.distractores);
            const opciones = [
                {id:correctoId, esCorrecto:true},
                ...distractores,
            ].sort(()=>0.5-Math.random());
            nivelesGenerados.push({
                nivel:i+1, tipo_motor:'emociones',
                modo_emociones: modo,
                instruccion_texto:'¿Cómo me siento?',
                emocionCorrecta: correctoId,
                opciones,
            });
        }
        return nivelesGenerados;
    }

    // ── HIGIENE ───────────────────────────────────────────────────────────────
    if (categoria === 'higiene') {
        const pool = diccionarios.higiene;
        for (let i = 0; i < cantidadTotal; i++) {
            const esc = pool[i % pool.length];
            nivelesGenerados.push({
                nivel:i+1, tipo_motor:'higiene',
                situacion:       esc.situacion,
                instruccion_texto: esc.situacion,
                emoji_situacion:  esc.emoji,
                items: [...esc.items].sort(()=>0.5-Math.random()),
                totalCorrectos:  esc.totalCorrectos,
            });
        }
        return nivelesGenerados;
    }

    // ── ABECEDARIO ────────────────────────────────────────────────────────────
    if (categoria === 'abecedario') {
        const pool = diccionarios.abecedario;
        const todasLetras = pool.map(l=>l.id);
        for (let i = 0; i < cantidadTotal; i++) {
            const correcto = pool[i % pool.length];
            const distractores = todasLetras
                .filter(l=>l!==correcto.id)
                .sort(()=>0.5-Math.random()).slice(0, cfg.distractores+1);
            const opciones = [
                {id:correcto.id, nombre:correcto.id, esCorrecto:true,  color:correcto.color},
                ...distractores.map(d=>({id:d, nombre:d, esCorrecto:false, color:'#ECEFF1'})),
            ].sort(()=>0.5-Math.random());
            nivelesGenerados.push({
                nivel:i+1, tipo_motor:'abecedario',
                instruccion_texto:`¿Con qué letra empieza "${correcto.palabra}"?`,
                item:{...correcto}, opciones,
            });
        }
        return nivelesGenerados;
    }

    // ── OPUESTOS ──────────────────────────────────────────────────────────────
    if (categoria === 'opuestos') {
        const ids = diccionarios._opuestosIds;
        for (let i = 0; i < cantidadTotal; i++) {
            const id = ids[i % ids.length];
            nivelesGenerados.push({
                nivel:i+1, tipo_motor:'opuestos', opuestoId: id,
            });
        }
        return nivelesGenerados;
    }

    // ── FRUTAS Y VERDURAS ─────────────────────────────────────────────────────
    if (categoria === 'frutas') {
        const pool = diccionarios.frutas;
        for (let i = 0; i < cantidadTotal; i++) {
            const base = pool[i % pool.length];
            if (base.tipo === 'categorizar') {
                // Elegir 1 correcto + cfg.distractores incorrectos
                const correcto = base.correctos[Math.floor(Math.random() * base.correctos.length)];
                const incorrectos = [...base.incorrectos].sort(()=>0.5-Math.random()).slice(0, cfg.distractores);
                nivelesGenerados.push({
                    nivel:i+1, tipo_motor:'frutas',
                    instruccion_texto: base.pregunta,
                    opciones: [
                        {...correcto, esCorrecto:true},
                        ...incorrectos.map(x=>({...x,esCorrecto:false})),
                    ].sort(()=>0.5-Math.random()),
                });
            } else {
                // tipo 'identificar': opciones ya definidas
                const numOpciones = Math.min(base.opciones.length, cfg.distractores + 1);
                const correcta = base.opciones.find(o=>o.esCorrecto);
                const otras = base.opciones.filter(o=>!o.esCorrecto)
                    .sort(()=>0.5-Math.random()).slice(0, cfg.distractores);
                nivelesGenerados.push({
                    nivel:i+1, tipo_motor:'frutas',
                    instruccion_texto: base.pregunta,
                    opciones: [correcta, ...otras].sort(()=>0.5-Math.random()),
                });
            }
        }
        return nivelesGenerados;
    }

    // ── COLORES Y FORMAS (con lógica anti-confusión) ──────────────────────────
    if (categoria === 'colores_formas') {
        const pool = diccionarios.colores_formas;

        // Bebés: solo aprenden COLORES → siempre círculo, solo cambia el color
        if (edad === 'bebes') {
            const colPool = COLORES.slice(0, 6); // solo 6 colores primarios/secundarios para bebés
            let colIdx = 0;
            for (let i = 0; i < cantidadTotal; i++) {
                const colorCorrecto = colPool[colIdx % colPool.length];
                colIdx++;
                const distractores = colPool
                    .filter(c => {
                        if (c.id === colorCorrecto.id) return false;
                        const hueDist = Math.abs(c.hue - colorCorrecto.hue);
                        return hueDist > 40; // solo colores bien distintos para bebés
                    })
                    .sort(()=>0.5-Math.random()).slice(0, 1); // solo 1 distractor para bebés
                const opciones = [
                    {id:`circulo_${colorCorrecto.id}`, formaId:'circulo', colorId:colorCorrecto.id,
                     img:_svgForma('circulo',colorCorrecto.hex), color:colorCorrecto.bg,
                     nombre:`círculo ${colorCorrecto.nombre}`, articulo:'el', esCorrecto:true, colorHue:colorCorrecto.hue},
                    ...distractores.map(c=>({
                        id:`circulo_${c.id}`, formaId:'circulo', colorId:c.id,
                        img:_svgForma('circulo',c.hex), color:c.bg,
                        nombre:`círculo ${c.nombre}`, articulo:'el', esCorrecto:false, colorHue:c.hue
                    })),
                ].sort(()=>0.5-Math.random());
                nivelesGenerados.push({
                    nivel:i+1, tipo_motor:'seleccion',
                    instruccion_texto:`¡Toca el círculo ${colorCorrecto.nombre}!`,
                    opciones,
                });
            }
            return nivelesGenerados;
        }

        // Pequeños y Grandes: forma + color completo con distractor inteligente
        let poolIdx = 0;
        const shuffled = [...pool].sort(()=>0.5-Math.random());
        const ordenMotores = cfg.motores;

        for (let i = 0; i < cantidadTotal; i++) {
            const correcto = shuffled[poolIdx % shuffled.length];
            poolIdx++;

            // ← AQUÍ ESTÁ EL FIX PEDAGÓGICO
            const distractores = _distractor_colores_formas(correcto, pool, cfg.distractores);
            if (distractores.length === 0) continue; // safety

            let tipoMotor = ordenMotores[i % ordenMotores.length];
            // arrastre no tiene sentido para colores_formas (sin destino), usar selección
            if (tipoMotor === 'arrastre') tipoMotor = 'seleccion';

            nivelesGenerados.push({
                nivel:i+1, tipo_motor: tipoMotor,
                instruccion_texto: `¡Toca ${correcto.articulo} ${correcto.nombre}!`,
                opciones: [
                    {...correcto, esCorrecto:true},
                    ...distractores.map(d=>({...d, esCorrecto:false})),
                ].sort(()=>0.5-Math.random()),
                parejas: tipoMotor === 'memoria'
                    ? [correcto, ...distractores.slice(0,3)] : undefined,
            });
        }
        return nivelesGenerados;
    }

    // ── RESTO (animales, cuerpo, vehiculos) ───────────────────────────────────
    if (!diccionarios[categoria]) return [];

    const poolOriginal  = [...diccionarios[categoria]];
    let   poolDisponible = [...poolOriginal];
    const partesCara      = ['ojo','oreja','nariz','boca'];
    const partesAbstractas = ['diente','lengua','cabeza'];
    const ordenMotores    = cfg.motores;

    for (let i = 0; i < cantidadTotal; i++) {
        if (poolDisponible.length === 0) poolDisponible = [...poolOriginal];

        const idx      = Math.floor(Math.random() * poolDisponible.length);
        const correcto = poolDisponible.splice(idx, 1)[0];
        const distractores = poolOriginal
            .filter(item => item.id !== correcto.id)
            .sort(()=>0.5-Math.random()).slice(0, cfg.distractores);

        let tipoMotor = ordenMotores[i % ordenMotores.length];
        if (tipoMotor === 'arrastre' && categoria === 'cuerpo') {
            tipoMotor = partesAbstractas.includes(correcto.id) ? 'seleccion' : 'identificar_avatar';
        }

        let nivel = {nivel:i+1, tipo_motor:tipoMotor};

        if (tipoMotor === 'seleccion') {
            nivel.instruccion_texto = categoria === 'cuerpo'
                ? `¡Toca ${correcto.articulo} ${correcto.nombre}! (${correcto.descripcion})`
                : `¡Toca ${correcto.articulo} ${correcto.nombre}!`;
            nivel.opciones = [
                {...correcto, esCorrecto:true},
                ...distractores.map(d=>({...d,esCorrecto:false})),
            ].sort(()=>0.5-Math.random());
        } else if (tipoMotor === 'identificar_avatar') {
            nivel.vista_avatar      = partesCara.includes(correcto.id) ? 'cara' : 'cuerpo';
            nivel.instruccion_texto = `¡Toca ${correcto.articulo} ${correcto.nombre} en el niño!`;
            nivel.pieza             = {...correcto};
        } else if (tipoMotor === 'arrastre') {
            const dest    = correcto.destino || 'casita';
            const instrMap = {mar:`¡Lleva ${correcto.articulo} ${correcto.nombre} al mar!`,cielo:`¡Lleva ${correcto.articulo} ${correcto.nombre} al cielo!`,calle:`¡Lleva ${correcto.articulo} ${correcto.nombre} a la calle!`,casita:`¡Lleva ${correcto.articulo} ${correcto.nombre} a su casita!`};
            nivel.instruccion_texto = instrMap[dest] || instrMap.casita;
            nivel.pieza             = {...correcto};
            nivel.destino_tipo      = dest;
            nivel.opciones = [
                {...correcto,esCorrecto:true},
                ...distractores.slice(0,2).map(d=>({...d,esCorrecto:false})),
            ].sort(()=>0.5-Math.random());
        } else { // memoria
            nivel.instruccion_texto = '¡Encuentra las parejas!';
            nivel.parejas = [correcto,...distractores.slice(0,3)];
        }
        nivelesGenerados.push(nivel);
    }
    return nivelesGenerados;
}