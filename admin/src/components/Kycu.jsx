/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Kycu = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            // e thirrim API per autentifikim e adminit
            const response = await axios.post(backendUrl + '/api/perdoruesi/admin', { email, password });

            if (response.data.success) {
                setToken(response.data.token);
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
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-md w-full px-3 py-2 border border-x-gray-300 outline-none" type="email" placeholder="shembull@gmail.com" />
                    </div>

                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Fjalëkalimi</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-md w-full px-3 py-2 border border-x-gray-300 outline-none" type="password" placeholder="Shkruani fjalëkalimin tuaj" />
                    </div>
                    <button className="bg-black text-white w-full rounded-md px-8 py-2 mt-4" type="submit">Kyçu</button>
                </form>
            </div>
        </div>
    )
}

export default Kycu