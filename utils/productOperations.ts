import { API_URL } from "@/lib/constants";

export const getDataProducts = async () => {
    const response = await fetch(`${API_URL}/products`, { cache: 'no-cache' });
    const data = await response.json();
    return data;
}

export const createProduct = async (product: any) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
}