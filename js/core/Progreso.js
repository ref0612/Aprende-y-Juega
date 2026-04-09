// js/core/Progreso.js
// Persistencia completa en localStorage: edad, estrellas por módulo, récords

const KEY = 'aprende_juega_v2';

const _defaults = () => ({
    edad: null,              // 'bebes'|'pequenos'|'grandes'
    modulos: {},             // { animales: { estrellas:3, mejor:240, jugado:5 }, ... }
    totalEstrellas: 0,
    ultimoModulo: null,
});

function _leer() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? { ..._defaults(), ...JSON.parse(raw) } : _defaults();
    } catch (_) { return _defaults(); }
}

function _guardar(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
}

export const Progreso = {

    getEdad() { return _leer().edad; },

    setEdad(edad) {
        const d = _leer();
        d.edad = edad;
        _guardar(d);
    },

    // Guarda resultado de completar un módulo
    guardarModulo(modName, score, totalNiveles) {
        const d = _leer();
        if (!d.modulos[modName]) d.modulos[modName] = { estrellas: 0, mejor: 0, jugado: 0 };

        const m = d.modulos[modName];
        m.jugado++;
        m.mejor = Math.max(m.mejor, score);

        // Cálculo de estrellas: 1=completado, 2=buen score, 3=excelente
        const porcentaje = score / (totalNiveles * 10);
        m.estrellas = porcentaje >= 0.85 ? 3 : porcentaje >= 0.5 ? 2 : 1;

        d.totalEstrellas = Object.values(d.modulos).reduce((sum, mod) => sum + mod.estrellas, 0);
        d.ultimoModulo = modName;
        _guardar(d);
        return m.estrellas;
    },

    getModulo(modName) {
        return _leer().modulos[modName] || null;
    },

    getTodosModulos() {
        return _leer().modulos;
    },

    getTotalEstrellas() {
        return _leer().totalEstrellas;
    },

    reset() {
        _guardar(_defaults());
    },
};