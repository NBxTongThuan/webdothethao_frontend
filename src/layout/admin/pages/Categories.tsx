import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const Categories: React.FC = () => {
    const [categories] = useState([
        { id: 1, name: 'Giày thể thao', products: 25, status: 'Active' },
        { id: 2, name: 'Áo thể thao', products: 18, status: 'Active' },
        { id: 3, name: 'Quần thể thao', products: 15, status: 'Inactive' },
    ]);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                    <i className="bi bi-plus-lg mr-2"></i>
                    Thêm danh mục
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số sản phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map(category => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.products}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                category.status === 'Active' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {category.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="text-blue-500 hover:text-blue-700 mr-3">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <i className="bi bi-trash"></i>
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

export default Categories; 