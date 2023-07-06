// Kelas Plugboard
class Plugboard {
    // 1. Konstruktor
    constructor(wiring) {
        this.validatePlugboardWiring(wiring);
        this.wiring = this.createWiringMap(wiring);
    }

    // 2. Validasi wiring
    validatePlugboardWiring(wiring) {
        const pairs = wiring.split(' ');
        const seen = new Set();

        if (pairs.length === 0) {
            throw new Error('Plugboard configuration is empty.');
        }

        for (let pair of pairs) {
            if (pair.length !== 2) {
                throw new Error(`Invalid plugboard pair: '${pair}'. Each pair should consist of exactly two characters separated by a space.`);
            }

            if (pair[0] === pair[1]) {
                throw new Error(`Invalid plugboard pair: '${pair}'. The pair cannot have identical characters.`);
            }

            if (seen.has(pair[0]) || seen.has(pair[1])) {
                throw new Error(`Invalid plugboard pair: '${pair}'. Each character can only appear once in the plugboard configuration.`);
            }

            seen.add(pair[0]);
            seen.add(pair[1]);
        }
    }

    // 3. Membuat wiring map berdasar masukan pengguna
    createWiringMap(wiring) {
        const pairs = wiring.split(' ');
        const wiringMap = {};

        for (let pair of pairs) {
            const firstChar = pair[0].charCodeAt(0) - 64;
            const secondChar = pair[1].charCodeAt(0) - 64;
            wiringMap[firstChar] = secondChar;
            wiringMap[secondChar] = firstChar;
        }

        return wiringMap;
    }

    // 4. Proses swap
    swap(signal) {
        return this.wiring[signal]
            ? this.wiring[signal] // Convert it to signalized
            : signal; // No swapping if character is not in the plugboard
    }
}

export default Plugboard;