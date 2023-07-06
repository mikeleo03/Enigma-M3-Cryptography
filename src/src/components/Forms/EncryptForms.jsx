import React, { useState } from "react";
import EnigmaMachine from "../../algorithm/EnigmaMachine";
import Rotor from "../../algorithm/Rotor";
import Plugboard from "../../algorithm/Plugboard";
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import 'react-toastify/dist/ReactToastify.css';

// Encryption Forms Component
const EncryptionForm = ({ rot1Pos, rot1Order, rot2Pos, rot2Order, rot3Pos, rot3Order, enablePb, pbValue }) => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const handleSubmitForms = (event) => {
        event.preventDefault();

        // handle submit here
        // Rotor wirings (from A to Z)
        const rotor1Wiring = [4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9];
        const rotor2Wiring = [0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15, 24, 5, 21, 14, 4];
        const rotor3Wiring = [1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 21, 25, 13, 24, 4, 8, 22, 6, 0, 10, 12, 20, 18, 16, 14];

        // The rotor configuration
        const rotor1 = new Rotor(rotor1Wiring, rot1Pos-1, 16);
        const rotor2 = new Rotor(rotor2Wiring, rot2Pos-1, 4);
        const rotor3 = new Rotor(rotor3Wiring, rot3Pos-1, 21);

        // Reflector wiring (from A to Z)
        const reflectorWiring = [24, 17, 20, 7, 16, 18, 11, 3, 15, 23, 13, 6, 14, 10, 12, 8, 4, 1, 5, 25, 2, 22, 21, 9, 0, 19];

        // Entry disk wiring (from A to Z)
        const entryDiskWiring = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // Create the Enigma machine with rotor configuration, reflector wiring, and entry disk wiring
        const rotorConfig = [rotor1, rotor2, rotor3]; // Rotor configuration: rotor 1, rotor 2, rotor 3

        try {
            // Make aplugboard
            let plugboard;
            if (enablePb) {
                plugboard = new Plugboard(pbValue);
            }

            // Create the enigma and proceed
            const enigmaMachine = new EnigmaMachine(rotorConfig, reflectorWiring, entryDiskWiring, plugboard);
            let finalResult = enigmaMachine.encrypt(text);
            setResult(finalResult);

        } catch (err) {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleDownload = () => {
        let resultString = ''; // Replace with your desired text content
        for (let i = 0; i < result.process.length; i++) {
            resultString += `Keyboard input: ${result.process[i].initChar}\n`;
            resultString += `Rotor position: ${result.process[i].rotor.join(", ")}\n`;
            resultString += `Plugboard encryption: ${result.process[i].pbInit}\n`;
            let count = result.process[i].init.length;
            for (let j = 0; j < result.process[i].init.length; j++) {
                resultString += `Wheel ${count} encyption: ${result.process[i].init[j]}\n`;
                count--;
            }
            resultString += `Reflector encryption: ${result.process[i].reflect}\n`;
            for (let k = 0; k < result.process[i].init.length; k++) {
                resultString += `Wheel ${k+1} encyption: ${result.process[i].final[k]}\n`;
            }
            resultString += `Plugboard encryption: ${result.process[i].pbFinal}\n`;
            resultString += `Output (Lampboard): ${result.process[i].pbFinal}\n`;
            resultString += `========================================\n`;
        }
      
        const blob = new Blob([resultString], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'encryptResult.txt');
    };  

    return (
        <main className="h-full">
            <div className="h-full mx-auto px-0 text-gray-600">
                <div className="h-full mx-auto flex flex-col space-y-5">
                    <div className="h-7/12 space-y-4">
                        <div>
                            <label className="font-medium">
                                Plain Text
                            </label>
                            <textarea 
                                required 
                                className="w-full mt-2 h-36 px-4 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Insert plain text like HELLO WORLD"
                            >
                            </textarea>
                        </div>
                        <button
                            className="w-full px-4 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={handleSubmitForms}
                        >
                            Encrypt
                        </button>
                    </div>
                    <div className="h-5/12 flex flex-col">
                        <div className="overflow-y-auto">
                            <label className="font-medium">
                                Result
                            </label>
                            {result && <button className="px-5 ml-10 mb-2 py-1 hover:bg-indigo-400 bg-primaryBlue text-white rounded-lg duration-150" onClick={handleDownload}>Save the process</button>}
                            {result ? 
                                (<div className="bg-primaryGray outline-none border focus:border-indigo-600 shadow-sm rounded-lg mt-1 px-4 py-2">{result.ciphertext}</div>) 
                                : (<p>You haven't encrypt any plain text.</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EncryptionForm;