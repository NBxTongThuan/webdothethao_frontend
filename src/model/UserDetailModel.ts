
class UserDetailModel {
    userDetailId: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    province: string;
    district: string;
    ward: string;
    address: string;        

    constructor(userDetailId: string, firstName: string, lastName: string, gender: string, dateOfBirth: string, phoneNumber: string, province: string, district: string, ward: string, address: string) {
        this.userDetailId = userDetailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.address = address;
    }
}

export default UserDetailModel;
