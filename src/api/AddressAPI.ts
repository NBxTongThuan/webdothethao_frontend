const GHN_API_URL = `https://online-gateway.ghn.vn/shiip/public-api/`
const GHN_TOKEN = 'f5050752-14f1-11f0-ae25-deeae188dbc1'; // Bạn cần đăng ký tài khoản GHN để lấy token

export interface Province {
    ProvinceID: number;
    ProvinceName: string;
}

export interface District {
    DistrictID: number;
    DistrictName: string;
    ProvinceID: number;
}

export interface Ward {
    WardCode: string;
    WardName: string;
    DistrictID: number;
}

export const getProvinces = async (): Promise<Province[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}/province`, {
            headers: {
                'Content-Type': 'application/json',
                'Token': GHN_TOKEN
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch provinces');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching provinces:', error);
        throw error;
    }
};

export const getDistricts = async (provinceId: number): Promise<District[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}/district?province_id=${provinceId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Token': GHN_TOKEN
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch districts');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};

export const getWards = async (districtId: number): Promise<Ward[]> => {
    try {
        const response = await fetch(`${GHN_API_URL}/ward?district_id=${districtId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Token': GHN_TOKEN
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch wards');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching wards:', error);
        throw error;
    }
}; 