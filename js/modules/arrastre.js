// js/modules/arrastre.js — Drag & drop corregido
// Bug fix: .game-card:active mueve el elemento 8px (top:8px) durante el drag,
// rompiendo las coordenadas. Se usa position:fixed durante el arrastre para
// desacoplar el elemento del layout completamente.

import GameEngine from '../core/GameEngine.js';

export default class ArrastreGame extends GameEngine {
    constructor(datosNivel, alCompletar) {
        super();
        this.datosNivel  = datosNivel;
        this.onWin       = alCompletar;
        this.contenedor  = document.getElementById('game-content');
        this._completado = false;
        this._init();
    }

    _init() {
        this.contenedor.innerHTML = `<h2 class="instruccion-titulo">${this.datosNivel.instruccion_texto}</h2>`;
        this.hablar(this.datosNivel.instruccion_texto);
        this._renderArrastre();
    }

    _renderArrastre() {
        const area = document.createElement('div');
        area.style.cssText = 'display:flex; flex-direction:column; align-items:center; margin-top:14px;';

        // ── DESTINO (zona de drop) ────────────────────────────────────────────
        const imgUrlMap = {
            mar:    'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Water%20wave/3D/water_wave_3d.png',
            cielo:  'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud/3D/cloud_3d.png',
            calle:  'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Motorway/3D/motorway_3d.png',
            casita: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png',
        };
        const urlDestino = imgUrlMap[this.datosNivel.destino_tipo] || imgUrlMap.casita;

        const destinoWrap = document.createElement('div');
        destinoWrap.style.cssText = 'position:relative; margin-bottom:30px; display:flex; flex-direction:column; align-items:center;';
        destinoWrap.innerHTML = `
            <img src="${urlDestino}" class="grafico-destino img-viva"
                 style="width:190px; transition:transform 0.3s ease;"
                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:6rem;\\'>✨</div>';">
        `;
        area.appendChild(destinoWrap);

        // ── PIEZAS ARRASTRABLES ───────────────────────────────────────────────
        const opcionesWrap = document.createElement('div');
        opcionesWrap.style.cssText = 'display:flex; gap:18px; justify-content:center; flex-wrap:wrap;';

        this.datosNivel.opciones.forEach(opcion => {
            const pieza = document.createElement('div');
            // ⚠️ Usamos clase propia, NO game-card, para evitar el top:8px del :active
            pieza.className = 'pieza-arrastre animate-pop';
            pieza.style.cssText = `
                width:120px; height:120px; padding:12px;
                background-color:${opcion.color || '#fff'};
                border-radius:24px;
                border:4px solid rgba(255,255,255,0.7);
                box-shadow: inset 0 -8px 0 rgba(0,0,0,0.12), 0 10px 14px rgba(0,0,0,0.1);
                display:flex; align-items:center; justify-content:center;
                cursor:grab; touch-action:none; user-select:none;
                transition: box-shadow 0.15s, transform 0.15s;
                position:relative;
            `;

            const imgEl = document.createElement('img');
            imgEl.src   = opcion.img || '';
            imgEl.style.cssText = 'width:88px; height:88px; object-fit:contain; pointer-events:none; filter:drop-shadow(0 6px 6px rgba(0,0,0,0.12));';
            imgEl.onerror = () => { imgEl.remove(); pieza.innerHTML = `<span style="font-size:3.5rem;">✨</span>`; };
            pieza.appendChild(imgEl);

            opcionesWrap.appendChild(pieza);
            this._habilitarArrastre(pieza, destinoWrap, opcion);
        });

        area.appendChild(opcionesWrap);
        this.contenedor.appendChild(area);
    }

    _habilitarArrastre(pieza, destinoWrap, datosOpcion) {
        // Posición "en reposo" acumulada (para que el rebote vuelva al origen)
        let startX = 0, startY = 0;   // clientX/Y donde empezó el drag
        let rectX  = 0, rectY  = 0;   // posición top-left de la pieza al iniciar

        const grafico = this.contenedor.querySelector('.grafico-destino');

        pieza.onpointerdown = (e) => {
            if (this._completado) return;
            e.preventDefault();
            pieza.setPointerCapture(e.pointerId);

            // Guardamos posición real en pantalla ANTES de cualquier transform
            const rect = pieza.getBoundingClientRect();
            rectX  = rect.left;
            rectY  = rect.top;
            startX = e.clientX;
            startY = e.clientY;

            pieza.style.cursor     = 'grabbing';
            pieza.style.zIndex     = '500';
            pieza.style.transition = 'none';
            pieza.style.boxShadow  = '0 20px 40px rgba(0,0,0,0.25)';
        };

        pieza.onpointermove = (e) => {
            if (!pieza.hasPointerCapture(e.pointerId)) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            pieza.style.transform = `translate(${dx}px, ${dy}px) scale(1.1) rotate(${dx * 0.02}deg)`;
        };

        pieza.onpointerup = (e) => {
            if (!pieza.hasPointerCapture(e.pointerId)) return;
            pieza.releasePointerCapture(e.pointerId);
            pieza.style.cursor  = 'grab';
            pieza.style.zIndex  = '10';
            pieza.style.boxShadow = '';

            // ── Detectar si cayó en la zona destino ──────────────────────────
            const rP = pieza.getBoundingClientRect();
            const rD = destinoWrap.getBoundingClientRect();
            const centroP = { x: rP.left + rP.width  / 2, y: rP.top  + rP.height / 2 };
            const centroD = { x: rD.left + rD.width  / 2, y: rD.top  + rD.height / 2 };
            const dist    = Math.hypot(centroP.x - centroD.x, centroP.y - centroD.y);

            // Radio de aceptación generoso para niños (120px)
            if (dist < 120) {
                if (datosOpcion.esCorrecto) {
                    this._acierto(pieza, grafico, datosOpcion);
                } else {
                    this._error(pieza, datosOpcion);
                }
            } else {
                // Soltó fuera → rebota al origen
                this._rebotar(pieza);
            }
        };

        // Cancelación (ej. segunda ventana, pérdida de foco)
        pieza.onpointercancel = () => this._rebotar(pieza);
    }

    _acierto(pieza, grafico, datosOpcion) {
        if (this._completado) return;
        this._completado = true;

        pieza.style.transition = 'all 0.4s ease-in';
        pieza.style.transform  = `${pieza.style.transform} scale(0)`;
        pieza.style.opacity    = '0';

        if (grafico) {
            grafico.style.transform = 'scale(1.3)';
            this.renderFeedback(true, grafico);
        }

        this.hablar(`¡Excelente! ${datosOpcion.articulo ? datosOpcion.articulo + ' ' : ''}${datosOpcion.nombre} llegó.`);
        setTimeout(() => this.onWin(), 1700);
    }

    _error(pieza, datosOpcion) {
        this.renderFeedback(false, pieza);
        this._rebotar(pieza);
        const correcto = this.datosNivel.opciones.find(o => o.esCorrecto);
        if (correcto) this.hablar(`Ese no es. Busca ${correcto.articulo || ''} ${correcto.nombre}.`);
    }

    _rebotar(pieza) {
        pieza.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        pieza.style.transform  = 'translate(0,0) scale(1) rotate(0deg)';
    }
}