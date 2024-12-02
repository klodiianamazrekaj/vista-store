import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProduktetNgjashme from '../components/ProduktetNgjashme';
const Produkti = () => {

    const { produktId } = useParams();
    const { products, valuta, shtoNeKarroce } = useContext(ShopContext);
    const [teDhenatProduktit, setTeDhenatProduktit] = useState(false);
    const [foto, setFoto] = useState('');
    const [madhesia, setMadhesia] = useState('');

    const merrTeDhenatProduktit = async () => {
        products.map((item) => {
            if (item._id === produktId) {
                setTeDhenatProduktit(item);
                setFoto(item.foto[0]);
                return null;
            }
        })
    }

    useEffect(() => {
        merrTeDhenatProduktit();
    }, [produktId, products]);


    return teDhenatProduktit ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

            {/* te dhenat e produktit  */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                {/* fotot e produktit */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            teDhenatProduktit.foto.map((item, index) => (
                                <img onClick={() => setFoto(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                            ))
                        }
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img src={foto} className='w-full h-auto' alt="" />
                    </div>
                </div>

                {/* informatat e produktit */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{teDhenatProduktit.emri}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{valuta}{teDhenatProduktit.cmimi}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{teDhenatProduktit.pershkrimi}</p>

                    <div className='flex flex-col gap-4 my-8'>
                        <p>Zgjidhni madhësinë</p>
                        <div className='flex gap-2'>
                            {teDhenatProduktit.madhesia.map((item, index) => (
                                <button onClick={() => setMadhesia(item)} className={`border py-2 px-4 bg-gray-100 ${item === madhesia ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => shtoNeKarroce(teDhenatProduktit._id, madhesia)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>SHTO NË KARROCË</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>Produkt 100% Origjinal</p>
                        <p>Paguaj në dorëzim është i disponueshëm për këtë produkt</p>
                        <p>Kthim dhe shkëmbim i lehtë brenda 7 ditëve</p>
                    </div>
                </div>
            </div>

            {/* pershkrimi dhe vleresimi i produktit  */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Përshkrimi</b>
                    <p className='border px-5 py-3 text-sm'>Vlerësimet (23)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>Bluza për burra me jakë të rrumbullakët, e punuar nga pambuku i pastër, është e lehtë dhe e thurur me stil.</p>
                    <p>Ky model është i përshtatshëm për t`u veshur si rrobë e brendshme apo si veshje e jashtme. Bluza ka jakë të rrumbullakët dhe mëngë të shkurtra, duke ofruar rehati dhe stil.</p>
                    <p>Pambuku i pastër siguron ajrosje optimale dhe parandalon irritimet e lëkurës, duke e bërë këtë bluzë të përsosur për çdo sezon.</p>
                    <p>Disponohet në madhësi të ndryshme, duke përfshirë M, L dhe XL, për të përmbushur nevojat e çdo përdoruesi.</p>
                    <p>Kjo bluzë është një zgjedhje e shkëlqyer për ata që kërkojnë një kombinim mes rehatisë dhe stilit të përditshëm.</p>
                </div>
            </div>

            {/* shfaq produktet e ngjashme */}
            <ProduktetNgjashme kategoria={teDhenatProduktit.kategoria} nenkategoria={teDhenatProduktit.nenkategoria} />


        </div>
    ) : <div className='opacity-0'></div>
}

export default Produkti