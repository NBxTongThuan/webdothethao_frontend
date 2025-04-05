import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const Orders: React.FC = () => {
    const [orders] = useState([
        { id: 'ORD001', customer: 'Nguyễn Văn A', total: 1650000, status: 'Đã giao', date: '2024-03-20' },
        { id: 'ORD002', customer: 'Trần Thị B', total: 800000, status: 'Đang xử lý', date: '2024-03-19' },
        { id: 'ORD003', customer: 'Lê Văn C', total: 1200000, status: 'Chờ xác nhận', date: '2024-03-18' },
    ]);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
                <div className="flex space-x-3">
                    <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors duration-200 border border-gray-300">
                        <i className="bi bi-filter mr-2"></i>
                        Lọc
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-green-600 px-4 py-2 rounded-lg flex items-center transition-colors duration-200 border border-gray-300">
                        <i className="bi bi-download mr-2"></i>
                        Xuất báo cáo
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total.toLocaleString('vi-VN')}đ</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === 'Đã giao' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'Đang xử lý'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-500 hover:text-blue-700 mr-3">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="text-green-500 hover:text-green-700">
                                                <i className="bi bi-check-lg"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Orders; 