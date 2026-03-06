// js/niveles.js

// 1. NUESTRO DICCIONARIO DE VOCABULARIO
// Aquí están los elementos base. El motor los mezclará para crear los niveles.
const diccionarios = {
    animales: [
        { id: "perro", emoji: "🐶", color: "#D7CCC8", nombre: "perrito" },
        { id: "gato", emoji: "🐱", color: "#FFE0B2", nombre: "gatito" },
        { id: "vaca", emoji: "🐮", color: "#E1BEE7", nombre: "la vaca" },
        { id: "cerdo", emoji: "🐷", color: "#F8BBD0", nombre: "el cerdito" },
        { id: "pato", emoji: "🦆", color: "#FFF9C4", nombre: "el pato" },
        { id: "leon", emoji: "🦁", color: "#FFE082", nombre: "el león" },
        { id: "mono", emoji: "🐒", color: "#BCAAA4", nombre: "el mono" },
        { id: "rana", emoji: "🐸", color: "#C8E6C9", nombre: "la rana" },
        { id: "oso", emoji: "🐻", color: "#8D6E63", nombre: "el oso" },
        { id: "conejo", emoji: "🐰", color: "#F5F5F5", nombre: "el conejo" }
    ],
    colores: [
        { id: "rojo", emoji: "🔴", color: "#E57373", nombre: "color rojo" },
        { id: "azul", emoji: "🔵", color: "#64B5F6", nombre: "color azul" },
        { id: "verde", emoji: "🟢", color: "#81C784", nombre: "color verde" },
        { id: "amarillo", emoji: "🟡", color: "#FFF176", nombre: "color amarillo" },
        { id: "naranja", emoji: "🟠", color: "#FFB74D", nombre: "color naranja" },
        { id: "morado", emoji: "🟣", color: "#BA68C8", nombre: "color morado" },
        { id: "rosa", emoji: "🌸", color: "#F48FB1", nombre: "color rosa" },
        { id: "blanco", emoji: "⚪", color: "#FFFFFF", nombre: "color blanco" },
        { id: "negro", emoji: "⚫", color: "#424242", nombre: "color negro" }
    ],
    formas: [
        { id: "estrella", emoji: "⭐", color: "#FFF59D", nombre: "la estrella" },
        { id: "cuadrado", emoji: "⏹️", color: "#BA68C8", nombre: "el cuadrado" },
        { id: "circulo", emoji: "⏺️", color: "#4DD0E1", nombre: "el círculo" },
        { id: "triangulo", emoji: "🔺", color: "#FF8A65", nombre: "el triángulo" },
        { id: "corazon", emoji: "❤️", color: "#E57373", nombre: "el corazón" },
        { id: "diamante", emoji: "💎", color: "#4FC3F7", nombre: "el diamante" },
        { id: "luna", emoji: "🌙", color: "#FFF176", nombre: "la luna" },
        { id: "nube", emoji: "☁️", color: "#E0E0E0", nombre: "la nube" }
    ]
};

// 2. FUNCIONES AYUDANTES PARA MEZCLAR
function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function obtenerElementosAleatorios(array, cantidad) {
    const mezclado = mezclarArray([...array]);
    return mezclado.slice(0, cantidad);
}

// 3. LA FÁBRICA DE NIVELES (Generación Procedural)
function generarNiveles(categoria, cantidadTotal) {
    const nivelesGenerados = [];
    const diccionario = diccionarios[categoria];

    for (let i = 1; i <= cantidadTotal; i++) {
        // Elegir un motor al azar (0: Selección, 1: Arrastre, 2: Memoria)
        const tipoAleatorio = Math.floor(Math.random() * 3);
        const elementosBase = obtenerElementosAleatorios(diccionario, 3); // Tomamos 3 elementos distintos
        const elementoCorrecto = elementosBase[0];

        let nivel = { nivel: i };

        if (tipoAleatorio === 0) {
            // --- MOTOR DE SELECCIÓN ---
            nivel.tipo_motor = "seleccion";
            nivel.instruccion_texto = `¡Toca ${elementoCorrecto.nombre}!`;
            
            // Creamos las opciones (2 o 3 opciones dependiendo de la dificultad)
            const numOpciones = i < 10 ? 2 : 3; // Nivel 1 a 9 son más fáciles (2 opciones)
            let opciones = [];
            for(let j=0; j < numOpciones; j++) {
                opciones.push({
                    id: elementosBase[j].id,
                    color: elementosBase[j].color,
                    emoji: elementosBase[j].emoji,
                    esCorrecto: (j === 0) // El primero siempre es el correcto
                });
            }
            // Mezclamos las opciones para que el correcto no siempre esté en el mismo lugar
            nivel.opciones = mezclarArray(opciones);

        } else if (tipoAleatorio === 1) {
            // --- MOTOR DE ARRASTRE ---
            nivel.tipo_motor = "arrastre";
            nivel.instruccion_texto = `Pon ${elementoCorrecto.nombre} en su sombra`;
            nivel.pieza = { id: elementoCorrecto.id, color: elementoCorrecto.color, emoji: elementoCorrecto.emoji };
            nivel.silueta = { emoji: elementoCorrecto.emoji };

        } else {
            // --- MOTOR DE MEMORIA ---
            nivel.tipo_motor = "memoria";
            nivel.instruccion_texto = "¡Encuentra las parejas!";
            // Usamos 2 parejas para que sea fácil para 2 años
            nivel.parejas = [
                { id: elementosBase[0].id, color: elementosBase[0].color, emoji: elementosBase[0].emoji },
                { id: elementosBase[1].id, color: elementosBase[1].color, emoji: elementosBase[1].emoji }
            ];
        }

        nivelesGenerados.push(nivel);
    }

    return nivelesGenerados;
}

// 4. CREAR LOS MUNDOS (Construimos 80 niveles por cada uno)
const mundosData = {
    "animales": generarNiveles("animales", 80),
    "colores": generarNiveles("colores", 80),
    "formas": generarNiveles("formas", 80)
};