import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>

            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/shto_produkte">
                    <img src={assets.add_icon} className='w-5 h-5' />
                    <p className='hidden md:!block'>Shto Produkte</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/lista_produkteve">
                    <img src={assets.order_icon} className='w-5 h-5' />
                    <p className='hidden md:!block'>Lista e Produkteve</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/porosite">
                    <img src={assets.order_icon} className='w-5 h-5' />
                    <p className='hidden md:!block'>Porositë</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar