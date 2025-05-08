import { useEffect, useState } from "react";
import { getUserDetail } from "../../../api/user/UserDetailAPI";
import UserDetailModel from "../../../model/UserDetailModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  getProvinces, getDistricts, getWards } from "../../../api/user/AddressAPI";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { District, Province, Ward } from "../../../api/interface/Responses";
import { useAuth } from "../../../util/AuthContext";


interface FormData {
    userDetailId: string;
    userName: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    province: string;
    district: string;
    ward: string;
    address: string;
}

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    const userName = user?.userName + "";

    const [formData, setFormData] = useState<FormData>({
        userDetailId: '',
        userName: userName || '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        phoneNumber: '',
        province: '',
        district: '',
        ward: '',
        address: ''
    });

    useEffect(() => {
        getUserDetail(userName)
        .then(userData => {
            setFormData({
                userDetailId: userData.userDetailId || '',
                userName: userName || '',
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                gender: userData.gender || '',
                dateOfBirth: userData.dateOfBirth || '',
                phoneNumber: userData.phoneNumber || '',
                province: userData.province || '',
                district: userData.district || '',
                ward: userData.ward || '',
                address: userData.address || ''
            });
        })
        .catch(error => {
            toast.error("Không lấy được thông tin người dùng!");
        });

        // Load provinces
        getProvinces()
            .then(provincesData => {
                setProvinces(provincesData);
            })
            .catch(error => {
                console.error('Error loading provinces:', error);
            });
    }, [userName]);

    useEffect(() => {
        if (selectedProvince) {
            getDistricts(selectedProvince)
                .then(districtsData => {
                    setDistricts(districtsData);
                    setWards([]);
                    setSelectedDistrict('');
                })
                .catch(error => {
                    console.error('Error loading districts:', error);
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict)
                .then(wardsData => {
                    setWards(wardsData);
                })
                .catch(error => {
                    console.error('Error loading wards:', error);
                });
        }
    }, [selectedDistrict]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();
        confirmAlert({
            title: 'Xác nhận cập nhật',
            message: 'Bạn có chắc chắn muốn cập nhật thông tin cá nhân không?',
            buttons: [
              {
                label: 'Cập nhật',
                onClick: async () => {
                  const url = `http://localhost:8080/api/user-detail/update`;
                const data = {
                userDetailId: formData.userDetailId,
                userName: formData.userName,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,  
                phoneNumber: formData.phoneNumber,
                province: handleProvinceName(formData.province),
                district: handleDistrictName(formData.district),
                ward: handleWardName(formData.ward),
                address: formData.address
            }
    
            try {
                const  response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
                if(response.ok){
                    toast.success("Cập nhật thông tin thành công!");
                    navigate("/userDetail");
                }else{
                    toast.error("Cập nhật thông tin thất bại!");
                }
            }catch (error) {
                toast.error("Cập nhật thông tin thất bại!");
            }
                }
              },
              {
                label: 'Huỷ',
                onClick: () => {
                    console.log('Huỷ cập nhật');
                }
              }
            ]
          });
    
    };


    const handleProvinceName = (provinceCode: string) => {
        const province = provinces.find(p => p.ProvinceCode == provinceCode + "");
        return province ? province.ProvinceName : '';
    }
    const handleDistrictName = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictName : '';
    }
    const handleWardName = (wardCode: string) => {
        const ward = wards.find(w => w.WardCode == wardCode);
        return ward ? ward.WardName : '';
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                        <h1 className="text-3xl font-bold text-white">Chỉnh sửa thông tin cá nhân</h1>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold">
                                            {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Họ</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Tên</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Giới tính</label>
                                            <select
                                                name="gender"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="MALE">Nam</option>
                                                <option value="FEMALE">Nữ</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Ngày sinh</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Địa chỉ</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Tỉnh/Thành phố</label>
                                                <select
                                                    name="province"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    value={selectedProvince}
                                                    onChange={(e) => {
                                                        setSelectedProvince(e.target.value);
                                                        handleInputChange(e);
                                                    }}
                                                    required
                                                >
                                                    <option value="">Chọn tỉnh/thành phố</option>
                                                    {provinces.map(province => (
                                                        <option key={province.ProvinceCode} value={province.ProvinceCode}>
                                                            {province.ProvinceName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Quận/Huyện</label>
                                                <select
                                                    name="district"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    value={selectedDistrict}
                                                    onChange={(e) => {
                                                        setSelectedDistrict(e.target.value);
                                                        handleInputChange(e);
                                                    }}
                                                    disabled={!selectedProvince}
                                                    required
                                                >
                                                    <option value="">Chọn quận/huyện</option>
                                                    {districts.map(district => (
                                                        <option key={district.DistrictCode} value={district.DistrictCode}>
                                                            {district.DistrictName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Phường/Xã</label>
                                                <select
                                                    name="ward"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    value={formData.ward}
                                                    onChange={handleInputChange}
                                                    disabled={!selectedDistrict}
                                                    required
                                                >
                                                    <option value="">Chọn phường/xã</option>
                                                    {wards.map(ward => (
                                                        <option key={ward.WardCode} value={ward.WardCode}>
                                                            {ward.WardName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Địa chỉ chi tiết</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/userDetail")}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

