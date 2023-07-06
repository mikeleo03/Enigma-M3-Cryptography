import Reflector from './Reflector';
import EntryDisk from './EntryDisk';

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
            this.rotors[1].rotate();
            this.rotors[1].setAlreadyRotate(true);
        }

        if (shouldRotateLeftRotor) {
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

export default EnigmaMachine;