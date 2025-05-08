import { MyAddressResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/my-address';

export const getAddress = async (): Promise<MyAddressResponse[]> => {
    try {
        const response = await fetch(`${API_URL}/get`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const listAddress = await response.json();

        if (!listAddress || listAddress.length == 0)
            return [];

        const myAddress: MyAddressResponse[] = listAddress.map(
            (myAddress: MyAddressResponse) => ({
                addressId: myAddress.addressId,
                toName: myAddress.toName,
                toPhone: myAddress.toPhone,
                toDistrict: myAddress.toDistrict,
                toProvince: myAddress.toProvince,
                toWard: myAddress.toWard,
                toAddress: myAddress.toAddress
            })
        )

        return myAddress;
    } catch (error) {
        throw error;
    }
}