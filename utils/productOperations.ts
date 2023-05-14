import { API_URL } from "@/lib/constants";

export const getDataProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
}