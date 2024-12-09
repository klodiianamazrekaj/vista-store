/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom"
import Ballina from './pages/Ballina'
import Koleksioni from './pages/Koleksioni'
import Produkti from './pages/Produkti'
import Karroca from './pages/Karroca'
import Kycu from './pages/Kycu'
import BejPorosi from './pages/BejPorosi'
import Porosite from './pages/Porosite'
import Navigimi from "./components/Navigimi"
import Kontakti from "./pages/Kontakti"
import RrethNesh from "./pages/RrethNesh"
import Footer from "./components/Footer"
import ShiritiKerkimit from "./components/ShiritiKerkimit"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verifiko from "./pages/Verifiko"

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navigimi />
      <ShiritiKerkimit />

      {/* routes */}
      <Routes>
        <Route path="/" element={<Ballina />} />
        <Route path="/koleksioni" element={<Koleksioni />} />
        <Route path="/rreth_nesh" element={<RrethNesh />} />
        <Route path="/kontakti" element={<Kontakti />} />
        <Route path="/produkti/:produktId" element={<Produkti />} />
        <Route path="/karroca" element={<Karroca />} />
        <Route path="/kycu" element={<Kycu />} />
        <Route path="/bej_porosi" element={<BejPorosi />} />
        <Route path="/porosite" element={<Porosite />} />
        <Route path="/verify" element={<Verifiko />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App