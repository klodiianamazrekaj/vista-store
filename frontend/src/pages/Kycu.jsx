/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Kycu = () => {

    const [gjendjaAktuale, setGjendjaAktuale] = useState('Kyçu');
    const { token, setToken, navigo, backendUrl } = useContext(ShopContext);

    const [emri, setEmri] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // api call per regjistrim te perdoruesit
            if (gjendjaAktuale === 'Regjistrohu') {
                const response = await axios.post(backendUrl + '/api/perdoruesi/regjistrohu', { emri, email, password });

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
                else {
                    toast.error(response.data.message);
                }
            }
            else {
                const response = await axios.post(backendUrl + '/api/perdoruesi/kycu', { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
                else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigo('/');
        }
    }, [token]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, [])

    return (
        <div className="space-y-24">
            <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl">{gjendjaAktuale}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                {gjendjaAktuale === 'Kyçu' ? '' : <input onChange={(e) => setEmri(e.target.value)} value={emri} type="text" className="w-full px-3 py-2 border rounded-sm border-gray-400" placeholder="Emri juaj" required />}
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border  rounded-sm border-gray-400" placeholder="Email-i juaj" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border  rounded-sm border-gray-400" placeholder="Password-i juaj" required />

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
        </div>
    )
}

export default Kycu