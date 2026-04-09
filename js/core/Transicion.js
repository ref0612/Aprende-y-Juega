// js/core/Transicion.js
// Pantalla de transición suave entre niveles y al completar módulo

export class Transicion {

    // Fade rápido entre niveles (200ms)
    static async fadeNivel(contenedor) {
        return new Promise(resolve => {
            contenedor.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
            contenedor.style.opacity    = '0';
            contenedor.style.transform  = 'scale(0.96)';
            setTimeout(() => {
                contenedor.style.transition = '';
                contenedor.style.opacity    = '1';
                contenedor.style.transform  = '';
                resolve();
            }, 210);
        });
    }

    // Pantalla de nivel completado (entre niveles)
    static mostrarBravo(contenedor, texto = '¡Muy bien!', emoji = '⭐') {
        return new Promise(resolve => {
            const div = document.createElement('div');
            div.className = 'bravo-overlay';
            div.innerHTML = `
                <div class="bravo-box animate-pop">
                    <div class="bravo-emoji">${emoji}</div>
                    <p class="bravo-texto">${texto}</p>
                </div>`;
            contenedor.appendChild(div);
            setTimeout(() => {
                div.style.opacity = '0';
                setTimeout(() => { div.remove(); resolve(); }, 320);
            }, 950);
        });
    }

    // Pantalla de módulo completado con estrellas
    static pantallaVictoria(contenedor, score, estrellas, modName) {
        const estrellasHTML = Array.from({ length: 3 }, (_, i) =>
            `<span class="estrella-victoria ${i < estrellas ? 'ganada' : 'vacia'}">${i < estrellas ? '⭐' : '☆'}</span>`
        ).join('');

        contenedor.innerHTML = `
            <div class="victoria-pantalla animate-pop">
                <div style="font-size:5.5rem; margin-bottom:8px;">🏆</div>
                <h2 class="victoria-titulo">¡Completado!</h2>
                <div class="estrellas-row">${estrellasHTML}</div>
                <p class="victoria-score">⭐ ${score} puntos</p>
                <p class="victoria-sub">¡Eres increíble!</p>
            </div>`;
    }
}