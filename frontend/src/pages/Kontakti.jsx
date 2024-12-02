import Titulli from '../components/Titulli';
import KutiaNewsletter from '../components/KutiaNewsletter';
import { assets } from '../assets/assets'

const Kontakti = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 border-t">
                <Titulli tekst1={'NA'} tekst2={'KONTAKTONI'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Dyqani Ynë</p>
                    <p className='text-gray-500'>Suharekë-Sopijë <br /> Rr. Afrim Mazreku 23000, Kosovë</p>
                    <p className='text-gray-500'>+383 49 888 999 <br /> contact@forever.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Karriera në FOREVER</p>
                    <p className='text-gray-500'>Mëso më shumë për ekipën tonë dhe konkurset e punës.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Eksploro Konkurset e Hapura</button>
                </div>
            </div>

            <KutiaNewsletter />
        </div>
    )
}

export default Kontakti