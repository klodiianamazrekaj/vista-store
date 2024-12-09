/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import Titulli from "../components/Titulli"
import TotaliKarroces from "../components/TotaliKarroces"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify";
import axios from "axios"

const BejPorosi = () => {
    const
        {
            navigo,
            backendUrl,
            token,
            artikujtNeKarroce,
            setArtikujtNeKarroce,
            merrShumenKarroces,
            tarifa_dorezimit,
            produktet
        } = useContext(ShopContext);

    const [metoda, setMetoda] = useState('PND');
    const [formData, setFormData] = useState({
        emriPerdoruesit: '',
        mbiemriPerdoruesit: '',
        email: '',
        adresa: '',
        qyteti: '',
        regjioni: '',
        zipkodi: '',
        shteti: '',
        telefoni: '',
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let produktetPerPorosi = [];

            for (const items in artikujtNeKarroce) {
                for (const item in artikujtNeKarroce[items]) {
                    if (artikujtNeKarroce[items][item] > 0) {
                        const infoProduktit = structuredClone(produktet.find(produkt => produkt._id === items))
                        if (infoProduktit) {
                            infoProduktit.madhesia = item;
                            infoProduktit.sasia = artikujtNeKarroce[items][item];
                            produktetPerPorosi.push(infoProduktit);
                        }
                    }
                }
            }

            let teDhenatPorosise = {
                adresa: formData,
                produktet: produktetPerPorosi,
                shuma: merrShumenKarroces() + tarifa_dorezimit,
            }

            switch (metoda) {
                // API Call per PND - para ne dore
                case 'PND': {
                    const response = await axios.post(backendUrl + '/api/porosia/bej_porosi', teDhenatPorosise, { headers: { token } });
                    console.log(response.data.success);
                    if (response.data.success) {
                        setArtikujtNeKarroce({});
                        navigo('/porosite');
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                }

                case "stripe": {
                    const responseStripe = await axios.post(backendUrl + '/api/porosia/stripe', teDhenatPorosise, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    }
                    else {
                        toast.error(responseStripe.data.message);
                    }
                    break;
                }

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

            {/* pjesa e majte e faqes */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Titulli tekst1={'INFORMATAT E'} tekst2={'DORËZIMIT'} />
                </div>

                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name="emriPerdoruesit" value={formData.emriPerdoruesit} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Emri juaj" />
                    <input onChange={onChangeHandler} name="mbiemriPerdoruesit" value={formData.mbiemriPerdoruesit} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Mbiemri juaj" />
                </div>

                <input onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email-i juaj" />
                <input onChange={onChangeHandler} name="adresa" value={formData.adresa} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Adresa" />

                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name="qyteti" value={formData.qyteti} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Qyteti" />
                    <input onChange={onChangeHandler} name="regjioni" value={formData.regjioni} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Regjioni" />
                </div>

                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name="zipkodi" value={formData.zipkodi} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Kodi ZIP" />
                    <input onChange={onChangeHandler} name="shteti" value={formData.shteti} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Shteti" />
                </div>

                <input onChange={onChangeHandler} name="telefoni" value={formData.telefoni} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Numri i Telefonit" />
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

                        <div onClick={() => setMetoda('PND')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${metoda === 'PND' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">PARA NË DORË</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">BËJ POROSINË</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BejPorosi