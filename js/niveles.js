// js/niveles.js - Diccionario Maestro Unificado

const diccionarios = {
    animales: [
        { id: "dog", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dog/3D/dog_3d.png", color: "#FFECB3", nombre: "perrito", articulo: "el", destino: "casita" },
        { id: "cat", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png", color: "#FFECB3", nombre: "gatito", articulo: "el", destino: "casita" },
        { id: "dolphin", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Dolphin/3D/dolphin_3d.png", color: "#E0F7FA", nombre: "delfín", articulo: "el", destino: "mar" },
        { id: "shark", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shark/3D/shark_3d.png", color: "#E0F7FA", nombre: "tiburón", articulo: "el", destino: "mar" },
        { id: "monkey", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Monkey/3D/monkey_3d.png", color: "#D7CCC8", nombre: "mono", articulo: "el", destino: "casita" },
        { id: "pig", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Pig/3D/pig_3d.png", color: "#FCE4EC", nombre: "cerdito", articulo: "el", destino: "casita" },
        { id: "frog", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Frog/3D/frog_3d.png", color: "#E8F5E9", nombre: "ranita", articulo: "la", destino: "casita" },
        { id: "penguin", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Penguin/3D/penguin_3d.png", color: "#E0F2F1", nombre: "pingüino", articulo: "el", destino: "mar" },
        { id: "whale", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Whale/3D/whale_3d.png", color: "#E3F2FD", nombre: "ballena", articulo: "la", destino: "mar" },
        { id: "elephant", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Elephant/3D/elephant_3d.png", color: "#ECEFF1", nombre: "elefante", articulo: "el", destino: "casita" },
        { id: "giraffe", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Giraffe/3D/giraffe_3d.png", color: "#FFF9C4", nombre: "jirafa", articulo: "la", destino: "casita" }
    ],
    cuerpo: [
        { id: "ojo", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Eye/3D/eye_3d.png", color: "#E3F2FD", nombre: "ojo", articulo: "el", descripcion: "para ver los colores", destino: "silueta" },
        
        // A los que tienen tono de piel se les añade "_default" al final del nombre del PNG
        { id: "oreja", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ear/Default/3D/ear_3d_default.png", color: "#E3F2FD", nombre: "oreja", articulo: "la", descripcion: "para escuchar música", destino: "silueta" },
        { id: "nariz", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Nose/Default/3D/nose_3d_default.png", color: "#E3F2FD", nombre: "nariz", articulo: "la", descripcion: "para oler las flores", destino: "silueta" },
        { id: "mano", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Waving%20hand/Default/3D/waving_hand_3d_default.png", color: "#E3F2FD", nombre: "mano", articulo: "la", descripcion: "para aplaudir", destino: "silueta" },
        { id: "pie", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Foot/Default/3D/foot_3d_default.png", color: "#E3F2FD", nombre: "pie", articulo: "el", descripcion: "para correr y saltar", destino: "silueta" },
        
        { id: "boca", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mouth/3D/mouth_3d.png", color: "#E3F2FD", nombre: "boca", articulo: "la", descripcion: "para hablar y cantar", destino: "silueta" },
        { id: "lengua", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tongue/3D/tongue_3d.png", color: "#E3F2FD", nombre: "lengua", articulo: "la", descripcion: "para sentir los sabores", destino: "silueta" },
        { id: "diente", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tooth/3D/tooth_3d.png", color: "#E3F2FD", nombre: "diente", articulo: "el", descripcion: "para masticar", destino: "silueta" },
        { id: "cabeza", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Child/Default/3D/child_3d_default.png", color: "#E3F2FD", nombre: "cabeza", articulo: "la", descripcion: "para pensar y usar sombreros", destino: "silueta" }
    ],
    emociones: [
        { id: "feliz", img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.webp", color: "#C8E6C9", nombre: "feliz", articulo: "la cara" },
        { id: "triste", img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/512.webp", color: "#BBDEFB", nombre: "triste", articulo: "la cara" },
        { id: "enojado", img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp", color: "#FFCDD2", nombre: "enojada", articulo: "la cara" },
        { id: "sorprendido", img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f632/512.webp", color: "#E1BEE7", nombre: "sorprendida", articulo: "la cara" },
        { id: "asustado", img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f628/512.webp", color: "#D7CCC8", nombre: "asustada", articulo: "la cara" }
    ],
    colores_formas: [
        { id: "circulo_rojo", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20circle/3D/red_circle_3d.png", color: "#FFEBEE", nombre: "círculo rojo", articulo: "el" },
        { id: "circulo_azul", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Blue%20circle/3D/blue_circle_3d.png", color: "#E3F2FD", nombre: "círculo azul", articulo: "el" },
        { id: "cuadrado_rojo", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20square/3D/red_square_3d.png", color: "#FFEBEE", nombre: "cuadrado rojo", articulo: "el" },
        { id: "cuadrado_azul", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Blue%20square/3D/blue_square_3d.png", color: "#E3F2FD", nombre: "cuadrado azul", articulo: "el" },
        { id: "estrella_amarilla", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star/3D/star_3d.png", color: "#FFF9C4", nombre: "estrella amarilla", articulo: "la" },
        { id: "corazon_rojo", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png", color: "#FFEBEE", nombre: "corazón rojo", articulo: "el" }
    ],
    vehiculos: [
        { id: "auto", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Automobile/3D/automobile_3d.png", color: "#FFCDD2", nombre: "auto", articulo: "el", destino: "calle" },
        { id: "bomberos", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire%20engine/3D/fire_engine_3d.png", color: "#FFCDD2", nombre: "camión de bomberos", articulo: "el", destino: "calle" },
        { id: "policia", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Police%20car/3D/police_car_3d.png", color: "#BBDEFB", nombre: "auto de policía", articulo: "el", destino: "calle" },
        { id: "avion", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Airplane/3D/airplane_3d.png", color: "#E1F5FE", nombre: "avión", articulo: "el", destino: "cielo" },
        { id: "cohete", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png", color: "#D1C4E9", nombre: "cohete", articulo: "el", destino: "cielo" },
        { id: "barco", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Ship/3D/ship_3d.png", color: "#B3E5FC", nombre: "barco", articulo: "el", destino: "mar" },
        { id: "tren", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Locomotive/3D/locomotive_3d.png", color: "#C8E6C9", nombre: "tren", articulo: "el", destino: "calle" },
        { id: "tractor", img: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Tractor/3D/tractor_3d.png", color: "#DCEDC8", nombre: "tractor", articulo: "el", destino: "calle" }
    ]
};

/**
 * Genera una serie de niveles únicos sin repeticiones seguidas
 * @param {string} categoria - 'animales', 'cuerpo', etc.
 * @param {number} cantidadTotal - Cuántos niveles generar
 */
export function generarNiveles(categoria, cantidadTotal) {
    const nivelesGenerados = [];

    // 🧮 LÓGICA ESPECIAL PARA MATEMÁTICAS (CONTEO)
    if (categoria === 'math') {
        const itemsContar = [
            { emoji: "🍎", plural: "manzanas", singular: "manzana" },
            { emoji: "🐶", plural: "perritos", singular: "perrito" },
            { emoji: "🚗", plural: "autos", singular: "auto" },
            { emoji: "🎈", plural: "globos", singular: "globo" }
        ];

        for (let i = 0; i < cantidadTotal; i++) {
            const item = itemsContar[Math.floor(Math.random() * itemsContar.length)];
            const cantidadCorrecta = Math.floor(Math.random() * 5) + 1; // 1 al 5

            let distractores = [1, 2, 3, 4, 5].filter(n => n !== cantidadCorrecta);
            distractores = distractores.sort(() => 0.5 - Math.random()).slice(0, 2); // 2 opciones erróneas

            const opciones = [
                { cantidad: cantidadCorrecta, esCorrecto: true, item: item },
                { cantidad: distractores[0], esCorrecto: false, item: item },
                { cantidad: distractores[1], esCorrecto: false, item: item }
            ].sort(() => 0.5 - Math.random());

            const nombreItem = cantidadCorrecta === 1 ? item.singular : item.plural;

            nivelesGenerados.push({
                nivel: i + 1,
                tipo_motor: 'conteo',
                instruccion_texto: `¡Toca donde hay ${cantidadCorrecta} ${nombreItem}!`,
                opciones: opciones
            });
        }
        return nivelesGenerados;
    }

    // LÓGICA PARA EL RESTO DE MUNDOS
    if (!diccionarios[categoria]) return []; 
    const poolOriginal = [...diccionarios[categoria]];
    let poolDisponible = [...poolOriginal];

    for (let i = 0; i < cantidadTotal; i++) {
        if (poolDisponible.length === 0) poolDisponible = [...poolOriginal];

        const indexCorrecto = Math.floor(Math.random() * poolDisponible.length);
        const correcto = poolDisponible.splice(indexCorrecto, 1)[0];

        const distractores = poolOriginal
            .filter(item => item.id !== correcto.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const ordenMotores = ["seleccion", "arrastre", "memoria"];
        let tipoMotor = ordenMotores[i % 3];

        // 🧠 DEFINIMOS LAS PARTES AQUÍ PARA QUE TODO EL CÓDIGO LAS VEA
        const partesCara = ["ojo", "oreja", "nariz", "boca"];
        const partesAbstractas = ["diente", "lengua", "cabeza"];

        // 🛡️ BLOQUEOS INTELIGENTES
        if (tipoMotor === "arrastre" && categoria === "cuerpo") {
            tipoMotor = partesAbstractas.includes(correcto.id) ? "seleccion" : "identificar_avatar";
        }
        if (tipoMotor === "arrastre" && (categoria === "emociones" || categoria === "colores_formas")) {
            tipoMotor = "seleccion";
        }

        let nivel = { nivel: i + 1, tipo_motor: tipoMotor };

        // ⚙️ CONFIGURACIÓN DE CADA MOTOR
        if (tipoMotor === "seleccion") {
            nivel.instruccion_texto = categoria === 'cuerpo' 
                ? `¡Toca ${correcto.articulo} ${correcto.nombre} ${correcto.descripcion}!`
                : `¡Toca ${correcto.articulo} ${correcto.nombre}!`;
            
            nivel.opciones = [
                { ...correcto, esCorrecto: true },
                ...distractores.map(d => ({ ...d, esCorrecto: false }))
            ].sort(() => 0.5 - Math.random());
        } 
        else if (tipoMotor === "identificar_avatar") {
            // ¡AHORA SÍ FUNCIONARÁ SIN ERRORES!
            nivel.vista_avatar = partesCara.includes(correcto.id) ? "cara" : "cuerpo";
            nivel.instruccion_texto = `¡Toca ${correcto.articulo} ${correcto.nombre} en el niño!`;
            nivel.pieza = { ...correcto };
        }
        else if (tipoMotor === "arrastre") {
            // Instrucción dinámica según el destino
            if (correcto.destino === "mar") {
                nivel.instruccion_texto = `¡Lleva ${correcto.articulo} ${correcto.nombre} al mar!`;
            } else if (correcto.destino === "cielo") {
                nivel.instruccion_texto = `¡Lleva ${correcto.articulo} ${correcto.nombre} al cielo!`;
            } else if (correcto.destino === "calle") {
                nivel.instruccion_texto = `¡Lleva ${correcto.articulo} ${correcto.nombre} a la calle!`;
            } else {
                nivel.instruccion_texto = `Lleva ${correcto.articulo} ${correcto.nombre} a su casita`;
            }

            nivel.pieza = { ...correcto }; // Mantenemos esto para compatibilidad
            nivel.destino_tipo = correcto.destino; 
            
            // 🧠 ¡LA MAGIA! Agregamos opciones múltiples (1 correcta + 2 falsas)
            nivel.opciones = [
                { ...correcto, esCorrecto: true },
                ...distractores.slice(0, 2).map(d => ({ ...d, esCorrecto: false }))
            ].sort(() => 0.5 - Math.random());
        } 
        else {
            nivel.instruccion_texto = "¡Encuentra las parejas!";
            nivel.parejas = [correcto, ...distractores];
        }

        nivelesGenerados.push(nivel);
    }

    return nivelesGenerados;
}