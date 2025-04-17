import { District, Province, Ward } from "../interface/Responses";

const GHN_API_URL = `http://localhost:8080/api/`



export const getProvinces = async (): Promise<Province[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}provinces`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch provinces');
        }
        const data = await response.json();
        return data.map((item: any) =>
        (
            {
                ProvinceCode: item.code,
                ProvinceName: item.name
            }
        ));
    } catch (error) {
        console.error('Error fetching provinces:', error);
        throw error;
    }
};


export const getDistricts = async (provinceCode: number): Promise<District[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}districts?provinceCode=${provinceCode}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch districts');
        }
        const data = await response.json();
        return data.districts.map(
            (item: any) => ({
                DistrictCode: item.code,
                DistrictName: item.name,
            })
        );
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};

export const getWards = async (districtCode: number): Promise<Ward[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}wards?districtCode=${districtCode}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch wards');
        }
        const data = await response.json();
        return data.wards.map(
            (item: any) => ({
                WardCode: item.code,
                WardName: item.name
            })
        );
    } catch (error) {
        console.error('Error fetching wards:', error);
        throw error;
    }
}; 