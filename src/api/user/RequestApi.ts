async function requestAPI(endpoint:string) {
    
    const response = await fetch(endpoint);

    if(!response.ok){
        throw new Error(`Không thể truy cập ${endpoint}`);
    }

    return response.json();

}
export default requestAPI;