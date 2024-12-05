/* eslint-disable no-unused-vars */
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navigimi = () => {

    const [eDukshme, setEDukshme] = useState(false);

    const { setShfaqKerkimin, merrNumrinArtikujveNeKarroce, navigo, token, setToken, setArtikujtNeKarroce } = useContext(ShopContext);

    const dil = () => {
        localStorage.removeItem('token');
        setToken('');
        setArtikujtNeKarroce({});
        navigo('/kycu');
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/">
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:!flex gap-5 text-sm text-gray-700'>
                {/* links per navigim */}
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>BALLINA</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/koleksioni' className="flex flex-col items-center gap-1">
                    <p>KOLEKSIONI</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/rreth_nesh' className="flex flex-col items-center gap-1">
                    <p>RRETH NESH</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/kontakti' className="flex flex-col items-center gap-1">
                    <p>KONTAKTI</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShfaqKerkimin(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
                <div className='relative group'>
                    <img onClick={() => token ? null : navigo('/kycu')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />

                    {/* dropdown menu */}
                    {
                        token &&
                        <div className='absolute right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                                <p className='cursor-pointer hover:text-black'>Profili Im</p>
                                <p onClick={() => navigo('/porosite')} className='cursor-pointer hover:text-black'>Porositë</p>
                                <p onClick={dil} className='cursor-pointer hover:text-black'>Dil</p>
                            </div>
                        </div>
                    }
                </div>

                {/* ikona karroca  */}
                <Link to='/karroca' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Karroca" />
                    <p
                        className='absolute right-[-5px] bottom-[-5px] 
                                    w-4 text-center leading-4 bg-black 
                                    text-white aspect-square 
                                    rounded-full text-[8px]'
                    >
                        {merrNumrinArtikujveNeKarroce()}
                    </p>
                </Link>

                <img onClick={() => setEDukshme(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* sidebar menu per ekrane me te vogla */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${eDukshme ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setEDukshme(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Kthehu</p>
                    </div>

                    <NavLink onClick={() => setEDukshme(false)} className='py-2 pl-6 border' to='/'>BALLINA</NavLink>
                    <NavLink onClick={() => setEDukshme(false)} className='py-2 pl-6 border' to='/koleksioni'>KOLEKSIONI</NavLink>
                    <NavLink onClick={() => setEDukshme(false)} className='py-2 pl-6 border' to='/rreth_nesh'>RRETH NESH</NavLink>
                    <NavLink onClick={() => setEDukshme(false)} className='py-2 pl-6 border' to='/kontakti'>KONTAKTI</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navigimi
