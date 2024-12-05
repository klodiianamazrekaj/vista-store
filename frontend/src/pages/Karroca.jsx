import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import Titulli from "../components/Titulli";
import { assets } from "../assets/assets";
import TotaliKarroces from "../components/TotaliKarroces";

const Karroca = () => {

    const { produktet, valuta, artikujtNeKarroce, perditesoTotalinProdukteve, navigo } = useContext(ShopContext);

    const [teDhenatNeKarroce, setTeDhenatNeKarroce] = useState([]);

    useEffect(() => {
        const teDhenaTePerkohshme = [];
        for (const items in artikujtNeKarroce) {
            for (const item in artikujtNeKarroce[items]) {
                if (artikujtNeKarroce[items][item] > 0) {
                    teDhenaTePerkohshme.push({
                        _id: items,
                        madhesia: item,
                        sasia: artikujtNeKarroce[items][item]
                    })
                }
            }
        }
        setTeDhenatNeKarroce(teDhenaTePerkohshme);
    }, [artikujtNeKarroce]);

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Titulli tekst1={"KARROCA"} tekst2={'JUAJ'} />
            </div>

            <div>
                {
                    teDhenatNeKarroce.map((item, index) => {
                        const teDhenatEProdukteve = produktet.find(produkti => produkti._id === item._id);

                        return (
                            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img src={teDhenatEProdukteve.foto[0]} className="w-16 sm:w-20" alt="" />
                                    <div>
                                        <p className="text-sm sm:text-lg font-medium">{teDhenatEProdukteve.emri}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{valuta}{teDhenatEProdukteve.cmimi}</p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.madhesia}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : perditesoTotalinProdukteve(item._id, item.madhesia, Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.sasia} />
                                <img onClick={() => perditesoTotalinProdukteve(item._id, item.madhesia, 0)} src={assets.bin_icon} className="w-4 mr-4 sm:w-5 cursor-pointer" alt="" />
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <TotaliKarroces />
                    <div className="w-full text-end">
                        <button onClick={() => navigo('/bej_porosi')} className="bg-black text-white text-sm my-8 px-8 py-3">VAZHDO TE PAGESA</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Karroca