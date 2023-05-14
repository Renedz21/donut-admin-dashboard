import { getDataProducts } from "@/utils/productOperations"
import { Products, columns } from "./columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<any[]> {
    const data = await getDataProducts()
    return data.data
}

export default async function Products() {
    const data = await getData();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
