import React, { useState } from "react";
import './App.css'
import { ToastContainer } from 'react-toastify';
import EncryptForm from "./components/Forms/EncryptForms";
import DecryptForm from "./components/Forms/DecryptForms";
import EncryptSettings from "./components/Settings/EncrpytSettings";
import DecryptSettings from "./components/Settings/DecryptSettings";

const backgroundStyle = {
  backgroundColor : "#ECEEF9",
  height: "auto",
  width: "100vw",
  minHeight: "100vh",
  maxHeight: "100vh",
}

function App() {
  const [activeTab, setActiveTab] = useState("Encryption");
  const [rot1Order, setRot1Order] = useState(1);
  const [rot1Pos, setRot1Pos] = useState(1);
  const [rot2Order, setRot2Order] = useState(2);
  const [rot2Pos, setRot2Pos] = useState(1);
  const [rot3Order, setRot3Order] = useState(3);
  const [rot3Pos, setRot3Pos] = useState(1);
  const [enablePb, setEnablePb] = useState(false);
  const [pbValue, setPbValue] = useState("");

  // Result processing

  return (
      <div style={backgroundStyle} className="flex p-[1.5vh]">
        <ToastContainer />
        <div className="w-full bg-light flex rounded-xl">
          <div className='flex flex-row w-full h-full'>
              <div className="bg-white w-full mx-auto shadow-xl rounded-xl text-lg flex flex-row h-full">
                  <div className="text-left flex flex-col w-1/12">
                      <button
                          onClick={() => setActiveTab("Encryption")}
                          className={`h-1/2 p-3 rounded-tl-xl ${activeTab === "Encryption" ? "font-bold" : "font-medium bg-gray-200"}`}
                      >
                          <p className="-rotate-90">Encryption</p>
                      </button>
                      <button
                          onClick={() => setActiveTab("Decryption")}
                          className={`h-1/2 p-3 rounded-bl-xl ${activeTab === "Decryption" ? "font-bold" : "font-medium bg-gray-200"}`}
                      >
                          <p className="-rotate-90">Decryption</p>
                      </button>
                  </div>
                  <div className={`w-7/12 p-10 flex flex-col ${activeTab === "Decryption" ? "hidden" : ""}`}>
                    <div className='h-1/6'>
                        <h1 className='text-3xl font-bold'>Encryption</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Please input the text to be encrypted</h3>
                    </div>
                    <div className='h-5/6'>
                      <EncryptForm rot1Order={rot1Order} rot1Pos={rot1Pos} rot2Order={rot2Order} rot2Pos={rot2Pos} rot3Order={rot3Order} rot3Pos={rot3Pos} enablePb={enablePb} pbValue={pbValue}/>
                    </div>
                  </div>
                  <div className={`w-4/12 bg-primaryGray p-8 ${activeTab === "Decryption" ? "hidden" : ""} flex-1 flex flex-col`}>
                      <div className='h-1/12'>
                          <h1 className='text-xl font-bold'>Encryption Settings</h1>
                      </div>
                      <div className='overflow-y-auto h-11/12'>
                        <EncryptSettings rot1Order={rot1Order} rot1Pos={rot1Pos} rot2Order={rot2Order} rot2Pos={rot2Pos} rot3Order={rot3Order} rot3Pos={rot3Pos}
                        setRot1Order={setRot1Order} setRot1Pos={setRot1Pos} setRot2Order={setRot2Order} setRot2Pos={setRot2Pos} setRot3Order={setRot3Order} setRot3Pos={setRot3Pos}
                        enablePb={enablePb} setEnablePb={setEnablePb} pbValue={pbValue} setPbValue={setPbValue}
                        />
                      </div>
                  </div>
                  
                  <div className={`w-7/12 p-10 flex flex-col ${activeTab === "Decryption" ? "" : "hidden"}`}>
                    <div className='h-1/6'>
                        <h1 className='text-3xl font-bold'>Decryption</h1>
                        <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Please input the text to be decrypted</h3>
                    </div>
                    <div className='h-5/6'>
                      <DecryptForm rot1Order={rot1Order} rot1Pos={rot1Pos} rot2Order={rot2Order} rot2Pos={rot2Pos} rot3Order={rot3Order} rot3Pos={rot3Pos} enablePb={enablePb} pbValue={pbValue}/>
                    </div>
                  </div>
                  <div className={`w-4/12 bg-primaryGray p-8 ${activeTab === "Decryption" ? "" : "hidden"} flex-1 flex flex-col`}>
                      <div className='h-1/12'>
                          <h1 className='text-xl font-bold'>Decryption Settings</h1>
                      </div>
                      <div className='overflow-y-auto h-11/12'>
                        <DecryptSettings rot1Order={rot1Order} rot1Pos={rot1Pos} rot2Order={rot2Order} rot2Pos={rot2Pos} rot3Order={rot3Order} rot3Pos={rot3Pos}
                          setRot1Order={setRot1Order} setRot1Pos={setRot1Pos} setRot2Order={setRot2Order} setRot2Pos={setRot2Pos} setRot3Order={setRot3Order} setRot3Pos={setRot3Pos}
                          enablePb={enablePb} setEnablePb={setEnablePb} pbValue={pbValue} setPbValue={setPbValue}
                          />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default App;