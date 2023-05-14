import { useAppDispatch } from '@/app/redux/hooks'
import { setUserAndJwt } from '@/app/redux/slices/authSlice'
import { login } from '@/utils/authOperations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()

    const [formLoginData, setFormLoginData] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormLoginData({
            ...formLoginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true)

        const { email, password } = formLoginData

        if (email === '' || password === '') {
            setIsError(true)
            setIsLoading(false)
            toast.error('Por favor ingrese todos los campos')
            return
        }

        const result = await login(email, password)
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

    return (
        <section className='h-screen grid justify-items-center items-center'>
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                </div>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                        <input type="email" name='email' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={formLoginData.email}
                            onChange={handleOnChange}

                        />
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                            <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</a>
                        </div>

                        <input type="password" name='password' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none"
                            value={formLoginData.password}
                            onChange={handleOnChange}

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
                                    <p>Iniciando...</p>
                                </>
                            ) : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-400">
                    No tienes una cuenta?
                    <Link href="/auth/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </section>
    )
}

export default Login