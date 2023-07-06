import React from "react";

// Forms component
const EncryptSettings = ({ rot1Pos, rot1Order, rot2Pos, rot2Order, rot3Pos, rot3Order, setRot1Pos, setRot1Order, setRot2Pos, setRot2Order, setRot3Pos, setRot3Order, enablePb, setEnablePb, pbValue, setPbValue }) => {

    const handlePlugboard = (event) => {
        setEnablePb(event.target.checked);
    };

    return (
        <main className="py-1">
            <div className="max-w-screen-xl mx-auto px-0 text-gray-600">
                <div className="max-w-lg mx-auto">
                    <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Rotor Configuration</h3>
                    <div className="space-y-3">
                        <div className='flex flex-col space-y-1 mt-1'>
                            <div className="font-medium text-center">
                                --- Rotor I ---
                            </div>
                            <div className="text-sm text-center">
                                EKMFLGDQVZNTOWYHXUSPAIBRCJ (Q)
                            </div>
                            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                                <div>
                                    <label className="font-medium text-base">
                                        Order
                                    </label>
                                    <input
                                        type="number" min="1" max="3" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot1Order}
                                        onChange={(e) => setRot1Order(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium text-base">
                                        Initial Position
                                    </label>
                                    <input
                                        type="number" min="1" max="26" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot1Pos}
                                        onChange={(e) => setRot1Pos(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1 mt-1'>
                            <div className="font-medium text-center">
                                --- Rotor II ---
                            </div>
                            <div className="text-sm text-center">
                                AJDKSIRUXBLHWTMCQGZNPYFVOE (E)
                            </div>
                            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                                <div>
                                    <label className="font-medium text-base">
                                        Order
                                    </label>
                                    <input
                                        type="number" min="1" max="3" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot2Order}
                                        onChange={(e) => setRot2Order(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium text-base">
                                        Initial Position
                                    </label>
                                    <input
                                        type="number" min="1" max="26" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot2Pos}
                                        onChange={(e) => setRot2Pos(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-1 mt-1'>
                            <div className="font-medium text-center">
                                --- Rotor III ---
                            </div>
                            <div className="text-sm text-center">
                                BDFHJLCPRTXVZNYEIWGAKMUSQO (V)
                            </div>
                            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                                <div>
                                    <label className="font-medium text-base">
                                        Order
                                    </label>
                                    <input
                                        type="number" min="1" max="3" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot3Order}
                                        onChange={(e) => setRot3Order(Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium text-base">
                                        Initial Position
                                    </label>
                                    <input
                                        type="number" min="1" max="26" required
                                        className="w-full px-4 py-1 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        value={rot3Pos}
                                        onChange={(e) => setRot3Pos(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div className="w-full flex flex-row">
                            <div className="w-4/5">
                                <label className="text-lg py-1.5 font-semibold text-primaryBlue">
                                    Plugboard
                                </label>
                            </div>
                            <div className="w-1/5">                  
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={enablePb} onChange={handlePlugboard} className="sr-only peer"></input>
                                    <div className="w-12 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primaryBlue"></div>
                                </label>
                            </div>
                        </div>
                        {(enablePb) && <div className="flex flex-col mt-2">
                            <div className="">
                                <label className="font-medium text-base mb-2">
                                    Insert your plugboard here
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-1.5 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    value={pbValue}
                                    onChange={(e) => setPbValue(e.target.value)}
                                />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EncryptSettings;