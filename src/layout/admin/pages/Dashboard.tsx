import React from 'react';
import AdminLayout from '../components/AdminLayout';

const Dashboard: React.FC = () => {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                            <i className="bi bi-people text-blue-500 text-2xl"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Tổng số người dùng</p>
                            <h3 className="text-2xl font-semibold">1,234</h3>
                            <p className="text-sm text-green-500">+12% so với tháng trước</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                            <i className="bi bi-cart text-green-500 text-2xl"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Đơn hàng mới</p>
                            <h3 className="text-2xl font-semibold">56</h3>
                            <p className="text-sm text-gray-500">Hôm nay</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                            <i className="bi bi-currency-dollar text-yellow-500 text-2xl"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Doanh thu</p>
                            <h3 className="text-2xl font-semibold">$12,345</h3>
                            <p className="text-sm text-gray-500">Tháng này</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                            <i className="bi bi-box text-purple-500 text-2xl"></i>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-500">Sản phẩm</p>
                            <h3 className="text-2xl font-semibold">89</h3>
                            <p className="text-sm text-gray-500">Đang bán</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h5 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h5>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nguyễn Văn A</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$123.45</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Hoàn thành
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12346</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trần Thị B</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$234.56</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Đang xử lý
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h5 className="text-lg font-semibold mb-4">Hoạt động gần đây</h5>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="bi bi-circle-fill text-green-500 text-xs"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-900">Đơn hàng mới #12347</p>
                                    <p className="text-xs text-gray-500">2 phút trước</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="bi bi-circle-fill text-blue-500 text-xs"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-900">Cập nhật sản phẩm</p>
                                    <p className="text-xs text-gray-500">15 phút trước</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <i className="bi bi-circle-fill text-purple-500 text-xs"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-900">Đăng ký người dùng mới</p>
                                    <p className="text-xs text-gray-500">1 giờ trước</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 