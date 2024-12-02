import { useState } from "react"
import KutiaNewsletter from "../components/KutiaNewsletter";

const Kycu = () => {

    const [gjendjaAktuale, setGjendjaAktuale] = useState('Kyçu');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="space-y-24">
            <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl">{gjendjaAktuale}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                {gjendjaAktuale === 'Kyçu' ? '' : <input type="text" className="w-full px-3 py-2 border rounded-sm border-gray-400" placeholder="Emri juaj" required />}
                <input type="email" className="w-full px-3 py-2 border  rounded-sm border-gray-400" placeholder="Email-i juaj" required />
                <input type="password" className="w-full px-3 py-2 border  rounded-sm border-gray-400" placeholder="Password-i juaj" required />

                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer">Keni harruar fjalëkalimin?</p>
                    {
                        gjendjaAktuale === 'Kyçu'
                            ? <p className="cursor-pointer" onClick={() => setGjendjaAktuale('Regjistrohu')}>Krijo Llogari</p>
                            : <p className="cursor-pointer" onClick={() => setGjendjaAktuale('Kyçu')}>Kyçu Këtu</p>
                    }
                </div>

                <button className="bg-black text-white font-light w-full rounded-sm px-8 py-2 mt-4">{gjendjaAktuale === 'Kyçu' ? 'Kyçu' : 'Regjistrohu'}</button>
            </form>

            <KutiaNewsletter />
        </div>
    )
}

export default Kycu