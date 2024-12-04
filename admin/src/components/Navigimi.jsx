/* eslint-disable react/prop-types */
import { assets } from '../assets/assets'
const Navigimi = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img src={assets.logo} className="w-[80px] sm:w-[10%]" alt="Logo" />
            <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
                Shkyçu
            </button>
        </div>
    )
}

export default Navigimi