// js/modules/avatar.js
import GameEngine from '../core/GameEngine.js';

export default class AvatarGame extends GameEngine {
    constructor(datosNivel, callbackNivelCompletado) {
        super({ lives: 3 });
        this.datosNivel = datosNivel;
        this.onWin = callbackNivelCompletado;
        this.contenedor = document.getElementById('game-content');
        this.init();
    }

    init() {
        this.contenedor.innerHTML = `<h2 class="instruccion-titulo" style="text-align:center;">${this.datosNivel.instruccion_texto}</h2>`;
        this.hablar(this.datosNivel.instruccion_texto);
        this.renderAvatar();
    }

    renderAvatar() {
        const areaJuego = document.createElement('div');
        areaJuego.style.display = 'flex';
        areaJuego.style.justifyContent = 'center';
        areaJuego.style.marginTop = '20px';

        const avatarContainer = document.createElement('div');
        avatarContainer.style.position = 'relative';
        avatarContainer.style.width = '300px'; 
        avatarContainer.style.height = '450px';
        avatarContainer.className = 'animate-pop';

        const esCara = this.datosNivel.vista_avatar === "cara";
        let avatarImg = "";
        let hitboxesHTML = "";

        if (esCara) {
            // 📸 MODO ZOOM: Muestra una Cara Gigante
            avatarImg = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Child/Default/3D/child_3d_default.png";
            hitboxesHTML = `
                <div class="hitbox" data-partes="ojo" style="position: absolute; top: 35%; left: 20%; width: 60%; height: 20%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="oreja" style="position: absolute; top: 40%; left: 0%; width: 20%; height: 25%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="oreja" style="position: absolute; top: 40%; right: 0%; width: 20%; height: 25%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="nariz" style="position: absolute; top: 55%; left: 40%; width: 20%; height: 15%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="boca" style="position: absolute; top: 70%; left: 30%; width: 40%; height: 15%; cursor: pointer;"></div>
            `;
        } else {
            // 🧍 MODO NORMAL: Muestra el Cuerpo Entero
            avatarImg = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Person%20standing/Default/3D/person_standing_3d_default.png";
            hitboxesHTML = `
                <div class="hitbox" data-partes="cabeza" style="position: absolute; top: 5%; left: 25%; width: 50%; height: 25%; border-radius: 50%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="brazo,mano" style="position: absolute; top: 30%; left: 10%; width: 25%; height: 35%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="brazo,mano" style="position: absolute; top: 30%; right: 10%; width: 25%; height: 35%; cursor: pointer;"></div>
                <div class="hitbox" data-partes="pierna,pie" style="position: absolute; top: 60%; left: 25%; width: 50%; height: 35%; cursor: pointer;"></div>
            `;
        }

        avatarContainer.innerHTML = `
            <img src="${avatarImg}" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none; filter: drop-shadow(0 15px 15px rgba(0,0,0,0.2));">
            ${hitboxesHTML}
        `;

        areaJuego.appendChild(avatarContainer);
        this.contenedor.appendChild(areaJuego);

        const objetivoId = this.datosNivel.pieza.id;
        const hitboxes = avatarContainer.querySelectorAll('.hitbox');

        hitboxes.forEach(hitbox => {
            hitbox.onclick = () => {
                const partesAceptadas = hitbox.getAttribute('data-partes').split(',');
                const esCorrecto = partesAceptadas.includes(objetivoId);
                this.verificarSeleccion(esCorrecto, avatarContainer);
            };
        });
    }

    verificarSeleccion(esCorrecto, contenedor) {
        if (esCorrecto) {
            this.renderFeedback(true, contenedor);
            
            // Le damos la explicación pedagógica si existe
            if (this.datosNivel.pieza.descripcion) {
                this.hablar(`¡Ahí está! Usamos ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre} ${this.datosNivel.pieza.descripcion}.`);
            } else {
                this.hablar("¡Muy bien!");
            }

            setTimeout(() => this.onWin(), 2500);
        } else {
            this.renderFeedback(false, contenedor);
            this.hablar(`Esa no es ${this.datosNivel.pieza.articulo} ${this.datosNivel.pieza.nombre}. Busca bien.`);
        }
    }
}