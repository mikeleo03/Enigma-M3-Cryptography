// Kelas Reflektor
class Reflector {
    // 1. Konstruktor
    constructor(wiring) {
        this.wiring = wiring;
    }

    // 2. Merefleksikan berdasarkan wiring reflektor
    reflect(signal) {
        return this.wiring[signal];
    }
}

export default Reflector;