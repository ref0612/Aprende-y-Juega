// js/main.js — v4 con opuestos, frutas y módulo emociones pedagógico

import GameEngine          from './core/GameEngine.js';
import { Progreso }        from './core/Progreso.js';
import { Transicion }      from './core/Transicion.js';
import { generarNiveles }  from './niveles.js';
import MemoriaGame         from './modules/memoria.js';
import ArrastreGame        from './modules/arrastre.js';
import SeleccionGame       from './modules/seleccion.js';
import AvatarGame          from './modules/avatar.js';
import MathGame            from './modules/math.js';
import EmocionesGame       from './modules/emociones.js';
import HigieneGame         from './modules/higiene.js';
import AbecedarioGame      from './modules/abecedario.js';
import OpuestosGame, { OPUESTOS } from './modules/opuestos.js';
import FrutasGame          from './modules/frutas.js';

const EDADES = {
    bebes:    { label:'🍼 Bebés',    rango:'1 – 2 años', nivelesMax:12, emoji:'🍼' },
    pequenos: { label:'⭐ Pequeños', rango:'3 – 4 años', nivelesMax:25, emoji:'⭐' },
    grandes:  { label:'🚀 Grandes',  rango:'4 – 5 años', nivelesMax:40, emoji:'🚀' },
};

const MODULOS_META = {
    animales:      { titulo:'🐶 Animales',        cantBase:80 },
    cuerpo:        { titulo:'🧒 Mi Cuerpo',        cantBase:60 },
    colores_formas:{ titulo:'🔷 Colores y Formas', cantBase:50 },
    emociones:     { titulo:'😊 Emociones',        cantBase:30 },
    math:          { titulo:'🔢 Matemáticas',      cantBase:40 },
    vehiculos:     { titulo:'🚀 Transportes',      cantBase:60 },
    abecedario:    { titulo:'🔤 Abecedario',       cantBase:54 },
    higiene:       { titulo:'🧼 Higiene',           cantBase:20 },
    opuestos:      { titulo:'↔️ Opuestos',          cantBase:24 },
    frutas:        { titulo:'🍎 Frutas y Verduras', cantBase:20 },
};

class AppController {
    constructor() {
        this.edadActual      = Progreso.getEdad() || null;
        this.mundosData      = {};
        this.nivelesActuales = [];
        this.indiceNivel     = 0;
        this.moduloActual    = '';

        this.elMenu       = document.getElementById('menu-principal');
        this.elCanvas     = document.getElementById('game-canvas');
        this.elContent    = document.getElementById('game-content');
        this.elBtnBack    = document.getElementById('btn-back');
        this.elStatsBar   = document.getElementById('stats-bar');
        this.elHeader     = document.getElementById('main-header');
        this.elModTitle   = document.getElementById('module-title');
        this.elProgFill   = document.getElementById('prog-bar-fill');
        this.elProgText   = document.getElementById('prog-text');
        this.elBienvenida = document.getElementById('bienvenida');
        this.elBtnEdad    = document.getElementById('btn-edad-actual');

        if (this.edadActual) {
            this._generarMundos();
            this._actualizarEstrellas();
        } else {
            this._mostrarBienvenida();
        }
        this._bindEvents();
    }

    _generarMundos() {
        const cfg = EDADES[this.edadActual] || EDADES.pequenos;
        for (const [key, meta] of Object.entries(MODULOS_META)) {
            const cant = Math.min(meta.cantBase, cfg.nivelesMax);
            this.mundosData[key] = generarNiveles(key, cant, this.edadActual);
        }
    }

    _bindEvents() {
        document.querySelectorAll('.game-card[data-module]').forEach(card => {
            card.addEventListener('click', () => {
                const mod = card.dataset.module;
                if (this.mundosData[mod]?.length > 0) this._iniciarModulo(mod);
            });
        });
        this.elBtnBack.addEventListener('click', () => this._regresarAlMenu());
        if (this.elBtnEdad) {
            this._refrescarBtnEdad();
            this.elBtnEdad.addEventListener('click', () => this._modalEdad());
        }
        document.querySelectorAll('.btn-bienvenida-edad').forEach(btn => {
            btn.addEventListener('click', () => this._elegirEdad(btn.dataset.edad));
        });
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(()=>{});
        }
    }

    _mostrarBienvenida() {
        this.elMenu.classList.add('hidden');
        this.elHeader.classList.add('hidden');
        if (this.elBienvenida) this.elBienvenida.classList.remove('hidden');
    }

    _elegirEdad(edad) {
        Progreso.setEdad(edad);
        this.edadActual = edad;
        this._generarMundos();
        this._refrescarBtnEdad();
        this._actualizarEstrellas();
        if (this.elBienvenida) this.elBienvenida.classList.add('hidden');
        this.elHeader.classList.remove('hidden');
        this.elMenu.classList.remove('hidden');
    }

    _modalEdad() {
        const overlay = document.createElement('div');
        overlay.id = 'modal-edad';
        overlay.innerHTML = `
            <div class="modal-edad-box animate-pop">
                <h2 class="modal-titulo">¿Cuántos años tienes?</h2>
                ${Object.entries(EDADES).map(([key,cfg]) => `
                    <button class="btn-edad-opcion ${key===this.edadActual?'activo':''}" data-edad="${key}">
                        <span class="edad-emoji">${cfg.emoji}</span>
                        <span class="edad-info"><strong>${cfg.label}</strong><small>${cfg.rango}</small></span>
                        ${key===this.edadActual?'<span class="edad-check">✓</span>':''}
                    </button>`).join('')}
                <button class="btn-cerrar-modal">✕ Cerrar</button>
            </div>`;
        document.body.appendChild(overlay);
        overlay.querySelectorAll('.btn-edad-opcion').forEach(btn => {
            btn.onclick = () => { this._elegirEdad(btn.dataset.edad); overlay.remove(); };
        });
        overlay.querySelector('.btn-cerrar-modal').onclick = () => overlay.remove();
        overlay.onclick = e => { if (e.target===overlay) overlay.remove(); };
    }

    _refrescarBtnEdad() {
        if (!this.elBtnEdad || !this.edadActual) return;
        const cfg = EDADES[this.edadActual];
        this.elBtnEdad.textContent = cfg.emoji + ' ' + cfg.label;
    }

    _actualizarEstrellas() {
        const todos = Progreso.getTodosModulos();
        document.querySelectorAll('.game-card[data-module]').forEach(card => {
            const mod  = card.dataset.module;
            const data = todos[mod];
            card.querySelectorAll('.card-stars').forEach(el=>el.remove());
            if (data?.estrellas > 0) {
                const div = document.createElement('div');
                div.className = 'card-stars';
                div.innerHTML = Array.from({length:3},(_,i)=>
                    `<span>${i<data.estrellas?'⭐':'☆'}</span>`).join('');
                card.appendChild(div);
            }
        });
        const totalEl = document.getElementById('total-estrellas');
        if (totalEl) totalEl.textContent = `⭐ ${Progreso.getTotalEstrellas()}`;
    }

    _iniciarModulo(modName) {
        this.juegoActivo = true; // Activamos el motor del juego
        this.moduloActual    = modName;
        this.nivelesActuales = this.mundosData[modName];
        this.indiceNivel     = 0;

        GameEngine.resetSession();

        this.elMenu.classList.add('hidden');
        this.elHeader.classList.add('hidden');
        this.elCanvas.classList.remove('hidden');
        this.elStatsBar.classList.remove('hidden');

        if (this.elModTitle) this.elModTitle.textContent = MODULOS_META[modName]?.titulo || modName;

        this._actualizarProgreso();
        this._cargarNivel();
    }

    async _cargarNivel() {
        if (this.indiceNivel >= this.nivelesActuales.length) {
            this._completarModulo(); return;
        }
        await Transicion.fadeNivel(this.elContent);
        this.elContent.innerHTML = '';
        this._actualizarProgreso();

        const datos = this.nivelesActuales[this.indiceNivel];
        const onCompleto = async () => {
            if (!this.juegoActivo) return; // <--- Si el niño se fue al menú, ignoramos la victoria
            if (this.indiceNivel > 0 && this.indiceNivel % 5 === 0) {
                await Transicion.mostrarBravo(this.elContent, '¡Sigue así!', '🌟');
            }
            this.indiceNivel++;
            this._cargarNivel();
        };

        switch (datos.tipo_motor) {
            case 'memoria':            new MemoriaGame(datos, onCompleto);    break;
            case 'arrastre':           new ArrastreGame(datos, onCompleto);   break;
            case 'seleccion':          new SeleccionGame(datos, onCompleto);  break;
            case 'identificar_avatar': new AvatarGame(datos, onCompleto);     break;
            case 'conteo': case 'math':new MathGame(datos, onCompleto);       break;
            case 'emociones':          new EmocionesGame(datos, onCompleto);  break;
            case 'higiene':            new HigieneGame(datos, onCompleto);    break;
            case 'abecedario':         new AbecedarioGame(datos, onCompleto); break;
            case 'opuestos': {
                // El motor de opuestos necesita el objeto OPUESTO completo
                const op = OPUESTOS.find(o => o.id === datos.opuestoId);
                if (op) {
                    const nivelOp = { ...datos, pregunta:op.pregunta, audio:op.audio, opciones:op.opciones };
                    new OpuestosGame(nivelOp, onCompleto);
                } else { onCompleto(); }
                break;
            }
            case 'frutas':             new FrutasGame(datos, onCompleto);     break;
            default: onCompleto();
        }
    }

    _completarModulo() {
        const score     = GameEngine.score;
        const total     = this.nivelesActuales.length;
        const estrellas = Progreso.guardarModulo(this.moduloActual, score, total);
        this._actualizarEstrellas();
        Transicion.pantallaVictoria(this.elContent, score, estrellas, this.moduloActual);
        setTimeout(() => this._regresarAlMenu(), 5000);
    }

    _actualizarProgreso() {
        const total = this.nivelesActuales.length;
        // FIX: Sumamos 1 para que el Nivel 1 ya tenga un poquito de verde y sea proporcional
        const pct   = Math.round(((this.indiceNivel + 1) / total) * 100);
        if (this.elProgFill) this.elProgFill.style.width = pct + '%';
        if (this.elProgText) this.elProgText.textContent = `${this.indiceNivel + 1}/${total}`;
    }

    _regresarAlMenu() {
        this.juegoActivo = false; // <--- EL ESCUDO: Apagamos el motor
        // FIX: Guardar el esfuerzo del niño si sale a la mitad del juego (Guardado parcial)
        if (this.indiceNivel > 0) {
            Progreso.guardarModulo(this.moduloActual, GameEngine.score, this.nivelesActuales.length);
            this._actualizarEstrellas();
        }

        this.elCanvas.classList.add('hidden');
        this.elStatsBar.classList.add('hidden');
        this.elHeader.classList.remove('hidden');
        this.elMenu.classList.remove('hidden');
        this.elContent.innerHTML = '';
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
}

new AppController();