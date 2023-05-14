import { getDataProducts } from "@/utils/productOperations"
import { Products, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import TitleComponent from "@/components/TitleComponent"

async function getData(): Promise<any[]> {
    const data = await getDataProducts()
    return data.data
}

export default async function Products() {
    const data = await getData();
    return (
        <div className="">
            <TitleComponent title='Productos' />
            <DataTable columns={columns} data={data} />
        </div>
    )
}
