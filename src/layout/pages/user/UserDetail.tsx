import { useEffect, useState } from "react";
import { getUserDetail } from "../../../api/UserDetailAPI";
import { getUserName } from "../../../util/JwtService";
import UserDetailModel from "../../../model/UserDetailModel";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserDetail: React.FC = () => {
    const token = localStorage.getItem('token');
    const userName = getUserName(token+"");
    const [userDetail, setUserDetail] = useState<UserDetailModel>();

    useEffect(() => {
        getUserDetail(userName+"")
        .then(setUserDetail)
        .catch(error => {
            toast.error("Không lấy được thông tin người dùng!");
        });
    }, [userName]);

    return (
        <div className="min-h-screen bg-gray-50 py-10">
  <div className="max-w-5xl mx-auto px-6">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
        <h1 className="text-3xl font-bold text-white text-left">Thông tin cá nhân</h1>
      </div>

      {/* Content */}
      <div className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold">
                {userDetail?.firstName?.charAt(0)}{userDetail?.lastName?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {userDetail?.firstName} {userDetail?.lastName}
                </h2>
                <p className="text-gray-500">Thành viên</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-venus-mars text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="font-medium text-gray-900">
                    {userDetail?.gender == "MALE" ? "Nam" : "Nữ"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-birthday-cake text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Ngày sinh</p>
                  <p className="font-medium text-gray-900">{userDetail?.dateOfBirth}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-phone text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium text-gray-900">{userDetail?.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 text-left">Địa chỉ</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Tỉnh/Thành phố</p>
                  <p className="font-medium text-gray-900">{userDetail?.province}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Quận/Huyện</p>
                  <p className="font-medium text-gray-900">{userDetail?.district}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Phường/Xã</p>
                  <p className="font-medium text-gray-900">{userDetail?.ward}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-home text-gray-500 text-sm"></i>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Địa chỉ chi tiết</p>
                  <p className="font-medium text-gray-900">{userDetail?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <Link to="/editProfile" className="bg-red-500 text-white px-4 py-2 rounded-md">
                <i className="fas fa-edit"></i>
                Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default UserDetail;
