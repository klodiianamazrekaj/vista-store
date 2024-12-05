/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Navigimi from "./components/Navigimi"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import Shto from "./pages/Shto";  // Adjust the import path
import Lista from "./pages/Lista";
import Porosite from "./pages/Porosite";
import Kycu from "./components/Kycu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const valuta = '€'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])


  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === ""
        ? <Kycu setToken={setToken} />
        :
        <>
          <Navigimi setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/shto_produkte" element={<Shto token={token} />} />
                <Route path="/lista_produkteve" element={<Lista token={token} />} />
                <Route path="/porosite" element={<Porosite token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App