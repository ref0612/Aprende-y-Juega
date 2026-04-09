// js/core/GameEngine.js

const SOUNDS = {
    SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
    ERROR: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'
};

export default class GameEngine {
    constructor(config = {}) {
        this.lives = config.lives || 3;
        this.onGameOver = config.onGameOver || function(){};
        this.onWin = config.onWin || function(){};
        
        this.initVoz();
        this.initMagiaTactil();
    }

    // --- 1. SISTEMA DE VOZ (Optimizado para Chile/Latam) ---
    initVoz() {
        this.vocesDisponibles = [];
        window.speechSynthesis.onvoiceschanged = () => { 
            this.vocesDisponibles = window.speechSynthesis.getVoices(); 
        };
    }

    hablar(texto) {
        window.speechSynthesis.cancel(); 
        const locutor = new SpeechSynthesisUtterance(texto);
        locutor.rate = 0.9; // Velocidad perfecta para niños
        locutor.pitch = 1.3; // Tono más dulce
        
        if (this.vocesDisponibles.length === 0) {
            this.vocesDisponibles = window.speechSynthesis.getVoices();
        }
        
        // Busca voz chilena primero, luego mexicana/latina, luego cualquiera en español
        const vozIdeal = this.vocesDisponibles.find(v => v.lang === 'es-CL') || 
                         this.vocesDisponibles.find(v => v.lang.includes('es-MX') || v.name.includes('Paulina')) ||
                         this.vocesDisponibles.find(v => v.lang.includes('es'));
                         
        if (vozIdeal) locutor.voice = vozIdeal;
        window.speechSynthesis.speak(locutor);
    }

    // --- 2. SISTEMA DE AUDIO EFECTOS ---
    reproducirSonido(url) {
        const audio = new Audio(url);
        audio.volume = 0.5;
        audio.play().catch(() => {}); // Evita errores si el navegador bloquea el auto-play
    }

    // --- 3. EFECTOS VISUALES Y TÁCTILES ---
    lanzarConfeti() {
        const colores = ['#FFCDD2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7'];
        const fragment = document.createDocumentFragment(); // Optimización de rendimiento

        for (let i = 0; i < 50; i++) {
            const confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.style.left = Math.random() * 100 + 'vw';
            confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            confeti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            fragment.appendChild(confeti);
        }
        
        document.body.appendChild(fragment);
        setTimeout(() => {
            document.querySelectorAll('.confeti').forEach(c => c.remove());
        }, 4000);
    }

    initMagiaTactil() {
        if (window.magiaActivada) return;
        window.magiaActivada = true;

        document.body.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button') || e.target.closest('#ui-superior')) return;
            
            const chispa = document.createElement('div');
            chispa.className = 'chispa-tactil';
            chispa.innerText = ['✨','🫧','⭐'][Math.floor(Math.random()*3)];
            chispa.style.left = (e.clientX - 15) + 'px';
            chispa.style.top = (e.clientY - 15) + 'px';
            
            document.body.appendChild(chispa);
            setTimeout(() => chispa.remove(), 600);
        });
    }

    // --- 4. FEEDBACK UNIVERSAL ---
    renderFeedback(isCorrect, element) {
        if (isCorrect) {
            this.reproducirSonido(SOUNDS.SUCCESS);
            this.lanzarConfeti();
            element.classList.add('animate-bounce-success');
        } else {
            this.reproducirSonido(SOUNDS.ERROR);
            element.classList.add('animate-shake-error');
        }
        
        // Limpiar clases para poder volver a animar en el futuro
        setTimeout(() => {
            element.classList.remove('animate-bounce-success', 'animate-shake-error');
        }, 600);
    }
}