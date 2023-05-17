import { API_URL } from "@/lib/constants";

export const getCategoryData = async () => {
    const response = await fetch(`${API_URL}/category`, { next: { revalidate: 60 } });
    const data = await response.json();
    return data;
}