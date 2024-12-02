/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import Titulli from "../components/Titulli"
import TotaliKarroces from "../components/TotaliKarroces"
import { ShopContext } from "../context/ShopContext"

const BejPorosi = () => {
    const [metoda, setMetoda] = useState('pnd');

    const { navigo } = useContext(ShopContext);

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

            {/* pjesa e majte e faqes */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Titulli tekst1={'INFORMATAT E'} tekst2={'DORËZIMIT'} />
                </div>

                <div className="flex gap-3">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Emri juaj" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Mbiemri juaj" />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email-i juaj" />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Adresa" />

                <div className="flex gap-3">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Qyteti" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Regjioni" />
                </div>

                <div className="flex gap-3">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Kodi ZIP" />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Shteti" />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Numri i Telefonit" />
            </div>

            {/* pjesa e djathte e faqes */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <TotaliKarroces />
                </div>

                <div className="mt-12">
                    <Titulli tekst1={'METODA E'} tekst2={'PAGESËS'} />

                    {/* metoda e pageses */}
                    <div className="flex gap-3 flex-col lg:flex-row">

                        <div onClick={() => setMetoda('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${metoda === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
                        </div>

                        <div onClick={() => setMetoda('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${metoda === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
                        </div>

                        <div onClick={() => setMetoda('pnd')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${metoda === 'pnd' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">PARA NË DORË</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button onClick={() => navigo('/porosite')} className="bg-black text-white px-16 py-3 text-sm">BËJ POROSINË</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BejPorosi