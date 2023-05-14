'use client'

import { useAppDispatch } from '@/app/redux/hooks'
import { setUserAndJwt } from '@/app/redux/slices/authSlice'
import { register } from '@/utils/authOperations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const Register = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [registerFormData, setRegisterFormData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        age: 0,
        phone: "",
        address: "",
        email: "",
        password: "",
        photoUrl: "" as any,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setRegisterFormData({
            ...registerFormData,
            [name]: value
        })
    }

    function handleFileSelect(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setRegisterFormData((prevState) => ({
                ...prevState,
                photoUrl: event.target?.result,
            }));
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true)

        const { address, age, dni, firstName, lastName, phone, photoUrl, email, password } = registerFormData

        if (email === '' || password === ''
            || address === '' || age === 0 || dni === '' || firstName === '' || lastName === '' || phone === '' || photoUrl === ''
        ) {
            setIsError(true)
            setIsLoading(false)
            toast.error('Por favor ingrese todos los campos')
            return
        } else {
            const result = await register(registerFormData)
            console.log(result)

            if (result.success === false) {
                setIsError(true)
                setIsLoading(false)
                toast.error(result.message)
                return
            } else {
                setIsError(false)
                setIsLoading(false)
                dispatch(setUserAndJwt(result))
                router.push('/dashboard')
            }
        }


    }

    return (
        <section className='h-screen grid justify-items-center items-center'>
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                </div>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm text-gray-800 dark:text-gray-200">Nombre</label>
                        <input type="text" name='firstName' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.firstName}
                            onChange={handleOnChange}

                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="lastName" className="block text-sm text-gray-800 dark:text-gray-200">Apellido</label>
                        <input type="text" name='lastName' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.lastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="dni" className="block text-sm text-gray-800 dark:text-gray-200">DNI</label>
                        <input type="text" name='dni' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.dni}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="age" className="block text-sm text-gray-800 dark:text-gray-200">Edad</label>
                        <input type="number" name='age' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.age}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">Télefono</label>
                        <input type="text" name='phone' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.phone}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="address" className="block text-sm text-gray-800 dark:text-gray-200">Dirección</label>
                        <input type="text" name='address' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.address}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                        <input type="email" name='email' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="photo" className="block text-sm text-gray-800 dark:text-gray-200">Imagen</label>
                        <input type="file" name='photo' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            onChange={handleFileSelect}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Contraseña</label>
                        <input type="password" name='password' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={registerFormData.password}
                            onChange={handleOnChange}
                            autoComplete='off'
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type='submit'
                            className={`
                                w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none flex items-center justify-center
                                ${isLoading ? 'bg-gray-400 cursor-not-allowed font-semibold' : 'bg-gray-800 hover:bg-gray-700'}
                            `}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    <p>Registrando...</p>
                                </>
                            ) : 'Registrarse'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-400">
                    No tienes una cuenta? {" "}
                    <Link href="/auth/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </section>
    )
}

export default Register