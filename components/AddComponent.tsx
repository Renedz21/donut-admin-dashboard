import Link from 'next/link'
import React from 'react'

const AddComponent = ({
    buttonText, icon, link
}: {
    buttonText: string, icon: any, link: string
}) => {
    return (
        <>
            <Link href={`${link}`} className="text-white flex items-center justify-between gap-2 border hover:border-indigo-700 px-5 py-1.5 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-colors duration-150 ease-linear rounded">
                {icon}
                <span className='flex-1 font-semibold'>{buttonText}</span>
            </Link>
        </>
    )
}

export default AddComponent