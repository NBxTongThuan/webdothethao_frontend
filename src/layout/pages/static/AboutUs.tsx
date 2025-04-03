import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-red-500 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Về chúng tôi</h1>
                    <p className="text-lg">Chuyên cung cấp các sản phẩm thể thao chất lượng cao</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Company Introduction */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Giới thiệu về WebDoTheThao</h2>
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">
                            WebDoTheThao là đơn vị tiên phong trong lĩnh vực bán lẻ sản phẩm thể thao tại Việt Nam. 
                            Với hơn 5 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách hàng những sản phẩm 
                            thể thao chất lượng cao từ các thương hiệu nổi tiếng trên thế giới.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Chúng tôi hiểu rằng mỗi vận động viên đều cần những trang thiết bị phù hợp để 
                            phát huy tối đa tiềm năng của mình. Vì vậy, chúng tôi luôn cập nhật và đa dạng hóa 
                            sản phẩm để đáp ứng mọi nhu cầu của khách hàng.
                        </p>
                        <p className="text-gray-600">
                            Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi cam kết mang đến 
                            trải nghiệm mua sắm tốt nhất cho khách hàng.
                        </p>
                    </div>
                </div>

                {/* Our Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-medal text-red-500 text-xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Chất lượng</h3>
                        <p className="text-gray-600">
                            Chúng tôi cam kết cung cấp sản phẩm chính hãng với chất lượng cao nhất.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-heart text-red-500 text-xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tận tâm</h3>
                        <p className="text-gray-600">
                            Đội ngũ nhân viên luôn sẵn sàng hỗ trợ và tư vấn cho khách hàng.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-sync text-red-500 text-xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Đổi mới</h3>
                        <p className="text-gray-600">
                            Luôn cập nhật và đa dạng hóa sản phẩm để đáp ứng nhu cầu ngày càng cao.
                        </p>
                    </div>
                </div>

                {/* Team Members */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Đội ngũ của chúng tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <i className="fas fa-user text-gray-500 text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Nguyễn Văn A</h3>
                            <p className="text-gray-600">Giám đốc điều hành</p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <i className="fas fa-user text-gray-500 text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Trần Thị B</h3>
                            <p className="text-gray-600">Quản lý sản phẩm</p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <i className="fas fa-user text-gray-500 text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Lê Văn C</h3>
                            <p className="text-gray-600">Quản lý khách hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs; 