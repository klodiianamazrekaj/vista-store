/* eslint-disable react/prop-types */
import { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Shto = ({ token }) => {

    const [foto1, setFoto1] = useState(false);
    const [foto2, setFoto2] = useState(false);
    const [foto3, setFoto3] = useState(false);
    const [foto4, setFoto4] = useState(false);

    const [emri, setEmri] = useState('');
    const [pershkrimi, setPershkrimi] = useState('');
    const [cmimi, setCmimi] = useState('');
    const [kategoria, setKategoria] = useState('Men');
    const [nenkategoria, setNenkategoria] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);
    const [madhesia, setMadhesia] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("emri", emri);
            formData.append("pershkrimi", pershkrimi);
            formData.append("cmimi", cmimi);
            formData.append("kategoria", kategoria);
            formData.append("nenkategoria", nenkategoria);
            formData.append("bestseller", bestseller);
            formData.append("madhesia", JSON.stringify(madhesia));

            foto1 && formData.append("foto1", foto1);
            foto2 && formData.append("foto2", foto2);
            foto3 && formData.append("foto3", foto3);
            foto4 && formData.append("foto4", foto4);

            const response = await axios.post(backendUrl + "/api/produkti/shto_produkte", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setEmri('');
                setPershkrimi('');
                setFoto1(false);
                setFoto2(false);
                setFoto3(false);
                setFoto4(false);
                setCmimi('');
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Ngarko Foto</p>

                <div className='flex gap-2'>
                    <label htmlFor="foto1">
                        <img className='w-20' src={!foto1 ? assets.upload_area : URL.createObjectURL(foto1)} alt="" />
                        <input onChange={(e) => setFoto1(e.target.files[0])} type="file" name='foto1' id='foto1' hidden />
                    </label>

                    <label htmlFor="foto2">
                        <img className='w-20' src={!foto2 ? assets.upload_area : URL.createObjectURL(foto2)} alt="" />
                        <input onChange={(e) => setFoto2(e.target.files[0])} type="file" name='foto3' id='foto2' hidden />
                    </label>

                    <label htmlFor="foto3">
                        <img className='w-20' src={!foto3 ? assets.upload_area : URL.createObjectURL(foto3)} alt="" />
                        <input onChange={(e) => setFoto3(e.target.files[0])} type="file" name='foto4' id='foto3' hidden />
                    </label>

                    <label htmlFor="foto4">
                        <img className='w-20' src={!foto4 ? assets.upload_area : URL.createObjectURL(foto4)} alt="" />
                        <input onChange={(e) => setFoto4(e.target.files[0])} type="file" name='foto5' id='foto4' hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Emri i Produktit</p>
                <input onChange={(e) => setEmri(e.target.value)} value={emri} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Shkruani emrin e produktit' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Përshkrimi i Produktit</p>
                <textarea onChange={(e) => setPershkrimi(e.target.value)} value={pershkrimi} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Përshkruani produktin' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Kategoria e Produktit</p>
                    <select onChange={(e) => setKategoria(e.target.value)} value={kategoria} className='w-full px-3 py-2'>
                        <option value="Men">Meshkuj</option>
                        <option value="Women">Femra</option>
                        <option value="Kids">Fëmijë</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Nënkategoria e Produktit</p>
                    <select onChange={(e) => setNenkategoria(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Veshje e Sipërme</option>
                        <option value="Bottomwear">Veshje e Poshtme</option>
                        <option value="Winterwear">Veshje Dimërore</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Çmimi i Produktit</p>
                    <input onChange={(e) => setCmimi(e.target.value)} value={cmimi} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='15.50' />
                </div>
            </div>

            <div>
                <p className='mb-2'>Madhësia e Produktit</p>
                <div className='flex gap-3'>
                    <div onClick={() => setMadhesia(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p className={`${madhesia.includes("S") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
                    </div>

                    <div onClick={() => setMadhesia(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${madhesia.includes("M") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
                    </div>

                    <div onClick={() => setMadhesia(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${madhesia.includes("L") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
                    </div>

                    <div onClick={() => setMadhesia(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${madhesia.includes("XL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>

                    <div onClick={() => setMadhesia(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${madhesia.includes("XXL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label className='cursor-pointer' htmlFor="bestseller">SHTO NË LISTËN E BESTSELLERËVE</label>
            </div>

            <button type='submit' className='w-full rounded-[4px] max-w-[500px] py-3 mt-4 bg-black text-white'>SHTO</button>

        </form>
    )
}

export default Shto