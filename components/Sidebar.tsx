'use client'

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { setIsOpen } from "@/app/redux/slices/sidebarSlice"
import { navigationAnalyticsLinks, navigationContentLinks } from "@/lib/navigationLinks"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const Sidebar = () => {
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(state => state.sidebarReducer)

    const router = useRouter()
    const pathname = usePathname();

    const toggleOpen = () => {
        dispatch(setIsOpen(!isOpen))
    }

    const isActive = (path: string) => {
        if (path === pathname) {
            return 'bg-indigo-200 dark:bg-indigo-800 text-indigo-700 font-semibold dark:text-indigo-100'
        } else {
            return 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-100'
        }
    }

    return (
        <aside className={`flex flex-col w-56 transition duration-300 transform absolute z-20 inset-y-0 left-0 h-screen  overflow-y-auto bg-white lg:static lg:inset-0 lg:translate-x-0 px-5 py-8 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
            <div className='flex items-center justify-between'>
                <Link href='/'>
                    <Image width={35} height={28} src="https://merakiui.com/images/logo.svg" alt="" />
                </Link>
                <button onClick={toggleOpen} className='md:hidden block'>
                    {/* <Menu className='w-5 h-5 text-gray-600' /> */}
                    Menu
                </button>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>
                        {
                            navigationAnalyticsLinks.map((link) => (
                                <Link onClick={toggleOpen}
                                    href={link.path}
                                    key={link.name}
                                    className={`flex items-center transition-colors px-3 py-2 duration-300 transform rounded-lg my-2 ${isActive(link.path)} `}
                                // className='flex items-center transition-colors px-3 py-2 duration-300 transform rounded-lg my-2'
                                >
                                    <link.icon className='w-5 h-5' />
                                    <span className="mx-2 text-sm font-medium">{link.name}</span>
                                </Link>
                            ))
                        }
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Contenido</label>
                        {navigationContentLinks.map((link) => (

                            <Link onClick={toggleOpen} href={link.path} key={link.name}
                                className={`flex items-center transition-colors px-3 py-2 duration-300 transform rounded-lg my-2 ${isActive(link.path)} `}
                            // className='flex items-center transition-colors px-3 py-2 duration-300 transform rounded-lg my-2'
                            >
                                <link.icon className='w-5 h-5' />
                                <span className="mx-2 text-sm font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Perfil</label>
            {/* <Link href={`/user/${dataUser.id}`} className='flex items-center justify-center mt-4'>
                <Image src={`${dataUser.photoUrl}`} className='rounded-full border p-2' alt='profile photo' width={55} height={55} loading='lazy' />
                <p className="mx-4 text-sm font-medium">{dataUser.firstName} {dataUser.lastName}</p>
            </Link> */}
        </aside>
    )
}

export default Sidebar