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

export default EntryDisk;