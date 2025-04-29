import requestAPI from "./RequestApi";
import UserDetailModel from "../../model/UserDetailModel";

export async function getUserDetail(userName: string): Promise<UserDetailModel> {
    const link: string = `http://localhost:8080/api/userDetail/getUserDetailByUserName?userName=${userName}`;

    const response = await requestAPI(link,true);

    const responseDATA = response;

    const userDetail: UserDetailModel = new UserDetailModel(
        responseDATA.userDetailId,
        responseDATA.firstName,
        responseDATA.lastName,
        responseDATA.gender,
        responseDATA.dateOfBirth,
        responseDATA.phoneNumber,
        responseDATA.province,
        responseDATA.district,
        responseDATA.ward,
        responseDATA.address
    );      

    return userDetail;
}


