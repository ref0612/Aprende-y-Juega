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
        case 'corazon':    shape = `<path d="M50,88 C15,65 5,40 5,25 C5,10 25,5 50,25 C75,5 95,10 95,25 C95,40 85,65 50,88 Z" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'ovalo':      shape = `<ellipse cx="50" cy="50" rx="44" ry="28" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'hexagono':   shape = `<polygon points="50,6 91,28 91,72 50,94 9,72 9,28" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
        case 'luna':       shape = `<path d="M55,10 A40,40 0 1,0 55,90 A50,50 0 0,1 55,10 Z" fill="${hex}" stroke="${s}" stroke-width="2"/>`; break;
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
        // ── GRANJA Y CAMPO ──
        { id:'cow',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cow/3D/cow_3d.png',           color:'#F5F5F5', nombre:'vaca',             articulo:'la', destino:'granja' },
        { id:'pig',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Pig/3D/pig_3d.png',           color:'#FCE4EC', nombre:'cerdito',          articulo:'el', destino:'granja' },
        { id:'chicken',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Chicken/3D/chicken_3d.png',   color:'#FFF9C4', nombre:'gallina',          articulo:'la', destino:'granja' },
        { id:'rooster',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rooster/3D/rooster_3d.png',   color:'#FFCDD2', nombre:'gallo',            articulo:'el', destino:'granja' },
        { id:'horse',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Horse/3D/horse_3d.png',       color:'#FFF3E0', nombre:'caballo',          articulo:'el', destino:'granja' },
        { id:'sheep',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ewe/3D/ewe_3d.png',       color:'#FAFAFA', nombre:'oveja',            articulo:'la', destino:'granja' },
        { id:'goat',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Goat/3D/goat_3d.png',         color:'#EFEBE9', nombre:'cabra',            articulo:'la', destino:'granja' },
        { id:'duck',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Duck/3D/duck_3d.png',         color:'#FFF9C4', nombre:'pato',             articulo:'el', destino:'granja' },
        { id:'turkey',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Turkey/3D/turkey_3d.png',     color:'#D7CCC8', nombre:'pavo',             articulo:'el', destino:'granja' },
        { id:'llama',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Llama/3D/llama_3d.png',       color:'#EFEBE9', nombre:'llama',            articulo:'la', destino:'granja' },
        { id:'mouse',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mouse/3D/mouse_3d.png',       color:'#ECEFF1', nombre:'ratoncito',        articulo:'el', destino:'granja' },
        { id:'rat',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rat/3D/rat_3d.png',           color:'#CFD8DC', nombre:'rata',             articulo:'la', destino:'granja' },
        
        // ── MASCOTAS ──
        { id:'dog',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dog/3D/dog_3d.png',           color:'#FFECB3', nombre:'perrito',          articulo:'el', destino:'casita' },
        { id:'poodle',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Poodle/3D/poodle_3d.png',     color:'#EFEBE9', nombre:'caniche',          articulo:'el', destino:'casita' },
        { id:'cat',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png',           color:'#FFECB3', nombre:'gatito',           articulo:'el', destino:'casita' },
        { id:'rabbit',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rabbit/3D/rabbit_3d.png',     color:'#FCE4EC', nombre:'conejito',         articulo:'el', destino:'casita' },
        { id:'hamster',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hamster/3D/hamster_3d.png',   color:'#FFE0B2', nombre:'hámster',          articulo:'el', destino:'casita' },
        { id:'parrot',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Parrot/3D/parrot_3d.png',      color:'#E8F5E9', nombre:'loro',             articulo:'el', destino:'casita' },

        // ── SELVA, SABANA Y DESIERTO ──
        { id:'tiger',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tiger/3D/tiger_3d.png',       color:'#FFE0B2', nombre:'tigre',            articulo:'el', destino:'selva' },
        { id:'lion',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Lion/3D/lion_3d.png',         color:'#FFF3E0', nombre:'león',             articulo:'el', destino:'selva' },
        { id:'elephant', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Elephant/3D/elephant_3d.png', color:'#ECEFF1', nombre:'elefante',         articulo:'el', destino:'selva' },
        { id:'monkey',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Monkey/3D/monkey_3d.png',     color:'#D7CCC8', nombre:'mono',             articulo:'el', destino:'selva' },
        { id:'gorilla',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Gorilla/3D/gorilla_3d.png',   color:'#5D4037', nombre:'gorila',           articulo:'el', destino:'selva' },
        { id:'orangutan',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Orangutan/3D/orangutan_3d.png',color:'#FFCC80', nombre:'orangután',       articulo:'el', destino:'selva' },
        { id:'giraffe',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Giraffe/3D/giraffe_3d.png',   color:'#FFF9C4', nombre:'jirafa',           articulo:'la', destino:'selva' },
        { id:'hippo',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hippopotamus/3D/hippopotamus_3d.png', color:'#CFD8DC', nombre:'hipopótamo', articulo:'el', destino:'selva' },
        { id:'rhino',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rhinoceros/3D/rhinoceros_3d.png', color:'#CFD8DC', nombre:'rinoceronte',  articulo:'el', destino:'selva' },
        { id:'croco',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crocodile/3D/crocodile_3d.png',color:'#C8E6C9', nombre:'cocodrilo',       articulo:'el', destino:'selva' },
        { id:'leopard',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Leopard/3D/leopard_3d.png',   color:'#FFF9C4', nombre:'leopardo',         articulo:'el', destino:'selva' },
        { id:'zebra',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Zebra/3D/zebra_3d.png',       color:'#ECEFF1', nombre:'cebra',            articulo:'la', destino:'selva' },
        { id:'camel',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camel/3D/camel_3d.png',       color:'#FFE0B2', nombre:'camello',          articulo:'el', destino:'selva' },
        { id:'kangaroo', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Kangaroo/3D/kangaroo_3d.png', color:'#FFCC80', nombre:'canguro',          articulo:'el', destino:'selva' },
        { id:'sloth',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sloth/3D/sloth_3d.png',       color:'#D7CCC8', nombre:'perezoso',         articulo:'el', destino:'selva' },

        // ── BOSQUE Y NIEVE ──
        { id:'bear',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bear/3D/bear_3d.png',         color:'#A1887F', nombre:'oso',              articulo:'el', destino:'selva' },
        { id:'polar_bear',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Polar%20bear/3D/polar_bear_3d.png',color:'#E3F2FD', nombre:'oso polar',  articulo:'el', destino:'selva' },
        { id:'panda',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/3D/panda_3d.png',       color:'#ECEFF1', nombre:'panda',            articulo:'el', destino:'selva' },
        { id:'fox',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fox/3D/fox_3d.png',           color:'#FFCC80', nombre:'zorro',            articulo:'el', destino:'selva' },
        { id:'wolf',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wolf/3D/wolf_3d.png',         color:'#CFD8DC', nombre:'lobo',             articulo:'el', destino:'selva' },
        { id:'deer',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Deer/3D/deer_3d.png',         color:'#D7CCC8', nombre:'ciervo',           articulo:'el', destino:'selva' },
        { id:'raccoon',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Raccoon/3D/raccoon_3d.png',   color:'#CFD8DC', nombre:'mapache',          articulo:'el', destino:'selva' },
        { id:'hedgehog', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hedgehog/3D/hedgehog_3d.png', color:'#D7CCC8', nombre:'erizo',            articulo:'el', destino:'selva' },
        { id:'squirrel', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Chipmunk/3D/chipmunk_3d.png', color:'#FFE0B2', nombre:'ardilla',          articulo:'la', destino:'selva' },
        { id:'badger',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Badger/3D/badger_3d.png',     color:'#ECEFF1', nombre:'tejón',            articulo:'el', destino:'selva' },
        { id:'skunk',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Skunk/3D/skunk_3d.png',       color:'#424242', nombre:'zorrillo',         articulo:'el', destino:'selva' },
        { id:'bat',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bat/3D/bat_3d.png',           color:'#607D8B', nombre:'murciélago',       articulo:'el', destino:'cielo' },

        // ── OCÉANO Y RÍOS ──
        { id:'octopus',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Octopus/3D/octopus_3d.png',   color:'#E1BEE7', nombre:'pulpo',            articulo:'el', destino:'mar' },
        { id:'crab',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crab/3D/crab_3d.png',         color:'#FFCDD2', nombre:'cangrejo',         articulo:'el', destino:'mar' },
        { id:'shark',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shark/3D/shark_3d.png',       color:'#E0F7FA', nombre:'tiburón',          articulo:'el', destino:'mar' },
        { id:'whale',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Whale/3D/whale_3d.png',       color:'#E3F2FD', nombre:'ballena',          articulo:'la', destino:'mar' },
        { id:'dolphin',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dolphin/3D/dolphin_3d.png',   color:'#E1F5FE', nombre:'delfín',           articulo:'el', destino:'mar' },
        { id:'fish',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fish/3D/fish_3d.png',         color:'#FFF9C4', nombre:'pez',              articulo:'el', destino:'mar' },
        { id:'tropical', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tropical%20fish/3D/tropical_fish_3d.png',color:'#FFF9C4', nombre:'pez tropical', articulo:'el', destino:'mar' },
        { id:'blowfish', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Blowfish/3D/blowfish_3d.png', color:'#FFE0B2', nombre:'pez globo',        articulo:'el', destino:'mar' },
        { id:'turtle',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Turtle/3D/turtle_3d.png',     color:'#E8F5E9', nombre:'tortuga',          articulo:'la', destino:'mar' },
        { id:'seal',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Seal/3D/seal_3d.png',         color:'#ECEFF1', nombre:'foca',             articulo:'la', destino:'mar' },
        { id:'squid',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Squid/3D/squid_3d.png',       color:'#FFCDD2', nombre:'calamar',          articulo:'el', destino:'mar' },
        { id:'otter',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Otter/3D/otter_3d.png',       color:'#D7CCC8', nombre:'nutria',           articulo:'la', destino:'mar' },
        { id:'penguin',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Penguin/3D/penguin_3d.png',   color:'#E3F2FD', nombre:'pingüino',         articulo:'el', destino:'mar' },
        { id:'frog',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Frog/3D/frog_3d.png',         color:'#E8F5E9', nombre:'rana',             articulo:'la', destino:'mar' },

        // ── AVES E INSECTOS ──
        { id:'butterfly',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Butterfly/3D/butterfly_3d.png',color:'#E1F5FE', nombre:'mariposa',        articulo:'la', destino:'cielo' },
        { id:'bee',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Honeybee/3D/honeybee_3d.png',  color:'#FFF9C4', nombre:'abeja',            articulo:'la', destino:'cielo' },
        { id:'ladybug',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Lady%20beetle/3D/lady_beetle_3d.png',color:'#FFCDD2', nombre:'mariquita', articulo:'la', destino:'cielo' },
        { id:'owl',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Owl/3D/owl_3d.png',            color:'#D7CCC8', nombre:'búho',             articulo:'el', destino:'cielo' },
        { id:'eagle',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Eagle/3D/eagle_3d.png',        color:'#EFEBE9', nombre:'águila',           articulo:'el', destino:'cielo' },
        { id:'swan',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Swan/3D/swan_3d.png',          color:'#FAFAFA', nombre:'cisne',            articulo:'el', destino:'mar' },
        { id:'flamingo', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flamingo/3D/flamingo_3d.png',  color:'#FCE4EC', nombre:'flamenco',         articulo:'el', destino:'mar' },
        { id:'peacock',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Peacock/3D/peacock_3d.png',    color:'#E0F7FA', nombre:'pavo real',        articulo:'el', destino:'selva' },
        { id:'ant',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ant/3D/ant_3d.png',            color:'#FFCDD2', nombre:'hormiga',          articulo:'la', destino:'granja' },
        { id:'snail',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Snail/3D/snail_3d.png',        color:'#DCEDC8', nombre:'caracol',          articulo:'el', destino:'granja' },
        { id:'worm',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Worm/3D/worm_3d.png',          color:'#F8BBD0', nombre:'gusano',           articulo:'el', destino:'granja' },
        { id:'spider',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spider/3D/spider_3d.png',      color:'#CFD8DC', nombre:'araña',            articulo:'la', destino:'granja' },
    ],

    cuerpo: [
        // 'tipo' agrupa partes visualmente similares.
        // El generador NUNCA usa ítems del mismo tipo como distractores entre sí.
        // Grupos:
        //   mano_brazo  → mano, dedos, brazo  (todas muestran mano/brazo, color piel)
        //   pierna_pie  → pierna, pie          (ambas muestran extremidad inferior)
        //   cara_sup    → ojo
        //   cara_lat    → oreja
        //   cara_cen    → nariz
        //   cara_inf    → boca, lengua, diente (todas son partes de la boca)
        //   interno     → corazón, cerebro, pulmones, hueso (órganos internos)
        //   externo     → cabeza/cuerpo completo, pelo
        { id:'ojo',     tipo:'cara_sup',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Eye/3D/eye_3d.png',                                           color:'#E3F2FD', nombre:'ojo',      articulo:'el',  descripcion:'para ver los colores',     destino:'silueta' },
        { id:'oreja',   tipo:'cara_lat',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ear/Default/3D/ear_3d_default.png',                           color:'#E3F2FD', nombre:'oreja',    articulo:'la',  descripcion:'para escuchar música',     destino:'silueta' },
        { id:'nariz',   tipo:'cara_cen',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Nose/Default/3D/nose_3d_default.png',                         color:'#E3F2FD', nombre:'nariz',    articulo:'la',  descripcion:'para oler las flores',     destino:'silueta' },
        { id:'boca',    tipo:'cara_inf',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mouth/3D/mouth_3d.png',                                       color:'#E3F2FD', nombre:'boca',     articulo:'la',  descripcion:'para hablar y cantar',     destino:'silueta' },
        { id:'lengua',  tipo:'cara_inf',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tongue/3D/tongue_3d.png',                                     color:'#E3F2FD', nombre:'lengua',   articulo:'la',  descripcion:'para sentir sabores',      destino:'silueta' },
        { id:'diente',  tipo:'cara_inf',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tooth/3D/tooth_3d.png',                                       color:'#E3F2FD', nombre:'diente',   articulo:'el',  descripcion:'para masticar',            destino:'silueta' },
        { id:'mano',    tipo:'mano_brazo', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Waving%20hand/Default/3D/waving_hand_3d_default.png',         color:'#E3F2FD', nombre:'mano',     articulo:'la',  descripcion:'para aplaudir',            destino:'silueta' },
        { id:'dedos',   tipo:'mano_brazo', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hand%20with%20fingers%20splayed/Default/3D/hand_with_fingers_splayed_3d_default.png', color:'#E3F2FD', nombre:'dedos', articulo:'los', descripcion:'para tocar cosas', destino:'silueta' },
        { id:'brazo',   tipo:'mano_brazo', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flexed%20biceps/Default/3D/flexed_biceps_3d_default.png',     color:'#E3F2FD', nombre:'brazo',    articulo:'el',  descripcion:'para dar abrazos',         destino:'silueta' },
        { id:'pie',     tipo:'pierna_pie', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Foot/Default/3D/foot_3d_default.png',                         color:'#E3F2FD', nombre:'pie',      articulo:'el',  descripcion:'para correr y saltar',     destino:'silueta' },
        { id:'pierna',  tipo:'pierna_pie', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Leg/Default/3D/leg_3d_default.png',                           color:'#E3F2FD', nombre:'pierna',   articulo:'la',  descripcion:'para caminar',             destino:'silueta' },
        { id:'corazon', tipo:'interno',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Anatomical%20heart/3D/anatomical_heart_3d.png',               color:'#FFCDD2', nombre:'corazón',  articulo:'el',  descripcion:'para sentir mucho amor',   destino:'silueta' },
        { id:'cerebro', tipo:'interno',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Brain/3D/brain_3d.png',                                       color:'#F3E5F5', nombre:'cerebro',  articulo:'el',  descripcion:'para aprender y soñar',    destino:'silueta' },
        { id:'pulmones',tipo:'interno',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Lungs/3D/lungs_3d.png',                                       color:'#E1F5FE', nombre:'pulmones', articulo:'los', descripcion:'para respirar profundo',   destino:'silueta' },
        { id:'espalda', tipo:'interno',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bone/3D/bone_3d.png',                                         color:'#E3F2FD', nombre:'hueso',    articulo:'el',  descripcion:'para estar derechitos',    destino:'silueta' },
        { id:'cabeza',  tipo:'externo',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Child/Default/3D/child_3d_default.png',                       color:'#E3F2FD', nombre:'cabeza',   articulo:'la',  descripcion:'para pensar',              destino:'silueta' },
        { id:'pelo',    tipo:'externo',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Person%20getting%20haircut/Default/3D/person_getting_haircut_3d_default.png', color:'#E3F2FD', nombre:'pelo', articulo:'el', descripcion:'para peinarnos', destino:'silueta' },
    ],

    _emocionIds: ['feliz','triste','enojado','asustado','sorprendido','orgulloso','cansado','amor','curioso','emocionado'],
    colores_formas: _crearFormas(),

    vehiculos: [
        // ── CALLE Y TRANSPORTE ──
        { id:'auto',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Automobile/3D/automobile_3d.png',        color:'#FFCDD2', nombre:'auto',             articulo:'el', destino:'calle' },
        { id:'suv',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sport%20utility%20vehicle/3D/sport_utility_vehicle_3d.png',color:'#E3F2FD', nombre:'camioneta',      articulo:'la', destino:'calle' },
        { id:'bus',      img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bus/3D/bus_3d.png',                      color:'#FFF9C4', nombre:'autobús',          articulo:'el', destino:'calle' },
        { id:'taxi',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Taxi/3D/taxi_3d.png',                    color:'#FFF9C4', nombre:'taxi',             articulo:'el', destino:'calle' },
        { id:'tren',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Locomotive/3D/locomotive_3d.png',        color:'#C8E6C9', nombre:'tren',             articulo:'el', destino:'calle' },
        { id:'bullet',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bullet%20train/3D/bullet_train_3d.png',  color:'#E0F7FA', nombre:'tren bala',        articulo:'el', destino:'calle' },
        { id:'moto',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Motorcycle/3D/motorcycle_3d.png',        color:'#E1BEE7', nombre:'moto',             articulo:'la', destino:'calle' },
        { id:'bici',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bicycle/3D/bicycle_3d.png',              color:'#C8E6C9', nombre:'bicicleta',        articulo:'la', destino:'calle' },
        { id:'scooter',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Kick%20scooter/3D/kick_scooter_3d.png',  color:'#FFE0B2', nombre:'monopatín',        articulo:'el', destino:'calle' },
        { id:'wheelchair',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Manual%20wheelchair/3D/manual_wheelchair_3d.png',color:'#E3F2FD',nombre:'silla de ruedas',articulo:'la', destino:'calle' },
        
        // ── EMERGENCIAS ──
        { id:'policia',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Police%20car/3D/police_car_3d.png',      color:'#BBDEFB', nombre:'coche de policía', articulo:'el', destino:'calle' },
        { id:'bomberos', img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire%20engine/3D/fire_engine_3d.png',    color:'#FFCDD2', nombre:'camión de bomberos',articulo:'el', destino:'calle' },
        { id:'ambu',     img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ambulance/3D/ambulance_3d.png',          color:'#FFCDD2', nombre:'ambulancia',       articulo:'la', destino:'calle' },
        
        // ── CONSTRUCCIÓN Y TRABAJO ──
        { id:'tractor',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tractor/3D/tractor_3d.png',             color:'#DCEDC8', nombre:'tractor',          articulo:'el', destino:'calle' },
        { id:'camion',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Articulated%20lorry/3D/articulated_lorry_3d.png',color:'#E0E0E0', nombre:'camión grande', articulo:'el', destino:'calle' },
        { id:'reparto',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Delivery%20truck/3D/delivery_truck_3d.png',color:'#E1F5FE', nombre:'camión de reparto', articulo:'el', destino:'calle' },
        
        // ── AÉREOS Y ESPACIO ──
        { id:'avion',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Airplane/3D/airplane_3d.png',            color:'#E1F5FE', nombre:'avión',            articulo:'el', destino:'cielo' },
        { id:'avioncito',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Small%20airplane/3D/small_airplane_3d.png',color:'#B3E5FC', nombre:'avioneta',     articulo:'la', destino:'cielo' },
        { id:'helicop',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Helicopter/3D/helicopter_3d.png',        color:'#E1F5FE', nombre:'helicóptero',      articulo:'el', destino:'cielo' },
        { id:'cohete',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png',               color:'#D1C4E9', nombre:'cohete',           articulo:'el', destino:'cielo' },
        { id:'globo',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Parachute/3D/parachute_3d.png',         color:'#FFCC80', nombre:'paracaídas',       articulo:'el', destino:'cielo' },
        { id:'satellite',img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Satellite/3D/satellite_3d.png',         color:'#CFD8DC', nombre:'satélite',         articulo:'el', destino:'cielo' },
        { id:'saucer',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flying%20saucer/3D/flying_saucer_3d.png',color:'#C8E6C9', nombre:'ovni',             articulo:'el', destino:'cielo' },
        
        // ── ACUÁTICOS ──
        { id:'barco',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ship/3D/ship_3d.png',                   color:'#B3E5FC', nombre:'barco',            articulo:'el', destino:'mar' },
        { id:'lancha',   img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Speedboat/3D/speedboat_3d.png',         color:'#81D4FA', nombre:'lancha',           articulo:'la', destino:'mar' },
        { id:'canoa',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Canoe/3D/canoe_3d.png',                 color:'#D7CCC8', nombre:'canoa',            articulo:'la', destino:'mar' },
        { id:'crucero',  img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Passenger%20ship/3D/passenger_ship_3d.png',color:'#E3F2FD', nombre:'crucero',       articulo:'el', destino:'mar' },
        { id:'ferry',    img:'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ferry/3D/ferry_3d.png',                 color:'#E1F5FE', nombre:'ferri',            articulo:'el', destino:'mar' },
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

    // Frutas y Verduras masivas
    frutas: [
        // Categorización: ¿cuál es la fruta?
        { id:'cat_frutas', tipo:'categorizar', pregunta:'¿Cuál es una FRUTA?', audio:'¿Cuál de estos es una fruta?',
          correctos:[
            {emoji:'🍎',nombre:'manzana',color:'#FFEBEE',categoria:'fruta',respuesta:'una manzana', genero:'femenino'},
            {emoji:'🍌',nombre:'plátano',color:'#FFF9C4',categoria:'fruta',respuesta:'un plátano', genero:'masculino'},
            {emoji:'🍓',nombre:'frutilla',color:'#FFEBEE',categoria:'fruta',respuesta:'una frutilla', genero:'femenino'},
            {emoji:'🍉',nombre:'sandía',color:'#E3F2FD',categoria:'fruta',respuesta:'una sandía', genero:'femenino'},
            {emoji:'🍇',nombre:'uvas',color:'#F3E5F5',categoria:'fruta',respuesta:'unas uvas', genero:'femenino'},
            {emoji:'🍒',nombre:'cereza',color:'#FFCDD2',categoria:'fruta',respuesta:'una cereza', genero:'femenino'},
            {emoji:'🍍',nombre:'piña',color:'#FFF9C4',categoria:'fruta',respuesta:'una piña', genero:'femenino'},
            {emoji:'🥭',nombre:'mango',color:'#FFE0B2',categoria:'fruta',respuesta:'un mango', genero:'masculino'},
            {emoji:'🍋',nombre:'limón',color:'#FFF9C4',categoria:'fruta',respuesta:'un limón', genero:'masculino'},
            {emoji:'🍊',nombre:'naranja',color:'#FFE0B2',categoria:'fruta',respuesta:'una naranja', genero:'femenino'},
            {emoji:'🥝',nombre:'kiwi',color:'#E8F5E9',categoria:'fruta',respuesta:'un kiwi', genero:'masculino'},
            {emoji:'🍑',nombre:'durazno',color:'#FFE0B2',categoria:'fruta',respuesta:'un durazno', genero:'masculino'},
            {emoji:'🍐',nombre:'pera',color:'#F1F8E9',categoria:'fruta',respuesta:'una pera', genero:'femenino'},
            {emoji:'🍈',nombre:'melón',color:'#E8F5E9',categoria:'fruta',respuesta:'un melón', genero:'masculino'},
            {emoji:'🥥',nombre:'coco',color:'#EFEBE9',categoria:'fruta',respuesta:'un coco', genero:'masculino'},
            {emoji:'🥑',nombre:'palta',color:'#E8F5E9',categoria:'fruta',respuesta:'una palta', genero:'femenino'},
            {emoji:'🫐',nombre:'arándanos',color:'#E3F2FD',categoria:'fruta',respuesta:'unos arándanos', genero:'masculino'},
            {emoji:'🍏',nombre:'manzana verde',color:'#E8F5E9',categoria:'fruta',respuesta:'una manzana verde', genero:'femenino'},
            {emoji:'🍍',nombre:'ananá',color:'#FFF9C4',categoria:'fruta',respuesta:'una ananá', genero:'femenino'},
            {emoji:'🍋‍🟩',nombre:'lima',color:'#E8F5E9',categoria:'fruta',respuesta:'una lima', genero:'femenino'},
            {emoji:'🫒',nombre:'higo',color:'#EDE7F6',categoria:'fruta',respuesta:'un higo', genero:'masculino'},
            {emoji:'🥭',nombre:'guayaba',color:'#F9FBE7',categoria:'fruta',respuesta:'una guayaba', genero:'femenino'},
            {emoji:'🍑',nombre:'papaya',color:'#FFE0B2',categoria:'fruta',respuesta:'una papaya', genero:'femenino'},
            {emoji:'🍓',nombre:'fresa',color:'#FFEBEE',categoria:'fruta',respuesta:'una fresa', genero:'femenino'},
            {emoji:'🍐',nombre:'membrillo',color:'#FFF9C4',categoria:'fruta',respuesta:'un membrillo', genero:'masculino'},
            {emoji:'🍑',nombre:'nectarina',color:'#FFCCBC',categoria:'fruta',respuesta:'una nectarina', genero:'femenino'},
            ],
          incorrectos:[
            {emoji:'🥕',nombre:'zanahoria',color:'#FFF3E0',categoria:'verdura', genero:'femenino'},
            {emoji:'🥦',nombre:'brócoli',color:'#E8F5E9',categoria:'verdura', genero:'masculino'},
            {emoji:'🧅',nombre:'cebolla',color:'#FFF9C4',categoria:'verdura', genero:'femenino'},
            {emoji:'🌽',nombre:'maíz',color:'#FFF9C4',categoria:'verdura', genero:'masculino'},
            {emoji:'🍅',nombre:'tomate',color:'#FFEBEE',categoria:'verdura', genero:'masculino'},
            {emoji:'🥔',nombre:'papa',color:'#EFEBE9',categoria:'verdura', genero:'femenino'},
            {emoji:'🥬',nombre:'lechuga',color:'#E8F5E9',categoria:'verdura', genero:'femenino'},
            {emoji:'🧄',nombre:'ajo',color:'#FAFAFA',categoria:'verdura', genero:'masculino'},
            {emoji:'🍄',nombre:'champiñón',color:'#FFEBEE',categoria:'verdura', genero:'masculino'},
            {emoji:'🍆',nombre:'berenjena',color:'#F3E5F5',categoria:'verdura', genero:'femenino'},
            {emoji:'🥒',nombre:'pepino',color:'#E8F5E9',categoria:'verdura', genero:'masculino'},
            {emoji:'🫑',nombre:'pimiento',color:'#E8F5E9',categoria:'verdura', genero:'masculino'},
            {emoji:'🌶️',nombre:'ají',color:'#FFEBEE',categoria:'verdura', genero:'masculino'},
            {emoji:'🥜',nombre:'maní',color:'#EFEBE9',categoria:'verdura', genero:'masculino'},
            {emoji:'🌰',nombre:'castaña',color:'#EFEBE9',categoria:'verdura', genero:'femenino'},
            {emoji:'🥗',nombre:'ensalada',color:'#E8F5E9',categoria:'verdura', genero:'femenino'},
            {emoji:'🍠',nombre:'camote',color:'#FFCCBC',categoria:'verdura', genero:'masculino'},
            {emoji:'🥦',nombre:'coliflor',color:'#E8F5E9',categoria:'verdura', genero:'femenino'},
            {emoji:'🥬',nombre:'espinaca',color:'#E8F5E9',categoria:'verdura', genero:'femenino'},
          ]
        },
        { id:'cat_verduras', tipo:'categorizar', pregunta:'¿Cuál es una VERDURA?', audio:'¿Cuál de estos es una verdura?',
          correctos:[
            {emoji:'🥕',nombre:'zanahoria',color:'#FFF3E0',categoria:'verdura',respuesta:'una verdura', genero:'femenino'},
            {emoji:'🥦',nombre:'brócoli',color:'#E8F5E9',categoria:'verdura',respuesta:'un brócoli', genero:'masculino'},
            {emoji:'🍅',nombre:'tomate',color:'#FFEBEE',categoria:'verdura',respuesta:'un tomate', genero:'masculino'},
            {emoji:'🌽',nombre:'maíz',color:'#FFF9C4',categoria:'verdura',respuesta:'un maíz', genero:'masculino'},
            {emoji:'🥔',nombre:'papa',color:'#EFEBE9',categoria:'verdura',respuesta:'una papa', genero:'femenino'},
            {emoji:'🥬',nombre:'lechuga',color:'#E8F5E9',categoria:'verdura',respuesta:'una lechuga', genero:'femenino'},
            {emoji:'🧅',nombre:'cebolla',color:'#FFF9C4',categoria:'verdura',respuesta:'una cebolla', genero:'femenino'},
            {emoji:'🧄',nombre:'ajo',color:'#FAFAFA',categoria:'verdura',respuesta:'un ajo', genero:'masculino'},
            {emoji:'🍄',nombre:'champiñón',color:'#FFEBEE',categoria:'verdura',respuesta:'un champiñón', genero:'masculino'},
            {emoji:'🍆',nombre:'berenjena',color:'#F3E5F5',categoria:'verdura',respuesta:'una berenjena', genero:'femenino'},
            {emoji:'🥒',nombre:'pepino',color:'#E8F5E9',categoria:'verdura',respuesta:'un pepino', genero:'masculino'},
            {emoji:'🫑',nombre:'pimiento',color:'#E8F5E9',categoria:'verdura',respuesta:'un pimiento', genero:'masculino'},
            {emoji:'🌶️',nombre:'ají',color:'#FFEBEE',categoria:'verdura',respuesta:'un ají', genero:'masculino'},
            {emoji:'🌰',nombre:'castaña',color:'#EFEBE9',categoria:'verdura',respuesta:'una castaña', genero:'femenino'},
            {emoji:'🥜',nombre:'maní',color:'#EFEBE9',categoria:'verdura',respuesta:'un maní', genero:'masculino'},
            {emoji:'🥗',nombre:'ensalada',color:'#E8F5E9',categoria:'verdura',respuesta:'una ensalada', genero:'femenino'},
            {emoji:'🍠',nombre:'camote',color:'#FFCCBC',categoria:'verdura',respuesta:'un camote', genero:'masculino'},
            {emoji:'🥦',nombre:'coliflor',color:'#E8F5E9',categoria:'verdura',respuesta:'una coliflor', genero:'femenino'},
            {emoji:'🥬',nombre:'espinaca',color:'#E8F5E9',categoria:'verdura',respuesta:'una espinaca', genero:'femenino'},
          ],
          incorrectos:[
            {emoji:'🍎',nombre:'manzana',color:'#FFEBEE',categoria:'fruta', genero:'femenino'},
            {emoji:'🍌',nombre:'plátano',color:'#FFF9C4',categoria:'fruta', genero:'masculino'},
            {emoji:'🍊',nombre:'naranja',color:'#FFF3E0',categoria:'fruta', genero:'femenino'},
            {emoji:'🍓',nombre:'frutilla',color:'#FFEBEE',categoria:'fruta', genero:'femenino'},
            {emoji:'🍉',nombre:'sandía',color:'#E3F2FD',categoria:'fruta', genero:'femenino'},
            {emoji:'🍇',nombre:'uvas',color:'#F3E5F5',categoria:'fruta', genero:'femenino'},
            {emoji:'🍍',nombre:'piña',color:'#FFF9C4',categoria:'fruta', genero:'femenino'},
            {emoji:'🥭',nombre:'mango',color:'#FFE0B2',categoria:'fruta', genero:'masculino'},
            {emoji:'🍋',nombre:'limón',color:'#FFF9C4',categoria:'fruta', genero:'masculino'},
            {emoji:'🥝',nombre:'kiwi',color:'#E8F5E9',categoria:'fruta', genero:'masculino'},
            {emoji:'🍈',nombre:'melón',color:'#E8F5E9',categoria:'fruta', genero:'masculino'},
            {emoji:'🥥',nombre:'coco',color:'#EFEBE9',categoria:'fruta', genero:'masculino'},
            {emoji:'🫐',nombre:'arándanos',color:'#E3F2FD',categoria:'fruta', genero:'masculino'},
            {emoji:'🍑',nombre:'durazno',color:'#FFE0B2',categoria:'fruta', genero:'masculino'},
            {emoji:'🍒',nombre:'cereza',color:'#FFCDD2',categoria:'fruta', genero:'femenino'},
            {emoji:'🍐',nombre:'pera',color:'#F1F8E9',categoria:'fruta', genero:'femenino'},
            {emoji:'🍏',nombre:'manzana verde',color:'#E8F5E9',categoria:'fruta', genero:'femenino'},
            {emoji:'🍍',nombre:'ananá',color:'#FFF9C4',categoria:'fruta', genero:'femenino'},
          ]
        },
        
        // Identificación rápida de frutas
        { id:'id_manzana', tipo:'identificar', pregunta:'¿Cuál es la manzana?', audio:'¿Cuál es la manzana?', respuesta:'una manzana', genero:'femenino',
          opciones:[{emoji:'🍎',nombre:'manzana',esCorrecto:true, color:'#FFEBEE', genero:'femenino'},{emoji:'🍊',nombre:'naranja', esCorrecto:false,color:'#FFF3E0', genero:'femenino'},{emoji:'🍋',nombre:'limón',   esCorrecto:false,color:'#FFF9C4', genero:'masculino'},]
        },
        { id:'id_zanahoria', tipo:'identificar', pregunta:'¿Cuál es la zanahoria?', audio:'¿Cuál es la zanahoria?', respuesta:'una zanahoria', genero:'femenino',
          opciones:[{emoji:'🥕',nombre:'zanahoria',esCorrecto:true, color:'#FFF3E0', genero:'femenino'},{emoji:'🥦',nombre:'brócoli',  esCorrecto:false,color:'#E8F5E9', genero:'masculino'},{emoji:'🍆',nombre:'berenjena',esCorrecto:false,color:'#F3E5F5', genero:'femenino'},]
        },
        { id:'id_platano', tipo:'identificar', pregunta:'¿Cuál es el plátano?', audio:'¿Cuál es el plátano?', respuesta:'un plátano', genero:'masculino',
          opciones:[{emoji:'🍌',nombre:'plátano',esCorrecto:true, color:'#FFF9C4', genero:'masculino'},{emoji:'🍇',nombre:'uvas',   esCorrecto:false,color:'#F3E5F5', genero:'femenino'},{emoji:'🍓',nombre:'frutilla',esCorrecto:false,color:'#FFEBEE', genero:'femenino'},]
        },
        { id:'id_frutilla', tipo:'identificar', pregunta:'¿Cuál es la frutilla?', audio:'¿Cuál es la frutilla?', respuesta:'una frutilla', genero:'femenino',
          opciones:[{emoji:'🍓',nombre:'frutilla',esCorrecto:true, color:'#FFEBEE', genero:'femenino'},{emoji:'🍒',nombre:'cereza',  esCorrecto:false,color:'#FFEBEE', genero:'femenino'},{emoji:'🍑',nombre:'durazno', esCorrecto:false,color:'#FFF3E0', genero:'masculino'},]
        },
        { id:'id_sandia', tipo:'identificar', pregunta:'¿Cuál es la sandía?', audio:'¿Cuál es la sandía?', respuesta:'una sandía', genero:'femenino',
          opciones:[{emoji:'🍉',nombre:'sandía',esCorrecto:true, color:'#E3F2FD', genero:'femenino'},{emoji:'🍅',nombre:'tomate',  esCorrecto:false,color:'#FFEBEE', genero:'masculino'},{emoji:'🍈',nombre:'melón', esCorrecto:false,color:'#E8F5E9', genero:'masculino'},]
        },
        { id:'id_uva', tipo:'identificar', pregunta:'¿Cuáles son las uvas?', audio:'¿Cuáles son las uvas?', respuesta:'unas uvas', genero:'femenino',
          opciones:[{emoji:'🍇',nombre:'uvas',esCorrecto:true, color:'#F3E5F5', genero:'femenino'},{emoji:'🫐',nombre:'arándanos',  esCorrecto:false,color:'#E3F2FD', genero:'femenino'},{emoji:'🍒',nombre:'cereza', esCorrecto:false,color:'#FFCDD2', genero:'femenino'},]
        },
        { id:'id_brocoli', tipo:'identificar', pregunta:'¿Cuál es el brócoli?', audio:'¿Cuál es el brócoli?', respuesta:'un brócoli', genero:'masculino',
          opciones:[{emoji:'🥦',nombre:'brócoli',esCorrecto:true, color:'#E8F5E9', genero:'masculino'},{emoji:'🥬',nombre:'lechuga',  esCorrecto:false,color:'#E8F5E9', genero:'femenino'},{emoji:'🥒',nombre:'pepino', esCorrecto:false,color:'#E8F5E9', genero:'masculino'},]
        },
        { id:'id_pina', tipo:'identificar', pregunta:'¿Cuál es la piña?', audio:'¿Cuál es la piña?', respuesta:'una piña', genero:'femenino',
          opciones:[{emoji:'🍍',nombre:'piña',esCorrecto:true, color:'#FFF9C4', genero:'femenino'},{emoji:'🍌',nombre:'plátano',  esCorrecto:false,color:'#FFF9C4', genero:'masculino'},{emoji:'🌽',nombre:'maíz', esCorrecto:false,color:'#FFF9C4', genero:'masculino'},]
        },
        { id:'id_lechuga', tipo:'identificar', pregunta:'¿Cuál es la lechuga?', audio:'¿Cuál es la lechuga?', respuesta:'una lechuga', genero:'femenino',
          opciones:[{emoji:'🥬',nombre:'lechuga',esCorrecto:true, color:'#E8F5E9', genero:'femenino'},{emoji:'🥦',nombre:'brócoli',  esCorrecto:false,color:'#E8F5E9', genero:'masculino'},{emoji:'🥒',nombre:'pepino', esCorrecto:false,color:'#E8F5E9', genero:'masculino'},]
        },
        { id:'id_coco', tipo:'identificar', pregunta:'¿Cuál es el coco?', audio:'¿Cuál es el coco?', respuesta:'un coco', genero:'masculino',
          opciones:[{emoji:'🥥',nombre:'coco',esCorrecto:true, color:'#EFEBE9', genero:'masculino'},{emoji:'🍍',nombre:'piña', esCorrecto:false,color:'#FFF9C4', genero:'femenino'},{emoji:'🍋',nombre:'limón', esCorrecto:false,color:'#FFF9C4', genero:'masculino'},]
        },
        { id:'id_melon', tipo:'identificar', pregunta:'¿Cuál es el melón?', audio:'¿Cuál es el melón?', respuesta:'un melón', genero:'masculino',
          opciones:[{emoji:'🍈',nombre:'melón',esCorrecto:true, color:'#E8F5E9', genero:'masculino'},{emoji:'🍉',nombre:'sandía', esCorrecto:false,color:'#E3F2FD', genero:'femenino'},{emoji:'🍇',nombre:'uvas', esCorrecto:false,color:'#F3E5F5', genero:'femenino'},]
        },
        { id:'id_ajo', tipo:'identificar', pregunta:'¿Cuál es el ajo?', audio:'¿Cuál es el ajo?', respuesta:'un ajo', genero:'masculino',
          opciones:[{emoji:'🧄',nombre:'ajo',esCorrecto:true, color:'#FAFAFA', genero:'masculino'},{emoji:'🥔',nombre:'papa', esCorrecto:false,color:'#EFEBE9', genero:'femenino'},{emoji:'🥕',nombre:'zanahoria', esCorrecto:false,color:'#FFF3E0', genero:'femenino'},]
        },
        { id:'id_champinon', tipo:'identificar', pregunta:'¿Cuál es el champiñón?', audio:'¿Cuál es el champiñón?', respuesta:'un champiñón', genero:'masculino',
          opciones:[{emoji:'🍄',nombre:'champiñón',esCorrecto:true, color:'#FFEBEE', genero:'masculino'},{emoji:'🍆',nombre:'berenjena', esCorrecto:false,color:'#F3E5F5', genero:'femenino'},{emoji:'🥒',nombre:'pepino', esCorrecto:false,color:'#E8F5E9', genero:'masculino'},]
        },
        { id:'id_pimiento', tipo:'identificar', pregunta:'¿Cuál es el pimiento?', audio:'¿Cuál es el pimiento?', respuesta:'un pimiento', genero:'masculino',
          opciones:[{emoji:'🫑',nombre:'pimiento',esCorrecto:true, color:'#E8F5E9', genero:'masculino'},{emoji:'🌶️',nombre:'ají', esCorrecto:false,color:'#FFEBEE', genero:'masculino'},{emoji:'🥬',nombre:'lechuga', esCorrecto:false,color:'#E8F5E9', genero:'femenino'},]
        },
        { id:'id_aji', tipo:'identificar', pregunta:'¿Cuál es el ají?', audio:'¿Cuál es el ají?', respuesta:'un ají', genero:'masculino',
          opciones:[{emoji:'🌶️',nombre:'ají',esCorrecto:true, color:'#FFEBEE', genero:'masculino'},{emoji:'🥜',nombre:'maní', esCorrecto:false,color:'#EFEBE9', genero:'masculino'},{emoji:'🌰',nombre:'castaña', esCorrecto:false,color:'#EFEBE9', genero:'femenino'},]
        },
        { id:'id_castana', tipo:'identificar', pregunta:'¿Cuál es la castaña?', audio:'¿Cuál es la castaña?', respuesta:'una castaña', genero:'femenino',
          opciones:[{emoji:'🌰',nombre:'castaña',esCorrecto:true, color:'#EFEBE9', genero:'femenino'},{emoji:'🥜',nombre:'maní', esCorrecto:false,color:'#EFEBE9', genero:'masculino'},{emoji:'🍄',nombre:'champiñón', esCorrecto:false,color:'#FFEBEE', genero:'masculino'},]
        },
        { id:'id_mani', tipo:'identificar', pregunta:'¿Cuál es el maní?', audio:'¿Cuál es el maní?', respuesta:'un maní', genero:'masculino',
          opciones:[{emoji:'🥜',nombre:'maní',esCorrecto:true, color:'#EFEBE9', genero:'masculino'},{emoji:'🌰',nombre:'castaña', esCorrecto:false,color:'#EFEBE9', genero:'femenino'},{emoji:'🥕',nombre:'zanahoria', esCorrecto:false,color:'#FFF3E0', genero:'femenino'},]
        }
    ],

    _opuestosIds: ['grande_pequeno','arriba_abajo','rapido_lento','caliente_frio','dia_noche','mucho_poco','abierto_cerrado','mojado_seco','lleno_vacio','pesado_liviano','limpio_sucio','adentro_afuera','fuerte_despacio','feliz_triste','largo_corto','encendido_apagado','duro_blando','joven_viejo','dulce_salado','dormido_despierto'],
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
            // 3 modos rotativos: situacion→cara / escucha y encuentra / laboratorio (armar cara)
            const modos = ['situacion_a_cara', 'cara_a_nombre', 'modo_laboratorio'];
            const modo  = modos[i % 3];
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

            const distractores = _distractor_colores_formas(correcto, pool, cfg.distractores);
            if (distractores.length === 0) continue; // safety

            let tipoMotor = ordenMotores[i % ordenMotores.length];
            // arrastre no tiene sentido para colores_formas (sin destino), usar selección
            if (tipoMotor === 'arrastre') tipoMotor = 'seleccion';

            // FIX: Lógica dura para forzar el texto correcto
            let textoInstruccion = `¡Toca ${correcto.articulo} ${correcto.nombre}!`;
            if (tipoMotor === 'memoria') {
                textoInstruccion = '¡Encuentra las parejas!';
            }

            nivelesGenerados.push({
                nivel:i+1, tipo_motor: tipoMotor,
                instruccion_texto: textoInstruccion,
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

    const poolOriginal   = [...diccionarios[categoria]];
    let   poolDisponible = [...poolOriginal];
    
    const partesCara     = ['ojo','oreja','nariz','boca'];
    // Añadimos 'pelo' para arreglar tu problema anterior
    const partesEnAvatar = ['ojo','oreja','nariz','boca','mano','pie','cabeza','pelo']; 

    // FIX MÁGICO: Configuración especial de motores solo para "Mi Cuerpo"
    let ordenMotores = [...cfg.motores];
    if (categoria === 'cuerpo') {
        // Obligamos a que el Avatar aparezca constantemente
        ordenMotores = edad === 'bebes' 
            ? ['identificar_avatar', 'seleccion'] 
            : ['identificar_avatar', 'seleccion', 'memoria'];
    }

    for (let i = 0; i < cantidadTotal; i++) {
        if (poolDisponible.length === 0) poolDisponible = [...poolOriginal];

        let tipoMotor = ordenMotores[i % ordenMotores.length];

        // LÓGICA INTELIGENTE: Filtramos el diccionario ANTES de elegir
        let opcionesValidas = poolDisponible;
        
        // Si el juego es Avatar, SOLO podemos elegir partes que estén dibujadas
        if (categoria === 'cuerpo' && tipoMotor === 'identificar_avatar') {
            opcionesValidas = poolDisponible.filter(item => partesEnAvatar.includes(item.id));
            
            // Si nos quedamos sin partes dibujadas (porque ya jugamos mucho), recargamos la lista
            if (opcionesValidas.length === 0) {
                poolDisponible = [...poolOriginal];
                opcionesValidas = poolDisponible.filter(item => partesEnAvatar.includes(item.id));
            }
        }

        // Si por alguna razón el filtro falla, usamos la lista completa como red de seguridad
        if (opcionesValidas.length === 0) opcionesValidas = [...poolOriginal];

        const idx      = Math.floor(Math.random() * opcionesValidas.length);
        const correcto = opcionesValidas[idx];

        // Remover el elemento elegido del pool general
        const indexReal = poolDisponible.findIndex(item => item.id === correcto.id);
        if (indexReal !== -1) poolDisponible.splice(indexReal, 1);

        const distractores = poolOriginal
            .filter(item => item.id !== correcto.id)
            .sort(()=>0.5-Math.random()).slice(0, cfg.distractores);

        // Si es de otra categoría y el motor es arrastre, lo mantenemos normal
        if (categoria !== 'cuerpo' && tipoMotor === 'identificar_avatar') {
            tipoMotor = 'arrastre'; 
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