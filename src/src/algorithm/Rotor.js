// Kelas Rotor
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

export default Rotor;