async function requestAPI(endpoint:string, includeCredentials: boolean = false) {
    try {
        const options: RequestInit = {  
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (includeCredentials) {
            options.credentials = 'include';
        }

        const response = await fetch(endpoint, options);

        if(!response.ok){
            throw new Error(`Không thể truy cập ${endpoint}`);
        }

        return response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export default requestAPI;