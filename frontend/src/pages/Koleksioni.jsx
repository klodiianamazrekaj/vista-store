/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Titulli from "../components/Titulli";
import ArtikullProdukti from "../components/ArtikullProdukti";
const Koleksioni = () => {

    const { produktet, kerko, shfaqKerkimin } = useContext(ShopContext);
    const [shfaqFilterat, setShfaqFilterat] = useState(false);
    const [filtroProduktet, setFiltroProduktet] = useState([]);
    const [kategoria, setKategoria] = useState([]);
    const [nenkategoria, setNenkategoria] = useState([]);
    const [llojiSortimit, setLlojiSortimit] = useState('relevante');

    /* 
    ky funksion 'toggleKategoria' dhe 'toggleNenkategoria' 
    bën që kur klikoni një opsion, ai ose hiqet nga lista (nëse është aty), 
    ose shtohet në fund (nëse nuk është aty). 
    Kjo ndihmon për të menaxhuar opsionet që janë zgjedhur nga përdoruesi, p.sh., për të filtruar diçka.
    */
    const toggleKategoria = (e) => {
        if (kategoria.includes(e.target.value)) {
            setKategoria(prev => prev.filter(item => item !== e.target.value));
        }
        else {
            setKategoria(prev => [...prev, e.target.value]);
        }
    }

    const toggleNenkategoria = (e) => {
        if (nenkategoria.includes(e.target.value)) {
            setNenkategoria(prev => prev.filter(item => item !== e.target.value));
        }
        else {
            setNenkategoria(prev => [...prev, e.target.value]);
        }
    }

    const aplikoFilterat = () => {
        // krijon një kopje të listës produktet, që është lista fillestare e produkteve.
        let kopjoProduktet = produktet.slice();

        // do të kërkojë emrin e produktit dhe do të filtroje vetëm ato produkte 
        // që e kanë emrin që përmban fjalën e kërkuar
        if (shfaqKerkimin && kerko) {
            kopjoProduktet = kopjoProduktet.filter(item => item.emri.toLowerCase().includes(kerko.toLowerCase()));
        }

        // filtrimi sipas kategorise
        if (kategoria.length > 0) {
            kopjoProduktet = kopjoProduktet.filter(item => kategoria.includes(item.kategoria));
        }

        // filtrimi sipas nenkategorise 
        if (nenkategoria.length > 0) {
            kopjoProduktet = kopjoProduktet.filter(item => nenkategoria.includes(item.nenkategoria));
        }

        setFiltroProduktet(kopjoProduktet);
    }

    const sortoProduktet = () => {
        let fpKopje = filtroProduktet.slice();

        switch (llojiSortimit) {
            case 'ulet-larte':
                setFiltroProduktet(fpKopje.sort((a, b) => (a.cmimi - b.cmimi)));
                break;

            case 'larte-ulet':
                setFiltroProduktet(fpKopje.sort((a, b) => (b.cmimi - a.cmimi)));
                break;

            default:
                aplikoFilterat();
                break;
        }
    }

    /* 
    sa herë që ndryshon vlera e kategoria ose nenkategoria, 
    ne do të thërrasim funksionin aplikoFilterat() për të aplikuar filtrat përkatës
    */
    useEffect(() => {
        aplikoFilterat();
    }, [kategoria, nenkategoria, kerko, shfaqKerkimin, produktet]);

    useEffect(() => {
        sortoProduktet();
    }, [llojiSortimit]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

            {/* opsionet per filtrim */}
            <div className="min-w-60">
                <p onClick={() => setShfaqFilterat(!shfaqFilterat)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTRO
                    {/* Show dropdown icon only on mobile */}
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${!shfaqFilterat ? 'rotate-90' : ''}`} alt="" />
                </p>

                {/* filtrimi ne baze te kategorive */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${!shfaqFilterat ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">KATEGORITË</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Men'} onChange={toggleKategoria} /> Meshkuj
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Women'} onChange={toggleKategoria} /> Femra
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleKategoria} /> Fëmijë
                        </p>
                    </div>
                </div>

                {/* filtrimi i nenkategorive */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${!shfaqFilterat ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">LLOJI</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleNenkategoria} />
                            Veshje E Sipërme
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleNenkategoria} /> Veshje Të Poshtme
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleNenkategoria} /> Veshje Dimërore
                        </p>
                    </div>
                </div>
            </div>

            {/* pjesa e djathte e faqes */}
            <div className="flex-1">

                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Titulli tekst1={'TË GJITHA'} tekst2={'KOLEKSIONET'} />

                    {/* sortimi i produkteve */}
                    <select onChange={(e) => setLlojiSortimit(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relevante">Rendit sipas: Relevante</option>
                        <option value="ulet-larte">Rendit sipas: I ulët në të lartë</option>
                        <option value="larte-ulet">Rendit sipas: I lartë në të ulët</option>
                    </select>
                </div>

                {/* mapimi i produkteve */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filtroProduktet.map((item, index) => (
                            <ArtikullProdukti key={index} emri={item.emri} id={item._id} cmimi={item.cmimi} foto={item.foto} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Koleksioni