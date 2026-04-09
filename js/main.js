// js/main.js - Controlador Principal (Clean Architecture)

import { generarNiveles } from './niveles.js';
import MemoriaGame from './modules/memoria.js';
import ArrastreGame from './modules/arrastre.js';   
import SeleccionGame from './modules/seleccion.js';
import AvatarGame from './modules/avatar.js';
import MathGame from './modules/math.js'; // Agrega este import arriba

// 1. GENERAMOS LOS DATOS AL INICIAR
const mundosData = {
    animales: generarNiveles('animales', 80),
    cuerpo: generarNiveles('cuerpo', 60),
    emociones: generarNiveles('emociones', 40),
    colores_formas: generarNiveles('colores_formas', 40),
    math: generarNiveles('math', 40),
    vehiculos: generarNiveles('vehiculos', 60)
};

class AppController {
    constructor(datosDeLosMundos) {
        this.mundosData = datosDeLosMundos; 
        this.menu = document.getElementById('menu-principal');
        this.canvas = document.getElementById('game-canvas');
        this.gameContent = document.getElementById('game-content');
        this.btnBack = document.getElementById('btn-back');
        
        // 👇 AGREGAMOS ESTA LÍNEA para controlar el título
        this.tituloPrincipal = document.querySelector('.main-header h1'); 
        
        this.nivelesActuales = [];
        this.indiceNivel = 0;

        this.init();
    }

    init() {
        // Asignamos eventos a las tarjetas del menú
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const moduleName = card.dataset.module;
                this.iniciarModulo(moduleName);
            });
        });
        
        // ¡ERROR ARREGLADO! Ahora llama a la función correcta
        this.btnBack.addEventListener('click', () => this.regresarAlMenu());
    }

    iniciarModulo(moduleName) {
        // Validación de seguridad por si el módulo no está creado aún
        if (this.mundosData[moduleName]) {
            this.menu.classList.add('hidden');
            this.canvas.classList.remove('hidden');
            
            // 👇 OCULTAMOS EL TÍTULO AL JUGAR para dar más espacio
            if(this.tituloPrincipal) this.tituloPrincipal.classList.add('hidden');

            this.nivelesActuales = this.mundosData[moduleName];
            this.indiceNivel = 0;
            this.cargarSiguienteNivel();
        } else {
            console.warn(`🚧 El módulo '${moduleName}' está en construcción.`);
        }
    }

    cargarSiguienteNivel() {
        if (this.indiceNivel < this.nivelesActuales.length) {
            const datosNivel = this.nivelesActuales[this.indiceNivel];
            this.gameContent.innerHTML = ''; 

            const onNivelCompletado = () => {
                this.indiceNivel++;
                this.cargarSiguienteNivel();
            };

            // Fábrica de Motores
            switch (datosNivel.tipo_motor) {
                case 'memoria':
                    new MemoriaGame(datosNivel, onNivelCompletado);
                    break;
                case 'arrastre':
                    new ArrastreGame(datosNivel, onNivelCompletado);
                    break;
                case 'seleccion':
                    new SeleccionGame(datosNivel, onNivelCompletado);
                    break;
                case 'identificar_avatar':
                    new AvatarGame(datosNivel, onNivelCompletado);
                    break;
                case 'math':
                    new MathGame(datosNivel, onNivelCompletado);
                    break;
                case 'conteo':
                    new MathGame(datosNivel, onNivelCompletado);
                    break;
            }
        } else {
            // Pantalla de victoria final
            this.gameContent.innerHTML = `
                <div style="text-align:center; padding: 50px; animation: pop-in 0.5s ease-out;">
                    <h2 style="font-size: 3rem; color: #4CAF50;">🌟 ¡ERES GENIAL! 🌟</h2>
                    <p style="font-size: 1.5rem; color: #555;">Completaste todos los desafíos.</p>
                </div>`;
            setTimeout(() => this.regresarAlMenu(), 4000);
        }
    }

    regresarAlMenu() {
        this.canvas.classList.add('hidden');
        this.menu.classList.remove('hidden');
        this.gameContent.innerHTML = '';
        
        // 👇 MOSTRAMOS EL TÍTULO DE NUEVO AL VOLVER AL MENÚ
        if(this.tituloPrincipal) this.tituloPrincipal.classList.remove('hidden');
    }
}

// 3. INICIAMOS LA APP
const app = new AppController(mundosData);