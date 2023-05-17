"use client"

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { API_URL } from '@/lib/constants'
import FormInput from '@/components/FormInput'
import { getCategoryData } from '@/utils/categoriesOperations'
import { createProduct } from '@/utils/productOperations'
import { useRouter } from 'next/navigation'

export default function AddProduct() {

    const [addProductForm, setAddProductForm] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        image: "" as any,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [categories, setCategories] = useState([])

    const router = useRouter()

    function handleFileSelect(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setAddProductForm((prevState) => ({
                ...prevState,
                image: event.target?.result,
            }));
        };
        reader.readAsDataURL(file);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setAddProductForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(addProductForm)
        setIsLoading(true)
        const { name, category, description, price } = addProductForm

        if (
            name === "" || category === "" || description === "" || price === 0
        ) {
            setIsError(true)
            setIsLoading(false)
            toast.error('Por favor ingrese todos los campos')
            return
        } else {
            const result = await createProduct(addProductForm)
            console.log(result)

            if (result.success === false) {
                setIsError(true)
                setIsLoading(false)
                toast.error(result.message)
                return
            } else {
                setIsError(false)
                setIsLoading(false)
                // dispatch(setUserAndJwt(result))
                router.push('/dashboard/products')
            }
        }

    }

    useEffect(() => {
        const getCategories = async () => {
            const result = await getCategoryData()
            setCategories(result)
        }
        getCategories()
    }, [])


    return (
        <section className='flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-3xl font-semibold tracking-wide my-6'>Crear Producto</h1>
            </div>
            <form onSubmit={handleSubmit} className='bg-white w-full border border-gray-300 rounded-sm max-w-5xl shadow-md p-8'>
                {/* <input type="text" name='name' value={addProductForm.name} onChange={handleChange} /> */}
                <FormInput
                    type='text'
                    name='name'
                    value={addProductForm.name}
                    labelTitle='Nombre Producto'
                    onChange={handleChange}
                    inputType='input'
                />
                <div className='grid md:grid-cols-2 gap-5 mt-4'>
                    <div>
                        <FormInput
                            type='number'
                            name='price'
                            value={addProductForm.price}
                            labelTitle='Precio'
                            onChange={handleChange}
                            inputType='input'
                        />
                    </div>
                    <div>
                        <FormInput
                            type='text'
                            name='category'
                            labelTitle='Categoria'
                            onChange={handleChange}
                            value={addProductForm.category}
                            selectData={categories}
                            inputType='select'
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <FormInput
                        labelTitle='Descripcion'
                        name='description'
                        value={addProductForm.description}
                        onChange={handleChange}
                        inputType='textarea'
                    />
                </div>
                <div className='mt-4'>
                    <FormInput
                        labelTitle='Imagen'
                        name='image'
                        type='file'
                        onChange={handleFileSelect}
                        inputType='file'
                    />
                </div>
                <button type='submit' className={`border mt-4 px-4 py-2 rounded text-white bg-indigo-700 hover:bg-indigo-500 ${isLoading ? 'pointer-events-none cursor-not-allowed' : 'pointer-events-auto'}`}>
                    {isLoading ? 'Cargando...' : 'Crear Producto'}
                </button>
            </form>
            <Toaster
                position='top-center'
                reverseOrder={false}
            />
        </section>
    )
}