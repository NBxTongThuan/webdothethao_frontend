import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ActiveAccount: React.FC = () => {

    const { email } = useParams();
    const { activeCode } = useParams();
    const [isActivated, setIsActivated] = useState(false);
    const [annouce, setAnnouce] = useState('');
    const navigate = useNavigate();
    console.log(email);
    console.log(activeCode);
   
    useEffect(() => {
        if(email && activeCode){
            ActiveFt();
        }
    },[]);

    const ActiveFt = async () => {
        try {
            const url =`http://localhost:8080/api/account/active?email=${email}&activeCode=${activeCode}`;
            const response = await fetch(url,{
                method: 'GET',
         });
         console.log(response);
         if(response.ok){
            setIsActivated(true);
            toast.success("Kích hoạt tài khoản thành công");
            setTimeout(() => {
                navigate("/Login");
            }, 3000);
         }else{
            setAnnouce(response.text+"");
         }
       
        } catch (error) {
            console.log(error);
        }
    }

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    {isActivated ? (
                        <div className="space-y-4">
                            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                                <i className="fas fa-check-circle text-4xl text-green-500"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Kích hoạt thành công!</h2>
                            <p className="text-gray-600">Tài khoản của bạn đã được kích hoạt. Bây giờ bạn có thể đăng nhập và bắt đầu mua sắm.</p>
                            <Link 
                                to="/Login"
                                className="inline-block mt-4 px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors duration-200"
                            >
                                Đăng nhập ngay
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                                <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Đang kích hoạt tài khoản...</h2>
                            <p className="text-gray-600">{annouce}</p>
                            <div className="mt-4 text-sm text-gray-500">
                                <p>Nếu bạn gặp vấn đề trong quá trình kích hoạt,</p>
                                <p>vui lòng <a href="#" className="text-red-500 hover:text-red-600">liên hệ hỗ trợ</a></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );


    }
export default ActiveAccount;