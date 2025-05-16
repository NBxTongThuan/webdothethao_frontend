import { AnimatePresence, motion } from "framer-motion";
import { UserResponse } from "../../../api/interface/Responses";
import { getUserDetail } from "../../../api/user/UserDetailAPI";
import UserDetailModel from "../../../model/UserDetailModel";
import { useEffect, useState } from "react";
import { User, Mail, Shield, Power, UserCircle, Phone, Calendar, MapPin, X } from "lucide-react";
import { Button } from "antd";
import { GenderAmbiguous } from "react-bootstrap-icons";
import { adminGetUserDetail } from "../../../api/admin/UserAdminAPI";
interface UserDetailAdminProps {
    user: UserResponse | null;
    onClose: () => void;
}

export const UserDetailAdmin: React.FC<UserDetailAdminProps> = (props) => {
    const [userDetail, setUserDetail] = useState<UserDetailModel | null>(null);

    useEffect(() => {
        if (props.user) {
            adminGetUserDetail(props.user.username).then(setUserDetail);
        }
    }, [props.user]);

    const getGenderText = (gender: string) => {
        if (gender === "MALE") {
            return "Nam";
        }
        if (gender === "FEMALE") {
            return "Nữ";
        }
        return "Không xác định";
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
            >
                <motion.div
                    className="bg-white rounded-xl p-8 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <button 
                        onClick={props.onClose}
                        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 border-b pb-6">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <UserCircle size={40} className="text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">Thông tin tài khoản</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông tin cơ bản</h2>
                                
                                <div className="flex items-center gap-4 text-gray-600">
                                    <User size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Tên đăng nhập:</span>
                                    <span>{props.user?.username}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <Mail size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Email:</span>
                                    <span>{props.user?.email}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <Shield size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Vai trò:</span>
                                    <span>{props.user?.role}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <Power size={24} className={`${props.user?.enable ? 'text-green-500' : 'text-red-500'}`} />
                                    <span className="font-medium min-w-[120px]">Trạng thái:</span>
                                    <span className={props.user?.enable ? 'text-green-600' : 'text-red-600'}>
                                        {props.user?.enable ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Thông tin cá nhân</h2>
                                
                                <div className="flex items-center gap-4 text-gray-600">
                                    <UserCircle size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Họ và tên:</span>
                                    <span>{userDetail?.firstName} {userDetail?.lastName}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <GenderAmbiguous size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Giới tính:</span>
                                    <span>{getGenderText(userDetail?.gender || "")}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <Calendar size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Ngày sinh:</span>
                                    <span>{userDetail?.dateOfBirth}</span>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <Phone size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Số điện thoại:</span>
                                    <span>{userDetail?.phoneNumber}</span>
                                </div>

                                <div className="flex gap-4 text-gray-600">
                                    <MapPin size={24} className="text-blue-500" />
                                    <span className="font-medium min-w-[120px]">Địa chỉ:</span>
                                    <span>{userDetail?.ward}, {userDetail?.district}, {userDetail?.province}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4"> 
                            <Button type="primary" className="bg-blue-500 text-white hover:bg-blue-600 px-6" onClick={props.onClose}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
