// js/core/GameEngine.js — Motor base con score y vidas implementados

const SOUNDS = {
    SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
    ERROR:   'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
    FLIP:    'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
};

export default class GameEngine {

    // ── Estado global de sesión ─────────────────────────────────────────────
    static score = 0;
    static lives = 3;

    constructor(config = {}) {
        this.initVoz();
        this.initMagiaTactil();
        GameEngine._refreshUI();
    }

    // ── 1. SCORE Y VIDAS ───────────────────────────────────────────────────
    static resetSession() {
        GameEngine.score = 0;
        GameEngine.lives = 3;
        GameEngine._refreshUI();
    }

    static addScore(puntos = 10) {
        GameEngine.score += puntos;
        GameEngine._refreshUI();
        // Mini animación del score
        const el = document.getElementById('score-display');
        if (el) {
            el.style.transform = 'scale(1.4)';
            el.style.color = '#FF6F00';
            setTimeout(() => { el.style.transform = ''; el.style.color = ''; }, 300);
        }
    }

    static loseLife() {
        GameEngine.lives = Math.max(0, GameEngine.lives - 1);
        GameEngine._refreshUI();
        // Flash rojo en vidas
        const el = document.getElementById('lives-display');
        if (el) {
            el.style.transform = 'scale(1.3)';
            setTimeout(() => { el.style.transform = ''; }, 300);
        }
    }

    static _refreshUI() {
        const scoreEl = document.getElementById('score-display');
        const livesEl = document.getElementById('lives-display');
        if (scoreEl) scoreEl.textContent = `⭐ ${GameEngine.score}`;
        if (livesEl) livesEl.innerHTML = '❤️'.repeat(GameEngine.lives) + '🖤'.repeat(Math.max(0, 3 - GameEngine.lives));
    }

    // ── 2. SÍNTESIS DE VOZ ─────────────────────────────────────────────────
    initVoz() {
        this.vocesDisponibles = [];
        if ('speechSynthesis' in window) {
            const cargarVoces = () => {
                this.vocesDisponibles = window.speechSynthesis.getVoices();
            };
            window.speechSynthesis.onvoiceschanged = cargarVoces;
            cargarVoces();
        }
    }

    hablar(texto) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const locutor = new SpeechSynthesisUtterance(texto);
        locutor.rate  = 0.88;
        locutor.pitch = 1.25;
        if (this.vocesDisponibles.length === 0) {
            this.vocesDisponibles = window.speechSynthesis.getVoices();
        }
        const vozIdeal =
            this.vocesDisponibles.find(v => v.lang === 'es-CL') ||
            this.vocesDisponibles.find(v => v.lang.startsWith('es-MX') || v.name.includes('Paulina')) ||
            this.vocesDisponibles.find(v => v.lang.startsWith('es'));
        if (vozIdeal) locutor.voice = vozIdeal;
        window.speechSynthesis.speak(locutor);
    }

    // ── 3. EFECTOS DE AUDIO ────────────────────────────────────────────────
    reproducirSonido(url) {
        try {
            const audio = new Audio(url);
            audio.volume = 0.45;
            audio.play().catch(() => {});
        } catch (_) {}
    }

    // ── 4. CONFETTI ────────────────────────────────────────────────────────
    lanzarConfeti() {
        const colores = ['#FFCDD2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7', '#FFE0B2'];
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 60; i++) {
            const c = document.createElement('div');
            c.className = 'confeti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            c.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
            c.style.width  = (Math.random() * 10 + 6) + 'px';
            c.style.height = (Math.random() * 10 + 6) + 'px';
            fragment.appendChild(c);
        }
        document.body.appendChild(fragment);
        setTimeout(() => document.querySelectorAll('.confeti').forEach(c => c.remove()), 4000);
    }

    // ── 5. MAGIA TÁCTIL ────────────────────────────────────────────────────
    initMagiaTactil() {
        if (window._magiaActivada) return;
        window._magiaActivada = true;
        document.body.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button') || e.target.closest('#stats-bar')) return;
            const chispa = document.createElement('div');
            chispa.className = 'chispa-tactil';
            chispa.innerText = ['✨', '🫧', '⭐', '💫'][Math.floor(Math.random() * 4)];
            chispa.style.left = (e.clientX - 15) + 'px';
            chispa.style.top  = (e.clientY - 15) + 'px';
            document.body.appendChild(chispa);
            setTimeout(() => chispa.remove(), 650);
        });
    }

    // ── 6. FEEDBACK UNIVERSAL ──────────────────────────────────────────────
    renderFeedback(isCorrect, element) {
        if (isCorrect) {
            this.reproducirSonido(SOUNDS.SUCCESS);
            this.lanzarConfeti();
            GameEngine.addScore(10);
            element.classList.add('animate-bounce-success');
        } else {
            this.reproducirSonido(SOUNDS.ERROR);
            GameEngine.loseLife();
            element.classList.add('animate-shake-error');
        }
        setTimeout(() => {
            element.classList.remove('animate-bounce-success', 'animate-shake-error');
        }, 650);
    }

    get SOUNDS() { return SOUNDS; }
}