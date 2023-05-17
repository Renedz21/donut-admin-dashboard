import { UploadCloud } from 'lucide-react'
import { FC } from 'react'

interface Props {
    name: string
    value?: any
    type?: any
    labelTitle: string
    inputType?: string
    selectData?: any[] | undefined
    onChange: (e: React.ChangeEvent<any>) => void
}

const style = `block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none`

const FormInput: FC<Props> = ({
    name,
    value,
    type,
    labelTitle,
    inputType,
    selectData,
    onChange
}) => {
    return (
        <>
            <label htmlFor={name} className="block text-sm text-gray-500 dark:text-gray-300">{labelTitle}</label>
            {inputType === 'textarea' && (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder='Escribe algo...'
                    className={style}
                />
            )}
            {inputType === 'select' && (
                <select name={name} className={style} onChange={onChange}>
                    <option value="">Seleccione una opción</option>
                    {selectData?.map((item: any) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
            )}
            {inputType === 'input' && (
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className={style}
                />
            )}
            {inputType === 'file' && (
                <div>
                    {/* <label htmlFor="file" className="block text-sm text-gray-500 dark:text-gray-300">{}</label> */}

                    <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                        <UploadCloud className='w-8 h-8 tet-gray-600' />

                        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Payment File</h2>

                        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>

                        <input id="dropzone-file" type={type} className="hidden" onChange={onChange} />
                    </label>
                </div>
            )}
        </>
    )
}

export default FormInput