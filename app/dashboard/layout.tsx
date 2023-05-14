import Sidebar from '@/components/Sidebar';
import React from 'react'

const DashboardLayout = ({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) => {
    return (
        <section className='w-full h-full flex'>
            <Sidebar />
            <div className='p-4'>
                {children}
            </div>
        </section>
    );
}

export default DashboardLayout