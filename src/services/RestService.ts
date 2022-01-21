export async function request(url: any, fetchOptions: any = {}) {
    fetchOptions = {
        ...fetchOptions,
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }
    }
    const response = await fetch(url, fetchOptions);
    return await response.json();
};