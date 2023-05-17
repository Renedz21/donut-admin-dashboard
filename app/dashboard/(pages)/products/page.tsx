import { getDataProducts } from "@/utils/productOperations"
import { Products, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import TitleComponent from "@/components/TitleComponent"
import Link from "next/link"
import { PackagePlus } from "lucide-react"
import AddComponent from "@/components/AddComponent"

async function getData(): Promise<any[]> {
    const data = await getDataProducts()
    return data.data
}

export default async function Products() {
    const data = await getData();
    return (
        <div className="space-y-6">
            <div className="flex w-full justify-between items-center">
                <TitleComponent title='Productos' />
                <AddComponent
                    buttonText='Crear'
                    icon={<PackagePlus className='w-5 h-5' />}
                    link='/dashboard/products/add'
                />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
