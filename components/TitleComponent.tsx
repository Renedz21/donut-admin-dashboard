'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setIsOpen } from '@/app/redux/slices/sidebarSlice'
import { Title } from '@tremor/react'
import { Menu } from 'lucide-react'

const TitleComponent = ({ title }: { title: string }) => {

    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(state => state.sidebarReducer)

    const toggleOpen = () => {
        dispatch(setIsOpen(!isOpen))
    }

    return (
        <section className='flex items-center gap-2 w-full'>
            <button type='button' onClick={toggleOpen} className='p-1.5 block md:hidden'>
                <Menu className='w-5 h-5 text-gray-600' />
            </button>
            <Title className='text-gray-800 text-xl md:text-2xl'>{title}</Title>
        </section>
    )
}

export default TitleComponent