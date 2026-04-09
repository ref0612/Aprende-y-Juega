// js/modules/arrastre.js
import GameEngine from '../core/GameEngine.js';

export default class ArrastreGame extends GameEngine {
    constructor(datosNivel, alCompletar) {
        super({ lives: 3 });
        this.datosNivel = datosNivel;
        this.onWin = alCompletar;
        this.contenedor = document.getElementById('game-content');
        this.init();
    }

    init() {
        this.contenedor.innerHTML = `<h2 class="instruccion-titulo" style="text-align:center;">${this.datosNivel.instruccion_texto}</h2>`;
        this.hablar(this.datosNivel.instruccion_texto);
        this.renderArrastre();
    }

    renderArrastre() {
        const areaJuego = document.createElement('div');
        areaJuego.style.display = 'flex';
        areaJuego.style.flexDirection = 'column';
        areaJuego.style.alignItems = 'center';
        areaJuego.style.marginTop = '20px';

        // 1. EL DESTINO (ARRIBA)
        const destinoContainer = document.createElement('div');
        destinoContainer.style.position = 'relative';
        destinoContainer.style.marginBottom = '40px';
        
        let urlDestino = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png"; 
        if (this.datosNivel.destino_tipo === "mar") urlDestino = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Water%20wave/3D/water_wave_3d.png";
        if (this.datosNivel.destino_tipo === "cielo") urlDestino = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cloud/3D/cloud_3d.png";
        if (this.datosNivel.destino_tipo === "calle") urlDestino = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Motorway/3D/motorway_3d.png";

        destinoContainer.innerHTML = `
            <div class="contenedor-imagen-destino" style="font-size: 150px;">
                <img src="${urlDestino}" class="grafico-destino" style="width: 200px; transition: all 0.3s ease;"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='✨';">
            </div>
            <div id="zona-objetivo" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px;"></div>
        `;
        areaJuego.appendChild(destinoContainer);

        // 2. LAS OPCIONES A ARRASTRAR (ABAJO)
        const opcionesContainer = document.createElement('div');
        opcionesContainer.style.display = 'flex';
        opcionesContainer.style.gap = '20px';
        opcionesContainer.style.justifyContent = 'center';
        opcionesContainer.style.flexWrap = 'wrap';

        this.datosNivel.opciones.forEach(opcion => {
            const pieza = document.createElement('div');
            pieza.className = 'game-card animate-pop';
            pieza.style.width = '130px';
            pieza.style.height = '130px';
            pieza.style.padding = '15px';
            pieza.style.backgroundColor = opcion.color || '#ffffff';
            pieza.style.touchAction = 'none'; // Evita el scroll nativo al tocar
            pieza.style.zIndex = '10';
            
            pieza.innerHTML = `
                <img src="${opcion.img}" style="width: 100px; height: 100px; object-fit: contain; pointer-events: none; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size: 4rem;\'>✨</span>';">
            `;

            opcionesContainer.appendChild(pieza);
            
            // Le pasamos la pieza, la zona y los datos completos a la física de arrastre
            this.habilitarArrastre(pieza, destinoContainer.querySelector('#zona-objetivo'), opcion);
        });

        areaJuego.appendChild(opcionesContainer);
        this.contenedor.appendChild(areaJuego);
    }

    habilitarArrastre(pieza, zonaObjetivo, datosOpcion) {
        let iX = 0, iY = 0, aX = 0, aY = 0;
        const graficoDestino = this.contenedor.querySelector('.grafico-destino');

        pieza.onpointerdown = (e) => {
            pieza.setPointerCapture(e.pointerId);
            iX = e.clientX - aX;
            iY = e.clientY - aY;
            pieza.style.zIndex = 100;
            pieza.style.transition = 'none'; // Quitamos transición para que siga el dedo en tiempo real
        };

        pieza.onpointermove = (e) => {
            if (!pieza.hasPointerCapture(e.pointerId)) return;
            aX = e.clientX - iX;
            aY = e.clientY - iY;
            pieza.style.transform = `translate(${aX}px, ${aY}px) scale(1.1)`;
        };

        pieza.onpointerup = (e) => {
            pieza.releasePointerCapture(e.pointerId);
            pieza.style.zIndex = 10;
            
            const rP = pieza.getBoundingClientRect();
            const rS = zonaObjetivo.getBoundingClientRect();
            const dist = Math.hypot((rP.left + rP.width/2) - (rS.left + rS.width/2), (rP.top + rP.height/2) - (rS.top + rS.height/2));

            if (dist < 100) {
                // El niño soltó la pieza en el objetivo. ¿Es la correcta?
                if (datosOpcion.esCorrecto) {
                    // ÉXITO
                    this.hablar("¡Excelente! Llegamos.");
                    pieza.style.transition = "all 0.4s ease-in";
                    pieza.style.transform = `translate(${aX}px, ${aY}px) scale(0)`;
                    pieza.style.opacity = "0";

                    if (graficoDestino) {
                        graficoDestino.style.transform = "scale(1.2)";
                        this.renderFeedback(true, graficoDestino);
                    }
                    setTimeout(() => this.onWin(), 1500);
                } else {
                    // SE EQUIVOCÓ DE PIEZA
                    aX = 0; aY = 0;
                    pieza.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                    pieza.style.transform = `translate(0px, 0px)`;
                    this.renderFeedback(false, pieza);
                    this.hablar(`Ese no es ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}.`);
                }
            } else {
                // SOLTÓ FUERA DEL DESTINO (Vuelve a su lugar)
                aX = 0; aY = 0;
                pieza.style.transition = "transform 0.4s ease-out";
                pieza.style.transform = `translate(0px, 0px)`;
            }
        };
    }
}