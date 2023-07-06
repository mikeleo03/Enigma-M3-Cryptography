// Kelas EntryDisk
class EntryDisk {
    // 1. Konstruktor
    constructor(wiring) {
        this.wiring = wiring;
    }

    // 2. Mengkonversi karakter ke sinyal
    convertCharacterToSignal(character) {
        return character.charCodeAt(0) - 65; // Assuming uppercase letters only
    }

    // 3. Mengkonversi sinyal ke karakterr
    convertSignalToCharacter(signal) {
        return String.fromCharCode(signal + 65); // Assuming uppercase letters only
    }
}

// Kelas rotor
class Rotor {
    // 1. Konstruktor
    constructor(wiring, position, turnover) {
        this.wiring = wiring;
        this.position = position;
        this.turnover = turnover;
        this.alreadyRotate = false;
    }

    // 2. Melakukan rotasi terhadap rotor dengan memajukan 1 karakter
    rotate() {
        this.position = (this.position + 1) % 26;
    }

    // 3. Melakukan pemasangan terhadap hasil tiap rotor -- arah maju
    forward(signal) {
        const contact = (signal + this.position) % 26;
        const outputchar = this.wiring[contact];
        return (outputchar - this.position + 26) % 26;
    }

    // 4. Melakukan pemasangan terhadap hasil tiap rotor -- arah mundur
    backward(signal) {
        const contact = (signal + this.position) % 26;
        const outputchar = (this.wiring.indexOf(contact) - this.position + 26) % 26;
        return outputchar;
    }

    // 5. Mendefinisikan posisi dimana rotor harus memutar rotor lain
    rotateOthers() {
        return this.position === this.turnover;
    }

    // 6. Set Already Rotate, mengubah nilai alreadyRotate
    setAlreadyRotate(status) {
        this.alreadyRotate = status;
    }

    // 7. Get Already Rotate, getter
    getAlreadyRotate() {
        return this.alreadyRotate;
    }
}

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
        console.log(pairs);

        for (let pair of pairs) {
            const firstChar = pair[0].charCodeAt(0) - 64;
            const secondChar = pair[1].charCodeAt(0) - 64;
            wiringMap[firstChar] = secondChar;
            wiringMap[secondChar] = firstChar;
        }

        console.log(wiringMap);

        return wiringMap;
    }

    // 4. Proses swap
    swap(signal) {
        return this.wiring[signal]
            ? this.wiring[signal] // Convert it to signalized
            : signal; // No swapping if character is not in the plugboard
    }
}

// Kelas EnigmaMachine
class EnigmaMachine {
    // 1. Constructor
    constructor(rotorConfig, reflectorWiring, entryDiskWiring, plugboard) {
        this.rotors = rotorConfig;
        this.reflector = new Reflector(reflectorWiring);
        this.entryDisk = new EntryDisk(entryDiskWiring);
        if (plugboard) {
            this.plugboard = plugboard;
        } else {
            this.plugboard = null;
        }
    }

    // 2. Mekanisme dasar merotasikan rotor
    rotateRotors() {
        const shouldRotateMiddleRotor = this.rotors[2].rotateOthers() || this.rotors[1].getAlreadyRotate() === true; // Middle rotor rotates when rightmost rotor completes a full revolution
        const shouldRotateLeftRotor = this.rotors[1].rotateOthers() || this.rotors[0].getAlreadyRotate() === true; // Leftmost rotor rotates when middle rotor completes a full revolution

        if (shouldRotateMiddleRotor) {
            console.log("rotate middle");
            this.rotors[1].rotate();
            this.rotors[1].setAlreadyRotate(true);
        }

        if (shouldRotateLeftRotor) {
            console.log("rotate left");
            this.rotors[0].rotate();
            this.rotors[0].setAlreadyRotate(true);
        }

        this.rotors[2].rotate(); // Rightmost rotor always rotates

        // Reset kalo dah gasama
        if (!this.rotors[1].rotateOthers()) {
            this.rotors[1].setAlreadyRotate(false);
        }

        if (!this.rotors[0].rotateOthers()) {
            this.rotors[0].setAlreadyRotate(false);
        }
    }

    // 3. Proses enkripsi
    encrypt(plaintext) {
        // Ciphertext
        let ciphertext = '';
        let finalResult = {};
        let process = [];

        // Pemrosesan terhadap setiap karakter
        for (let i = 0; i < plaintext.length; i++) {
            // Make a result
            let result = {};

            // Set to uppercase
            const inputCharacter = plaintext[i].toUpperCase();
            result.initChar = inputCharacter;

            // Preserve some chars
            if (inputCharacter === ' ' || inputCharacter === '"' || inputCharacter === '\'' || inputCharacter === ';' || inputCharacter === '-') {
                ciphertext += inputCharacter;
                continue;
            }

            // Rotate rotors before encryption
            this.rotateRotors();
            result.rotor = this.rotors.map(rotor => String.fromCharCode(rotor.position + 65));

            // Check the input signal
            const inputSignal = this.entryDisk.convertCharacterToSignal(inputCharacter);
            let signal = this.plugboard ? this.plugboard.swap(inputSignal + 1) - 1 : inputSignal; // Apply plugboard swapping if plugboard exists;
            result.pbInit = String.fromCharCode(signal + 65);

            // Pemrosesan terhadap setiap rotor
            result.init = [];
            let count = 0;
            for (let i = this.rotors.length - 1; i >= 0; i--) {
                signal = this.rotors[i].forward(signal);
                result.init[count] = String.fromCharCode(signal + 65);
                count++;
            }

            // Use reflector
            signal = this.reflector.reflect(signal);
            result.reflect = String.fromCharCode(signal + 65);

            result.final = [];
            let count2 = 0;
            // Pass it back on reverse
            for (let rotor of this.rotors) {
                signal = rotor.backward(signal);
                result.final[count2] = String.fromCharCode(signal + 65);
                count2++;
            }

            // Use plugboard again
            signal = this.plugboard ? this.plugboard.swap(signal + 1) - 1 : signal; // Apply plugboard swapping if plugboard exists

            // Convert back to char
            const outputCharacter = this.entryDisk.convertSignalToCharacter(signal);
            result.pbFinal = outputCharacter;

            // Add to the result
            ciphertext += outputCharacter;
            process.push(result);
        }

        finalResult.process = process;
        finalResult.ciphertext = ciphertext;

        return finalResult;
    }

    // 4. Proses Dekripsi
    decrypt(ciphertext) {
        // Plaintext
        let plaintext = '';
        let finalResult = {};
        let process = [];

        // Pemrosesan terhadap setiap karakter
        for (let i = 0; i < ciphertext.length; i++) {
            // Make a result
            let result = {};
            
            // Set to uppercase
            const inputCharacter = ciphertext[i].toUpperCase();
            result.initChar = inputCharacter;

            // Preserve some chars
            if (inputCharacter === ' ' || inputCharacter === '"' || inputCharacter === '\'' || inputCharacter === ';' || inputCharacter === '-') {
                plaintext += inputCharacter;
                continue;
            }

            // Rotate rotors before encryption
            this.rotateRotors();
            result.rotor = this.rotors.map(rotor => String.fromCharCode(rotor.position + 65));

            // Check the input signal
            const inputSignal = this.entryDisk.convertCharacterToSignal(inputCharacter);
            let signal = this.plugboard ? this.plugboard.swap(inputSignal + 1) - 1 : inputSignal; // Apply plugboard swapping if plugboard exists;
            result.pbInit = String.fromCharCode(signal + 65);

            // Pemrosesan terhadap setiap rotor
            result.init = [];
            let count = 0;
            for (let i = this.rotors.length - 1; i >= 0; i--) {
                signal = this.rotors[i].forward(signal);
                result.init[count] = String.fromCharCode(signal + 65);
                count++;
            }

            // Use reflector
            signal = this.reflector.reflect(signal);
            result.reflect = String.fromCharCode(signal + 65);

            result.final = [];
            let count2 = 0;
            // Pass it back on reverse
            for (let rotor of this.rotors) {
                signal = rotor.backward(signal);
                result.final[count2] = String.fromCharCode(signal + 65);
                count2++;
            }

            // Use plugboard again
            signal = this.plugboard ? this.plugboard.swap(signal + 1) - 1 : signal; // Apply plugboard swapping if plugboard exists

            // Convert back to char
            const outputCharacter = this.entryDisk.convertSignalToCharacter(signal);
            result.pbFinal = outputCharacter;

            // Add to the result
            plaintext += outputCharacter;
            process.push(result);
        }

        finalResult.process = process;
        finalResult.plaintext = plaintext;

        return finalResult;
    }
}

export { EnigmaMachine, Rotor, Plugboard };